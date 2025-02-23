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
        Schema::create('acontecimentos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_imovel');
            $table->string('titulo', 50);
            $table->string('descricao');
            $table->date('data_inicio');
            $table->dateTime('ultima_alteracao', precision: 0);
            $table->foreignId('status_acontecimento');
            $table->timestamps();

            $table->foreign('id_imovel')->references('id')->on('imoveis');
            $table->foreign('status_acontecimento')->references('id')->on('status_acontecimento');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('acontecimentos');
    }
};
