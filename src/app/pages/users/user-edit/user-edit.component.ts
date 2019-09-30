import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit {

  public editForm: FormGroup;
  public create = false;
  public message = '';
  public errores = false;
  public idUser = '';

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('',  [Validators.required, Validators.email]),
      password: new FormControl(''),
      role: new FormControl('')
    });
    this.route.params.subscribe( resp => {
      console.log('resp', resp); 
      this.idUser = resp.id;
      this.userService.getUser(this.idUser).toPromise().then ( (usuario:any) =>{
       
        console.log('usuario', usuario);
        const user = usuario.usuario;
       
        this.editForm = new FormGroup({
          nombre: new FormControl(user.nombre, [Validators.required, Validators.minLength(4)]),
          email: new FormControl(user.email,  [Validators.required, Validators.email]),
          password: new FormControl(''),
          role: new FormControl(user.role)
        });
      }).catch( error => {
        console.log('error usuario', error); 
      });
      console.log('resp', resp);
    });
    
  }


  

  onSubmit(){
    
    
    this.userService.updateUser(this.editForm.value, this.idUser ).toPromise().then( (resp:any) => {
      console.log('respuesta', resp);
      if(resp.error) {
        this.message = JSON.stringify(resp.error);
      }
      this.create = true;
      this.errores= false;

      console.log('password',this.editForm.controls.password.value.length);
      
       if ((this.editForm.controls.password.value.length) > 0){
        this.userService.updateUserPassword(this.editForm.controls.password.value, this.idUser).toPromise()
        .then( pass =>{
          console.log('pass', pass);
        })
        .catch();
        console.log('Error Password');

      } 
      setTimeout ( () => {
        this.create = false;
      }, 4000)
    }).catch( error => {
      console.log('error', error);  
      this.errores = true;
      this.message = JSON.stringify(error.error);
    });
  }
}