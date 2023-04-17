import { Observable } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders, HttpXhrBackend } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ConfigInstance } from "./service-base-model";
import { throwError } from 'rxjs';
export class ViewResult<T> {
    _page: number = 0;
    _pageSize: number = 0;
    _total: number = 0;
    items: T[] = [];
}

@Injectable()
export abstract class ServiceBase<TResultResponse> {
    
    protected servicesConfig;
    public http: HttpClient;
    bearerToken: string ='';
    reloadTokenURL: string;
    headers = new HttpHeaders;

    constructor(
        config: ConfigInstance
    ) { 
        this.servicesConfig = config;
        this.http = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
        
        this.reloadTokenURL = `${environment.url_reload}`;
    }
   
    insert(post: object): Observable<string> {
        this.headers = this.getHeaderToken();
        return this.http.post(`${this.servicesConfig.endpoint}/insert`,
        JSON.stringify(post), {
            headers: this.headers,
            observe: 'response'
        }).pipe(
            map(this.extractData),
            catchError(this.serviceError.bind(this))
        );
    }
    
    update(put: object): Observable<string> {
        this.headers = this.getHeaderToken();
        return this.http.put(`${this.servicesConfig.endpoint}/update`,
        JSON.stringify(put), {
            headers: this.headers,
            observe: 'response'
        }).pipe(
            map(this.extractData),
            catchError(this.serviceError.bind(this))
        );
    }

    getByID(id: any): Observable<TResultResponse> {
        this.headers = this.getHeaderToken();
        let endpoint = this.servicesConfig.endpoint + `/id/${id}`;
        
        return this.http.get(endpoint, {headers: this.headers }).pipe(
            map(this.extractData),
            catchError(this.serviceError.bind(this))
        );
    }

    getByFilter(filter: object): Observable<ViewResult<TResultResponse>> {
        this.headers = this.getHeaderToken();
        let endpoint = this.servicesConfig.endpoint + "/GetByFilter";
        let properties_arrays = Object.getOwnPropertyNames(filter);
        let queryString = "";
        for (var name of properties_arrays) {
            queryString = queryString + name.toLowerCase() + "=" + Reflect.get(filter, name) + "&";
        }
        
        let timeStamp = +new Date();
        queryString = queryString + timeStamp;
        const params = new HttpParams({ fromString: queryString });

        return this.http.get(endpoint, { params: params, headers: this.headers }).pipe(
            map(this.extractData),
            catchError(this.serviceError.bind(this))
        );
    }
    
    delete(id: string): Observable<string> {
        this.headers = this.getHeaderToken();
        let endpoint = this.servicesConfig.endpoint + `/id/${id}`;
        
        return this.http.delete(endpoint, { headers: this.headers }).pipe(
            map(this.extractData),
            catchError(this.serviceError.bind(this))
        );
    }    

    login(post: object): Observable<string> {
        let endpoint = `${this.servicesConfig.endpoint}/login`;
        this.headers = new HttpHeaders()
        .set('Content-Type', 'application/json') 

        return this.http.post(endpoint,
        JSON.stringify(post), {
            headers: this.headers,
            observe: 'response'
        }).pipe(
            map(this.extractData),
            catchError(this.serviceError.bind(this))
        );
    }

    createAccount(post: object): Observable<string> {
        this.headers = this.getHeaderToken();
        return this.http.post(`${this.servicesConfig.endpoint}/create-account`,
        JSON.stringify(post), {
            headers: this.headers,
            observe: 'response'
        }).pipe(
            map(this.extractData),
            catchError(this.serviceError.bind(this))
        );
    }  
      
    recoveryAccount(put: object): Observable<string> {
        this.headers = this.getHeaderToken();
        return this.http.put(`${this.servicesConfig.endpoint}/recovery-account`,
        JSON.stringify(put), {
            headers: this.headers,
            observe: 'response'
        }).pipe(
            map(this.extractData),
            catchError(this.serviceError.bind(this))
        );
    }    

    getDashboard(entity: string, field: string, join: string, fieldjoin:string): Observable<TResultResponse[]> {
        this.headers = this.getHeaderToken();
        let endpoint = this.servicesConfig.endpoint + "/GetDashBoard";
        
        let queryString = "";

        queryString = queryString + "entity" + "=" + entity + "&";
        queryString = queryString + "field" + "=" + field + "&";
        queryString = queryString + "join" + "=" + join + "&";
        queryString = queryString + "fieldjoin" + "=" + fieldjoin + "&";

        const params = new HttpParams({ fromString: queryString });

        return this.http.get(endpoint, { params, headers: this.headers }).pipe(
            map(this.extractData),
            catchError(this.serviceError.bind(this))
        );
    }        
    
    protected serviceError(response: any) {
        
        let errorMessage = '';
        if (response.status == "0")
        {
            errorMessage = "Erro ao se conectar à base de dados!";
            //this.bearerToken = '';
            //this.deleteCurrentUser();
            //window.location.href = this.reloadTokenURL;
        }

        if (response.status == "401")
        {
            this.bearerToken = '';
            this.deleteCurrentUser();
            window.location.href = this.reloadTokenURL;
        }

        if (response.status == "403")
           errorMessage = 'Requisição não permitida ou sem autorização';   

        if (response.status == "405")
           errorMessage = response.error ? response.error.error.message : "Erro interno no servidor!"
        
        if (response.status == "500")    
           errorMessage = response.error ? response.error.Message : "Erro interno no servidor!"
        

           if (response.status == "400") {
            if(response.error.data.errors != undefined){
                   response.error.data.errors.forEach(function (item: { message: string; }) {
                   errorMessage += item + '</br>';
                   });
            }
            else {
                errorMessage = 'Erro interno no servidor!';
            }
        }
        
        return throwError(errorMessage);
    }
    
    protected extractData(response: any) {
        return response.data || response.body.data || {};
    }

    getCurrentUser(): void {
        var result = localStorage.getItem('currentUser');
        if (result == null)
          return;

        return JSON.parse(result);
    }

    deleteCurrentUser(): void {
        localStorage.removeItem('currentUser');
            }


    getHeaderToken(): any {
        const currentUser = this.getCurrentUser();
        var token: string = '';

        if (currentUser != null)
        {
           token = currentUser['token'];

           return new HttpHeaders()
           .set('Content-Type', 'application/json; charset=utf-8') 
           .set('Authorization', `Basic ${ token }`)
           .set('token', ` ${token}`);
        }
        
        return new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8') 
        .set('Authorization', `Basic`)
        .set('token', ``)
        ;
   }

}
