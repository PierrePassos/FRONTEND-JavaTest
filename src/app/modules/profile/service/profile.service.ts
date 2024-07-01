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

    getByName(name: string) {
        return this.http.get(`${this.apiUrl}/name/${name}`);
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

    //Profile só pode ser deletado se não estiver referenciado em nenhum Usuario.
    delete(id: number) {
        return this.http.delete(this.apiUrl, id);
    }

}