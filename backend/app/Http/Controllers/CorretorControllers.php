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
            'telefone' => 'required|string',
            'email' => 'string|nullable'
        ]);

        Corretores::create([
            'id_imobiliaria' => $request->id_imobiliaria,
            'nome' => $request->nome,
            'email' => $request->email,
            'telefone' => $request->telefone,
        ]);

        return response()->json(['message' => 'Corretor criado com sucesso'], 200);
    }

    public function show()
    {  
        $corretores_imobiliarias = Corretores::join('imobiliarias', 'corretores.id_imobiliaria', '=','imobiliarias.id')
                                             ->select('corretores.id as id_corretor', 'corretores.nome as nome_corretor', 'imobiliarias.nome_oficial as nome_imobiliaria', 'telefone')
                                             ->orderBy('corretores.id','asc')->get()->toArray();

        if (count($corretores_imobiliarias) == 0)
            return response()->json(['message' => 'Ainda não possui corretores cadastradas no banco de dados'], 404);

        return response()->json(['message' => 'Corretores buscados com sucesso', 'corretores_imobiliarias' => $corretores_imobiliarias], 200);
    }

    public function update()
    {

    }

    public function destroy()
    {
        //
    }
}
