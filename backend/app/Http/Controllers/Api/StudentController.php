<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tarea;
use App\Models\Entrega;

class StudentController extends Controller
{
    // GET /api/student/pasantia
    public function getPasantia(Request $request)
    {
        $student = $request->user();
        $pasantia = $student->pasantiaComoEstudiante()->with('tutor')->first();
        return response()->json($pasantia);
    }

    // POST /api/tareas/{tarea}/submit
    public function submitTask(Request $request, Tarea $tarea)
    {
        $student = $tarea->pasantia->estudiante;

        $filePath = null;
        if ($request->hasFile('submission_file')) {
            $filePath = $request->file('submission_file')->store('submissions');
        }

        $entrega = Entrega::create([
            'tarea_id' => $tarea->id,
            'estudiante_id' => $student->id,
            'comentario_estudiante' => $request->input('comentario_estudiante'),
            'archivo_path' => $filePath,
            'fecha_entrega' => now(),
        ]);

        $tarea->update(['status' => 'por revisar']);

        return response()->json($entrega, 201);
    }

    // GET /api/tareas/{tarea}/entrega
    public function getEntregaForStudent(Request $request, Tarea $tarea)
    {
        $student = $request->user();
        $entrega = $tarea->entregas()->where('estudiante_id', $student->id)->first();

        return response()->json($entrega);
    }
}
