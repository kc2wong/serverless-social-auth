const User = require('../model/user')

class UserRepository {
    get _baseParams() {
        return {
            TableName: `users-${process.env.STAGE}`
        };
    }

    constructor(documentClient) {
        this._documentClient = documentClient;
    }

    async getById(id) {
        const params = this._createParamObject({
            IndexName: `id-index-${process.env.STAGE}`,
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeNames: {
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": id
            }
        });        
        const response = await this._documentClient.query(params).promise();
        return this._jsonToUser(response.Count > 0 ? response.Items[0] : null);
    }

    async getByEmail(email) {
        const params = this._createParamObject({ Key: { email } });
        const response = await this._documentClient.get(params).promise();

        return this._jsonToUser(response.Item);
    }

    async put(user) {
        const params = this._createParamObject({ Item: user });
        await this._documentClient.put(params).promise();
        return this._jsonToUser(user);
    }

    _createParamObject(additionalArgs = {}) {
        return Object.assign({}, this._baseParams, additionalArgs);
    }

    _jsonToUser(json) {
        if (json == null) {
            return null
        } else {
            return new User(json.id, json.email, json.name, json.imageUrl, json.provider, json.providerId)
        }
    }
}

module.exports.UserRepository = UserRepository;