<?php

namespace App\Http\Controllers;

use App\Models\Acontecimentos;
use App\Models\ArquivosAcontecimentos;
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
            "data_inicio" => 'required|date',
        ]);

        Acontecimentos::create([
            "id_imovel" => $request->id_imovel,
            "titulo" => $request->titulo,
            "descricao" => $request->descricao,
            "data_inicio" => $request->data_inicio,
            "ultima_alteracao" => now(),
            "status_acontecimento" => $request->status_acontecimento,
        ]);
        
        return response()->json(['message' => 'Acontecimento criado com sucesso'], 200);
    }

    public function verAcontecimentos()
    {
        $acontecimentos = Acontecimentos::select('id', 'titulo')->orderBy('id','asc')->get()->toArray();

        if (count($acontecimentos) == 0)
            return response()->json(['message' => 'Ainda não possui acontecimentos cadastradas no banco de dados'], 404);

        return response()->json(['message' => 'acontecimentos buscados com sucesso', 'acontecimentos' => $acontecimentos], 200);
    }
    
    public function carregarAcontecimentos ($id_imovel) 
    {
        $acontecimentos = Acontecimentos::select("id as id_acontecimento", "titulo", "descricao", "data_inicio", "ultima_alteracao", "status_acontecimento")
                                        ->where('id_imovel', '=', $id_imovel)->get()->toArray();

        foreach ($acontecimentos as &$acontecimento) 
            $acontecimento['arquivos'] = ArquivosAcontecimentos::select('endereco', 'descricao')->where('id_acontecimento', '=', $acontecimento['id_acontecimento'])->get()->toArray();
        
        $acontecimentos = array_chunk($acontecimentos, 4);

        return response()->json(['message' => 'Receitas e Despesas carregadas com sucesso', 'acontecimentos' => $acontecimentos], 200);
    }

    public function modificarDescricao($id_acontecimento, Request $request)
    {
        $request->validate([
            "descricao" => "required|string"
        ]);

        Acontecimentos::where('id', '=', $id_acontecimento)->update(["descricao" => $request->descricao]);

        return response()->json(["message" => "Descrição de acontecimento modificado com sucesso"], 200);

    }

    public function downloadArquivoAcontecimento ($filename) {
            
        $path = storage_path("app/public/arquivos/{$filename}");
    
        if (!file_exists($path)) {
            return response()->json(['error' => 'Arquivo não encontrado', 'path' => $path], 404);
        }
    
        return response()->file($path);

    }

    public function uploadFile (Request $request) {

        if (!$request->hasFile('file')) {
            return response()->json(['message' => 'Arquivo não encontrado.'], 400);
        }

        $file = $request->file('file');
        
        $filename = $file->getClientOriginalName();

        $file->move(storage_path("app/public/arquivos"), $filename);

        ArquivosAcontecimentos::create([
            'id_acontecimento' => $request->id_acontecimento,
            'endereco' => $filename, 
            'descricao' => $request->descricao
        ]);

        return response()->json(['message' => 'Arquivo armazenada com sucesso'], 200);
    }

}
