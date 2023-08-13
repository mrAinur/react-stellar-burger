import { useAppDispatch } from "../../types";
import style from "./modal-overlay.module.css";
import PropTypes from "prop-types";
import { clearOrderNumber } from "../../pages/constructore/burger-constructor/services/burger-ingredients";
import { ReactNode } from "react";

type Props = {
  children: ReactNode & { type: { name: string } };
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
ModalOverlay.propTypes = {
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
