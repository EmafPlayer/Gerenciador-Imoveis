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
        Schema::create('visitas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_imovel');
            $table->foreignId('id_corretor');
            $table->date('data_visita');
            $table->boolean('proposta');
            $table->double('valor_proposta')->nullable();
            $table->date('data_proposta')->nullable();
            $table->string('descricao');
            $table->timestamps();

            $table->foreign('id_imovel')->references('id')->on('imoveis');
            $table->foreign('id_corretor')->references('id')->on('corretores');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visitas');
    }
};
