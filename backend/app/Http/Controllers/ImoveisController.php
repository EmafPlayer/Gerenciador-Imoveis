<?php

namespace App\Http\Controllers;

use App\Models\Cotacoes;
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
            'tipo' => $request->tipo,
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

    public function carregarImoveis()
    {
        $imoveis = Imoveis::join("enderecos", "imoveis.id_endereco", "=", "enderecos.id")
                            ->join("localizacoes", "enderecos.id_localizacao", "=", "localizacoes.id")
                            ->select('imoveis.id as id', 'imoveis.nome as nome', 'imoveis.tipo as tipo', 'enderecos.rua as rua', 'enderecos.numero as numero',
                                    'enderecos.bairro as bairro', 'localizacoes.latitude as latitude', 'localizacoes.longitude as longitude')
                            ->get()->toArray();

        foreach ($imoveis as &$imovel) {
            $imovel['foto'] = FotosImoveis::select('endereco')->where('id_imovel', '=', $imovel['id'])->orderBy('id', 'asc')->first();
            $imovel['foto'] = $imovel['foto'] ? $imovel['foto']->endereco : null;

            $imovel['valor'] = Cotacoes::where('id_imovel', '=', $imovel['id'])->avg('valor') ? Cotacoes::where('id_imovel', '=', $imovel['id'])->avg('valor') : 0;
        }
        unset($imovel);

        $count = 0;

        for ($i = 0; $i < ceil(count($imoveis) / 3); $i++) { 
            
            for ($j = 0; $j < ((( count($imoveis) - (3 * ($i + 1)) ) == -2) ? 1 : ((( count($imoveis) - (3 * ($i + 1)) ) == -1) ? 2 : 3 )); $j++) { 
            
                $iimoveis[$i][$j] = $imoveis[$count];

                $count++;
            }    

        }

        return response()->json(['message' => 'Imoveis carregados com sucesso', 'imoveis' => $iimoveis], 200);

    }
    
    public function verImovel($id_imovel) {

        $imovel = Imoveis::join("enderecos", "imoveis.id_endereco", "=", "enderecos.id")
                         ->join("localizacoes", "enderecos.id_localizacao", "=", "localizacoes.id")
                         ->select("imoveis.id", "imoveis.tipo as tipo", "nome", "descricao", "fornecimento_agua", "fornecimento_luz", "cadastro_iptu", "matricula", "cartorio_registro", 
                                  "area", "area_testada", "fracao_ideal", "area_total", "area_construida",
                                  "rua", "numero", "bairro", "cidade","estado", "latitude", "longitude")->where("imoveis.id", "=", $id_imovel)->firstOrFail()->toArray();
        
                                  
        $imovel['fotos'] = FotosImoveis::select('endereco')->where('id_imovel', '=', $id_imovel)->get()->toArray();

        $imovel['valor'] = Cotacoes::where('id_imovel', '=', $id_imovel)->avg('valor') ? Cotacoes::where('id_imovel', '=', $id_imovel)->avg('valor') : 0;
        
        return response()->json(['message' => 'Imóvel carregado com sucesso', 'imovel' => $imovel], 200);
        
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
