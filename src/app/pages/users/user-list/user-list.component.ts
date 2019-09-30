import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: any[] = [];
  
  constructor(
    private userService: UsersService,
    private router:Router) { }

  ngOnInit() {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.userService.listar().toPromise().then( data => {
      console.log('data', data);
      this.users = data.usuarios;
      
    }).catch(error => {
      console.log('error', error);
    });
  }

  crear() {
    this.router.navigate(['users/create/']);
  }

  editar (id) {
    this.router.navigate(['/users/edit/'+ id]);
  }

  borrar (id) {
    this.userService.deleteUser( id ).toPromise().then( data => {
      console.log('data', data);
      this.listarUsuarios();
      
    }).catch( error => {
      console.log('error', error);
    });
  }
}