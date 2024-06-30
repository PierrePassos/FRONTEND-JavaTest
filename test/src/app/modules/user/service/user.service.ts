import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpService } from "../../../services/http.service";
import { User } from "../model/user";

@Injectable({ providedIn: 'root' })
export class UserService {

    private apiUrl = 'user';

    constructor(private http: HttpService) { }

    getById(id: number) {
        return this.http.get(`${this.apiUrl}/${id}`);
    }

    // getByName(name: string) {
    //     return this.http.get(`${this.apiUrl}/name/${name}`);
    // }

    create(user: User) {
        return this.http.post(`${this.apiUrl}`, user);
    }

    getAll() {
        return this.http.get(`${this.apiUrl}`);
    }

    update(user: User) {
        return this.http.put(this.apiUrl, user.id, user);
    }

    delete(id: number) {
        return this.http.delete(this.apiUrl, id);
    }

    getPaginator(pageIndex: number, pageSize: number, search: string): Observable<{ users: User[], total: number }> {
        let params = new HttpParams()
            .set('page', pageIndex.toString())
            .set('size', pageSize.toString())
            .set('search', search);

        return this.http.get<{ users: User[], total: number }>(`${this.apiUrl}/paginator`, { params });
    }

}