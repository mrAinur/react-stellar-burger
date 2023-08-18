import { useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import style from "./main-ingredient.module.css";
import { useAppDispatch } from "../../../..";
import { deleteIngredient } from "../services/burger-ingredients";
import { Ingredient } from "../../../../utils/types";

type Props = {
  item: Ingredient;
  index: number;
  moveListItem: any;
};

export default function MainIngredient({ item, index, moveListItem }: Props) {
  const dispatch = useAppDispatch();

  // useDrag - the list item is draggable
  const [, dragRef] = useDrag({
    type: "item",
    item: { index },
  });

  // useDrop - the list item is also a drop area
  const [, dropRef] = useDrop({
    accept: "item",
    hover: (item: any, monitor: any) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect!.bottom - hoverBoundingRect!.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect!.top;

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // Join the 2 refs together into one (both draggable and can be dropped on)
  const ref = useRef<HTMLInputElement>(null);
  const dragDropRef: any = dragRef(dropRef(ref));

  return (
    <li ref={dragDropRef} className={style.ingredient}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => dispatch(deleteIngredient(item.id))}
      />
    </li>
  );
}
