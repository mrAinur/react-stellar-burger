import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';
import OrderInfo from './order-info/order-info';
import PropTypes from "prop-types";
import { ingredientPropType } from '../../utils/prop-types';
import React from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

export default function BurgerIngredients(props) {

  const [state, setState] = React.useState();

  const [orderInfo, setOrderInfo] = React.useState(null);

  const onClose = () => {
    setState(false)
    setOrderInfo(null)
  }

  const onOpen = (item) => {
    setState(true)
    setOrderInfo(item)
  }

  return (
    <article className={` ${style.ingredientsInfo} mt-25 ml-5`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${props.data[0].name} (верх)`}
          price={props.data[0].price}
          thumbnail={props.data[0].image}
        />
        <div className={style.scrollBox}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={props.data[1].name}
            price={props.data[1].price}
            thumbnail={props.data[1].image}
          />
          <DragIcon type="primary" />
          <ConstructorElement
            text={props.data[1].name}
            price={props.data[1].price}
            thumbnail={props.data[1].image}
          />
          <DragIcon type="primary" />
          <ConstructorElement
            text={props.data[1].name}
            price={props.data[1].price}
            thumbnail={props.data[1].image}
          />
          <DragIcon type="primary" />
          <ConstructorElement
            text={props.data[1].name}
            price={props.data[1].price}
            thumbnail={props.data[1].image}
          />
          <DragIcon type="primary" />
          <ConstructorElement
            text={props.data[1].name}
            price={props.data[1].price}
            thumbnail={props.data[1].image}
          />
          <DragIcon type="primary" />
          <ConstructorElement
            text={props.data[1].name}
            price={props.data[1].price}
            thumbnail={props.data[1].image}
          />
          <DragIcon type="primary" />
          <ConstructorElement
            text={props.data[1].name}
            price={props.data[1].price}
            thumbnail={props.data[1].image}
          />
          <DragIcon type="primary" />
          <ConstructorElement
            text={props.data[1].name}
            price={props.data[1].price}
            thumbnail={props.data[1].image}
          />
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${props.data[0].name} (низ)`}
          price={props.data[0].price}
          thumbnail={props.data[0].image}
        />
      </div>
      <OrderInfo onOpen={onOpen} />
      {state &&
        <Modal onClose={onClose}>
          <OrderDetails onClose={onClose} orderInfo={orderInfo} />
        </Modal>}
    </article>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
};
