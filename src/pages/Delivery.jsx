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
import TownDataSearch from "../components/TownDataSearch";

function Delivery({ orders }) {
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
  const dayRefArray = [];
  const dayUsersArray = [];

  orders.map((order, i) => {
    const orderTime = order.data.date.toDate().toLocaleDateString();
    const valueTime = value.toLocaleDateString();
    if (orderTime === valueTime) {
      dayOrdersArray.push(order.data);
    }
    return null;
  });

  dayOrdersArray.map((day, i) => {
    dayRefArray.push(day.userRef);

    return null;
  });

  dayRefArray.map((dayUser, i) => {
    users.map((user, i) => {
      if (dayUser === user.data.userRef) {
        dayUsersArray.push(user.data);
      }
    });
  });

  function compare(a, b) {
    if (a.town < b.town) {
      return -1;
    }
    if (a.town > b.town) {
      return 1;
    }
    return 0;
  }

  dayUsersArray.sort(compare);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Doprava</p>
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

        <TownDataSearch users={dayUsersArray} />
      </main>
    </div>
  );
}

export default Delivery;
