<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoExpectativaStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tipo_expectativa_status')->insert([
            'descricao' => 'Para aluguel'
        ]);
        DB::table('tipo_expectativa_status')->insert([
            'descricao' => 'Para venda'
        ]);
        DB::table('tipo_expectativa_status')->insert([
            'descricao' => 'Para uso'
        ]);
        DB::table('tipo_expectativa_status')->insert([
            'descricao' => 'Em uso'
        ]);
    }
}
