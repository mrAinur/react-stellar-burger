import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructore.module.css';
import OrderInfo from './order-info/order-info';
import React, { useContext } from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from "react-dnd";
import { addBun, addMain, deleteIngredient } from "./services/burger-ingredients";
import { ConstructorInfo } from '../context/context';

function reducer(state, action){
  switch(action.type){
    case "main": return {
      ...state,
      allProducts: [...state.allProducts, action.payload.card],
      main: [...state.main, action.payload.card],
      fullPrice: state.fullPrice += action.payload.card.price
    }
    case "sauce": return {
      ...state,
      allProducts: [...state.allProducts, action.payload.card],
      main: [...state.main, action.payload.card],
      fullPrice: state.fullPrice += action.payload.card.price
    }
    case "bun": return {
      ...state,
      bun: action.payload.card,
      fullPrice: state.fullPrice += action.payload.card.price*2
    }
    default: console.log(`Ошибка типа данных ${action.payload}`)
  }
}

export default function BurgerIngredients(props) {

  const initialState = useContext(ConstructorInfo);

  const [info, dispatch] = React.useReducer(reducer, initialState);

  // const { bun, main } = useSelector(state => ({
  //   bun: state.order.bun,
  //   main: state.order.main,
  // }))

  // const dispatch = useDispatch()

  const onDropHandler = (item) => {
    // switch (item.card.type) {
    //   case "main":
    //     return dispatch(addMain(item.card));
    //   case "sauce":
    //     return dispatch(addMain(item.card));
    //   case "bun":
    //     return dispatch(addBun(item.card));
    //   default: console.log(`Ошибка данных ${item}`)
    // }
    switch (item.card.type) {
      case "main":
        return dispatch({
          type: "main",
          payload: item
        });
      case "sauce":
        return dispatch({
          type: "main",
          payload: item
        });
      case "bun":
        return dispatch({
          type: "bun",
          payload: item
        });
      default: console.log(`Ошибка данных ${item}`)
    }
  }

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
  });

  const [state, setState] = React.useState();

  const onClose = () => {
    setState(false)
  }

  const onOpen = (item) => {
    setState(true)
  }

  const mainIngredients = (items) => {
    return items.map((item, itemIndex) => {
      return (
        <>
          <DragIcon type="primary" key={itemIndex} />
          <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            key={itemIndex}
          />
        </>
      )
    })
  }

  return (
    <article className={` ${style.ingredientsInfo} mt-25 ml-5`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }} ref={dropTarget}>
        <>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${info.bun.name} (верх)`}
            price={info.bun.price}
            thumbnail={info.bun.image}
          />
          <div className={style.scrollBox}>
            {
              mainIngredients(info.main)
            }
          </div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${info.bun.name} (низ)`}
            price={info.bun.price}
            thumbnail={info.bun.image}
          />
        </>
      </div>
      <OrderInfo onOpen={onOpen} />
      {state &&
        <Modal onClose={onClose}>
          <OrderDetails onClose={onClose} />
        </Modal>}
    </article>
  )
}