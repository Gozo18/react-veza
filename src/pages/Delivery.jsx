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
import { isEqual } from "date-fns";
import "react-calendar/dist/Calendar.css";

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
        toast.error("Could not fetch data!");
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
        toast.error("Could not fetch data!");
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
      orderedDays.push(order.data.date.toDate());

      return orderedDays;
    });

    if (orderedDays.find((x) => isEqual(x, date))) {
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
        dayUsersArray.push(user);
      }
      return null;
    });
    return null;
  });

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

        {dayUsersArray.map((us, i) => {
          return (
            <div className='deliveryBox'>
              <div key={i} className='userItem'>
                <div className='userItemName'>{us.data.name}</div>
                <div className='userItemStreet'>{us.data.street}</div>
                <div className='userItemTown'>{us.data.town}</div>
                <div className='userItemPsc'>{us.data.psc}</div>
                <div className='userItemPhone'>tel.: {us.data.phone}</div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default Delivery;
