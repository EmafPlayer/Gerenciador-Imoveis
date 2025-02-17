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
        Schema::create('imobiliarias', function (Blueprint $table) {
            $table->id();
            $table->string('nome_fantasia', 70);
            $table->string('nome_oficial', 70);
            $table->foreignId('id_endereco');
            $table->string('email', 50)->nullable();
            $table->string('site', 100)->nullable();
            $table->string('contato', 20)->nullable();
            $table->timestamps();

            $table->foreign('id_endereco')->references('id')->on('enderecos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imobiliarias');
    }
};
