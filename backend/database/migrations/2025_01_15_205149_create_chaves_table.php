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
        Schema::create('chaves', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pessoa');
            $table->foreignId('id_imovel');
            $table->timestamps();

            $table->foreign('id_pessoa')->references('id')->on('pessoas_chave');
            $table->foreign('id_imovel')->references('id')->on('imoveis');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chaves');
    }
};
