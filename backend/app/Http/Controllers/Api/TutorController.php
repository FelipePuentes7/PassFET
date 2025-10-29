<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Pasantia;
use App\Models\Tarea;
use App\Models\Entrega;

class TutorController extends Controller
{
    // GET /api/tutor/pasantias
    public function getMisPasantias(Request $request)
    {
        $pasantias = Pasantia::with('estudiante')->get();
        return response()->json($pasantias);
    }

    // POST /api/tareas
    public function createTarea(Request $request)
    {
        $validated = $request->validate([
            'pasantia_id' => 'required|exists:pasantias,id',
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'fecha_entrega' => 'nullable|date',
        ]);

        $tarea = Tarea::create($validated + ['status' => 'pendiente']);

        return response()->json($tarea, 201);
    }

    // GET /api/pasantias/{pasantia_id}/tareas
    public function getTareas(Pasantia $pasantia)
    {
        return response()->json($pasantia->tareas()->with('entregas.estudiante')->get());
    }

    // GET /api/tareas/{tarea_id}/entregas
    public function getEntregas(Tarea $tarea)
    {
        $entregas = $tarea->entregas()->with('estudiante')->get();
        return response()->json($entregas);
    }

    // POST /api/entregas/{entrega}/calificar
    public function gradeEntrega(Request $request, Entrega $entrega)
    {
        $validated = $request->validate([
            'calificacion' => 'required|numeric|min:0|max:5',
            'comentario_tutor' => 'nullable|string',
        ]);

        $entrega->update([
            'calificacion' => $validated['calificacion'],
            'comentario_tutor' => $validated['comentario_tutor'],
            'fecha_calificacion' => now(),
        ]);

        // Update task status to 'entregado'
        $entrega->tarea->update(['status' => 'entregado']);

        return response()->json($entrega);
    }
}
