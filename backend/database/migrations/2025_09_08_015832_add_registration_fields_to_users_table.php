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
            $table->string('telefono')->nullable()->after('password'); // Placing after password for consistency
            $table->string('ciclo')->nullable()->after('telefono');
            $table->string('nombre_proyecto')->nullable()->after('ciclo');
            $table->string('nombre_empresa')->nullable()->after('nombre_proyecto');
            $table->string('codigo_institucional')->nullable()->after('nombre_empresa');

            // Add unique constraints to existing columns if they don't have them
            $table->unique('documento');
            $table->unique('codigo_estudiante');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'telefono',
                'ciclo',
                'nombre_proyecto',
                'nombre_empresa',
                'codigo_institucional',
            ]);

            // Drop unique constraints if they were added by this migration
            $table->dropUnique(['documento']);
            $table->dropUnique(['codigo_estudiante']);
        });
    }
};
