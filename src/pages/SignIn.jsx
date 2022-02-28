import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

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

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad User Credentials");
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <header className='signInHeader'>
          <p className='pageHeader'>Venuše Zaječí</p>
        </header>

        <main>
          <form onSubmit={onSubmit}>
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
                Přihlásit se
                <ArrowRightIcon fill='#fff' width='34px' height='34px' />
              </button>
            </div>
          </form>

          <Link to='/forgot-password' className='forgotPasswordLink'>
            Zapomenuté heslo
          </Link>
          <Link to='/sign-up' className='registerLink'>
            Registrovat
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignIn;
