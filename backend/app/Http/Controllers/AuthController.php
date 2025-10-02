<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\DB;

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
        Log::info('Login method called');
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => [
                    'id' => $user->id,
                    'nombre' => $user->name,
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
        Log::info('Register method called');
        DB::beginTransaction();
        try {
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

            $validatedData = $validator->validated();
            Log::info('Validated data:', $validatedData);

            $user = \App\Models\User::create([
                'name' => $validatedData['nombre'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'rol' => $validatedData['rol'],
                'documento' => $validatedData['documento'],
                'telefono' => $validatedData['telefono'],
                'ciclo' => $validatedData['ciclo'],
                'opcion_grado' => $validatedData['opcion_grado'],
                'nombre_proyecto' => $validatedData['nombre_proyecto'],
                'nombre_empresa' => $validatedData['nombre_empresa'],
                'codigo_estudiante' => $validatedData['codigo_estudiante'],
                'codigo_institucional' => $validatedData['codigo_institucional'],
            ]);

            Log::info('User created:', $user->toArray());

            DB::commit();

            return response()->json([
                'message' => 'Registro exitoso. Usuario creado directamente.'
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Ocurrió un error en el servidor. Por favor, inténtalo de nuevo más tarde.'
            ], 500);
        }
    }
}