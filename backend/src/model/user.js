const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');

class User {
    constructor(id, email, name, imageUrl, provider, providerId, createDateTime = null) {
        this.id = id != null ? id : uuidv4();
        this.email = email;
        this.name = name;
        this.imageUrl = imageUrl;
        this.provider = provider;
        this.providerId = providerId;
        this.createDateTime = createDateTime != null ? createDateTime : (new Date()).valueOf();
    }

    generateJWT() {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign({
            email: this.email,
            id: this.id,
            exp: parseInt((expirationDate.getTime() + process.env.JWT_TOKEN_EXPIRATION_MSEC) / 1000, 10),
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

module.exports = User;
