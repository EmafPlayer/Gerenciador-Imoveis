<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Database\Seeders\TitulosDespesasSeeder;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('titulos_despesas', function (Blueprint $table) {
            $table->id();
            $table->string('descricao', 50); 
            $table->timestamps();
        });

        app(TitulosDespesasSeeder::class)->run();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('titulos_despesas');
    }
};
