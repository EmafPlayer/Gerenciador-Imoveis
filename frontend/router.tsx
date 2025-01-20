import { Route, Routes } from "react-router-dom";
import { Pages } from "./src";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Pages.Inicio/>} />
      <Route path="/criar-imoveis" element={<Pages.CriarImoveis/>} />
      <Route path="/exibir-imoveis/:id_imovel" element={<Pages.ExibirImoveis/>} />
    </Routes>
  );
}