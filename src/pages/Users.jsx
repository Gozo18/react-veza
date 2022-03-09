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
import UserDataSearch from "../components/UserDataSearch";

function Users() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const undataUsers = [];
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

  function compare(a, b) {
    if (a.data.name < b.data.name) {
      return -1;
    }
    if (a.data.name > b.data.name) {
      return 1;
    }
    return 0;
  }

  users.sort(compare);

  users.map((user) => {
    undataUsers.push(user.data);
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Zákazníci</p>
      </header>

      <main>
        <div className='userBox'>Počet zákazníků: {numUs}</div>
        <UserDataSearch users={undataUsers} />
      </main>
    </div>
  );
}

export default Users;
