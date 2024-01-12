import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  AuthService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    this.AuthService.isAuth$.subscribe(e => {
      if (e) {
        this.router.navigate(["/"]);
      }
    })
  }

  login() {
    this.AuthService.login();
  }

}
