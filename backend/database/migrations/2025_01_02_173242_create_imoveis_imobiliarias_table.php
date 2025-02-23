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
        Schema::create('imoveis_imobiliarias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_imovel');
            $table->foreignId('id_imobiliaria');
            $table->string('url_anuncio', 255);
            $table->timestamps();

            $table->foreign('id_imovel')->references('id')->on('imoveis');
            $table->foreign('id_imobiliaria')->references('id')->on('imobiliarias');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imoveis_imobiliarias');
    }
};
