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
        Schema::create('expectativas_status', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_imovel');
            $table->foreignId('tipo_expectativa_status');
            $table->timestamps();

            $table->foreign('id_imovel')->references('id')->on('imoveis');
            $table->foreign('tipo_expectativa_status')->references('id')->on('tipo_expectativa_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expectativa_status');
    }
};
