import { User } from "next-auth";

export interface AuthRouterReturnMessage {
    successStatus: boolean;
    message: string;
}

export interface AuthRouterReturnUser extends User {
    id: string;
    email: string;
    username?: string;
    image?: string;
}