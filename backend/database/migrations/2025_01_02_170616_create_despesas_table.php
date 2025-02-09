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
        Schema::create('despesas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_imovel');
            $table->foreignId('titulo');
            $table->boolean('receita_despesa');
            $table->double('valor');
            $table->string('descricao', 255);
            $table->foreignId('tipo_despesa');
            $table->foreignId('tipo_recorrencia');
            $table->date('vencimento');
            $table->timestamps();

            $table->foreign('id_imovel')->references('id')->on('imoveis');
            $table->foreign('titulo')->references('id')->on('titulos_despesas');
            $table->foreign('tipo_despesa')->references('id')->on('tipo_despesa');
            $table->foreign('tipo_recorrencia')->references('id')->on('tipo_recorrencia');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('despesas');
    }
};
