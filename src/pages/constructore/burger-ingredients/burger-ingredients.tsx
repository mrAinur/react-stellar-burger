import NavButtons from "./nav-buttons/nav-buttons";
import style from "./burger-ingredients.module.css";
import IngredientsBoxScroll from "./ingredients-box-scroll/ingredients-box-scroll";

export default function BurgerConstructor() {
  return (
    <article className={style.main}>
      <h2 className="text text_type_main-large mt-10 ml-3">Соберите бургер</h2>
      <nav className="mt-5">
        <NavButtons />
      </nav>
      <IngredientsBoxScroll />
    </article>
  );
}
