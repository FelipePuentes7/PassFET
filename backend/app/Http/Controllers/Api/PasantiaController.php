<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePasantiaRequest;
use App\Models\Pasantia;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PasantiaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Eager load the student and tutor relationships
        $pasantias = Pasantia::with(['estudiante', 'tutor'])->latest()->get();

        return response()->json($pasantias);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePasantiaRequest $request)
    {
        $pasantia = Pasantia::create($request->validated());

        return response()->json([
            'message' => 'Pasantía creada exitosamente.',
            'pasantia' => $pasantia
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pasantia $pasantia)
    {
        // Eager load relationships for a single record
        return response()->json($pasantia->load(['estudiante', 'tutor']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePasantiaRequest $request, Pasantia $pasantia)
    {
        $pasantia->update($request->validated());

        return response()->json([
            'message' => 'Pasantía actualizada exitosamente.',
            'pasantia' => $pasantia
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pasantia $pasantia)
    {
        $pasantia->delete();

        return response()->json([
            'message' => 'Pasantía eliminada exitosamente.'
        ], 200);
    }

    /**
     * Get pasantias assigned to the authenticated tutor.
     */
    public function getTutorPasantias()
    {
        $tutorId = Auth::id();
        $pasantias = Pasantia::with('estudiante')
                                ->where('tutor_id', $tutorId)
                                ->latest()
                                ->get();
        return response()->json($pasantias);
    }

    // Helper methods to get lists of students and tutors

    /**
     * Get a list of all users with the 'estudiante' role.
     */
    public function getEstudiantes()
    {
        Log::info('getEstudiantes method called.');
        $estudiantes = User::where('rol', 'estudiante')->orderBy('name')->get();
        Log::info('Estudiantes found: ' . $estudiantes->count());
        return response()->json($estudiantes);
    }

    /**
     * Get a list of all users with the 'tutor' role.
     */
    public function getTutores()
    {
        Log::info('getTutores method called.');
        $tutores = User::where('rol', 'tutor')->orderBy('name')->get();
        Log::info('Tutores found: ' . $tutores->count());
        return response()->json($tutores);
    }
}