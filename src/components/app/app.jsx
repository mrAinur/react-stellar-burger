import Header from "../app-header/header";
import GetBurger from "../pages/constructore/get-burger/get-burger";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

function App() {

  const navigate = useNavigate()

  const location = useLocation()

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth(localStorage.getItem(accessToken)))
  }, [])

  const background = location.state && location.state.background;

  const handleModalClose = () => navigate(-1);

  return (
    <>
      <Router>
        <Header />
        <main>
          <Routes location={background || location}>
            <Route path="/" element={<GetBurger />} />
            <Route path="/ingredients/:ingredientId" element={<IngredientDetails />} />
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
        {background && <Routes>
          <Route path="/ingredients/:ingredientId" element={
            <Modal onClose={handleModalClose}>
              <IngredientDetails />
            </Modal>}>
          </Route>
        </Routes>}
      </Router>
    </>
  );
}

export default App;