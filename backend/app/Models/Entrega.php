<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entrega extends Model
{
    use HasFactory;

    protected $fillable = [
        'tarea_id',
        'estudiante_id',
        'archivo_path',
        'comentario_estudiante',
        'fecha_entrega',
        'calificacion',
        'comentario_tutor',
        'fecha_calificacion',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'fecha_entrega' => 'datetime',
        'fecha_calificacion' => 'datetime',
    ];

    /**
     * Get the tarea that owns the entrega.
     */
    public function tarea()
    {
        return $this->belongsTo(Tarea::class);
    }

    /**
     * Get the student (user) that owns the entrega.
     */
    public function estudiante()
    {
        return $this->belongsTo(User::class, 'estudiante_id');
    }
}