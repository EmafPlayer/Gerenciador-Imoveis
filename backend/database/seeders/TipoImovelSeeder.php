<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoImovelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tipo_imovel')->insert([
            'descricao' => 'Aluguel'
        ]);
        DB::table('tipo_imovel')->insert([
            'descricao' => 'Venda'
        ]);
        DB::table('tipo_imovel')->insert([
            'descricao' => 'Aluguel e Venda'
        ]);
    }
}
