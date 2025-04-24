<?php

namespace App\Http\Controllers;

use App\Models\Cotacoes;
use App\Models\Enderecos;
use App\Models\FotosImoveis;
use App\Models\HistoricoStatusImoveis;
use App\Models\Imoveis;
use App\Models\Localizacoes;
use Illuminate\Http\Request;

class ImoveisController extends Controller
{
    
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
            'id_tipo_imovel' => 'required|numeric',
            'anunciado' => 'required'
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
            'anunciado' => $request->anunciado,
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
            'id_tipo_imovel' => $request->id_tipo_imovel
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

    public function carregarImoveis()
    {
        $imoveis = Imoveis::join("enderecos", "imoveis.id_endereco", "=", "enderecos.id")
                            ->join("localizacoes", "enderecos.id_localizacao", "=", "localizacoes.id")
                            ->select('imoveis.id as id', 'imoveis.nome as nome', 'enderecos.rua as rua', 'enderecos.numero as numero',
                                    'enderecos.bairro as bairro', 'localizacoes.latitude as latitude', 'localizacoes.longitude as longitude')
                            ->get()->toArray();

        foreach ($imoveis as &$imovel) {
            $imovel['foto'] = FotosImoveis::select('endereco')->where('id_imovel', '=', $imovel['id'])->orderBy('id', 'asc')->first();
            $imovel['foto'] = $imovel['foto'] ? $imovel['foto']->endereco : null;

            $imovel['status_imovel'] = (HistoricoStatusImoveis::join('tipo_status_imoveis', 'tipo_status_imoveis.id', '=', 'historico_status_imoveis.tipo_status')
                                                              ->select('descricao')->where('historico_status_imoveis.id_imovel', '=', $imovel['id'])->orderBy('ultima_alteracao', 'desc')->first()->toArray())['descricao'];

            $imovel['tipo_cotacao'] = Cotacoes::where('id_imovel', '=', $imovel['id'])->orderBy('id', 'asc')->exists() ? (Cotacoes::select('tipo_cotacao')->where('id_imovel', '=', $imovel['id'])->orderBy('id', 'asc')->first()->toArray())["tipo_cotacao"] : 0;
            $imovel['valor'] = Cotacoes::where('id_imovel', '=', $imovel['id'])->exists() ? (Cotacoes::select('valor')->where('id_imovel', '=', $imovel['id'])->orderBy('id', 'asc')->first()->toArray())['valor'] : 0;
        }
        unset($imovel);
        
        $iimoveis = array_chunk($imoveis, 3);

        return response()->json(['message' => 'Imoveis carregados com sucesso', 'imoveis' => $iimoveis], 200);

    }
    
    public function verImovel($id_imovel) {

        $imovel = Imoveis::join("enderecos", "imoveis.id_endereco", "=", "enderecos.id")
                         ->join("localizacoes", "enderecos.id_localizacao", "=", "localizacoes.id")
                         ->select("imoveis.id", "imoveis.id_tipo_imovel as tipo_imovel", "nome", "descricao", "fornecimento_agua", "anunciado", "fornecimento_luz", "cadastro_iptu", "matricula", "cartorio_registro", 
                                  "area", "area_testada", "fracao_ideal", "area_total", "area_construida",
                                  "rua", "numero", "bairro", "cidade","estado", "latitude", "longitude")->where("imoveis.id", "=", $id_imovel)->firstOrFail()->toArray();

        $imovel['fotos'] = FotosImoveis::select('endereco')->where('id_imovel', '=', $id_imovel)->get()->toArray();

        $imovel['valor_aluguel'] = Cotacoes::where('id_imovel', '=', $id_imovel)->where('tipo_cotacao', '=', 1)->avg('valor') ? Cotacoes::where('id_imovel', '=', $id_imovel)->where('tipo_cotacao', '=', 1)->avg('valor') : 0;
        $imovel['valor_venda'] = Cotacoes::where('id_imovel', '=', $id_imovel)->where('tipo_cotacao', '=', 2)->avg('valor') ? Cotacoes::where('id_imovel', '=', $id_imovel)->where('tipo_cotacao', '=', 2)->avg('valor') : 0;

        
        return response()->json(['message' => 'Imóvel carregado com sucesso', 'imovel' => $imovel], 200);
        
    }

    public function modificarAnuncio ($id_imovel, $anunciado) {
        
        Imoveis::where("id", "=", $id_imovel)->update([
            "anunciado" => $anunciado
        ]);

        return response()->json(["message" => "Status modificado com sucesso"], 200);

    }

    public function modificarStatusImovel ($id_imovel, $id_status) {

        $ultimo_status = (HistoricoStatusImoveis::select('tipo_status')->where('historico_status_imoveis.id_imovel', '=', $id_imovel)->orderBy('ultima_alteracao', 'desc')->first()->toArray())['tipo_status'];

        if($ultimo_status != $id_status) {
            
            HistoricoStatusImoveis::create([
                "id_imovel" => $id_imovel,
                "ultima_alteracao" => now(),
                "tipo_status" => $id_status,
            ]);

        }

        return response()->json(["message" => "Status modificado com sucesso"], 200);

    }

    public function verFotoImovel ($filename) {
            
        $path = storage_path("app/public/fotos/{$filename}");
    
        if (!file_exists($path)) {
            return response()->json(['error' => 'Arquivo não encontrado', 'path' => $path], 404);
        }
    
        return response()->file($path);
    }

    public function uploadFotoImovel(Request $request)
    {
        if (!$request->hasFile('file')) {
            return response()->json(['message' => 'Arquivo não encontrado.'], 400);
        }

        $file = $request->file('file');
        
        $filename = $file->getClientOriginalName();

        $file->move(storage_path("app/public/fotos"), $filename);

        FotosImoveis::create([
            'id_imovel' => $request->id_imovel,
            'endereco' => $filename, 
        ]);

        return response()->json(['message' => 'Foto armazenada com sucesso'], 200);
    }

}
