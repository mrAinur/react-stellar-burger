import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructore.module.css';
import OrderInfo from './order-info/order-info';
import React, { useCallback } from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from "react-dnd";
import { addBun, addMain, replaceIngredient } from "./services/burger-ingredients";
import { v4 as uuidv4 } from 'uuid';
import MainIngredient from './main-ingredient/main-ingredient';

export default function BurgerIngredients() {
  
  const { bun, main } = useSelector(state => ({
    bun: state.order.bun,
    main: state.order.main,
  }))

  const dispatch = useDispatch()

  const onDropHandler = (item) => {
    switch (item.card.type) {
      case "main":
        return dispatch(addMain({
          ingredient: item.card,
          id: uuidv4()
        }));
      case "sauce":
        return dispatch(addMain({
          ingredient: item.card,
          id: uuidv4()
        }));
      case "bun":
        return dispatch(addBun(item.card));
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

  const upBun = (items) => {
    return items.map(item => {
      return (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${item.name} (верх)`}
          price={item.price}
          thumbnail={item.image} />
      )
    })
  }

  const moveListItem = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch(replaceIngredient({dragIndex: dragIndex, hoverIndex: hoverIndex}))
    },
    [dispatch],
  )

  const mainIngredients = (items) => {
    return items.map((item, index) => {
      return (
        <MainIngredient item={item} index={index} moveListItem={moveListItem} />
      )
    })
  }

  const downBun = (items) => {
    return items.map(item => {
      return (
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${item.name} (низ)`}
          price={item.price}
          thumbnail={item.image} />
      )
    })
  }

  return (
    <>
      <article className={` ${style.ingredientsInfo} mt-25 ml-5`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }} ref={dropTarget}>
          {!bun.length && <h2 className='text text_type_main-default pt-10 mb-6'>Перенесите сюда желаемую булочку</h2>}
          {bun.length !== 0 && upBun(bun)}
          {!main.length && <h2 className='text text_type_main-default pt-10 mb-6'>Перенесите сюда желаемый ингредиент</h2>}
          {main &&
            <ul className={style.scrollBox}>
              {mainIngredients(main)}
            </ul>}
          {!bun.length && <h2 className='text text_type_main-default pt-10 mb-6'>Перенесите сюда желаемую булочку</h2>}
          {bun.length !== 0 && downBun(bun)}
        </div>
        <OrderInfo onOpen={onOpen} />
        {state &&
          <Modal onClose={onClose}>
            <OrderDetails onClose={onClose} />
          </Modal>}
      </article>
    </>
  )
}