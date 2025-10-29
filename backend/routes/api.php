<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Api\TutorController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\PasantiaController;

// Public routes
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login-directo', [RegisteredUserController::class, 'loginDirecto']);

// Pasantia Admin Routes (for fetching users by role)
Route::get('/estudiantes', [PasantiaController::class, 'getEstudiantes']);
Route::get('/tutores', [PasantiaController::class, 'getTutores']);
Route::apiResource('pasantias', PasantiaController::class);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Tutor Routes
    Route::get('/tutor/pasantias', [TutorController::class, 'getMisPasantias']);
    Route::post('/tareas', [TutorController::class, 'createTarea']);
    Route::post('/entregas/{entrega}/calificar', [TutorController::class, 'gradeEntrega']);

    // Student Routes
    Route::get('/student/pasantia', [StudentController::class, 'getPasantia']);
    Route::post('/tareas/{tarea}/submit', [StudentController::class, 'submitTask']);
    Route::get('/tareas/{tarea}/entrega', [StudentController::class, 'getEntregaForStudent']);

    // Common Routes
    Route::get('/pasantias/{pasantia}/tareas', [TutorController::class, 'getTareas']);
});