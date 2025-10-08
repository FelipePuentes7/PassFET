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
        Schema::create('pasantias', function (Blueprint $table) {
            $table->id();

            // Foreign keys for student and tutor
            $table->foreignId('estudiante_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('tutor_id')->nullable()->constrained('users')->onDelete('set null');

            // Company information
            $table->string('nombre_empresa');
            $table->string('direccion_empresa')->nullable();
            $table->string('contacto_empresa')->nullable();
            $table->string('supervisor_empresa')->nullable();
            $table->string('telefono_supervisor')->nullable();

            // Internship details
            $table->string('titulo');
            $table->text('descripcion')->nullable();
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->enum('estado', ['planificada', 'en_proceso', 'finalizada', 'cancelada'])->default('planificada');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pasantias');
    }
};