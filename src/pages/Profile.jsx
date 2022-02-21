import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Profile() {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      const usersRef = collection(db, "users");

      console.log(usersRef);

      const q = query(usersRef, where("userRef", "==", auth.currentUser.uid));

      console.log(q);

      const querySnap = await getDocs(q);

      console.log(querySnap);

      let userInfo = [];

      querySnap.forEach((doc) => {
        return userInfo.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      console.log(userInfo);

      setUser(userInfo);
      setLoading(false);
    };

    fetchUser();
  }, [auth.currentUser.uid]);

  console.log(user);

  const onLogout = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error("Could not update profile details");
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' className='logOut' onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "Done" : "Change"}
          </p>
        </div>

        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
