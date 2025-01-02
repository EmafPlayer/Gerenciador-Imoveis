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
        Schema::create('historico_status_imoveis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_imovel');
            $table->dateTime('ultima_alteracao', precision: 0);
            $table->foreignId('tipo_status');
            $table->timestamps();

            $table->foreign('id_imovel')->references('id')->on('imoveis');
            $table->foreign('tipo_status')->references('id')->on('tipo_status_imoveis');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historico_status_imoveis');
    }
};
