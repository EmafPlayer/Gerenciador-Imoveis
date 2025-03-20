<?php

use App\Http\Controllers\AcontecimentoControllers;
use App\Http\Controllers\ArquivosController;
use App\Http\Controllers\ChavesController;
use App\Http\Controllers\CorretorControllers;
use App\Http\Controllers\CotacaoControllers;
use App\Http\Controllers\DespesaControllers;
use App\Http\Controllers\ImobiliariaControllers;
use App\Http\Controllers\ImoveisController;
use App\Http\Controllers\PessoaController;
use App\Http\Controllers\SeedersControllers;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VisitasController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {

    Route::prefix('inicio')->group(function () {
        
        Route::post('/sign-in', [UserController::class, 'signIn']);
        Route::post('/sign-up', [UserController::class, 'signUp']);

        Route::post('/criacao-imoveis', [ImoveisController::class, 'create']);
        Route::post('/criacao-imobiliaria', [ImobiliariaControllers::class, 'create']);
        Route::post('/criacao-corretor', [CorretorControllers::class, 'create']);
        Route::post('/criacao-cotacao', [CotacaoControllers::class, 'create']);
        Route::post('/criacao-acontecimento', [AcontecimentoControllers::class, 'create']);
        Route::post('/criacao-despesa', [DespesaControllers::class, 'create']);
        Route::post('/criacao-titulo', [DespesaControllers::class, 'criarTitulos']);
        Route::post('/criacao-pessoa', [PessoaController::class, 'create']);
        Route::post('/criacao-chave', [ChavesController::class, 'create']);
        Route::post('/criacao-visita', [VisitasController::class, 'create']);
        
        Route::post('/run-seeders', [SeedersControllers::class, 'run']);
        Route::post('/update-pago/{id_despesa}', [DespesaControllers::class, 'updateStatusPago']);

        Route::get('/ver-imobiliarias', [ImobiliariaControllers::class, 'show']);
        Route::get('/ver-corretores', [CorretorControllers::class, 'show']);
        Route::get('/ver-titulos', [DespesaControllers::class, 'verTitulos']);
        Route::get('/ver-acontecimentos', [AcontecimentoControllers::class, 'verAcontecimentos']);
        Route::get('/ver-imovel/{id_imovel}', [ImoveisController::class, 'verImovel']);

        Route::get('/carregar-imoveis', [ImoveisController::class, 'carregarImoveis']);
        Route::get('/carregar-cotacoes/{id_imovel}', [CotacaoControllers::class, 'carregarCotacoes']);
        Route::get('/carregar-despesas/{id_imovel}', [DespesaControllers::class, 'carregarDespesas']);
        Route::get('/carregar-acontecimentos/{id_imovel}', [AcontecimentoControllers::class, 'carregarAcontecimentos']);
        Route::get('/carregar-chaves/{id_imovel}', [ChavesController::class, 'carregarChaves']);
        Route::get('/carregar-pessoas', [PessoaController::class, 'carregarPessoas']);
        Route::get('/carregar-visitas/{id_imovel}', [VisitasController::class, 'carregarVisitas']);

        Route::get('/fotos/{filename}', [ImoveisController::class, 'verFotoImovel']);

        Route::post('/upload-fotos', [ImoveisController::class, 'uploadFotoImovel']);

        Route::delete('/deletar-chave/{id_chave}', [ChavesController::class, 'deletarChave']);

        Route::put('/modificar-chave/{id_chave}/{id_pessoa}', [ChavesController::class, 'modificarChave']);
        Route::put('/modificar-descricao-acontecimento/{id_acontecimento}', [AcontecimentoControllers::class, 'modificarDescricao']);
        Route::put('/modificar-status-imovel/{id_imovel}/{id_status}', [ImoveisController::class, 'modificarStatusImovel']);

    });
    
});
