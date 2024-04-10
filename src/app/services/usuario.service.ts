import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public url;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }

  listar_usuarios_filtro_admin(tipo: string, filtro: string | number,token:string): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':token});
    return this._http.get(this.url + 'listar_usuarios_filtro_admin/' + tipo + '/' + filtro, { headers: headers });
  }


}