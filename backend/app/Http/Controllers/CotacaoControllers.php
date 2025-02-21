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

    
    public function carregarCotacoes ($id_imovel) {

        $cotacoes = Cotacoes::join('corretores', 'cotacoes.id_corretor', '=', 'corretores.id')
                            ->join('imobiliarias', 'corretores.id_imobiliaria', '=', 'imobiliarias.id')
                            ->join('enderecos', 'imobiliarias.id_endereco', '=', 'enderecos.id')
                            ->join('localizacoes', 'enderecos.id_localizacao', '=', 'localizacoes.id')
                            ->select('imobiliarias.id as id_imobiliaria', 'corretores.nome as nome_corretor', 'corretores.telefone as contato_corretor', 'corretores.email as email_corretor',
                                     'valor', 'valor_min', 'valor_max', 'data_cotacao', 'nome_fantasia', 'nome_oficial',
                                     'imobiliarias.email as email_imobiliaria', 'imobiliarias.site as site_imobiliaria', 'imobiliarias.contato as contato_imobiliaria',
                                     'rua', 'bairro', 'numero', 'cidade', 'estado', 'latitude', 'longitude')
                            ->where('cotacoes.id_imovel', '=', $id_imovel)->get()->toArray();

        $cotacoes = array_chunk($cotacoes, 4);

        foreach ($cotacoes as &$grupo) {
            foreach ($grupo as &$cotacao) {
                $urlAnuncio = ImoveisImobiliarias::where('id_imovel', $id_imovel)->where('id_imobiliaria', $cotacao['id_imobiliaria'])->value('url_anuncio');

                $cotacao['url_anuncio'] = $urlAnuncio ?? '';
            }
        }

        return response()->json(['message' => 'Cotações carregados com sucesso', 'cotacoes' => $cotacoes], 200);

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
