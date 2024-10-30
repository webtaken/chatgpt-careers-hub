from rest_framework.serializers import EmailField, IntegerField, Serializer


class SubscribeSerializer(Serializer):
    email = EmailField()


class CountSubscriptionsSerializer(Serializer):
    count = IntegerField()
