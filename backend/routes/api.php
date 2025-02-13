<?php

use App\Http\Controllers\CorretorControllers;
use App\Http\Controllers\CriarImobiliariaControllers;
use App\Http\Controllers\ImobiliariaControllers;
use App\Http\Controllers\ImoveisController;
use App\Http\Controllers\SeedersControllers;
use App\Models\Corretores;
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
        Route::get('/ver-imobiliarias', [ImobiliariaControllers::class, 'show']);
        Route::get('/ver-corretores', [CorretorControllers::class, 'show']);
        Route::get('/run-seeders', [SeedersControllers::class, 'run']);
    });
    
});
