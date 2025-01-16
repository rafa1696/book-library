import { FC } from "react";
import styles from "./GalleryFilter.module.css";
import { FilterTypes } from "../../enums/FilterTypes.enum";

interface IGalleryFilter {
  onFilterChange: (filterType: FilterTypes) => void;
}

const GalleryFilter: FC<IGalleryFilter> = ({ onFilterChange }) => {
  return (
    <div className={styles.container}>
      <button onClick={() => onFilterChange(FilterTypes.Alphabetical)}>
        Ordem Alfabética
      </button>
      <button onClick={() => onFilterChange(FilterTypes.Oldest)}>
        Mais Antigos
      </button>
      <button onClick={() => onFilterChange(FilterTypes.Newest)}>
        Mais Recentes
      </button>
    </div>
  );
};

export default GalleryFilter;
