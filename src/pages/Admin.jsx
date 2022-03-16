import { useState, useEffect } from "react";
import { doc, getDoc, Timestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

function Admin() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [weekOffer, setWeekOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    const fetchWeek = async () => {
      const docRef = doc(db, "weekOffer", "YwOhkLKiCKTXkgJbQZXV");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const weekData = docSnap.data();
        setWeekOffer(weekData);
        setLoading(false);
      } else {
        toast.error("Nemohu načíst data!");
      }
    };

    fetchWeek();
    fetchUser();
    setLoading(false);
  }, [auth.currentUser.uid, navigate, user.admin]);

  const onChange = (e) => {
    setWeekOffer((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onChangeDate = (e) => {
    setWeekOffer((prevState) => ({
      ...prevState,
      [e.target.id]: Timestamp.fromDate(new Date(e.target.value)),
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await setDoc(doc(db, "weekOffer", "YwOhkLKiCKTXkgJbQZXV"), {
        DateMo: weekOffer.DateMo,
        DateTu: weekOffer.DateTu,
        DateWe: weekOffer.DateWe,
        DateTh: weekOffer.DateTh,
        DateFr: weekOffer.DateFr,
        DateSa: weekOffer.DateSa,
        DateSu: weekOffer.DateSu,
        MoSoup: weekOffer.MoSoup,
        Mo1: weekOffer.Mo1,
        Mo2: weekOffer.Mo2,
        Mo3: weekOffer.Mo3,
        Mo4: weekOffer.Mo4,
        Mo5: weekOffer.Mo5,
        Mo6: weekOffer.Mo6,
        priceMo1: weekOffer.priceMo1,
        priceMo2: weekOffer.priceMo2,
        priceMo3: weekOffer.priceMo3,
        priceMo4: weekOffer.priceMo4,
        priceMo5: weekOffer.priceMo5,
        priceMo6: weekOffer.priceMo6,
        TuSoup: weekOffer.TuSoup,
        Tu1: weekOffer.Tu1,
        Tu2: weekOffer.Tu2,
        Tu3: weekOffer.Tu3,
        Tu4: weekOffer.Tu4,
        Tu5: weekOffer.Tu5,
        Tu6: weekOffer.Tu6,
        priceTu1: weekOffer.priceTu1,
        priceTu2: weekOffer.priceTu2,
        priceTu3: weekOffer.priceTu3,
        priceTu4: weekOffer.priceTu4,
        priceTu5: weekOffer.priceTu5,
        priceTu6: weekOffer.priceTu6,
        WeSoup: weekOffer.WeSoup,
        We1: weekOffer.We1,
        We2: weekOffer.We2,
        We3: weekOffer.We3,
        We4: weekOffer.We4,
        We5: weekOffer.We5,
        We6: weekOffer.We6,
        priceWe1: weekOffer.priceWe1,
        priceWe2: weekOffer.priceWe2,
        priceWe3: weekOffer.priceWe3,
        priceWe4: weekOffer.priceWe4,
        priceWe5: weekOffer.priceWe5,
        priceWe6: weekOffer.priceWe6,
        ThSoup: weekOffer.ThSoup,
        Th1: weekOffer.Th1,
        Th2: weekOffer.Th2,
        Th3: weekOffer.Th3,
        Th4: weekOffer.Th4,
        Th5: weekOffer.Th5,
        Th6: weekOffer.Th6,
        priceTh1: weekOffer.priceTh1,
        priceTh2: weekOffer.priceTh2,
        priceTh3: weekOffer.priceTh3,
        priceTh4: weekOffer.priceTh4,
        priceTh5: weekOffer.priceTh5,
        priceTh6: weekOffer.priceTh6,
        FrSoup: weekOffer.FrSoup,
        Fr1: weekOffer.Fr1,
        Fr2: weekOffer.Fr2,
        Fr3: weekOffer.Fr3,
        Fr4: weekOffer.Fr4,
        Fr5: weekOffer.Fr5,
        Fr6: weekOffer.Fr6,
        priceFr1: weekOffer.priceFr1,
        priceFr2: weekOffer.priceFr2,
        priceFr3: weekOffer.priceFr3,
        priceFr4: weekOffer.priceFr4,
        priceFr5: weekOffer.priceFr5,
        priceFr6: weekOffer.priceFr6,
        SaSoup: weekOffer.SaSoup,
        Sa1: weekOffer.Sa1,
        Sa2: weekOffer.Sa2,
        Sa3: weekOffer.Sa3,
        Sa4: weekOffer.Sa4,
        Sa5: weekOffer.Sa5,
        Sa6: weekOffer.Sa6,
        priceSa1: weekOffer.priceSa1,
        priceSa2: weekOffer.priceSa2,
        priceSa3: weekOffer.priceSa3,
        priceSa4: weekOffer.priceSa4,
        priceSa5: weekOffer.priceSa5,
        priceSa6: weekOffer.priceSa6,
        SuSoup: weekOffer.SuSoup,
        Su1: weekOffer.Su1,
        Su2: weekOffer.Su2,
        Su3: weekOffer.Su3,
        Su4: weekOffer.Su4,
        Su5: weekOffer.Su5,
        Su6: weekOffer.Su6,
        priceSu1: weekOffer.priceSu1,
        priceSu2: weekOffer.priceSu2,
        priceSu3: weekOffer.priceSu3,
        priceSu4: weekOffer.priceSu4,
        priceSu5: weekOffer.priceSu5,
        priceSu6: weekOffer.priceSu6,
      });
      toast.success("Týdenní nabídka změněna!");
    } catch (error) {
      toast.error("Nelze změnit týdenní nabídku!");
    }
  };

  /* console.log(weekOffer); */

  if (loading) {
    return <Spinner />;
  }

  if (weekOffer !== null) {
    const {
      DateMo,
      DateTu,
      DateWe,
      DateTh,
      DateFr,
      DateSa,
      DateSu,
      MoSoup,
      Mo1,
      Mo2,
      Mo3,
      Mo4,
      Mo5,
      Mo6,
      priceMo1,
      priceMo2,
      priceMo3,
      priceMo4,
      priceMo5,
      priceMo6,
      TuSoup,
      Tu1,
      Tu2,
      Tu3,
      Tu4,
      Tu5,
      Tu6,
      priceTu1,
      priceTu2,
      priceTu3,
      priceTu4,
      priceTu5,
      priceTu6,
      WeSoup,
      We1,
      We2,
      We3,
      We4,
      We5,
      We6,
      priceWe1,
      priceWe2,
      priceWe3,
      priceWe4,
      priceWe5,
      priceWe6,
      ThSoup,
      Th1,
      Th2,
      Th3,
      Th4,
      Th5,
      Th6,
      priceTh1,
      priceTh2,
      priceTh3,
      priceTh4,
      priceTh5,
      priceTh6,
      FrSoup,
      Fr1,
      Fr2,
      Fr3,
      Fr4,
      Fr5,
      Fr6,
      priceFr1,
      priceFr2,
      priceFr3,
      priceFr4,
      priceFr5,
      priceFr6,
      SaSoup,
      Sa1,
      Sa2,
      Sa3,
      Sa4,
      Sa5,
      Sa6,
      priceSa1,
      priceSa2,
      priceSa3,
      priceSa4,
      priceSa5,
      priceSa6,
      SuSoup,
      Su1,
      Su2,
      Su3,
      Su4,
      Su5,
      Su6,
      priceSu1,
      priceSu2,
      priceSu3,
      priceSu4,
      priceSu5,
      priceSu6,
    } = weekOffer;

    const timestampMo = DateMo.toDate();
    const timestampTu = DateTu.toDate();
    const timestampWe = DateWe.toDate();
    const timestampTh = DateTh.toDate();
    const timestampFr = DateFr.toDate();
    const timestampSa = DateSa.toDate();
    const timestampSo = DateSu.toDate();

    const month = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];

    const day = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
    ];

    const moDate =
      timestampMo.getFullYear() +
      "-" +
      month[timestampMo.getMonth()] +
      "-" +
      day[timestampMo.getDate() - 1];
    const tuDate =
      timestampTu.getFullYear() +
      "-" +
      month[timestampTu.getMonth()] +
      "-" +
      day[timestampTu.getDate() - 1];
    const weDate =
      timestampWe.getFullYear() +
      "-" +
      month[timestampWe.getMonth()] +
      "-" +
      day[timestampWe.getDate() - 1];
    const thDate =
      timestampTh.getFullYear() +
      "-" +
      month[timestampTh.getMonth()] +
      "-" +
      day[timestampTh.getDate() - 1];
    const frDate =
      timestampFr.getFullYear() +
      "-" +
      month[timestampFr.getMonth()] +
      "-" +
      day[timestampFr.getDate() - 1];
    const saDate =
      timestampSa.getFullYear() +
      "-" +
      month[timestampSa.getMonth()] +
      "-" +
      day[timestampSa.getDate() - 1];
    const suDate =
      timestampSo.getFullYear() +
      "-" +
      month[timestampSo.getMonth()] +
      "-" +
      day[timestampSo.getDate() - 1];

    return (
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Týdenní nabídka</p>
        </header>

        <main>
          <div className='adminBox'>
            <form onSubmit={onSubmit}>
              <div className='weekOfferBox'>
                <div className='weekOfferDay'>Pondělí</div>
                <input
                  type='date'
                  id='DateMo'
                  value={moDate}
                  onChange={onChangeDate}
                  className='weekOfferDate'
                />
                <input
                  type='text'
                  id='MoSoup'
                  value={MoSoup}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='text'
                  id='Mo1'
                  value={Mo1}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceMo1'
                  value={priceMo1}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Mo2'
                  value={Mo2}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceMo2'
                  value={priceMo2}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Mo3'
                  value={Mo3}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceMo3'
                  value={priceMo3}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Mo4'
                  value={Mo4}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceMo4'
                  value={priceMo4}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Mo5'
                  value={Mo5}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceMo5'
                  value={priceMo5}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Mo6'
                  value={Mo6}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceMo6'
                  value={priceMo6}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
              </div>
              <div className='weekOfferBox'>
                <div className='weekOfferDay'>Úterý</div>
                <input
                  type='date'
                  id='DateTu'
                  value={tuDate}
                  onChange={onChangeDate}
                  className='weekOfferDate'
                />
                <input
                  type='text'
                  id='TuSoup'
                  value={TuSoup}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='text'
                  id='Tu1'
                  value={Tu1}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceTu1'
                  value={priceTu1}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Tu2'
                  value={Tu2}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceTu2'
                  value={priceTu2}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Tu3'
                  value={Tu3}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceTu3'
                  value={priceTu3}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Tu4'
                  value={Tu4}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceTu4'
                  value={priceTu4}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Tu5'
                  value={Tu5}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceTu5'
                  value={priceTu5}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Tu6'
                  value={Tu6}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceTu6'
                  value={priceTu6}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
              </div>
              <div className='weekOfferBox'>
                <div className='weekOfferDay'>Středa</div>
                <input
                  type='date'
                  id='DateWe'
                  value={weDate}
                  onChange={onChangeDate}
                  className='weekOfferDate'
                />
                <input
                  type='text'
                  id='WeSoup'
                  value={WeSoup}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='text'
                  id='We1'
                  value={We1}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceWe1'
                  value={priceWe1}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='We2'
                  value={We2}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceWe2'
                  value={priceWe2}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='We3'
                  value={We3}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceWe3'
                  value={priceWe3}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='We4'
                  value={We4}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceWe4'
                  value={priceWe4}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='We5'
                  value={We5}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceWe5'
                  value={priceWe5}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='We6'
                  value={We6}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceWe6'
                  value={priceWe6}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
              </div>
              <div className='weekOfferBox'>
                <div className='weekOfferDay'>Čtvrtek</div>
                <input
                  type='date'
                  id='DateTh'
                  value={thDate}
                  onChange={onChangeDate}
                  className='weekOfferDate'
                />
                <input
                  type='text'
                  id='ThSoup'
                  value={ThSoup}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='text'
                  id='Th1'
                  value={Th1}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceTh1'
                  value={priceTh1}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Th2'
                  value={Th2}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceTh2'
                  value={priceTh2}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Th3'
                  value={Th3}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceTh3'
                  value={priceTh3}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Th4'
                  value={Th4}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceTh4'
                  value={priceTh4}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Th5'
                  value={Th5}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceTh5'
                  value={priceTh5}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Th6'
                  value={Th6}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceTh6'
                  value={priceTh6}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
              </div>
              <div className='weekOfferBox'>
                <div className='weekOfferDay'>Pátek</div>
                <input
                  type='date'
                  id='DateFr'
                  value={frDate}
                  onChange={onChangeDate}
                  className='weekOfferDate'
                />
                <input
                  type='text'
                  id='FrSoup'
                  value={FrSoup}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='text'
                  id='Fr1'
                  value={Fr1}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceFr1'
                  value={priceFr1}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Fr2'
                  value={Fr2}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceFr2'
                  value={priceFr2}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Fr3'
                  value={Fr3}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceFr3'
                  value={priceFr3}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Fr4'
                  value={Fr4}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceFr4'
                  value={priceFr4}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Fr5'
                  value={Fr5}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceFr5'
                  value={priceFr5}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Fr6'
                  value={Fr6}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceFr6'
                  value={priceFr6}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
              </div>
              <div className='weekOfferBox'>
                <div className='weekOfferDay'>Sobota</div>
                <input
                  type='date'
                  id='DateSa'
                  value={saDate}
                  onChange={onChangeDate}
                  className='weekOfferDate'
                />
                <input
                  type='text'
                  id='SaSoup'
                  value={SaSoup}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='text'
                  id='Sa1'
                  value={Sa1}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceSa1'
                  value={priceSa1}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Sa2'
                  value={Sa2}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceSa2'
                  value={priceSa2}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Sa3'
                  value={Sa3}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceSa3'
                  value={priceSa3}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Sa4'
                  value={Sa4}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceSa4'
                  value={priceSa4}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Sa5'
                  value={Sa5}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceSa5'
                  value={priceSa5}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Sa6'
                  value={Sa6}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceSa6'
                  value={priceSa6}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
              </div>
              <div className='weekOfferBox'>
                <div className='weekOfferDay'>Neděle</div>
                <input
                  type='date'
                  id='DateSu'
                  value={suDate}
                  onChange={onChangeDate}
                  className='weekOfferDate'
                />
                <input
                  type='text'
                  id='SuSoup'
                  value={SuSoup}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='text'
                  id='Su1'
                  value={Su1}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceSu1'
                  value={priceSu1}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Su2'
                  value={Su2}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceSu2'
                  value={priceSu2}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Su3'
                  value={Su3}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceSu3'
                  value={priceSu3}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Su4'
                  value={Su4}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceSu4'
                  value={priceSu4}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Su5'
                  value={Su5}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceSu5'
                  value={priceSu5}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
                <input
                  type='text'
                  id='Su6'
                  value={Su6}
                  onChange={onChange}
                  className='weekOffer'
                />
                <input
                  type='number'
                  id='priceSu6'
                  value={priceSu6}
                  onChange={onChange}
                  className='weekOfferPrice'
                />
              </div>
              <div className='adminButtonBox'>
                <button className='weekDayButton'>
                  Upravit nabídku
                  <ArrowRightIcon fill='#fff' width='34px' height='34px' />
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Administrace</p>
        </header>

        <main>
          <p>Načítám...</p>
        </main>
      </div>
    );
  }
}

export default Admin;
