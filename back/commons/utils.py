from config.settings import env
from django.template.loader import render_to_string
from sib_api_v3_sdk import (
    ApiClient,
    Configuration,
    SendSmtpEmail,
    TransactionalEmailsApi,
)
from sib_api_v3_sdk.rest import ApiException


def get_html_string(template_name, context=None):
    if context is None:
        context = {}
    html_string = render_to_string(template_name, context)
    return html_string


def send_email(html_content: str, subject: str, to: str):
    configuration = Configuration()
    configuration.api_key["api-key"] = env("EMAIL_API_KEY")
    api_instance = TransactionalEmailsApi(ApiClient(configuration))
    subject = "Welcome to ChatGPT Jobs"
    sender = {"name": "chatgpt-jobs", "email": "luckly083@gmail.com"}
    to = [{"email": to}]
    reply_to = {"email": "luckly083@gmail.com"}
    send_smtp_email = SendSmtpEmail(
        to=to,
        reply_to=reply_to,
        html_content=html_content,
        sender=sender,
        subject=subject,
    )

    try:
        api_response = api_instance.send_transac_email(send_smtp_email)
        return api_response
    except ApiException as e:
        return e
