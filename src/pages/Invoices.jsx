import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import Spinner from "../components/Spinner";
import OrderItem from "../components/OrderItem";
import { toast } from "react-toastify";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import MonthOrderItem from "../components/MonthOrderItem";

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
        toast.error("Nemohu načíst data!");
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
      orderedDays.push(order.data.date.toDate().toLocaleDateString());

      return orderedDays;
    });

    if (orderedDays.find((x) => x === date.toLocaleDateString())) {
      return "highlight";
    }
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Moje objednávky</p>
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
            Zvolené datum: <b>{value.toLocaleDateString()}</b>
          </p>

          {orders.map((order, i) => {
            const orderTime = order.data.date.toDate().toLocaleDateString();
            const valueTime = value.toLocaleDateString();
            if (orderTime === valueTime) {
              return <OrderItem order={order.data} key={i} />;
            }

            return null;
          })}

          <MonthOrderItem orders={orders} value={value} />
        </main>
      ) : (
        <div className='orderItems'>
          <p>Žádné objednávky</p>
        </div>
      )}
    </div>
  );
}

export default Invoices;
