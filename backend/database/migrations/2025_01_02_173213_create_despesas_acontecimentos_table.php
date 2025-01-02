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
        Schema::create('despesas_acontecimentos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_despesa');
            $table->foreignId('id_acontecimento');
            $table->timestamps();

            $table->foreign('id_despesa')->references('id')->on('despesas');
            $table->foreign('id_acontecimento')->references('id')->on('acontecimentos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('despesas_acontecimentos');
    }
};
