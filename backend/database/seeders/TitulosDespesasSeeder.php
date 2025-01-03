<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TitulosDespesasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('titulos_despesas')->insert([
            'descricao' => 'IPTU'
        ]);
        DB::table('titulos_despesas')->insert([
            'descricao' => 'Condomínio'
        ]);
        DB::table('titulos_despesas')->insert([
            'descricao' => 'Água'
        ]);
        DB::table('titulos_despesas')->insert([
            'descricao' => 'Luz'
        ]);
        DB::table('titulos_despesas')->insert([
            'descricao' => 'Taxa administrativa da imobiliária'
        ]);
    }
}
