import styles from "./header.module.css";
import BoxForButtons from "./work-with-burgers/box-for-buttons";
import PersonalAccount from "./personal-account/personal-account";

export default function Header() {
  return (
    <header className={styles.header}>
      <BoxForButtons />
      <PersonalAccount />
    </header>
  );
}
