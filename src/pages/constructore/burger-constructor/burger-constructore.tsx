import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructore.module.css";
import OrderInfo from "./order-info/order-info";
import { useCallback } from "react";
import Modal from "../../../components/modal/modal";
import OrderDetails from "../../../components/order-num/order-num";
import { useAppDispatch, useAppSelector } from "../../..";
import { useDrop } from "react-dnd";
import {
  addBun,
  addMain,
  replaceIngredient,
} from "./services/burger-ingredients";
import { v4 as uuidv4 } from "uuid";
import MainIngredient from "./main-ingredient/main-ingredient";
import { useModal } from "../../../hooks/useModal";
import { Ingredient } from "../../../utils/types";

export default function BurgerIngredients() {
  const { bun, main } = useAppSelector(state => ({
    bun: state.order.bun,
    main: state.order.main,
  }));

  const dispatch = useAppDispatch();

  const onDropHandler = (item: { card: Ingredient }) => {
    switch (item.card.type) {
      case "main":
        return dispatch(
          addMain({
            ingredient: item.card,
            id: uuidv4(),
          }),
        );
      case "sauce":
        return dispatch(
          addMain({
            ingredient: item.card,
            id: uuidv4(),
          }),
        );
      case "bun":
        return dispatch(
          addBun({
            bun: item.card,
            id: uuidv4(),
          }),
        );
      default:
        console.log(`Ошибка данных ${item}`);
    }
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: { card: Ingredient }) {
      onDropHandler(item);
    },
  });

  const { isModalOpen, openModal, closeModal } = useModal();

  const upBun = (items: Ingredient[]) => {
    return items.map(item => {
      return (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${item.name} (верх)`}
          price={item.price}
          thumbnail={item.image}
          key={item.id}
        />
      );
    });
  };

  const moveListItem = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch(
        replaceIngredient({ dragIndex: dragIndex, hoverIndex: hoverIndex }),
      );
    },
    [dispatch],
  );

  const mainIngredients = (items: Ingredient[]) => {
    return items.map((item, index) => {
      return (
        <MainIngredient
          item={item}
          index={index}
          moveListItem={moveListItem}
          key={item.id}
        />
      );
    });
  };

  const downBun = (items: Ingredient[]) => {
    return items.map(item => {
      return (
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${item.name} (низ)`}
          price={item.price}
          thumbnail={item.image}
          key={item.id}
        />
      );
    });
  };

  return (
    <>
      <article className={` ${style.ingredientsInfo} mt-25 ml-5`}>
        <div className={style.mainBox} ref={dropTarget}>
          {!bun.length && (
            <h2 className="text text_type_main-default pt-10 mb-6">
              Перенесите сюда желаемую булочку
            </h2>
          )}
          {bun.length !== 0 && upBun(bun)}
          {!main.length && (
            <h2 className="text text_type_main-default pt-10 mb-6">
              Перенесите сюда желаемый ингредиент
            </h2>
          )}
          {main && <ul className={style.scrollBox}>{mainIngredients(main)}</ul>}
          {!bun.length && (
            <h2 className="text text_type_main-default pt-10 mb-6">
              Перенесите сюда желаемую булочку
            </h2>
          )}
          {bun.length !== 0 && downBun(bun)}
        </div>
        <OrderInfo openModal={openModal} />
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <OrderDetails />
          </Modal>
        )}
      </article>
    </>
  );
}
