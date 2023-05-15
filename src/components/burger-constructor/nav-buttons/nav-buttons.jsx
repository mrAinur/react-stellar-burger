import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

export default function NavButtons(props) {

    const [current, setCurrent] = React.useState('bun')

    React.useEffect(() => {
        props.scrollPosition(current)
    }, [current])
    

    return (
        <div style={{ display: 'flex' }}>
            <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>

    )
}

NavButtons.propTypes = {
    scrollPosition: PropTypes.func.isRequired
};