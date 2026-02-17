import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { STORED_KEYS } from '../../constants/storedKeys';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const plat_id = inject(PLATFORM_ID)


  if(isPlatformBrowser(plat_id)){
    const token = localStorage.getItem(STORED_KEYS.userToken);
    if(token){
      if(req.url.includes('cart') || req.url.includes('orders')){
        req = req.clone({
          setHeaders:{
            token:token,
          }
        })
      }
    }
  }




  return next(req);
};
