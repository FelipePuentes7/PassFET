<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rules\Password;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'rol' => ['required', 'string'],
            'documento' => ['nullable', 'string'],
            'telefono' => ['nullable', 'string'],
            'ciclo' => ['nullable', 'string'],
            'opcion_grado' => ['nullable', 'string'],
            'nombre_proyecto' => ['nullable', 'string'],
            'nombre_empresa' => ['nullable', 'string'],
            'codigo_estudiante' => ['nullable', 'string'],
            'codigo_institucional' => ['nullable', 'string'],
        ]);

        $user = User::create([
            'name' => $request->name,
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

        // Login the user after registration
        Auth::login($user);

        // Create a token for the user
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
        ]);
    }

    /**
     * Handle a direct login request, bypassing web security.
     */
    public function loginDirecto(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['error' => 'Credenciales incorrectas'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
        ]);
    }

    /**
     * Verifica si los datos de recuperación coinciden con un usuario.
     */
    public function verifyRecovery(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'cedula' => 'required|string',
            'student_code' => 'required|string',
        ]);

        // Asumimos que las columnas se llaman 'cedula' y 'student_code'
        $user = User::where('email', $request->email)
                    ->where('cedula', $request->cedula)
                    ->where('student_code', $request->student_code)
                    ->first();

        if ($user) {
            return response()->json(['success' => true]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Los datos no coinciden con nuestros registros.'
        ], 404);
    }

    /**
     * Actualiza la contraseña del usuario después de una verificación exitosa.
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'cedula' => 'required|string',
            'student_code' => 'required|string',
            'password' => ['required', 'confirmed', Password::min(8)],
        ]);

        // Volvemos a verificar para seguridad
        $user = User::where('email', $request->email)
                    ->where('cedula', 'LIKE', $request->cedula)
                    ->where('student_code', 'LIKE', $request->student_code)
                    ->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Los datos no coinciden con nuestros registros.'
            ], 404);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Contraseña actualizada correctamente.'
        ]);
    }
}