import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { environment } from "../environment";

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    base_url = environment.BASE_URL + environment.API_URL;

    constructor(private http: HttpClient) {
    }

    private extractData<T>(res: HttpResponse<T>): { data: T, message: string } {
        return { data: res.body, message: null };
    }

    private handleError(error: any): Observable<any> {
        console.error('Erro na requisição:', error);
        return of({ success: false, data: {}, error, timestamp: Date.now() });
    }

    get<T>(url: string, id?: any): Observable<{ success: boolean, data?: T, error?: any, timestamp: number }> {
        const endpoint = id ? `${this.base_url}/${url}/${id}` : `${this.base_url}/${url}`;
        return this.http.get<T>(endpoint, { headers: this.headers })
            .pipe(
                catchError(this.handleError),
                map((res: T) => ({ success: true, data: res, error: undefined, timestamp: Date.now() })),
            );
    }

    post<T>(url: string, body: any): Observable<{ success: boolean, data?: T, error?: any, timestamp: number }> {
        const endpoint = `${this.base_url}/${url}`;
        return this.http.post<T>(endpoint, body, { headers: this.headers })
          .pipe(
            catchError(this.handleError),
            map((res: T) => ({ success: true, data: res, error: undefined, timestamp: Date.now() }))
          );
      }

    put<T>(url: string, id: number, body: any): Observable<{ success: boolean, data?: T, error?: any, timestamp: number }> {
        const endpoint = `${this.base_url}/${url}/${id}`;
        return this.http.put<T>(endpoint, body, { headers: this.headers })
            .pipe(
                catchError(this.handleError),
                map((res: T) => ({ success: true, data: res, error: undefined, timestamp: Date.now() }))
            );
    }

    delete<T>(url: string, id: any): Observable<T> {
        const endpoint = `${this.base_url}/${url}/${id}`;
        return this.http.delete<T>(endpoint, { headers: this.headers });
    }
}