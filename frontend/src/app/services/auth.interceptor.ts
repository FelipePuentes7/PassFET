import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interceptor funcional para añadir el token de autenticación a las peticiones salientes.
 */
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  
  const token = localStorage.getItem('token');

  // Comprueba si la petición es para nuestra API (URL relativa) y no una API externa.
  const isApiUrl = !req.url.startsWith('http');

  // Si no hay token o no es una URL de la API, la petición continúa sin modificarse.
  if (!token || !isApiUrl) {
    return next(req);
  }

  // Si hay un token y es una URL de la API, clona la petición para añadir la cabecera 'Authorization'.
  const clonedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  // Envía la petición clonada con la cabecera de autorización.
  return next(clonedReq);
};
