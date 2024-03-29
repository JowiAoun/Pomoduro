import graphene
import graphene_django
from .models import User

class UserType(graphene_django.DjangoObjectType):
	class Meta:
		model = User
		fields = '__all__'

class CreateUser(graphene.Mutation):
	user = graphene.Field(UserType)

	class Arguments:
		username = graphene.String()
		email = graphene.String()

	def mutate(self, info, username, email):
		user = User(username=username, email=email)
		user.save()
		return CreateUser(user=user)

class Query(graphene.ObjectType):
	users = graphene.List(UserType)

	def resolve_users(self, info):
		return User.objects.all()

class Mutation(graphene.ObjectType):
	create_user = CreateUser.Field()
