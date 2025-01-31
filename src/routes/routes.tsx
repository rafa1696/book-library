import DiaryEntry from "../components/DiaryEntry/DiaryEntry";
import Home from "../pages/Home";
import MyBooks from "../pages/MyBooks";
import ReadingDiary from "../pages/ReadingDiary";
import Search from "../pages/Search";

const routes = [
  { path: "/**", element: <Home /> },
  { path: "/**/search", element: <Search /> },
  { path: "/**/my-books", element: <MyBooks /> },
  { path: "/**/reading-diary", element: <ReadingDiary /> },
  { path: "/**/reading-diary/edit/:diaryEntryId", element: <DiaryEntry /> },
];

export default routes;
