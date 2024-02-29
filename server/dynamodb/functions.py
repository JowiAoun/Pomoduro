import os
from dotenv import load_dotenv
from boto3 import client
from mypy_boto3_dynamodb.client import DynamoDBClient

load_dotenv()
DYNAMODB_TABLE_NAME = os.getenv('DYNAMODB_TABLE_NAME')

db: DynamoDBClient = client('dynamodb')

def DynamoDB_GetUser(id):
    res = db.get_item(TableName=DYNAMODB_TABLE_NAME, Key={'id': {'N': id}})
    item = res.get('Item', {})

    user_data = {
        'id': item.get('id', {}).get('N'),
        'username': item.get('username', {}).get('S'),
        'email': item.get('email', {}).get('S'),
    }

    return user_data

def DynamoDB_CreateUser(user_data):
    db.put_item(TableName=DYNAMODB_TABLE_NAME, Item=user_data)

def DynamoDB_DeleteUser(id):
    db.delete_item(TableName=DYNAMODB_TABLE_NAME, Key={'id': {'N': id}})
