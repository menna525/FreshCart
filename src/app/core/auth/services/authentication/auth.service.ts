import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import {UserDataResponse } from '../../models/user/user-data.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpclient = inject(HttpClient);
  sendRegisterData (userdata:object) : Observable<UserDataResponse> {
    return this.httpclient.post<UserDataResponse>(environment.baseUrl + 'auth/signup',userdata);
  }
  sendLoginData (userdata:object) : Observable<UserDataResponse> {
    return this.httpclient.post<UserDataResponse>(environment.baseUrl + 'auth/signin',userdata);
  }
}
