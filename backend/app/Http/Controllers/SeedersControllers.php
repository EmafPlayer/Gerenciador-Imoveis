<?php

namespace App\Http\Controllers;

use Database\Seeders\StatusAcontecimentoSeeder;
use Database\Seeders\TipoCotacaoSeeder;
use Database\Seeders\TipoDespesaSeeder;
use Database\Seeders\TipoExpectativaStatusSeeder;
use Database\Seeders\TipoRecorrenciaSeeder;
use Database\Seeders\TipoStatusImoveisSeeder;
use Database\Seeders\TitulosDespesasSeeder;
use Illuminate\Http\Request;

class SeedersControllers extends Controller
{
    public function run (){
        app(StatusAcontecimentoSeeder::class)->run();
        app(TipoCotacaoSeeder::class)->run();
        app(TipoDespesaSeeder::class)->run();
        app(TipoExpectativaStatusSeeder::class)->run();
        app(TipoRecorrenciaSeeder::class)->run();
        app(TipoStatusImoveisSeeder::class)->run();
        app(TitulosDespesasSeeder::class)->run();
    }
}
