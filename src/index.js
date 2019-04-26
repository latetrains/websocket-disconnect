let AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient();

const OK = 200;
const INTERNAL_SERVER_ERROR = 500;

exports.handler = async (event) => {
    const connectionId = event.requestContext.connectionId;

    return new Promise((resolve, reject) => {
        this.removeItemFromDynamo({
            connectionid: connectionId
        }).then(() => {
            resolve({
                statusCode: OK
            });
        }).catch(() => {
            reject({
                statusCode: INTERNAL_SERVER_ERROR
            })
        });
    });
};

exports.removeItemFromDynamo = item => {
    return dynamo.delete({
        TableName: process.env.TABLE_NAME,
        Key: item,
    }).promise();
};