import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("E-mail odeslán!");
    } catch (error) {
      toast.error("Nelze odeslat e-mail!");
    }
  };
  return (
    <div className='pageContainer'>
      <header className='signInHeader'>
        <p className='pageHeader'>Objednávky obědů</p>
      </header>

      <main>
        <div className='loginBox'>
          <p className='pageHeader'>Zapomenuté heslo</p>
          <form onSubmit={onSubmit}>
            <input
              type='email'
              className='emailInput'
              placeholder='Email'
              id='email'
              value={email}
              onChange={onChange}
            />

            <div className='weekDayButtonBox'>
              <button className='weekDayButton'>
                Poslat odkaz na reset hesla
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>
        </div>

        <div className='loginBox'>
          <Link className='forgotPasswordLink' to='/sign-in'>
            Přihlásit se
          </Link>
        </div>
      </main>
    </div>
  );
}

export default ForgotPassword;
