import { Route, Routes } from "react-router-dom";
import { Pages } from "./src";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Pages.Inicio/>} />
      <Route path="/criar-imoveis" element={<Pages.CriarImoveis/>} />
    </Routes>
  );
}