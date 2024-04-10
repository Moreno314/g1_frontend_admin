import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

// Definir una interfaz para describir la forma del objeto de datos
interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public url;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }

  // Especificar el tipo de datos para el parámetro "data"
  login_admin(data: LoginData): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login_admin', data, { headers: headers });
  }

  getToken(){
    return localStorage.getItem('token');
  }

  public isAuthenticated(allowedRoles: string[]): boolean {
    const token = localStorage.getItem('token');
  
    // Verificar si el token es nulo
    if (!token) {
      return false;
    }
  
    try {
      // Decodificar el token solo si no es nulo
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);
      if (!decodedToken) {
        return false;
      }
    } catch (error) {
      
    }
  
    return allowedRoles.includes(decodedToken['role']);
  }
}