import Header from "../app-header/header";
import GetBurger from "../pages/constructore/get-burger/get-burger";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from "../protected-route-element/protected-route-element";
import Login from "../pages/login/login";
import Registration from "../pages/registration/registration";
import Profile from "../pages/profile/profile";
import Feed from "../pages/feeds/feed";
import ForgotPassword from "../pages/forgot-password/forgot-password";
import ResetPassword from "../pages/reset-password/reset-password";
import Orders from "../pages/orders/orders";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUserAuth } from "../../utils/workWithApi";
import { accessToken } from "../../utils/constants";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth(localStorage.getItem(accessToken)))
  }, [])

  return (
    <>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<GetBurger />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
            <Route path="/registration" element={<OnlyUnAuth component={<Registration />} />} />
            <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
            <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
            <Route path="/profile" element={<OnlyAuth component={<Profile />} />} >
              <Route path="orders" element={<OnlyAuth component={<Orders />} />} />
              <Route path="exit" element={<OnlyAuth component={<Profile />} />} />
            </Route>
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;