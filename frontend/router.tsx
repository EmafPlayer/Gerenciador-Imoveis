import { Route, Routes } from "react-router-dom";
import { Pages } from "./src";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Pages.Login/>} />
      <Route path="/sign-up" element={<Pages.SignUp/>} />
      <Route path="/home" element={<Pages.Inicio/>} />
      <Route path="/criar-imoveis" element={<Pages.CriarImoveis/>} />
      <Route path="/criar-imobiliaria" element={<Pages.CriarImobiliaria/>} />
      <Route path="/criar-cotacao" element={<Pages.CriarCotacao/>} />
      <Route path="/criar-corretor" element={<Pages.CriarCorretor/>} />
      <Route path="/criar-receita_despesa" element={<Pages.CriarReceitaDespesa/>} />
      <Route path="/criar-acontecimento" element={<Pages.CriarAcontecimento/>} />
      <Route path="/exibir-imovel" element={<Pages.CompImovel/>} />
      <Route path="/exibir-imovel/cotacoes" element={<Pages.CompCotacoes/>}/>
      <Route path="/exibir-imovel/receitas-despesas" element={<Pages.CompDespesas/>}/>
      <Route path="/exibir-imovel/acontecimentos" element={<Pages.CompAcontecimentos/>}/>
    </Routes>
  );
}