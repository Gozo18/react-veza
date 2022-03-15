import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibility.svg";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    street: "",
    town: "",
    psc: "",
    phone: "",
    userRef: "",
  });
  const { name, street, town, psc, phone, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      formDataCopy.userRef = user.uid;
      formDataCopy.admin = false;

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/weak-password") {
        toast.error("Heslo musí mít minimálně 6 znaků!");
      } else {
        toast.error("Něco se pokazilo!");
      }
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <header className='regHeader'>
          <p className='pageHeader'>Objednávky obědů</p>
        </header>

        <main>
          <div className='loginBox'>
            <p className='pageHeader'>Registrace</p>
            <form onSubmit={onSubmit}>
              <input
                type='text'
                className='nameInput'
                placeholder='Jméno a Příjmení'
                id='name'
                value={name}
                onChange={onChange}
              />
              <input
                type='text'
                className='streetInput'
                placeholder='Ulice'
                id='street'
                value={street}
                onChange={onChange}
              />
              <input
                type='text'
                className='townInput'
                placeholder='Město'
                id='town'
                value={town}
                onChange={onChange}
              />
              <input
                type='number'
                className='pscInput'
                placeholder='PSČ - formát 12345'
                id='psc'
                value={psc}
                onChange={onChange}
                onInput={(e) => (e.target.value = e.target.value.slice(0, 5))}
              />
              <input
                type='number'
                className='phoneInput'
                placeholder='Telefon - formát 602123456'
                id='phone'
                value={phone}
                onChange={onChange}
                onInput={(e) => (e.target.value = e.target.value.slice(0, 9))}
              />
              <input
                type='email'
                className='emailInput'
                placeholder='E-mail'
                id='email'
                value={email}
                onChange={onChange}
              />

              <div className='passwordInputDiv'>
                <input
                  type={showPassword ? "text" : "password"}
                  className='passwordInput'
                  placeholder='Heslo'
                  id='password'
                  value={password}
                  onChange={onChange}
                />

                <img
                  src={visibilityIcon}
                  alt='show password'
                  className='showPassword'
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              </div>

              <div className='weekDayButtonBox'>
                <button className='weekDayButton'>
                  Zaregistrovat
                  <ArrowRightIcon fill='#fff' width='34px' height='34px' />
                </button>
              </div>
            </form>
          </div>

          <div className='loginBox'>
            <Link to='/sign-in' className='registerLink'>
              Přihlásit se
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

export default SignUp;
