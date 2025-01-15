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
        Schema::create('pessoas_chave', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_endereco');
            $table->string('nome_completo', 100);
            $table->string('contato', 20);
            $table->timestamps();

            $table->foreign('id_endereco')->references('id')->on('enderecos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pessoas_chave');
    }
};
