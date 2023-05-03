import styles from './header.module.css';
import BoxForButtons from "./WorkWithBurgers/BoxForButtons";
import PersonalAccount from "./PersonalAccount/PersonalAccount";

export default function Header(props) {
    return (
        <header className={styles.header}>
                <BoxForButtons />
                <PersonalAccount />
        </header>
    )
}