import {User} from "./User.ts";

export interface AuthRequest{
    email: string;
    password: string;
}

export interface AuthResponse{
refreshToken :string;
accessToken  :string;
 userDTO     :User;
}

export interface TokenResponse
{
accessToken  : string ;
refreshToken : string ;
}