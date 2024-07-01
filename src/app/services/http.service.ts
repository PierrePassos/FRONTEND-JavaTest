import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
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

  get<T>(url: string, params?: any): Observable<T> {
    let endpoint = `${this.base_url}/${url}`;
    let options = { headers: this.headers };

    if (params) {
      let queryParams = new HttpParams();
      Object.keys(params).forEach(key => {
        queryParams = queryParams.append(key, params[key]);
      });
      options['params'] = queryParams;
    }

    return this.http.get<T>(endpoint, options);
  }

  post<T>(url: string, body: any) {
    const endpoint = `${this.base_url}/${url}`;
    return this.http.post<T>(endpoint, body, { headers: this.headers })
    //   .pipe(
    //     catchError(this.handleError),
    //     map((res: T) => ({ success: true, data: res, error: undefined, timestamp: Date.now() }))
    //   );
  }

  put<T>(url: string, id: number, body: any) {
    const endpoint = `${this.base_url}/${url}/${id}`;
    return this.http.put<T>(endpoint, body, { headers: this.headers });
  }

  delete<T>(url: string,id: any): Observable<T> {
    const endpoint = `${this.base_url}/${url}/${id}`;
  
    return this.http.delete<T>(endpoint, { headers: this.headers })
      .pipe(
        catchError(error => {
          console.error('Error deleting:', error);
          return throwError(error);
        })
      );
  }
}