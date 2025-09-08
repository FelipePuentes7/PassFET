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
        Schema::create('solicitudes_registro', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('rol');
            $table->string('documento')->unique();
            $table->string('telefono')->nullable();
            $table->string('ciclo')->nullable();
            $table->string('opcion_grado')->nullable();
            $table->string('nombre_proyecto')->nullable();
            $table->string('nombre_empresa')->nullable();
            $table->string('codigo_estudiante')->nullable()->unique();
            $table->string('codigo_institucional')->nullable()->unique();
            $table->string('estado')->default('pendiente'); // pendiente, aprobado, rechazado
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicitudes_registro');
    }
};