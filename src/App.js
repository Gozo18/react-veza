import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Invoices from "./pages/Invoices";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import CalendarDays from "./pages/CalendarDays";
import Delivery from "./pages/Delivery";
import Users from "./pages/Users";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase.config";

function App() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "order"), where("date", "!=", null));

        const orderInfo = [];

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          return orderInfo.push({
            data: doc.data(),
          });
        });
        setOrders(orderInfo);
      } catch (error) {
        toast.error("Nemohu načíst data!");
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/' element={<Order orders={orders} />} />
          </Route>
          <Route path='/invoices' element={<PrivateRoute />}>
            <Route path='/invoices' element={<Invoices orders={orders} />} />
          </Route>
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/admin' element={<PrivateRoute />}>
            <Route path='/admin' element={<Admin orders={orders} />} />
          </Route>
          <Route path='/calendar' element={<PrivateRoute />}>
            <Route
              path='/calendar'
              element={<CalendarDays orders={orders} />}
            />
          </Route>
          <Route path='/delivery' element={<PrivateRoute />}>
            <Route path='/delivery' element={<Delivery orders={orders} />} />
          </Route>
          <Route path='/users' element={<PrivateRoute />}>
            <Route path='/users' element={<Users />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
