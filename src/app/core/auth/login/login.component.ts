import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from 'express';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
private readonly authService = inject(AuthService);
private readonly router = inject(Router);

isLodding: WritableSignal<boolean> = signal(false);
errorMessage:WritableSignal<string> = signal<string>('');






SubmitLoginForm(): void {
  if (this.loginForm.valid) {
    this.isLodding.set(true);
    this.authService.sendLoginData(this.loginForm.value).subscribe({
      next: (res) => {
        if(res.message === 'success'){
          this.isLodding.set(false);
          this.loginForm.reset();
          this.errorMessage.set('');
          setTimeout(() => {
            this.router.navigate(['/home']);
          },1000);
        }
      },
      error: (err:HttpErrorResponse) => {
          this.isLodding.set(false);
        this.errorMessage.set(err.error.message);
      }
    })
  }
}


loginForm: FormGroup = new FormGroup({
  email: new FormControl(null, [Validators.required, Validators.email]),
  password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
});


onsubmit(): void {
  console.log(this.loginForm);
}


}
