import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export class BcryptAdapter {
    static hash (password: string): string {
        const salt = genSaltSync(10);
        return hashSync(password, salt);
    }

    static compare (password: string, hashed: string): boolean {
        return compareSync(password, hashed); // Si hay un match, regresa true
    }
}