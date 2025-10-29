<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{
    use HasFactory;

    protected $fillable = [
        'pasantia_id',
        'titulo',
        'descripcion',
        'fecha_entrega',
        'status',
    ];

    public function pasantia()
    {
        return $this->belongsTo(Pasantia::class);
    }

    public function entregas()
    {
        return $this->hasMany(Entrega::class);
    }
}
