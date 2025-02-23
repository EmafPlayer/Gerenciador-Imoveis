<?php

namespace App\Http\Controllers;

use App\Models\Enderecos;
use App\Models\Imobiliarias;
use App\Models\Localizacoes;

use Illuminate\Http\Request;

class ImobiliariaControllers extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        $request->validate([
            'nome_fantasia' => 'required|string',
            'nome_oficial' => 'required|string',
            'email' => 'required|string',
            'site' => 'required|string',
            'contato' => 'required|string',
            'rua' => 'required|string',
            'bairro' => 'required|string',
            'numero' => 'required|numeric',
            'cep' => 'required|string',
            'cidade' => 'required|string',
            'estado' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
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

        Imobiliarias::create([
            'nome_fantasia' => $request->nome_fantasia,
            'nome_oficial' => $request->nome_oficial,
            'id_endereco' => $id_endereco,
            'email' => $request->email,
            'site' => $request->site,
            'contato' => $request->contato,
        ]);

        return response()->json(['message' => 'Imobiliária criada com sucesso'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {  
        $imobiliarias = Imobiliarias::select('nome_fantasia')->orderBy('id','asc')->get()->toArray();

        if (count($imobiliarias) == 0)
            return response()->json(['message' => 'Ainda não possui imobiliarias cadastradas no banco de dados'], 404);

        return response()->json(['message' => 'Imobiliárias buscados com sucesso', 'imobiliarias' => $imobiliarias], 200);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        //
    }
}
