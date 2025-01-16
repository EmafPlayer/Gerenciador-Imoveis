<?php

namespace App\Http\Controllers;

use App\Models\Enderecos;
use App\Models\Imoveis;
use App\Models\Localizacoes;
use Illuminate\Http\Request;

class ImoveisController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        $request->validate([
            'nome_imovel' => 'required|string',
            'rua' => 'required|string',
            'bairro' => 'required|string',
            'numero' => 'required|numeric',
            'cep' => 'required|string',
            'cidade' => 'required|string',
            'estado' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'fornecimento_agua' => 'required|string',
            'fornecimento_luz' => 'required|string',
            'cadastro_iptu' => 'required|string',
            'matricula' => 'required|string',
            'cartorio_registro' => 'required|string',
            'area' => 'required|numeric',
            'area_testada' => 'required|numeric',
            'fracao_ideal' => 'required|numeric',
            'area_total' => 'required|numeric',
            'area_construida' => 'required|numeric',
        ]);

        Enderecos::create([
            'rua' => $request->rua,
            'bairro' => $request->bairro,
            'numero' => $request->numero,
            'cep' => $request->cep,
            'cidade' => $request->cidade,
            'estado' => $request->estado,
            'complemento' => $request->complemento,
        ]);

        Localizacoes::create([
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
        ]);

        $id_endereco = Enderecos::select('id')->orderBy('id', 'desc')->first();
        $id_endereco = $id_endereco->id;
        $id_localizacao = Localizacoes::select('id')->orderBy('id', 'desc')->first();
        $id_localizacao = $id_localizacao->id;

        Imoveis::create([
            'nome' => $request->nome_imovel,
            'id_endereco' => $id_endereco,
            'id_localizacao' => $id_localizacao,
            'anunciado' => true,
            'fornecimento_agua' => $request->fornecimento_agua,
            'fornecimento_luz' => $request->fornecimento_luz,
            'cadastro_iptu' => $request->cadastro_iptu,
            'matricula' => $request->matricula,
            'cartorio_registro' => $request->cartorio_registro,
            'area' => $request->area,
            'area_testada' => $request->area_testada,
            'fracao_ideal' => $request->fracao_ideal,
            'area_total' => $request->area_total,
            'area_construida' => $request->area_construida,
        ]);

        return response()->json(['message' => 'Imóvel criado com sucesso'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {  

    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update()
    {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        //
    }
}
