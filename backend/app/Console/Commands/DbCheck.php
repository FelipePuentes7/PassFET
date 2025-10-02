<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DbCheck extends Command
{
    protected $signature = 'db:check';
    protected $description = 'Check the database connection';

    public function handle()
    {
        try {
            DB::connection()->getPdo();
            $this->info('Database connection is successful.');
        } catch (\Exception $e) {
            $this->error('Database connection failed: ' . $e->getMessage());
        }
    }
}