<?php

namespace App\Http\Controllers;
use App\Models\PessoasChave;
use Illuminate\Http\Request;

class PessoaController extends Controller
{
    public function create (Request $request) {

        $request->validate([
            'nome_completo' => 'required|string',
            'contato' => 'required|string',
        ]);

        PessoasChave::create([
            'nome_completo' => $request->nome_completo,
            'contato' => $request->contato
        ]);

        return response()->json(['message' => 'Pessoa criada com sucesso'], 200);
    }

    public function carregarPessoas () {

        $pessoas = PessoasChave::select('id as id_pessoa', 'nome_completo', 'contato')->get()->toArray();

        return response()->json(['message' => 'Pessoas buscadas com sucesso', 'pessoas' => $pessoas], 200);

    }

}
