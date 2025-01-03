<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoDespesaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tipo_despesa')->insert([
            'descricao' => 'Recorrente'
        ]);
        DB::table('tipo_despesa')->insert([
            'descricao' => 'Pontual'
        ]);
    }
}
