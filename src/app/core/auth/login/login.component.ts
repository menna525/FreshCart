import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { STORED_KEYS } from '../../constants/storedKeys';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly bf = inject(FormBuilder);

  isLoading: WritableSignal<boolean> = signal(false);
  errorMessage: WritableSignal<string> = signal('');


  loginForm!: FormGroup ;
  refSubscription:Subscription = new Subscription()


ngOnInit(): void {
  this.loginFormInitialization();
}
loginFormInitialization(): void {
  this.loginForm= this.bf.group({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)
    ]),
  });
}


  SubmitLoginForm(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.refSubscription.unsubscribe();
      this.refSubscription =   this.authService.sendLoginData(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.isLoading.set(false);
            this.loginForm.reset();
            localStorage.setItem(STORED_KEYS.userToken,res.token)

            this.errorMessage.set('');

            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 1000);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.error.message);
        }
      });

    }
  }
}
