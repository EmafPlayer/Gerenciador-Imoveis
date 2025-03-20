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
        Schema::create('corretores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_imobiliaria');
            $table->string('nome');
            $table->string('telefone');
            $table->string('email')->nullable();
            $table->timestamps();

            $table->foreign('id_imobiliaria')->references('id')->on('imobiliarias');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('corretor');
    }
};
