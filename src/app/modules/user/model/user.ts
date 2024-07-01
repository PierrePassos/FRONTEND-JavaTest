import { Profile } from "../../profile/model/profile.model";

export class User {
    id?: number;
    name: string;
    email: string;
    password: string;
    profile: Profile;
}