import { Injectable } from "@angular/core";
import { Profile } from "../model/profile.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpService } from "../../../services/http.service";

@Injectable({ providedIn: 'root' })
export class ProfileService {

    private apiUrl = 'profile';

    constructor(private http: HttpService) { }

    getById(id: number) {
        return this.http.get(`${this.apiUrl}/${id}`);
    }

    create(profile: Profile) {
        return this.http.post(`${this.apiUrl}`, profile);
    }

    getAll() {
        return this.http.get(`${this.apiUrl}`);
    }

    update(profile: Profile) {
        return this.http.put(this.apiUrl, profile.id, profile);
    }

    // delete(id: number): Observable<void> {
    //     const url = `${this.apiUrl}/${id}`;
    //     return this.http.delete<void>(url);
    // }

}