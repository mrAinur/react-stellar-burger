import Header from "../app-header/header";
import GetBurger from "../../pages/constructore/get-burger/get-burger";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  OnlyAuth,
  OnlyUnAuth,
} from "../protected-route-element/protected-route-element";
import Login from "../../pages/login/login";
import Registration from "../../pages/registration/registration";
import Profile from "../../pages/profile/profile";
import Feed from "../../pages/feeds/feed";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Orders from "../../pages/orders/orders";
import { useAppDispatch } from "../..";
import { useEffect } from "react";
import { checkUserAuth } from "../../utils/workWithApi";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { getIngredientsInfo } from "../../pages/constructore/burger-ingredients/services/burger-ingredients";
import OrderDetails from "../order-details/order-details";

function App() {
  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredientsInfo());
  }, []);

  const background: string = location.state && location.state.background;

  const handleModalClose = () => navigate(-1);

  return (
    <>
      <Header />
      <main>
        <Routes location={background || location}>
          <Route path="/" element={<GetBurger />} />
          <Route
            path="/ingredients/:ingredientId"
            element={<IngredientDetails />}
          />
          <Route path="/feed" element={<Feed />} />
          <Route
            path="/feed/:orderNum"
            element={<OrderDetails status="public" />}
          />
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route
            path="/registration"
            element={<OnlyUnAuth component={<Registration />} />}
          />
          <Route
            path="/forgot-password"
            element={<OnlyUnAuth component={<ForgotPassword />} />}
          />
          <Route
            path="/reset-password"
            element={<OnlyUnAuth component={<ResetPassword />} />}
          />
          <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
            <Route
              path="orders"
              element={<OnlyAuth component={<Orders />} />}
            />
            <Route path="exit" element={<OnlyAuth component={<Profile />} />} />
          </Route>
          <Route
            path="/profile/orders/:orderNum"
            element={<OnlyAuth component={<OrderDetails status="private" />} />}
          />
        </Routes>
      </main>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          ></Route>
        </Routes>
      )}

      {background && (
        <Routes>
          <Route
            path="/feed/:orderNum"
            element={
              <Modal onClose={handleModalClose}>
                <OrderDetails status="public" />
              </Modal>
            }
          ></Route>
        </Routes>
      )}

      {background && (
        <Routes>
          <Route
            path="/profile/orders/:orderNum"
            element={
              <Modal onClose={handleModalClose}>
                <OrderDetails status="private" />
              </Modal>
            }
          ></Route>
        </Routes>
      )}
    </>
  );
}

export default App;
