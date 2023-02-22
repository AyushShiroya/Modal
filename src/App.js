import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from './Form';
import Table from "./TableEntery";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Form />} />
          <Route path="Table" element={<Table />} />
          <Route exact path="/edit/:id" element={<Form />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

