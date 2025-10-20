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
        // Logic to check if the authenticated tutor is assigned to this pasantia
        // and return tasks
        return response()->json([]);
    }

    /**
     * Store a newly created task in storage.
     */
    public function store(Request $request)
    {
        // Logic to validate and create a new task
        return response()->json(null, 201);
    }

    /**
     * Display the specified task and its submissions.
     */
    public function show(Tarea $tarea)
    {
        // Logic to show a task and its related submissions
        return response()->json([]);
    }

    /**
     * Update the specified task in storage.
     */
    public function update(Request $request, Tarea $tarea)
    {
        // Logic to validate and update a task
        return response()->json(null, 200);
    }

    /**
     * Remove the specified task from storage.
     */
    public function destroy(Tarea $tarea)
    {
        // Logic to delete a task
        return response()->json(null, 204);
    }

    /**
     * Grade a specific submission.
     */
    public function calificarEntrega(Request $request, Entrega $entrega)
    {
        // Logic to validate and save the grade and tutor's comment
        return response()->json(null, 200);
    }
}