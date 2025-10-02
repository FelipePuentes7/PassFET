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
        Schema::table('users', function (Blueprint $table) {
            $table->string('rol')->default('estudiante');
            $table->string('opcion_grado')->nullable();
            $table->string('documento')->nullable()->unique();
            $table->string('codigo_estudiante')->nullable()->unique();
            $table->string('telefono')->nullable();
            $table->string('ciclo')->nullable();
            $table->string('nombre_proyecto')->nullable();
            $table->string('nombre_empresa')->nullable();
            $table->string('codigo_institucional')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['rol', 'opcion_grado', 'documento', 'codigo_estudiante', 'telefono', 'ciclo', 'nombre_proyecto', 'nombre_empresa', 'codigo_institucional']);
        });
    }
};
