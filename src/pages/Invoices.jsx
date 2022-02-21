import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import Spinner from "../components/Spinner";
import OrderItem from "../components/OrderItem";
import { toast } from "react-toastify";
import Calendar from "react-calendar";
import { isEqual } from "date-fns";
import "react-calendar/dist/Calendar.css";

function Invoices() {
  const auth = getAuth();
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const docRef = query(
          collection(db, "order"),
          where("userRef", "==", auth.currentUser.uid)
        );
        const docSnap = await getDocs(docRef);

        const orderInfo = [];

        docSnap.forEach((doc) => {
          return orderInfo.push({
            data: doc.data(),
          });
        });

        setOrders(orderInfo);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch data!");
      }
    };

    fetchOrders();
  }, [auth.currentUser.uid]);

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

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Orders</p>
      </header>

      {loading ? (
        <Spinner />
      ) : orders && orders.length > 0 ? (
        <main>
          <div className='calendarBox'>
            <Calendar
              onChange={onChange}
              value={value}
              tileClassName={tileClassName}
            />
          </div>
          <p className='orderDate'>
            Selected Date: <b>{value.toLocaleDateString()}</b>
          </p>

          {orders.map((order, i) => {
            if (isEqual(order.data.date.toDate(), value)) {
              return <OrderItem order={order.data} key={i} />;
            }

            return <></>;
          })}
        </main>
      ) : (
        <div className='orderItems'>
          <p>No orders made</p>
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Invoices;
