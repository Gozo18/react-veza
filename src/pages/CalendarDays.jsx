import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DayItem from "../components/DayItem";
import TotalMonthOrders from "../components/TotalMonthOrders";

function CalendarDays({ orders }) {
  const auth = getAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "users"), where("email", "!=", null));

        const orderInfo = [];

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          return orderInfo.push({
            data: doc.data(),
          });
        });
        setUsers(orderInfo);
      } catch (error) {
        toast.error("Nemohu načíst data!");
      }
    };

    const fetchUser = async () => {
      try {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        const userInfo = docSnap.data();

        setUser(userInfo);
        if (userInfo.admin === undefined) {
          navigate("/profile");
        }
      } catch (error) {
        toast.error("Nemohu načíst data!");
      }
    };

    fetchUser();
    fetchOrders();
    setLoading(false);
  }, [auth.currentUser.uid, navigate, user.admin]);

  function onChange(nextValue) {
    setValue(nextValue);
  }

  function tileClassName({ date, view }) {
    const orderedDays = [];

    orders.map((order) => {
      orderedDays.push(order.data.date.toDate().toLocaleDateString());

      return orderedDays;
    });

    if (orderedDays.find((x) => x === date.toLocaleDateString())) {
      return "highlight";
    }
  }

  const dayOrdersArray = [];

  orders.map((order, i) => {
    const orderTime = order.data.date.toDate().toLocaleDateString();
    const valueTime = value.toLocaleDateString();
    if (orderTime === valueTime) {
      dayOrdersArray.push(order.data);
    }

    return null;
  });

  /* console.log(dayOrdersArray); */

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Kalendář objednávek</p>
      </header>

      <main>
        <div className='calendarBox'>
          <Calendar
            onChange={onChange}
            value={value}
            tileClassName={tileClassName}
          />
        </div>
        <p className='orderDate'>
          Zvolené datum: <b>{value.toLocaleDateString()}</b>
        </p>

        <DayItem orders={dayOrdersArray} />

        <TotalMonthOrders orders={orders} value={value} />
      </main>
    </div>
  );
}

export default CalendarDays;
