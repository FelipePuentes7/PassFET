<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MarkSolicitudesRegistroMigrationAsRanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('migrations')->insert([
            'migration' => '2025_09_07_213101_create_solicitudes_registro_table',
            'batch' => 4,
        ]);
    }
}
