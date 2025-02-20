import { FC } from "react";
import { ToastType } from "../../enums/ToastType.enum";
import styles from "./Toast.module.css";
import { useBookLibraryContext } from "../../context/BookLibraryContext";

const Toast: FC = () => {
  const { seenToastMessage } = useBookLibraryContext();

  // TODO - Adicionar animações?
  // TODO - Adicionar botão para fechar

  switch (seenToastMessage) {
    case ToastType.success:
      return (
        <div className={[styles.container, styles.success].join(" ")}>
          Ação realizada com sucesso!
        </div>
      );
    case ToastType.failure:
      return (
        <div className={[styles.container, styles.success].join(" ")}>
          Falha ao realizar a ação!
        </div>
      );

    default:
      return null;
  }
};

export default Toast;
