import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Importanto autenticação do Firebase
  constructor(private ngFireAuth: AngularFireAuth) { }

  // Método para logar
  public login(user: User) {    
    return this.ngFireAuth.signInWithEmailAndPassword(user.email, user.password);
  }

  // Método para registrar usuário
  public register(user: User) {
    return this.ngFireAuth.createUserWithEmailAndPassword(user.email, user.password);
  }

  // Método para sair da conta
  public logout(user: User) {
    return this.ngFireAuth.signOut();
  }

  // Retornando o objeto de autenticação do Firebase
  public getAuth() {
    return this.ngFireAuth;
  }
  
}
