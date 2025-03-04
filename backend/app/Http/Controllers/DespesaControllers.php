<?php

namespace App\Http\Controllers;

use App\Models\Despesas;
use App\Models\DespesasAcontecimentos;
use App\Models\TitulosDepesas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DespesaControllers extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        $request->validate([
            "id_imovel" => 'required|numeric',
            "titulo" => 'required|numeric',
            "receita_despesa" => 'required|numeric',
            "valor" => 'required|numeric',
            "descricao" => 'required|string',
            "tipo_despesa" => 'required|numeric',
            "tipo_recorrencia" => 'required|numeric',
            "vencimento" => 'required|date',
            "id_acontecimento" => 'required|numeric',
            "pago" => 'required|numeric',
        ]);

        Despesas::create([
            "id_imovel" => $request->id_imovel,
            "titulo" => $request->titulo,
            "receita_despesa" => $request->receita_despesa,
            "pago" => $request->pago,
            "valor" => $request->valor,
            "descricao" => $request->descricao,
            "tipo_despesa" => $request->tipo_despesa,
            "tipo_recorrencia" => $request->tipo_recorrencia,
            "vencimento" => $request->vencimento,
        ]);

        $id_despesa = Despesas::select('id')->orderBy('id', 'desc')->first();
        $id_despesa = $id_despesa->id;

        if($request->id_acontecimento != 0){
            DespesasAcontecimentos::create([
                "id_despesa" => $id_despesa,
                "id_acontecimento" => $request->id_acontecimento,
            ]);
        };

        return response()->json(['message' => 'Receita ou Despesa criada com sucesso'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {  

    }

    public function verTitulos()
    {
        $titulos = TitulosDepesas::select('descricao')->orderBy('id','asc')->get()->toArray();

        if (count($titulos) == 0)
            return response()->json(['message' => 'Ainda não possui titulos cadastradas no banco de dados'], 404);

        return response()->json(['message' => 'Titulos buscados com sucesso', 'titulos' => $titulos], 200);
    }

    public function criarTitulos(Request $request)
    {
        $request->validate([
            "descricao" => 'required|string',
        ]);

        TitulosDepesas::create ([
            "descricao" => $request->descricao
        ]);

        return response()->json(['message' => 'Título criado com sucesso'], 200);
    }

    public function carregarDespesas($id_imovel){
         
        $receitas = Despesas::join('titulos_despesas', 'despesas.titulo', '=', 'titulos_despesas.id')
                            ->leftJoin('despesas_acontecimentos', 'despesas.id', '=', 'despesas_acontecimentos.id_despesa')
                            ->leftJoin('acontecimentos', 'despesas_acontecimentos.id_acontecimento', '=', 'acontecimentos.id')
                            ->select('despesas.id as id', 'titulos_despesas.descricao as titulo_despesa', 'acontecimentos.titulo as titulo_acontecimento', 'despesas.descricao as descricao',
                                     'valor', 'tipo_despesa', 'tipo_recorrencia as recorrencia', 'receita_despesa', 'vencimento', 'pago')
                            ->orderBy('vencimento', 'asc')->where('receita_despesa', '=', 0)->where('despesas.id_imovel', '=', $id_imovel)->get()->toArray();
        $despesas = Despesas::join('titulos_despesas', 'despesas.titulo', '=', 'titulos_despesas.id')
                            ->leftJoin('despesas_acontecimentos', 'despesas.id', '=', 'despesas_acontecimentos.id_despesa')
                            ->leftJoin('acontecimentos', 'despesas_acontecimentos.id_acontecimento', '=', 'acontecimentos.id')
                            ->select('despesas.id as id', 'titulos_despesas.descricao as titulo_despesa', 'acontecimentos.titulo as titulo_acontecimento', 'despesas.descricao as descricao',
                                     'valor', 'tipo_despesa', 'tipo_recorrencia as recorrencia', 'receita_despesa', 'vencimento', 'pago')
                            ->orderBy('vencimento', 'asc')->where('receita_despesa', '=', 1)->where('despesas.id_imovel', '=', $id_imovel)->get()->toArray();

        $receitas = array_chunk($receitas, 8);
        $despesas = array_chunk($despesas, 8);

        return response()->json(['message' => 'Receitas e Despesas carregadas com sucesso', 'receitas' => $receitas, 'despesas' => $despesas], 200);

    }
    

    /**
     * Update the specified resource in storage.
     */
    public function updateStatusPago($id_despesa, Request $request)
    {
        $status = $request->pago ? 1 : 0;

        DB::table('despesas')->where('id', $id_despesa)->update(['pago' => $status]);

        return response()->json(['message' => 'Update realizado com sucesso'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        //
    }
}
