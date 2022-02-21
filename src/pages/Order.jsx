import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import WeekDayOrder from "../components/WeekDayOrder";

function Order() {
  const [weekOffer, setWeekOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMo, setViewMo] = useState(true);
  const [viewTu, setViewTu] = useState(false);

  useEffect(() => {
    const fetchWeek = async () => {
      const docRef = doc(db, "weekOffer", "YwOhkLKiCKTXkgJbQZXV");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const weekData = docSnap.data();
        setWeekOffer(weekData);
        setLoading(false);
      } else {
        toast.error("No such document!");
      }
    };

    fetchWeek();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const moDate = weekOffer.DateMo.toDate().toLocaleDateString();
  const tuDate = weekOffer.DateTu.toDate().toLocaleDateString();
  const weDate = weekOffer.DateWe.toDate().toLocaleDateString();
  const thDate = weekOffer.DateTh.toDate().toLocaleDateString();
  const frDate = weekOffer.DateFr.toDate().toLocaleDateString();
  const saDate = weekOffer.DateSa.toDate().toLocaleDateString();
  const suDate = weekOffer.DateSu.toDate().toLocaleDateString();

  /* console.log(weekOffer); */

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Week offer</p>
      </header>

      <main>
        <ul className='weekBox'>
          <li
            className='weekDay'
            onClick={() => {
              setViewMo((prevState) => !prevState);
            }}
          >
            <b>Monday {moDate}</b>
            {/*  {viewMo ? ( */}
            <WeekDayOrder
              dayDate={weekOffer.DateMo}
              no1Name={weekOffer.Mo1}
              no2Name={weekOffer.Mo2}
              no3Name={weekOffer.Mo3}
              no4Name={weekOffer.Mo4}
              no5Name={weekOffer.Mo5}
              no6Name={weekOffer.Mo6}
              priceNo1={weekOffer.priceMo1}
              priceNo2={weekOffer.priceMo2}
              priceNo3={weekOffer.priceMo3}
              priceNo4={weekOffer.priceMo4}
              priceNo5={weekOffer.priceMo5}
              priceNo6={weekOffer.priceMo6}
              isOrdered={false}
            />
            {/*  ) : (
              ""
            )} */}
          </li>
          <li
            className='weekDay'
            onClick={() => {
              setViewTu((prevState) => !prevState);
            }}
          >
            <b>Tuesday {tuDate}</b>
            {/* {viewTu ? ( */}
            <WeekDayOrder
              dayDate={weekOffer.DateTu}
              no1Name={weekOffer.Tu1}
              no2Name={weekOffer.Tu2}
              no3Name={weekOffer.Tu3}
              no4Name={weekOffer.Tu4}
              no5Name={weekOffer.Tu5}
              no6Name={weekOffer.Tu6}
              priceNo1={weekOffer.priceTu1}
              priceNo2={weekOffer.priceTu2}
              priceNo3={weekOffer.priceTu3}
              priceNo4={weekOffer.priceTu4}
              priceNo5={weekOffer.priceTu5}
              priceNo6={weekOffer.priceTu6}
              isOrdered={false}
            />
            {/* ) : (
              ""
            )} */}
          </li>
          <li className='weekDay'>
            <b>Wednesday {weDate}</b>
            {/* {viewTu ? ( */}
            <WeekDayOrder
              dayDate={weekOffer.DateWe}
              no1Name={weekOffer.We1}
              no2Name={weekOffer.We2}
              no3Name={weekOffer.We3}
              no4Name={weekOffer.We4}
              no5Name={weekOffer.We5}
              no6Name={weekOffer.We6}
              priceNo1={weekOffer.priceWe1}
              priceNo2={weekOffer.priceWe2}
              priceNo3={weekOffer.priceWe3}
              priceNo4={weekOffer.priceWe4}
              priceNo5={weekOffer.priceWe5}
              priceNo6={weekOffer.priceWe6}
              isOrdered={false}
            />
            {/* ) : (
              ""
            )} */}
          </li>
        </ul>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </main>
    </div>
  );
}

export default Order;
