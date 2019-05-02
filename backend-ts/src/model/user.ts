import * as uuidv4 from 'uuid/v4';
import * as jwt from 'jsonwebtoken';

export class User {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
    provider: string;
    providerId: string;
    createDateTime: number;

    constructor(id: string, email: string, name: string, imageUrl: string, provider: string, providerId: string, createDateTime?: Date) {
        this.id = id != null ? id : uuidv4();
        this.email = email;
        this.name = name;
        this.imageUrl = imageUrl;
        this.provider = provider;
        this.providerId = providerId;
        this.createDateTime = (createDateTime != null ? createDateTime : (new Date())).valueOf();
    }

    generateJWT() {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign({
            email: this.email,
            id: this.id,
            exp: expirationDate.getTime() + Number.parseInt(process.env.JWT_TOKEN_EXPIRATION_MSEC) / 1000,
        }, process.env.JWT_TOKEN_SECRET);
    }

    toAuthJSON() {
        return {
            id: this.id,
            email: this.email,
            token: this.generateJWT(),
        };
    }
}
