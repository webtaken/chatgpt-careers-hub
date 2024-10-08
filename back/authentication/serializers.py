from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer
from django.contrib.auth import get_user_model
from rest_framework.serializers import ValidationError

# Get the UserModel
UserModel = get_user_model()


class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta:
        extra_fields = ["is_staff"]
        # see https://github.com/iMerica/dj-rest-auth/issues/181
        # UserModel.XYZ causing attribute error while importing other
        # classes from `serializers.py`. So, we need to check whether the auth model has
        # the attribute or not
        if hasattr(UserModel, "USERNAME_FIELD"):
            extra_fields.append(UserModel.USERNAME_FIELD)
        if hasattr(UserModel, "EMAIL_FIELD"):
            extra_fields.append(UserModel.EMAIL_FIELD)
        if hasattr(UserModel, "first_name"):
            extra_fields.append("first_name")
        if hasattr(UserModel, "last_name"):
            extra_fields.append("last_name")
        model = UserModel
        fields = ("pk", *extra_fields)
        read_only_fields = ("email",)


class CustomRegisterSerializer(RegisterSerializer):
    def validate_email(self, email):
        email = super().validate_email(email)
        if UserModel.objects.filter(email=email).exists():
            raise ValidationError(
                "A user is already registered with this e-mail address."
            )
        return email
