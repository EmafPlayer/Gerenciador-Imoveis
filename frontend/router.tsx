import { Route, Routes } from "react-router-dom";
import { Pages } from "./src";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Pages.Inicio/>} />
      <Route path="/criar-imoveis" element={<Pages.CriarImoveis/>} />
      <Route path="/criar-imobiliaria" element={<Pages.CriarImobiliaria/>} />
      <Route path="/criar-cotacao" element={<Pages.CriarCotacao/>} />
      <Route path="/criar-corretor" element={<Pages.CriarCorretor/>} />
      <Route path="/criar-receita_despesa" element={<Pages.CriarReceitaDespesa/>} />
      <Route path="/criar-acontecimento" element={<Pages.CriarAcontecimento/>} />
      <Route path="/exibir-imoveis/:id_imovel" element={<Pages.AcessarImovel/>} />
    </Routes>
  );
}