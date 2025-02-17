<?php

namespace App\Http\Controllers;

use App\Models\Acontecimentos;
use Illuminate\Http\Request;

class AcontecimentoControllers extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        $request->validate([
            "id_imovel" => 'required|numeric',
            "titulo" => 'required|string',
            "status_acontecimento" => 'required|numeric',
            "descricao" => 'required|string',
        ]);

        Acontecimentos::create([
            "id_imovel" => $request->id_imovel,
            "titulo" => $request->titulo,
            "descricao" => $request->descricao,
            "data_hora_inicio" => now(),
            "ultima_alteracao" => now(),
            "status_acontecimento" => $request->status_acontecimento,
        ]);
        
        return response()->json(['message' => 'Acontecimento criado com sucesso'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {  

    }

    public function verAcontecimentos()
    {
        $acontecimentos = Acontecimentos::select('titulo')->orderBy('id','asc')->get()->toArray();

        if (count($acontecimentos) == 0)
            return response()->json(['message' => 'Ainda não possui acontecimentos cadastradas no banco de dados'], 404);

        return response()->json(['message' => 'acontecimentos buscados com sucesso', 'acontecimentos' => $acontecimentos], 200);
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
