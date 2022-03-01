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

function Users() {
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

  const numUs = users.length;

  if (loading) {
    return <Spinner />;
  }

  /* console.log(users); */

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Zákazníci</p>
      </header>

      <main>
        <div className='userBox'>Počet zákazníků: {numUs}</div>
        <div className='userBox'>
          <h4>List uživatelů</h4>
          {users.map((us, i) => {
            return (
              <div key={i} className='userItem'>
                <div className='userItemName'>{us.data.name}</div>
                <div className='userItemStreet'>{us.data.street}</div>
                <div className='userItemTown'>{us.data.town}</div>
                <div className='userItemPsc'>{us.data.psc}</div>
                <div className='userItemPhone'>tel.: {us.data.phone}</div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Users;
