import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { isEqual } from "date-fns";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

function WeekDayOrder({
  no1Name,
  no2Name,
  no3Name,
  no4Name,
  no5Name,
  no6Name,
  priceNo1,
  priceNo2,
  priceNo3,
  priceNo4,
  priceNo5,
  priceNo6,
  dayDate,
  isOrdered,
}) {
  const auth = getAuth();
  const [orders, setOrders] = useState([]);
  const [orderMade, setOrderMade] = useState(false);
  const [formData, setFormData] = useState({
    no1: 0,
    no2: 0,
    no3: 0,
    no4: 0,
    no5: 0,
    no6: 0,
  });

  const { no1, no2, no3, no4, no5, no6 } = formData;

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
        orders.map((order, i) => {
          if (isEqual(order.data.date.toDate(), dayDate.toDate())) {
            return setOrderMade(true);
          }

          return <></>;
        });
      } catch (error) {
        toast.error("Could not fetch data!");
      }
    };

    fetchOrders();
  }, [auth.currentUser.uid, dayDate, orders]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
      no1Text: no1Name,
      no2Text: no2Name,
      no3Text: no3Name,
      no4Text: no4Name,
      no5Text: no5Name,
      no6Text: no6Name,
      no1Price: priceNo1,
      no2Price: priceNo2,
      no3Price: priceNo3,
      no4Price: priceNo4,
      no5Price: priceNo5,
      no6Price: priceNo6,
      date: dayDate,
      userRef: auth.currentUser.uid,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "order"), formData);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {orderMade ? (
        <p>Order made</p>
      ) : (
        <form onSubmit={onSubmit}>
          <ol className='dayList'>
            <li className='weekItem'>
              <div className='weekItemText'>1. {no1Name}</div>
              <div className='weekItemPrice'>{priceNo1},- Kč</div>
              <input
                className='weekItemInput'
                type='number'
                onChange={onChange}
                id='no1'
                value={no1}
                min='0'
              />
            </li>
            <li className='weekItem'>
              <div className='weekItemText'>2. {no2Name}</div>
              <div className='weekItemPrice'>{priceNo2},- Kč</div>
              <input
                className='weekItemInput'
                type='number'
                onChange={onChange}
                id='no2'
                value={no2}
              />
            </li>
            <li className='weekItem'>
              <div className='weekItemText'>3. {no3Name}</div>
              <div className='weekItemPrice'>{priceNo3},- Kč</div>
              <input
                className='weekItemInput'
                type='number'
                onChange={onChange}
                id='no3'
                value={no3}
              />
            </li>
            <li className='weekItem'>
              <div className='weekItemText'>4. {no4Name}</div>
              <div className='weekItemPrice'>{priceNo4},- Kč</div>
              <input
                className='weekItemInput'
                type='number'
                onChange={onChange}
                id='no4'
                value={no4}
              />
            </li>
            <li className='weekItem'>
              <div className='weekItemText'>5. {no5Name}</div>
              <div className='weekItemPrice'>{priceNo5},- Kč</div>
              <input
                className='weekItemInput'
                type='number'
                onChange={onChange}
                id='no5'
                value={no5}
              />
            </li>
            <li className='weekItem'>
              <div className='weekItemText'>6. {no6Name}</div>
              <div className='weekItemPrice'>{priceNo6},- Kč</div>
              <input
                className='weekItemInput'
                type='number'
                onChange={onChange}
                id='no6'
                value={no6}
              />
            </li>
          </ol>
          <div className='signInBar'>
            <p className='signInText'>Send order</p>
            <button className='signInButton'>
              <ArrowRightIcon fill='#fff' width='34px' height='34px' />
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default WeekDayOrder;
