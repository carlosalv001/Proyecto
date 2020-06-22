import { User } from '@shared/models/user.interface';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { RoleValidator } from '@auth/helpers/roleValidator';
import Swal from 'sweetalert2';


@Injectable({ providedIn: 'root' })
export class AuthService extends RoleValidator {
  public user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    super();
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(
        new auth.GoogleAuthProvider()
      );
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async login(email: string, password: string, confirmpass:string): Promise<User> {
    console.log(password);
    console.log(confirmpass);
    try {
      if(password==confirmpass){
        const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
        );
        this.updateUserData(user);
        return user;
      }else{
        Swal.fire(
          'Error!',
          'La constraseña no es igual a la confirmacion',
          'error',
         
       );
      }
      

    } catch (error) {
     
     if(error.code=="auth/user-not-found"){ //por si el correo no existe
      Swal.fire(
        'Error!',
        'El correo ingresado es incorrecto',
        'error',
       
     );
     }

     if(error.code=="auth/wrong-password"){//por si la contraseña no es correcta
      Swal.fire(
        'Error!',
        'La contraseña ingresada es incorrecta',
        'error',
       
     );
     }

     if(error.code!="auth/wrong-password" && error.code!="auth/user-not-found"){//por si algo mas pasa
      Swal.fire(
        'Error!',
        'Algo ocurrio mal',
        'error',
       
     );
     }
      console.log(error.code);
    }
  }

  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: 'ADMIN',
    };

    return userRef.set(data, { merge: true });
  }
}
