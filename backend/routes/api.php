<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PasantiaController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\TareaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Routes for Pasantias Module
Route::post('register', [RegisteredUserController::class, 'store']);
Route::post('/login-directo', [RegisteredUserController::class, 'loginDirecto']);
Route::apiResource('pasantias', PasantiaController::class);
Route::get('estudiantes', [PasantiaController::class, 'getEstudiantes']);
Route::get('tutores', [PasantiaController::class, 'getTutores']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/tutor/pasantias', [PasantiaController::class, 'getTutorPasantias'])->name('tutor.pasantias');

    // Rutas para Tareas y Entregas (Tutor)
    Route::get('/pasantias/{pasantia}/tareas', [TareaController::class, 'index'])->name('tareas.index');
    Route::post('/tareas', [TareaController::class, 'store'])->name('tareas.store');
    Route::get('/tareas/{tarea}', [TareaController::class, 'show'])->name('tareas.show');
    Route::put('/tareas/{tarea}', [TareaController::class, 'update'])->name('tareas.update');
    Route::delete('/tareas/{tarea}', [TareaController::class, 'destroy'])->name('tareas.destroy');
    Route::post('/entregas/{entrega}/calificar', [TareaController::class, 'calificarEntrega'])->name('entregas.calificar');
});
