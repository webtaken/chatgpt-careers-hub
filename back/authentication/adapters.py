from allauth.account.utils import user_email
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.contrib.auth import get_user_model


class SocialAccountAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin):
        # If social account is already linked, nothing to do
        if sociallogin.is_existing:
            return

        email_address = user_email(sociallogin.user)
        if not email_address:
            return

        User = get_user_model()
        try:
            existing_user = User.objects.get(email__iexact=email_address)
        except User.DoesNotExist:
            return

        # Link the new social account to the existing user
        sociallogin.connect(request, existing_user)
