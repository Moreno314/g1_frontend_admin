import { Component , OnInit} from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';

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

  constructor(
    private _usuarioService:UsuarioService
  ){

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

    // Solo pasa valores no nulos a la función listar_usuarios_filtro_admin
    this._usuarioService.listar_usuarios_filtro_admin(tipo!, filtro!).subscribe(
        response => {
            this.usuarios = response.data;
        },
        error => {
            console.log(error);
        }
    );
}



  filtro(tipo: string) {
   
    if(tipo=='apellidos'){
      
      this._usuarioService.listar_usuarios_filtro_admin(tipo, this.filtro_apellidos).subscribe(
        response => {
            this.usuarios = response.data;
        },
        error => {
            console.log(error);
        }
    );
    }else if(tipo=='correo'){
      this._usuarioService.listar_usuarios_filtro_admin(tipo, this.filtro_correo).subscribe(
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
