import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../../..";
import { activeNuv } from "../services/burger-ingredients";
import style from "./nav-buttons.module.css";

export default function NavButtons() {
  const dispatch = useAppDispatch();

  const [current, setCurrent] = React.useState("bun");

  const active = useAppSelector(state => state.ingredients.activeTab);

  React.useEffect(() => {
    dispatch(activeNuv(current));
  }, [current]);

  React.useEffect(() => {
    setCurrent(active);
  }, [active]);

  return (
    <div className={style.mainBox}>
      <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}
