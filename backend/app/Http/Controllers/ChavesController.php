<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chaves;

class ChavesController extends Controller
{
    public function create (Request $request) {

        $request->validate([
            'id_pessoa' => 'required|numeric',
            'id_imovel' => 'required|numeric',
        ]);

        Chaves::create([
            'id_pessoa' => $request->id_pessoa,
            'id_imovel' => $request->id_imovel
        ]);

        return response()->json(['message' => 'Chave criada com sucesso'], 200);

    }

    public function carregarChaves ($id_imovel) {

        $pessoas = Chaves::join('pessoas_chave', 'chaves.id_pessoa', '=', 'pessoas_chave.id')
              ->select('nome_completo', 'contato')->where('chaves.id_imovel', '=', $id_imovel)->get()->toArray();

        return response()->json(['message' => 'Pessoas buscadas com sucesso', 'pessoas' => $pessoas], 200);

    }
}
