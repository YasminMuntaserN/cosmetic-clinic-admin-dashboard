import {UserRole} from "./Permission.ts";

export interface User {
     id          :string;
     email       :string;
     passwordHash:string;
     firstName   :string;
     lastName    :string;
     role        :UserRole;
    createdAt    :Date;
     lastLogin   :Date;
    isActive     :string;
    status       :number;
    lastSeen     :Date;
}
