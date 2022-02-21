import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as InvoiceIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as OrderIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as ProfileIcon } from "../assets/svg/personOutlineIcon.svg";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route == location.pathname) {
      return true;
    }
  };
  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          <li className='navbarListItem' onClick={() => navigate("/")}>
            <OrderIcon
              fill={pathMatchRoute("/") ? "#2c2c2c" : "#8f8f8f"}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute("/")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Order
            </p>
          </li>
          <li className='navbarListItem' onClick={() => navigate("/invoices")}>
            <InvoiceIcon
              fill={pathMatchRoute("/invoices") ? "#2c2c2c" : "#8f8f8f"}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute("/invoices")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Invoices
            </p>
          </li>
          <li className='navbarListItem' onClick={() => navigate("/profile")}>
            <ProfileIcon
              fill={pathMatchRoute("/profile") ? "#2c2c2c" : "#8f8f8f"}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute("/profile")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
