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
        Schema::create('cotacoes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_imovel');
            $table->foreignId('id_imobiliaria');
            $table->double('valor');
            $table->double('valor_min');
            $table->double('valor_max');
            $table->date('data_cotacao');
            $table->string('descricao', 255);
            $table->foreignId('tipo_cotacao');
            $table->timestamps();

            $table->foreign('id_imovel')->references('id')->on('imoveis');
            $table->foreign('id_imobiliaria')->references('id')->on('imobiliarias');
            $table->foreign('tipo_cotacao')->references('id')->on('tipo_cotacao');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cotacoes');
    }
};
