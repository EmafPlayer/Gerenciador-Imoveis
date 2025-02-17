<?php

namespace App\Http\Controllers;

use App\Models\Corretores;
use App\Models\Cotacoes;
use App\Models\ImoveisImobiliarias;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CotacaoControllers extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        $request->validate([
            "id_imovel" => 'required|numeric',
            "id_corretor" => 'required|numeric',
            "valor" => 'required|numeric',
            "valor_min" => 'required|numeric',
            "valor_max" => 'required|numeric',
            "data_cotacao" => 'required|date',
            "descricao" => 'required|string',
            "url_anuncio" => 'required|string',
            "tipo_cotacao" => 'required|numeric',
        ]);

        
        Cotacoes::create ([
            "id_imovel" => $request->id_imovel,
            "id_corretor" => $request->id_corretor,
            "valor" => $request->valor,
            "valor_min" => $request->valor_min,
            "valor_max" => $request->valor_max,
            "data_cotacao" => $request->data_cotacao,
            "descricao" => $request->descricao,
            "tipo_cotacao" => $request->tipo_cotacao,
        ]);
        
        $id_imobiliaria = Corretores::select('id_imobiliaria')->where('id', $request->id_corretor)->first();
        $id_imobiliaria = $id_imobiliaria->id_imobiliaria;
        
        if(DB::table('imoveis_imobiliarias')->where('id_imovel', $request->id_imovel)->where('id_imobiliaria', $id_imobiliaria)->doesntExist()){
            ImoveisImobiliarias::create([
                "id_imovel" => $request->id_imovel,
                "id_imobiliaria" => $id_imobiliaria,
                "url_anuncio" => $request->url_anuncio,
            ]);
        };
        
        return response()->json(['message' => 'Cotação criada com sucesso'], 200);
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
