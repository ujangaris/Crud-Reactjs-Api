import { Route, Routes } from "react-router-dom";
import { AddArticle, ListArticle, UpdateArticle } from "./crud";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ListArticle />} />
        <Route path="/add-article" element={<AddArticle />} />
        <Route path="/update-article/:id_article" element={<UpdateArticle />} />
      </Routes>
    </>
  );
}

export default App;
