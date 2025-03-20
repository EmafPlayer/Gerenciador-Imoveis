<?php

namespace App\Http\Controllers;

use App\Models\TipoRecorrencia;
use Database\Seeders\RoleSeeder;
use Database\Seeders\StatusAcontecimentoSeeder;
use Database\Seeders\TipoCotacaoSeeder;
use Database\Seeders\TipoDespesaSeeder;
use Database\Seeders\TipoExpectativaStatusSeeder;
use Database\Seeders\TipoImovelSeeder;
use Database\Seeders\TipoRecorrenciaSeeder;
use Database\Seeders\TipoStatusImoveisSeeder;
use Database\Seeders\TitulosDespesasSeeder;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class SeedersControllers extends Controller
{
    public function run (){

        if(TipoRecorrencia::doesntExist()) {
            app(StatusAcontecimentoSeeder::class)->run();
            app(TipoCotacaoSeeder::class)->run();
            app(TipoDespesaSeeder::class)->run();
            app(TipoExpectativaStatusSeeder::class)->run();
            app(TipoRecorrenciaSeeder::class)->run();
            app(TipoStatusImoveisSeeder::class)->run();
            app(TitulosDespesasSeeder::class)->run();
            app(TipoImovelSeeder::class)->run();

            return response()->json(['message' => 'Seeders criadas com sucesso'], 200);
        }

        return response()->json(['message' => 'Seeders já foram criadas'], 200);
    }
}
