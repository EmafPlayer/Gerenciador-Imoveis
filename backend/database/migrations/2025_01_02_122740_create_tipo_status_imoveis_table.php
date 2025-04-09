<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Database\Seeders\TipoStatusImoveisSeeder;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tipo_status_imoveis', function (Blueprint $table) {
            $table->id();
            $table->string('descricao', 20); 
            $table->timestamps();
        });

        app(TipoStatusImoveisSeeder::class)->run();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tipo_status_imoveis');
    }
};
