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
        Schema::dropIfExists('solicitud_registros');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Se recrea la tabla en caso de rollback para no perder la estructura original.
        Schema::create('solicitud_registros', function (Blueprint $table) {
            $table->id();
            // Aquí irían las columnas originales de la tabla si se conocieran.
            // Por seguridad, la dejamos con lo básico.
            $table->timestamps();
        });
    }
};