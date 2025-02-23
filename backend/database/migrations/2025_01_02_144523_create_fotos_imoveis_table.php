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
        Schema::create('fotos_imoveis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_imovel');
            $table->string('endereco', 255);
            $table->timestamps();

            $table->foreign('id_imovel')->references('id')->on('imoveis');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fotos_imoveis');
    }
};
