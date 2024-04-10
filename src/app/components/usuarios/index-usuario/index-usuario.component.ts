import { Component , OnInit} from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-index-usuario',
  templateUrl: './index-usuario.component.html',
  styleUrl: './index-usuario.component.css'
})
export class IndexUsuarioComponent implements OnInit {

  public usuarios: Array<any>=[]
  public filtro_apellidos=''
  public filtro_correo=''

  public page=1
  public pageSize=1
  public token

  constructor(
    private _usuarioService:UsuarioService,
    private _adminService:AdminService
  ){
    this.token=this._adminService.getToken();
  }

  ngOnInit(): void {
    let tipo: string | null = null;
    let filtro: string | null = null;

    // Verifica si hay algún valor en los filtros y ajusta los valores de tipo y filtro en consecuencia
    if (this.filtro_apellidos !== '') {
        tipo = 'apellidos';
        filtro = this.filtro_apellidos;
    } else if (this.filtro_correo !== '') {
        tipo = 'correo';
        filtro = this.filtro_correo;
    }

    // Si tipo y filtro son nulos, establece tipo y filtro en null para obtener todos los usuarios
    if (tipo === null && filtro === null) {
        tipo = null;
        filtro = null;
    }

    // Verifica que this.token no sea nulo antes de utilizarlo
    if (this.token !== null) {
        // Solo pasa valores no nulos a la función listar_usuarios_filtro_admin
        this._usuarioService.listar_usuarios_filtro_admin(tipo!, filtro!, this.token).subscribe(
            response => {
                this.usuarios = response.data;
            },
            error => {
                console.log(error);
            }
        );
    }
}



filtro(tipo: string) {
  if(tipo == 'apellidos') {
      if (this.token !== null) {
          this._usuarioService.listar_usuarios_filtro_admin(tipo, this.filtro_apellidos, this.token).subscribe(
              response => {
                  this.usuarios = response.data;
              },
              error => {
                  console.log(error);
              }
          );
      }
  } else if(tipo == 'correo') {
      if (this.token !== null) {
          this._usuarioService.listar_usuarios_filtro_admin(tipo, this.filtro_correo, this.token).subscribe(
              response => {
                  this.usuarios = response.data;
              },
              error => {
                  console.log(error);
              }
          );
      }
  }
}

}
