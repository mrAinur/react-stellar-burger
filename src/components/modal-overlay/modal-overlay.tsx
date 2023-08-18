import { useAppDispatch } from "../..";
import style from "./modal-overlay.module.css";
import { clearOrderNumber } from "../../pages/constructore/burger-constructor/services/burger-ingredients";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClose: () => void;
};

export default function ModalOverlay({ children, onClose }: Props) {
  const dispatch = useAppDispatch();

  const onClick = () => {
    onClose();
    dispatch(clearOrderNumber());
  };

  return (
    <div className={style.overlay} onClick={onClick}>
      {children}
    </div>
  );
}
