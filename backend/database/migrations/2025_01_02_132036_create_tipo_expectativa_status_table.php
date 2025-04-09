<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Database\Seeders\TipoExpectativaStatusSeeder;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tipo_expectativa_status', function (Blueprint $table) {
            $table->id();
            $table->string('descricao', 20); 
            $table->timestamps();
        });

        app(TipoExpectativaStatusSeeder::class)->run();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tipo_expectativa_status');
    }
};
