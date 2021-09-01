import { Injectable } from '@nestjs/common';

export type User = {
    id: number;
    name: string;
    username: string;
    password: string;
};
@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id: 1,
            name: 'Tafowo Cedric',
            username: 'Cedric',
            password: 'password',
        },
        {
            id: 2,
            name: 'Vegas Cedric',
            username: 'Vegas',
            password: 'password',
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find((user) => user.username === username);
    }
}
