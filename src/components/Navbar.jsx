import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as InvoiceIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as OrderIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as ProfileIcon } from "../assets/svg/personOutlineIcon.svg";
import { ReactComponent as UsersIcon } from "../assets/svg/badgeIcon.svg";
import { ReactComponent as PscIcon } from "../assets/svg/pscIcon.svg";
import { ReactComponent as BackIcon } from "../assets/svg/homeIcon.svg";
import { ReactComponent as CalendarIcon } from "../assets/svg/calendarIcon.svg";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  if (
    location.pathname === "/admin" ||
    location.pathname === "/users" ||
    location.pathname === "/delivery" ||
    location.pathname === "/calendar"
  ) {
    return (
      <footer className='navbar'>
        <nav className='navbarNav'>
          <ul className='navbarListItems'>
            <li className='navbarListItem' onClick={() => navigate("/users")}>
              <UsersIcon
                fill={pathMatchRoute("/users") ? "#2c2c2c" : "#8f8f8f"}
                width='36px'
                height='36px'
              />
              <p
                className={
                  pathMatchRoute("/users")
                    ? "navbarListItemNameActive"
                    : "navbarListItemName"
                }
              >
                Users
              </p>
            </li>
            <li
              className='navbarListItem'
              onClick={() => navigate("/delivery")}
            >
              <PscIcon
                fill={pathMatchRoute("/delivery") ? "#2c2c2c" : "#8f8f8f"}
                width='36px'
                height='36px'
              />
              <p
                className={
                  pathMatchRoute("/delivery")
                    ? "navbarListItemNameActive"
                    : "navbarListItemName"
                }
              >
                Delivery
              </p>
            </li>
            <li
              className='navbarListItem'
              onClick={() => navigate("/calendar")}
            >
              <CalendarIcon
                fill={pathMatchRoute("/calendar") ? "#2c2c2c" : "#8f8f8f"}
                width='36px'
                height='36px'
              />
              <p
                className={
                  pathMatchRoute("/calendar")
                    ? "navbarListItemNameActive"
                    : "navbarListItemName"
                }
              >
                Calendar
              </p>
            </li>
            <li className='navbarListItem' onClick={() => navigate("/profile")}>
              <BackIcon
                fill={pathMatchRoute("/admin") ? "#2c2c2c" : "#8f8f8f"}
                width='36px'
                height='36px'
              />
              <p
                className={
                  pathMatchRoute("/admin")
                    ? "navbarListItemNameActive"
                    : "navbarListItemName"
                }
              >
                Back
              </p>
            </li>
          </ul>
        </nav>
      </footer>
    );
  }

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
