<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoRecorrenciaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tipo_recorrencia')->insert([
            'descricao' => 'Anual'
        ]);
        DB::table('tipo_recorrencia')->insert([
            'descricao' => 'Mensal'
        ]);
        DB::table('tipo_recorrencia')->insert([
            'descricao' => 'Diária'
        ]);
        DB::table('tipo_recorrencia')->insert([
            'descricao' => 'Não se aplica'
        ]);
    }
}
