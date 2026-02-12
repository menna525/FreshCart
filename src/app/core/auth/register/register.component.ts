import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/authentication/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
private readonly authService = inject(AuthService);
private readonly router = inject(Router);

isLodding: WritableSignal<boolean> = signal(false);
errorMessage:WritableSignal<string> = signal<string>('');






SubmitRegisterForm(): void {
  if (this.registerForm.valid) {
    this.isLodding.set(true);
    this.authService.sendRegisterData(this.registerForm.value).subscribe({
      next: (res) => {
        if(res.message === 'success'){
          this.isLodding.set(false);
          this.registerForm.reset();
          this.errorMessage.set('');
          setTimeout(() => {
            this.router.navigate(['/login']);
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


registerForm: FormGroup = new FormGroup({
  name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  email: new FormControl(null, [Validators.required, Validators.email]),
  password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
  rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
  phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

});


onsubmit(): void {
  console.log(this.registerForm);
}

handleConfirmPassword(group:AbstractControl): any {
  return group.get('repassword')?.value === group.get('password')?.value ? null : { mismatch: true };
}

}
