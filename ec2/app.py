from flask import Flask
from flask_graphql import GraphQLView
import graphene

app = Flask(__name__)

class Query(graphene.ObjectType):
    hello = graphene.String(description="Simple GraphQL Query", default_value="Hello, GraphQL!")


schema = graphene.Schema(query=Query)

app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True),
)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
