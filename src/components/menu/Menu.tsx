import clsx from "clsx";
import styles from "./Menu.module.scss";

export default function Menu() {
  return (
    <div className={clsx(styles.Menu)}>
      <nav>
        <span>장바구니</span>
        <span>Context</span>
        <span>Umnmm</span>
        <span>Hello world</span>
        <span>DDDD</span>
      </nav>
    </div>
  );
}
