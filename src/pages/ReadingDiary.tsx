import { useBookLibraryContext } from "../context/BookLibraryContext";
import DiaryCard from "../components/DiaryCard/DiaryCard";
import Gallery from "../components/Gallery/Gallery";
import { ContentType } from "../enums/ContentType.enum";
import GalleryFilter from "../components/GalleryFilter/GalleryFilter";
import { FilterTypes } from "../enums/FilterTypes.enum";

const ReadingDiary = () => {
  const { readingDiary, reorderEntries } = useBookLibraryContext();

  const handleFilterChange = (filterType: FilterTypes) => {
    reorderEntries(filterType, ContentType.DiaryEntry);
  };

  return (
    <>
      <h1>Diário de Leitura</h1>
      <GalleryFilter onFilterChange={handleFilterChange} />
      <Gallery>
        {readingDiary.map((entry) => (
          // TODO - Exibir foto ou título do livro para agrupar. Colocar galeria com filtros.
          // TODO - Filtrar por livro
          <li key={entry.id}>
            <DiaryCard diaryEntry={entry} />
          </li>
        ))}
      </Gallery>
    </>
  );
};

export default ReadingDiary;
