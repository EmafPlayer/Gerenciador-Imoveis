<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoCotacaoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tipo_cotacao')->insert([
            'descricao' => 'Aluguel'
        ]);
        DB::table('tipo_cotacao')->insert([
            'descricao' => 'Venda'
        ]);
    }
}
