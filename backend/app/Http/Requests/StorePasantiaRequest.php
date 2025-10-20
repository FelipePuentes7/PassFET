<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePasantiaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // For now, allow any authenticated user. We can add role checks later.
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'estudiante_id' => 'required|exists:users,id',
            'tutor_id' => 'nullable|exists:users,id',
            'nombre_empresa' => 'required|string|max:255',
            'direccion_empresa' => 'nullable|string|max:255',
            'contacto_empresa' => 'nullable|string|max:255',
            'supervisor_empresa' => 'nullable|string|max:255',
            'telefono_supervisor' => 'nullable|string|max:20',
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'estado' => 'sometimes|in:planificada,en_proceso,finalizada,cancelada,Pendiente',
        ];
    }
}