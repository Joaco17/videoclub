import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  public createForm: FormGroup;
  public create = false;
  public message = '';
  public errores = false

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('',  [Validators.required, Validators.email]),
      password: new FormControl('',  [Validators.required, Validators.minLength(4)]),
      role: new FormControl('')
    })
  }


  onSubmit(){
    this.userService.createUser(this.createForm.value ).toPromise().then( (resp:any) => {
      console.log('respuesta', resp);
      if(resp.error) {
        this.message = JSON.stringify(resp.error);
      }
      this.create = true;
      this.errores= true;
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
