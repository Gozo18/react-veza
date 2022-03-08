import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { isEqual } from "date-fns";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

function WeekDayOrder({
  daySoup,
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
  orderData,
}) {
  const auth = getAuth();
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
    orderData.map((order, i) => {
      if (isEqual(order.data.date.toDate(), dayDate.toDate())) {
        return setOrderMade(true);
      }
      return null;
    });
  }, [orderData, dayDate]);

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
      /* toast.success("Oder made"); */
      setOrderMade(true);
      window.location.reload();
    } catch (error) {
      toast.error("Něco se pokazilo!");
    }
  };

  const itemMinus = (e) => {
    const Nu = e.target.getAttribute("data-item");

    const result = formData[Nu];

    if (result === 0) {
      return null;
    }
    setFormData((prevState) => ({
      ...prevState,
      [e.target.getAttribute("data-item")]: result - 1,
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

  const itemPlus = (e) => {
    const Nu = e.target.getAttribute("data-item");

    const result = formData[Nu];

    setFormData((prevState) => ({
      ...prevState,
      [e.target.getAttribute("data-item")]: result + 1,
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

  return (
    <>
      {orderMade ? (
        <p>Objednáno</p>
      ) : (
        <form onSubmit={onSubmit}>
          <ol className='dayList'>
            <li className='weekItem'>
              <div className='weekItemText'>Polévka: {daySoup}</div>
            </li>
            <li className='weekItem'>
              <div className='weekItemText'>1. {no1Name}</div>
              <div className='weekItemPrice'>{priceNo1},- Kč</div>
              <div className='weekItemInput'>
                <div className='itemMinus' onClick={itemMinus} data-item='no1'>
                  -
                </div>
                <input
                  type='number'
                  onChange={onChange}
                  id='no1'
                  value={no1}
                  min='0'
                />
                <div className='itemPlus' onClick={itemPlus} data-item='no1'>
                  +
                </div>
              </div>
            </li>
            {no2Name !== "" ? (
              <li className='weekItem'>
                <div className='weekItemText'>2. {no2Name}</div>
                <div className='weekItemPrice'>{priceNo2},- Kč</div>
                <div className='weekItemInput'>
                  <div
                    className='itemMinus'
                    onClick={itemMinus}
                    data-item='no2'
                  >
                    -
                  </div>
                  <input
                    type='number'
                    onChange={onChange}
                    id='no2'
                    value={no2}
                    min='0'
                  />
                  <div className='itemPlus' onClick={itemPlus} data-item='no2'>
                    +
                  </div>
                </div>
              </li>
            ) : (
              <></>
            )}
            {no3Name !== "" ? (
              <li className='weekItem'>
                <div className='weekItemText'>3. {no3Name}</div>
                <div className='weekItemPrice'>{priceNo3},- Kč</div>
                <div className='weekItemInput'>
                  <div
                    className='itemMinus'
                    onClick={itemMinus}
                    data-item='no3'
                  >
                    -
                  </div>
                  <input
                    type='number'
                    onChange={onChange}
                    id='no3'
                    value={no3}
                    min='0'
                  />
                  <div className='itemPlus' onClick={itemPlus} data-item='no3'>
                    +
                  </div>
                </div>
              </li>
            ) : (
              <></>
            )}
            {no4Name !== "" ? (
              <li className='weekItem'>
                <div className='weekItemText'>4. {no4Name}</div>
                <div className='weekItemPrice'>{priceNo4},- Kč</div>
                <div className='weekItemInput'>
                  <div
                    className='itemMinus'
                    onClick={itemMinus}
                    data-item='no4'
                  >
                    -
                  </div>
                  <input
                    type='number'
                    onChange={onChange}
                    id='no4'
                    value={no4}
                    min='0'
                  />
                  <div className='itemPlus' onClick={itemPlus} data-item='no4'>
                    +
                  </div>
                </div>
              </li>
            ) : (
              <></>
            )}
            {no5Name !== "" ? (
              <li className='weekItem'>
                <div className='weekItemText'>5. {no5Name}</div>
                <div className='weekItemPrice'>{priceNo5},- Kč</div>
                <div className='weekItemInput'>
                  <div
                    className='itemMinus'
                    onClick={itemMinus}
                    data-item='no5'
                  >
                    -
                  </div>
                  <input
                    type='number'
                    onChange={onChange}
                    id='no5'
                    value={no5}
                    min='0'
                  />
                  <div className='itemPlus' onClick={itemPlus} data-item='no5'>
                    +
                  </div>
                </div>
              </li>
            ) : (
              <></>
            )}
            {no6Name !== "" ? (
              <li className='weekItem'>
                <div className='weekItemText'>6. {no6Name}</div>
                <div className='weekItemPrice'>{priceNo6},- Kč</div>
                <div className='weekItemInput'>
                  <div
                    className='itemMinus'
                    onClick={itemMinus}
                    data-item='no6'
                  >
                    -
                  </div>
                  <input
                    type='number'
                    onChange={onChange}
                    id='no6'
                    value={no6}
                    min='0'
                  />
                  <div className='itemPlus' onClick={itemPlus} data-item='no6'>
                    +
                  </div>
                </div>
              </li>
            ) : (
              <></>
            )}
          </ol>
          <div className='weekDayButtonBox'>
            <button className='weekDayButton'>
              Odeslat objednávku
              <ArrowRightIcon fill='#fff' width='34px' height='34px' />
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default WeekDayOrder;
