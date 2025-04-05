export interface User {
     id          :string;
     email       :string;
     passwordHash:string;
     firstName   :string;
     lastName    :string;
     role        :string;
    createdAt    :Date;
     lastLogin   :Date;
    isActive     :string;
    status       :number;
    lastSeen     :Date;
}
