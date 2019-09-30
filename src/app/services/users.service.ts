import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {



  public url = 'http://localhost:3000/users';
  constructor( private http: HttpClient) { }



  listar(): Observable<any> { 
    return this.http.get(this.url + '/list').pipe( map(resp => {  
      console.log(resp);
      return resp;

    }));
   
  }

  createUser( usuario ) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let body = {
      user:usuario
    }
    
    return this.http.post(this.url + '/create', body, { headers });
  }

  updateUser( value, id ): Observable<any> {
    console.log('iduser',id );
    // tslint:disable-next-line: prefer-const
    let headers = new HttpHeaders();
    const user = {
      user: value
    };
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.url + '/update?id=' + id, user , { headers }).pipe( map (resp => resp ));
  }


  deleteUser( id ) {
    return this.http.delete(this.url + '/borrar?id=' + id ).pipe( map ( resp =>{
        return resp;
    }))
  }

  getUser( id ) {
    return this.http.get(this.url + '/usuario?id=' + id ).pipe( map ( resp =>{
        return resp;
    }))
  }

  updateUserPassword( value, id ): Observable<any> {
    // tslint:disable-next-line: prefer-const
    let headers = new HttpHeaders();
    const body = {
      password: value
    };
    console.log('update User', body );
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.url + '/updatePassword?id=' + id, body , { headers }).pipe( map (resp => resp ));
  }

  login( userForm ) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const body = {
      user: userForm,
    };

    return this.http.post(this.url + '/login', body , { headers }).pipe( map( resp => resp));
  }

}
