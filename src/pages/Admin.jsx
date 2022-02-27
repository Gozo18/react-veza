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

function Admin({ orders }) {
  const auth = getAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const numUs = users.length;

  const numOr = orders.length;

  const numArray = [];

  orders.map((order, i) => {
    numArray.push(
      Number(order.data.no1) +
        Number(order.data.no2) +
        Number(order.data.no3) +
        Number(order.data.no4) +
        Number(order.data.no5) +
        Number(order.data.no6)
    );

    return null;
  });

  const sum = numArray.reduce((partialSum, a) => partialSum + a, 0);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Admin</p>
      </header>

      <main>
        <div className='adminBox'>Number of orders: {numOr}</div>
        <div className='adminBox'>Number of unit orders: {sum}</div>
        <div className='adminBox'>Number of users: {numUs}</div>
      </main>
    </div>
  );
}

export default Admin;
