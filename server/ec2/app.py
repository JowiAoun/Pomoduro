from flask import Flask
from flask_graphql import GraphQLView
from graphene import ObjectType, Schema, String, Int, Mutation, ID, Field, Argument

from dynamodb.functions import DynamoDB_CreateUser, DynamoDB_GetUser, DynamoDB_DeleteUser

# ? -- Set up app
app = Flask(__name__)


# ? -- Class definitions
class UserType(ObjectType):
    id = ID()
    username = String()
    email = String()


# ? -- Queries
class GetUser(ObjectType):
    user = Field(UserType,
                 id=Argument(ID, required=True))

    @staticmethod
    def resolve_user(self, info, id):
        return DynamoDB_GetUser(id)


# ? -- Mutations
class CreateUser(Mutation):
    class Arguments:
        username = String(required=True)
        email = String(required=True)

    success = Int()

    @staticmethod
    def mutate(self, info, username, email):
        user_data = {
            'id': {'N': '1'},
            'username': {'S': username},
            'email': {'S': email}}
        DynamoDB_CreateUser(user_data)
        return CreateUser(success=1)

class DeleteUser(Mutation):
    class Arguments:
        id = ID(required=True)

    success = Int()

    @staticmethod
    def mutate(self, info, id):
        DynamoDB_DeleteUser(id)
        return DeleteUser(success=1)


# ? -- Schema
class Query(GetUser, ObjectType):
    pass

class Mutation(ObjectType):
    create_user = CreateUser.Field()
    delete_user = DeleteUser.Field()

schema = Schema(query=Query, mutation=Mutation)
app.add_url_rule("/graphql", view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True),)


# ? -- App execution
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
