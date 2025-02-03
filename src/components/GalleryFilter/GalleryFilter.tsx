import { FC, useState } from "react";
import styles from "./GalleryFilter.module.css";
import { FilterTypes } from "../../enums/FilterTypes.enum";
import ChevronDown from "../../assets/ChevronDown";
import { useDebouncedCallback } from "use-debounce";

interface IGalleryFilter {
  onFilterChange: (filterType: FilterTypes) => void;
}

const GalleryFilter: FC<IGalleryFilter> = ({ onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);

  const debouncedButton = useDebouncedCallback(() => {
    setShowFilters((showFilters) => !showFilters);
  }, 100);

  return (
    <div className={styles.container}>
      <button
        onClick={debouncedButton}
        className={styles.container_title}
      >
        <h2>Filtros</h2>
        <ChevronDown
          className={[
            styles.container_title__icon,
            showFilters && styles.invertIcon,
          ].join(" ")}
        />
      </button>
      <div
        className={[
          styles.container_filtersArea,
          showFilters && styles.showFilters,
        ].join(" ")}
      >
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
    </div>
  );
};

export default GalleryFilter;
