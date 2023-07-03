import style from './ingredient-details.module.css';
import { useLocation } from 'react-router-dom';

export default function IngredientDetails() {

    const location = useLocation();

    const info = JSON.parse(localStorage.getItem("ingredients")).find(item => item._id === location.pathname.replace("/ingredients/", ""))

    const background = location.state && location.state.background;

    return (
        !background ? (<div className={style.main}>
            <div className={style.headCenter}>
                <p className={`text text_type_main-large`}>Детали ингредиента</p>
            </div>
            <img className={style.img} src={info.image_large} alt='Картинка ингредиента бургера' />
            <p className={`${style.info} text text_type_main-medium mt-4`}>{info.name}</p>
            <ul className={`${style.details} mt-8 mb-15`}>
                <li className={style.callories}>
                    <p className='text text_type_main-default'>Каллории,ккал</p>
                    <p className='text text_type_digits-default mt-2'>{info.calories}</p>
                </li>
                <li className={style.callories}>
                    <p className='text text_type_main-default'>Белки, г</p>
                    <p className='text text_type_digits-default mt-2'>{info.proteins}</p>
                </li>
                <li className={style.callories}>
                    <p className='text text_type_main-default'>Жиры, г</p>
                    <p className='text text_type_digits-default mt-2'>{info.fat}</p>
                </li>
                <li className={style.callories}>
                    <p className='text text_type_main-default'>Углеводы, г</p>
                    <p className='text text_type_digits-default mt-2'>{info.carbohydrates}</p>
                </li>
            </ul>
        </div>) :
            (<>
                <div className={`${style.head} mt-10`}>
                    <p className={`${style.title} text text_type_main-large`}>Детали ингредиента</p>
                </div>
                <img className={style.img} src={info.image_large} alt='Картинка ингредиента бургера' />
                <p className={`${style.info} text text_type_main-small mt-4`}>{info.name}</p>
                <ul className={`${style.details} mt-8 mb-15`}>
                    <li className={style.callories}>
                        <p className='text text_type_main-default'>Каллории,ккал</p>
                        <p className='text text_type_digits-default mt-2'>{info.calories}</p>
                    </li>
                    <li className={style.callories}>
                        <p className='text text_type_main-default'>Белки, г</p>
                        <p className='text text_type_digits-default mt-2'>{info.proteins}</p>
                    </li>
                    <li className={style.callories}>
                        <p className='text text_type_main-default'>Жиры, г</p>
                        <p className='text text_type_digits-default mt-2'>{info.fat}</p>
                    </li>
                    <li className={style.callories}>
                        <p className='text text_type_main-default'>Углеводы, г</p>
                        <p className='text text_type_digits-default mt-2'>{info.carbohydrates}</p>
                    </li>
                </ul>
            </>
            )

    )
}