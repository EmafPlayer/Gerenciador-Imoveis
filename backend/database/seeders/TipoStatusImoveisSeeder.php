<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoStatusImoveisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tipo_status_imoveis')->insert([
            'descricao' => 'Vago'
        ]);
        DB::table('tipo_status_imoveis')->insert([
            'descricao' => 'Em uso'
        ]);
        DB::table('tipo_status_imoveis')->insert([
            'descricao' => 'Alugado'
        ]);
        DB::table('tipo_status_imoveis')->insert([
            'descricao' => 'Loteamento'
        ]);
        DB::table('tipo_status_imoveis')->insert([
            'descricao' => 'Em reforma'
        ]);
    }
}
