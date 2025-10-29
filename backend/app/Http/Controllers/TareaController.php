<?php

namespace App\Http\Controllers;

use App\Models\Pasantia;
use App\Models\Tarea;
use App\Models\Entrega;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TareaController extends Controller
{
    /**
     * Display a listing of the tasks for a specific pasantia.
     */
    public function index(Pasantia $pasantia)
    {
        // Authorize that the logged-in user is the tutor for this pasantia
        if (Auth::id() !== $pasantia->tutor_id) {
            return response()->json(['message' => 'No autorizado para ver estas tareas.'], 403);
        }

        // Eager load tasks with their corresponding submissions (entregas) and student info
        $tareas = $pasantia->tareas()->with('entregas.estudiante')->get();
        
        return response()->json($tareas);
    }

    /**
     * Store a newly created task in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'pasantia_id' => 'required|exists:pasantias,id',
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'fecha_entrega' => 'nullable|date',
        ]);

        $pasantia = Pasantia::findOrFail($validated['pasantia_id']);

        // Authorize that the logged-in user is the tutor for this pasantia
        if (Auth::id() !== $pasantia->tutor_id) {
            return response()->json(['message' => 'No autorizado para crear tareas en esta pasantía.'], 403);
        }

        $tarea = Tarea::create($validated);

        return response()->json($tarea, 201);
    }

    /**
     * Display the specified task and its submissions.
     */
    public function show(Tarea $tarea)
    {
        // Authorize that the logged-in user is the tutor for the pasantia of this task
        if (Auth::id() !== $tarea->pasantia->tutor_id) {
            return response()->json(['message' => 'No autorizado.'], 403);
        }
        
        return response()->json($tarea->load('entregas.estudiante'));
    }

    /**
     * Update the specified task in storage.
     */
    public function update(Request $request, Tarea $tarea)
    {
        if (Auth::id() !== $tarea->pasantia->tutor_id) {
            return response()->json(['message' => 'No autorizado.'], 403);
        }

        $validated = $request->validate([
            'titulo' => 'sometimes|required|string|max:255',
            'descripcion' => 'sometimes|required|string',
            'fecha_entrega' => 'nullable|date',
        ]);

        $tarea->update($validated);

        return response()->json($tarea, 200);
    }

    /**
     * Remove the specified task from storage.
     */
    public function destroy(Tarea $tarea)
    {
        if (Auth::id() !== $tarea->pasantia->tutor_id) {
            return response()->json(['message' => 'No autorizado.'], 403);
        }

        $tarea->delete();

        return response()->json(null, 204);
    }

    /**
     * Grade a specific submission.
     */
    public function calificarEntrega(Request $request, Entrega $entrega)
    {
        // Authorization: Check if the logged-in user is the tutor of the pasantia
        // related to this entrega.
        $pasantia = $entrega->tarea->pasantia;
        if (Auth::id() !== $pasantia->tutor_id) {
            return response()->json(['message' => 'No autorizado para calificar esta entrega.'], 403);
        }

        $validated = $request->validate([
            'calificacion' => 'required|numeric|min:0|max:100',
            'comentario_tutor' => 'nullable|string',
        ]);

        $entrega->update([
            'calificacion' => $validated['calificacion'],
            'comentario_tutor' => $validated['comentario_tutor'],
            'fecha_calificacion' => now(),
        ]);

        return response()->json($entrega->load('estudiante'), 200);
    }
}