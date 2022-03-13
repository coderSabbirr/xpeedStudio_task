import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Component/Page/home/Home";
import Header from "./Component/Page/shared/Header/Header";
import TableLists from "./Component/Page/tableList/TableLists";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<TableLists />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
