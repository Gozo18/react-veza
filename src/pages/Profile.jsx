import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { Link, useNavigate } from "react-router-dom";
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
        toast.error("Nemohu načíst data!");
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
        admin: user.admin,
        userRef: user.userRef,
        email: user.email,
        timestamp: user.timestamp,
      });
      toast.success("Osobní údaje změněny!");
    } catch (error) {
      toast.error("Nelze změnit údaje!");
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
        <p className='pageHeader'>Můj profil</p>
      </header>
      <main>
        <div className='profileBox'>
          <h4>Osobní údaje</h4>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              id='name'
              value={user.name}
              onChange={onChange}
              placeholder='Name'
              className='nameInput'
            />
            <input
              type='text'
              id='street'
              value={user.street}
              onChange={onChange}
              className='streetInput'
            />
            <input
              type='text'
              id='town'
              value={user.town}
              onChange={onChange}
              className='townInput'
            />
            <input
              type='text'
              id='psc'
              value={user.psc}
              onChange={onChange}
              className='pscInput'
            />
            <input
              type='text'
              id='phone'
              value={user.phone}
              onChange={onChange}
              className='phoneInput profileBoxInput'
            />
            <div className='weekDayButtonBox'>
              <button className='weekDayButton'>
                Upravit profil
                <ArrowRightIcon fill='#fff' width='34px' height='34px' />
              </button>
            </div>
          </form>
        </div>
        {user.admin ? (
          <div className='adminLinkBox'>
            <Link to='/admin' className='adminLink'>
              Administrátorská sekce
              <ArrowRightIcon fill='#fff' width='34px' height='34px' />
            </Link>
          </div>
        ) : (
          <></>
        )}

        <div className='adminLinkBox'>
          <button type='button' className='logOut' onClick={onLogout}>
            Odhlásit se
          </button>
        </div>
      </main>
    </div>
  );
}

export default Profile;
