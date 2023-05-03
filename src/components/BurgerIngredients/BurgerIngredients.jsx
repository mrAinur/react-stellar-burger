import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerIngredients.module.css';
import OrderInfo from './OrderInfo/OrderInfo';

export default function BurgerIngredients(props) {
  return (
    <article className={` ${style.ingredientsInfo} mt-25 ml-5`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={props.data[0].image}
        />
        <div className={style.scrollBox}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Говяжий метеорит (отбивная)"
            price={50}
            thumbnail={props.data[1].image}
          />
          <DragIcon type="primary" />
          <ConstructorElement
            text="Говяжий метеорит (отбивная)"
            price={50}
            thumbnail={props.data[1].image}
          />
          <DragIcon type="primary" />
          <ConstructorElement
            text="Говяжий метеорит (отбивная)"
            price={50}
            thumbnail={props.data[1].image}
          />
          <DragIcon type="primary" />
          <ConstructorElement
            text="Говяжий метеорит (отбивная)"
            price={50}
            thumbnail={props.data[1].image}
          />
          <DragIcon type="primary" />
          <ConstructorElement
            text="Говяжий метеорит (отбивная)"
            price={50}
            thumbnail={props.data[1].image}
          />
          <DragIcon type="primary" />
          <ConstructorElement
            text="Говяжий метеорит (отбивная)"
            price={50}
            thumbnail={props.data[1].image}
          />
          <DragIcon type="primary" />
          <ConstructorElement
            text="Говяжий метеорит (отбивная)"
            price={50}
            thumbnail={props.data[1].image}
          />
          <DragIcon type="primary" />
          <ConstructorElement
            text="Говяжий метеорит (отбивная)"
            price={50}
            thumbnail={props.data[1].image}
          />
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={props.data[0].image}
        />
      </div>
      <OrderInfo />
    </article>
  )
}
