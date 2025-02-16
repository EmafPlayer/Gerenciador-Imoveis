<?php

use App\Http\Controllers\AcontecimentoControllers;
use App\Http\Controllers\CorretorControllers;
use App\Http\Controllers\CotacaoControllers;
use App\Http\Controllers\DespesaControllers;
use App\Http\Controllers\ImobiliariaControllers;
use App\Http\Controllers\ImoveisController;
use App\Http\Controllers\SeedersControllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {

    Route::prefix('inicio')->group(function () {
        Route::get('/criacao-imoveis', [ImoveisController::class, 'create']);
        Route::get('/criacao-imobiliaria', [ImobiliariaControllers::class, 'create']);
        Route::get('/criacao-corretor', [CorretorControllers::class, 'create']);
        Route::get('/criacao-cotacao', [CotacaoControllers::class, 'create']);
        Route::get('/criacao-acontecimento', [AcontecimentoControllers::class, 'create']);
        Route::get('/criacao-despesa', [DespesaControllers::class, 'create']);
        Route::get('/criacao-titulo', [DespesaControllers::class, 'criarTitulos']);
        Route::get('/ver-imobiliarias', [ImobiliariaControllers::class, 'show']);
        Route::get('/ver-corretores', [CorretorControllers::class, 'show']);
        Route::get('/ver-titulos', [DespesaControllers::class, 'verTitulos']);
        Route::get('/ver-acontecimentos', [AcontecimentoControllers::class, 'verAcontecimentos']);
        Route::get('/run-seeders', [SeedersControllers::class, 'run']);
    });
    
});
