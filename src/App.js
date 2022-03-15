import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GetForm from "./Component/Page/getForm/GetForm";
import Home from "./Component/Page/home/Home";
import Header from "./Component/Page/shared/Header/Header";
import TableLists from "./Component/Page/tableList/TableLists";
import InputTest from "./Component/Page/updateForm/InputTest";
import UpdateForm from "./Component/Page/updateForm/UpdateForm";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inputtest" element={<InputTest />} />

        <Route path="/table" element={<TableLists />} />
        <Route path="/getForm" element={<GetForm />} />
        <Route path="/updateform/:id" element={<UpdateForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
