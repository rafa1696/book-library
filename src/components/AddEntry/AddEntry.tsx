import styles from "./AddEntry.module.css";

const AddEntry = () => {
  const handleAddEntry = () => {};

  return (
    <button
      onClick={handleAddEntry}
      className={styles.container}
    >
      +
    </button>
  );
};

export default AddEntry;
