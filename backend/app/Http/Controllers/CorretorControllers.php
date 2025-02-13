<?php

namespace App\Http\Controllers;

use App\Models\Corretores;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class CorretorControllers extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        $request->validate([
            'id_imobiliaria' => 'required|numeric',
            'nome' => 'required|string',
            'email' => 'required|string',
            'telefone' => 'required|string',
        ]);

        Corretores::create([
            'id_imobiliaria' => $request->id_imobiliaria,
            'nome' => $request->nome,
            'email' => $request->email,
            'telefone' => $request->telefone,
        ]);

        return response()->json(['message' => 'Corretor criado com sucesso'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {  
        $corretores_imobiliarias = DB::table('corretores')->join('imobiliarias', 'corretores.id_imobiliaria', '=','imobiliarias.id')->select('corretores.nome as nome_corretor', 'imobiliarias.nome_oficial as nome_imobiliaria')->orderBy('corretores.id','asc')->get()->toArray();

        if (count($corretores_imobiliarias) == 0)
            return response()->json(['message' => 'Ainda não possui corretores cadastradas no banco de dados'], 404);

        return response()->json(['message' => 'Corretores buscados com sucesso', 'corretores' => $corretores_imobiliarias], 200);
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
