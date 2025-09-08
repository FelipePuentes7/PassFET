<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            $user = Auth::user();

            return response()->json([
                'message' => 'Login successful',
                'user' => [
                    'id' => $user->id,
                    'nombre' => $user->name, // Asumiendo que la columna se llama 'name'
                    'email' => $user->email,
                    'rol' => $user->rol,
                    'opcion_grado' => $user->opcion_grado
                ]
            ]);
        }

        return response()->json([
            'error' => 'The provided credentials do not match our records.',
        ], 401);
    }

    /**
     * Handle a registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'rol' => ['required', 'string', 'in:estudiante,tutor'],
            'documento' => ['required', 'string', 'max:50', 'unique:users'],
            'telefono' => ['nullable', 'string', 'max:20'],
            'ciclo' => ['nullable', 'string', 'max:50'],
            'opcion_grado' => ['nullable', 'string', 'max:100'],
            'nombre_proyecto' => ['nullable', 'string', 'max:255'],
            'nombre_empresa' => ['nullable', 'string', 'max:255'],
            'codigo_estudiante' => ['nullable', 'string', 'max:50', 'unique:users'],
            'codigo_institucional' => ['nullable', 'string', 'max:50'],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = \App\Models\User::create([
            'name' => $request->nombre, // Assuming 'name' field in users table maps to 'nombre' from request
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'rol' => $request->rol,
            'documento' => $request->documento,
            'telefono' => $request->telefono,
            'ciclo' => $request->ciclo,
            'opcion_grado' => $request->opcion_grado,
            'nombre_proyecto' => $request->nombre_proyecto,
            'nombre_empresa' => $request->nombre_empresa,
            'codigo_estudiante' => $request->codigo_estudiante,
            'codigo_institucional' => $request->codigo_institucional,
        ]);

        return response()->json([
            'message' => 'Registro exitoso. Usuario creado directamente.'
        ], 201);
    }
}