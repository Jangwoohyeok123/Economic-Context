import clsx from "clsx";
import styles from "./CatgId.module.scss";
import { useRouter } from "next/router";

export default function CatgId() {
  const router = useRouter();
  const { id } = router.query;

  return <div className={clsx(styles.CatgId)}>cardId = {id}</div>;
}
