from rest_framework.serializers import EmailField, Serializer


class SubscribeSerializer(Serializer):
    email = EmailField()
