import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";
import { Store } from "@ngrx/store";

import { Injectable } from "@angular/core";
import { AuthState } from "../auth/store/auth.reducers";
import { AppState } from "../store/app.reducers";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<AppState>){
    }

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

        console.log('Intercepted!', req);
        return this.store.select('auth')
            //.take(1)
            .switchMap((authState: AuthState) => {
            const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
            return next.handle(copiedReq);
        });
    }
}
