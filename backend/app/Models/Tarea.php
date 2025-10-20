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
    ];

    /**
     * Get the pasantia that owns the tarea.
     */
    public function pasantia()
    {
        return $this->belongsTo(Pasantia::class);
    }

    /**
     * Get the entregas for the tarea.
     */
    public function entregas()
    {
        return $this->hasMany(Entrega::class);
    }
}