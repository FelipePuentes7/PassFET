<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        // Validación completa de todos los campos
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users', 'regex:/@fet\.edu\.co$/'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'rol' => ['required', 'in:estudiante,tutor'],
            'documento' => ['required', 'string', 'max:20', 'unique:users'],
            'telefono' => ['nullable', 'string', 'max:20'],
            'ciclo' => ['nullable', 'string', 'in:tecnico,tecnologo,profesional'],
            'opcion_grado' => ['nullable', 'string', 'in:seminario,proyecto,pasantia'],
            'nombre_proyecto' => ['nullable', 'string', 'max:255'],
            'nombre_empresa' => ['nullable', 'string', 'max:255'],
            'codigo_estudiante' => ['nullable', 'string', 'max:50', 'unique:users'],
            'codigo_institucional' => ['nullable', 'string', 'max:50', 'unique:users'],
        ]);

        // Crear el usuario con todos los campos
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'rol' => $validated['rol'],
            'documento' => $validated['documento'],
            'telefono' => $validated['telefono'] ?? null,
            'ciclo' => $validated['ciclo'] ?? null,
            'opcion_grado' => $validated['opcion_grado'] ?? null,
            'nombre_proyecto' => $validated['nombre_proyecto'] ?? null,
            'nombre_empresa' => $validated['nombre_empresa'] ?? null,
            'codigo_estudiante' => $validated['codigo_estudiante'] ?? null,
            'codigo_institucional' => $validated['codigo_institucional'] ?? null,
        ]);

        event(new Registered($user));

        // Devolver respuesta JSON con mensaje de éxito
        return response()->json([
            'message' => 'Usuario registrado exitosamente',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'rol' => $user->rol
            ]
        ], 201);
    }
}