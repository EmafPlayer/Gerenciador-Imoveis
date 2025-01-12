<?php

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
        Route::get('/run-seeders', [SeedersControllers::class, 'run']);
    });
    
});
