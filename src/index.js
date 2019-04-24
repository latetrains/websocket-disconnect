let AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = 'Latetrains';
const OK = 200;

exports.handler = async (event) => {
    const connectionId = event.requestContext.connectionId;

    return new Promise((resolve) => {
        this.removeItemFromDynamo({
            connectionid: connectionId
        }).then(() => {
            resolve({
                statusCode: OK
            });
        });
    });
};

exports.removeItemFromDynamo = item => {
    return dynamo.delete({
        TableName: tableName,
        Key: item,
    }).promise();
};