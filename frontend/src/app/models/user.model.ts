export interface User {
    id: number;
    name: string;
    email: string;
    rol: 'estudiante' | 'tutor' | 'admin';
    // Add other user fields if necessary
}
