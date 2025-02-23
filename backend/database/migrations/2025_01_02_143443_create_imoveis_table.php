<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('imoveis', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 50);
            $table->foreignId('id_endereco');
            $table->string('descricao');
            $table->boolean('anunciado');
            $table->string('fornecimento_agua', 30);
            $table->string('fornecimento_luz', 30);
            $table->string('cadastro_iptu', 30);
            $table->string('matricula', 30);
            $table->string('cartorio_registro', 30);
            $table->double('area');
            $table->double('area_testada');
            $table->double('fracao_ideal');
            $table->double('area_total');
            $table->double('area_construida');
            $table->boolean('tipo');
            $table->timestamps();

            $table->foreign('id_endereco')->references('id')->on('enderecos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imoveis');
    }
};
