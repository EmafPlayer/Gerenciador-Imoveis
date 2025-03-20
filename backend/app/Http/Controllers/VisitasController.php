<?php

namespace App\Http\Controllers;

use App\Models\Visitas;
use Illuminate\Http\Request;

class VisitasController extends Controller
{
    public function create (Request $request) {

        $request->validate([
            'id_imovel' => 'required|numeric',
            'id_corretor' => 'required|numeric',
            'data_visita' => 'required|date',
            'proposta' => 'required|numeric',
            'valor_proposta' => 'nullable|numeric',
            'data_proposta' => 'nullable|date',
            'descricao' => 'required|string',
        ]);

        Visitas::create([
            'id_imovel' => $request->id_imovel,
            'id_corretor' => $request->id_corretor,
            'data_visita' => $request->data_visita,
            'proposta' => $request->proposta,
            'valor_proposta' => $request->valor_proposta,
            'data_proposta' => $request->data_proposta,
            'descricao' => $request->descricao,
        ]);

        return response()->json(['message' => 'Visita criada com sucesso'], 200);

    }

    public function carregarVisitas($id_imovel){

        $visitas = Visitas::join('imoveis', 'imoveis.id', '=', 'visitas.id_imovel')
                          ->join('corretores', 'corretores.id', '=', 'visitas.id_corretor')
                          ->select('imoveis.nome as nome_imovel', 'corretores.nome as nome_corretor', 'visitas.data_visita', 'proposta', 'visitas.valor_proposta', 'visitas.data_proposta', 'visitas.descricao')
                          ->where('id_imovel', '=', $id_imovel)->get()->toArray();

        return response()->json(["message" => "Visitas carregadas com sucesso", "visitas" => $visitas], 200);

    }

}
