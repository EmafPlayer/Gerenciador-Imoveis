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
                         ->select('chaves.id as id_chave', 'nome_completo', 'contato')->where('chaves.id_imovel', '=', $id_imovel)->get()->toArray();

        return response()->json(['message' => 'Pessoas buscadas com sucesso', 'pessoas' => $pessoas], 200);

    }

    public function modificarChave ($id_chave, $id_pessoa) {

        Chaves::where('id', '=', $id_chave)->update(['id_pessoa' => $id_pessoa]);

        return response()->json(['message' => 'Chave Atualizada com sucesso'], 200);

    }

    public function deletarChave ($id_chave) {
        
        Chaves::where('id', '=', $id_chave)->delete();

        return response()->json(['message' => 'Chave deletada com sucesso'], 200);

    }
}
