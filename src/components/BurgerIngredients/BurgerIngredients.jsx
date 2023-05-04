import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerIngredients.module.css';
import OrderInfo from './OrderInfo/OrderInfo';
import PropTypes from "prop-types";
import { ingredientPropType } from '../../utils/prop-types';

export default function BurgerIngredients(props) {

  return (
    <article className={` ${style.ingredientsInfo} mt-25 ml-5`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
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
          text="Краторная булка N-200i (низ)"
          price={props.data[0].price}
          thumbnail={props.data[0].image}
        />
      </div>
      <OrderInfo />
    </article>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(ingredientPropType)).isRequired
};
