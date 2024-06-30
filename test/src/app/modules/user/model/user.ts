import { Profile } from "../../profile/model/profile.model";

export class UserModel {
    id?: number;
    name: string;
    email: string;
    password: string;
    profile: Profile;
}