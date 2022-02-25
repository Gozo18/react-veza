import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

function Profile() {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        const userInfo = docSnap.data();

        setUser(userInfo);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch user!");
      }
    };

    fetchUser();
  }, [auth.currentUser.uid]);

  const onLogout = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        name: user.name,
        street: user.street,
        town: user.town,
        psc: user.psc,
        phone: user.phone,
      });
      toast.success("Profile updated");
    } catch (error) {
      toast.error("Could not update profile");
    }
  };

  const onChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' className='logOut' onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className='profileBox'>
          <h4>Personal Details</h4>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              id='name'
              value={user.name}
              onChange={onChange}
              placeholder='Name'
            />
            <input
              type='text'
              id='street'
              value={user.street}
              onChange={onChange}
            />
            <input
              type='text'
              id='town'
              value={user.town}
              onChange={onChange}
            />
            <input type='text' id='psc' value={user.psc} onChange={onChange} />
            <input
              type='text'
              id='phone'
              value={user.phone}
              onChange={onChange}
            />
            <div className='weekDayButtonBox'>
              <button className='weekDayButton'>
                Update profile
                <ArrowRightIcon fill='#fff' width='34px' height='34px' />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
