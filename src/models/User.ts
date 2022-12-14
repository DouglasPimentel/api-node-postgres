export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
};
