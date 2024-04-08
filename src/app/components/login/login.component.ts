import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

declare var jQuery: any;
declare var $: any;
declare var iziToast: {
  show(options: {
    title?: string,
    class?: string,
    position?: string,
    titleColor?:string,
    message?: string
  }): void;
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public user: any = {};
  public usuario :any = {};
  public token :any = '';

  constructor(private _adminService: AdminService, private _router: Router) {
    this.token=this._adminService.getToken();
  }
  
  ngOnInit(): void {
    console.log(this.token);
    if(this.token){
      this._router.navigate(['/']);
    }else{
      //Mantener en el componente
    }
  }

  login(loginForm: any) {
    if (loginForm.valid) {
      console.log(this.user);

      let data={
        email:this.user.email,
        password:this.user.password
      }

      this._adminService.login_admin(data).subscribe(
        response=>{
          if(response.data==undefined){
            iziToast.show({
              title:'ERROR',
              titleColor:'#FF0000',
              class:'text-danger',
              position:'topRight',
              message:response.message
            });

          }else{
            this.usuario=response.data;
            localStorage.setItem('token',response.token);
            localStorage.setItem('_id',response.data._id);

            this._router.navigate(['/']);

          }
          console.log(response);
        },
        error=>{
          console.log(error);
        }
      );
      
    } else {
      iziToast.show({
        title:'ERROR',
        titleColor:'#FF0000',
        class:'text-danger',
        position:'topRight',
        message:'Los datos no son validos'
      })
    }
  }

}