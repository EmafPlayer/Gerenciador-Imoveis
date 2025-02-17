<?php

namespace App\Http\Controllers;

use App\Models\Enderecos;
use App\Models\FotosImoveis;
use App\Models\HistoricoStatusImoveis;
use App\Models\Imoveis;
use App\Models\Localizacoes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            'tipo_status' => 'required|numeric',
            'descricao' => 'required|string',
        ]);

        
        Localizacoes::create([
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
        ]);
        
        $id_localizacao = Localizacoes::select('id')->orderBy('id', 'desc')->first();
        $id_localizacao = $id_localizacao->id;
        
        Enderecos::create([
            'id_localizacao' => $id_localizacao,
            'rua' => $request->rua,
            'bairro' => $request->bairro,
            'numero' => $request->numero,
            'cep' => $request->cep,
            'cidade' => $request->cidade,
            'estado' => $request->estado,
            'complemento' => $request->complemento ? $request->complemento : '-',
        ]);
        
        $id_endereco = Enderecos::select('id')->orderBy('id', 'desc')->first();
        $id_endereco = $id_endereco->id;

        Imoveis::create([
            'nome' => $request->nome_imovel,
            'id_endereco' => $id_endereco,
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
            'descricao' => $request->descricao,
        ]);

        $id_imovel = Imoveis::select('id')->orderBy('id', 'desc')->first();
        $id_imovel = $id_imovel->id;

        HistoricoStatusImoveis::create([
            'id_imovel' => $id_imovel,
            'ultima_alteracao' => now(),
            'tipo_status' => $request->tipo_status,
        ]);

        return response()->json(['message' => 'Imóvel criado com sucesso'], 200);
    }

    public function uploadFotos(Request $request)
    {

        if (!$request->hasFile('file')) {
            return response()->json(['message' => 'Arquivo não encontrado.'], 400);
        }

        $path = $request->file('file')->storeAs('fotos', $request->file('file')->getClientOriginalName());

        FotosImoveis::create([
            'id_imovel' => $request->id_imovel,
            'endereco' => $path, 
        ]);

        return response()->json(['message' => 'Foto armazenada com sucesso'], 200);
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
