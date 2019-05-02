import { DynamoDB } from 'aws-sdk';

import { User } from '../model/user';

export class UserRepository {
    _documentClient: DynamoDB.DocumentClient

    constructor(documentClient: DynamoDB.DocumentClient) {
        this._documentClient = documentClient
    }

    async getById(id: string): Promise<User> {
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
        const response = await this._documentClient.query(params as DynamoDB.DocumentClient.GetItemInput).promise();
        return this._jsonToUser(response.Count > 0 ? response.Items[0] : null);
    }

    async getByEmail(email: string): Promise<User> {
        const params = this._createParamObject({ Key: { email } });
        const response = await this._documentClient.get(params as DynamoDB.DocumentClient.GetItemInput).promise();

        return this._jsonToUser(response.Item);
    }

    async put(user: User) {
        const params = this._createParamObject({ Item: user });
        await this._documentClient.put(params as DynamoDB.DocumentClient.PutItemInput).promise();
        return this._jsonToUser(user);
    }

    get _baseParams(): object {
        return {
            TableName: `users-${process.env.STAGE}`
        };
    }

    _createParamObject(additionalArgs: object = {}): object {
        return Object.assign({}, this._baseParams, additionalArgs);
    }

    _jsonToUser(json: object): User {
        if (json == null) {
            return null
        } else {
            return new User(json['id'], json['email'], json['name'], json['imageUrl'], json['provider'], json['providerId'], json['createDateTime'])
        }
    }
}
