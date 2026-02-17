import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/authentication/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit {
private readonly authService = inject(AuthService);
private readonly router = inject(Router);
private readonly fb = inject(FormBuilder);

isLoding: WritableSignal<boolean> = signal(false);
errorMessage:WritableSignal<string> = signal<string>('');






SubmitRegisterForm(): void {

  if (this.registerForm.valid) {

    this.isLoding.set(true);

    this.authService.sendRegisterData(this.registerForm.value).subscribe({
      next: (res) => {
        if(res.message === 'success'){
          this.isLoding.set(false);
          this.registerForm.reset();
          this.errorMessage.set('');
          setTimeout(() => {
            this.router.navigate(['/login']);
          },1000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      },
      error: (err:HttpErrorResponse) => {
        this.isLoding.set(false);
        this.errorMessage.set(err.error.message);
      }
    });

  } else {

    // 👇 دي الإضافة المهمة
    this.registerForm.markAllAsTouched();

  }
}






registerForm!:FormGroup ;

ngOnInit(): void {
  this.registerFormInitialization();
}

registerFormInitialization(): void {
  this.registerForm= this.fb.group({
  name: [null , [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  email:[null ,[Validators.required, Validators.email]] ,
  password: [null ,[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]],
  rePassword:[null ,[Validators.required]] ,
  phone: [null ,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
},{ validators: this.handleConfirmPassword })

}



onsubmit(): void {
  console.log(this.registerForm);
}

handleConfirmPassword(group: AbstractControl) {
  const password = group.get('password')?.value;
  const rePassword = group.get('rePassword')?.value;

  if (password === rePassword) {
    return null;
  } else {
    group.get('rePassword')?.setErrors({ mismatch: true });
    return { mismatch: true };
  }
}
showFirstError() :void {
  const controls = this.registerForm.controls;
  for (const controlName in controls) {
    const control = controls[controlName];
    if (control.invalid) {
      control.markAsTouched();
      break;
    }
  }
}

}
