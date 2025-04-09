<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Database\Seeders\TipoRecorrenciaSeeder;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tipo_recorrencia', function (Blueprint $table) {
            $table->id();
            $table->string('descricao', 20); 
            $table->timestamps();
        });

        app(TipoRecorrenciaSeeder::class)->run();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tipo_recorrencia');
    }
};
