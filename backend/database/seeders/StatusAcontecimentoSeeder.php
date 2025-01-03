<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusAcontecimentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('status_acontecimento')->insert([
            'descricao' => 'Planejamento'
        ]);
        DB::table('status_acontecimento')->insert([
            'descricao' => 'Em andamento'
        ]);
        DB::table('status_acontecimento')->insert([
            'descricao' => 'Finalizado'
        ]);
    }
}
