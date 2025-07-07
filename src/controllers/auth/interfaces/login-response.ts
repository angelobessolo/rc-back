import { UserDetail } from "src/controllers/user/entities/user-detail.entity";
import { User } from "../entities/user.entity";

export interface LoginResponse{
    user: User;
    userDetail: UserDetail;
    token: string;
}

