import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import {UserDataResponse } from '../../models/user/user-data.interface';
import { STORED_KEYS } from '../../../constants/storedKeys';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpclient = inject(HttpClient);
  private readonly router = inject(Router);

  userDataDecode :any = null;
  sendRegisterData (userdata:object) : Observable<UserDataResponse> {
    return this.httpclient.post<UserDataResponse>(environment.baseUrl + 'auth/signup',userdata);
  }
  sendLoginData (userdata:object) : Observable<UserDataResponse> {
    return this.httpclient.post<UserDataResponse>(environment.baseUrl + 'auth/signin',userdata);
  }
  decodedUseToken():void{
    if (localStorage.getItem(STORED_KEYS.userToken)){
      this.userDataDecode=jwtDecode(localStorage.getItem(STORED_KEYS.userToken)!);
      console.log(this.userDataDecode,"user_data")

    }
  }

  userLogOut(): void{
    localStorage.removeItem(STORED_KEYS.userToken);
    this.router.navigate(['/login']);
  }
}
