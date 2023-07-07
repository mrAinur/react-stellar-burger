import { useState, useCallback } from "react";

// кастомные хуки всегда должны начинаться с глагола `use`, чтобы реакт понял, что это хук. Он следит за их вызовами
export const useModal = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    // `useCallback` нужен для того, чтобы зафиксировать ссылку на функцию. Таким образом уменьшится кол-во перерисовок компонента, куда будет передана эта функция
    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return {
        isModalOpen,
        openModal,
        closeModal,
    };
};


// !Надо сделать на каникулах!

// export function useForm(inputValues = {}) {
//     const [values, setValues] = useState(inputValues);

//     const handleChange = (event) => {
//         const { value, name } = event.target;
//         setValues({ ...values, [name]: value });
//     };
//     return { values, handleChange, setValues };
// }