import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '@app/shared/models/user.interface';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmpass: new FormControl(''),
  });
  constructor(private authSvc: AuthService, private router: Router) {}

  async onGoogleLogin() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
      console.log(error);
    }
  }

  async onLogin() {
    const { email, password,confirmpass } = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email, password,confirmpass);
      if (user) {
        this.checkUserIsVerified(user);
      } 
    } catch (error) {
       Swal.fire(
         'Error!',
         'Do you want to continue',
         'error',
        
      );
      console.log(error);
    }
  }

  private checkUserIsVerified(user: User) {
    if (user && user.emailVerified) {
      this.router.navigate(['/home']);
    } else if (user) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/register']);
    }
  }

  
}
