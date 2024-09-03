from json import dumps

from config.settings import env
from django.contrib.auth import get_user_model
from jobs.models import Job
from requests import request

from .models import Order, Plan


def lemonsqueezy_request(method: str, endpoint: str, **kwargs):
    try:
        response = request(
            method=method,
            url=f"{env('LEMONSQUEEZY_API_BASE')}{endpoint}",
            headers={
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json",
                "Authorization": f"Bearer {env('LEMONSQUEEZY_API_KEY')}",
            },
            **kwargs,
        )
        if not response.ok:
            print(
                f"Received not OK response from the lemonsqueezy API:\nStatus: {response.status_code}\nText: {dumps(response.json(),indent=4, default=str)}"
            )
    except Exception as e:
        print(f"Error while doing Lemonsqueezy request {e}")
        return None
    return response


def get_price(price_id):
    price = lemonsqueezy_request(method="GET", endpoint=f"/prices/{price_id}").json()
    return price


def get_variant_prices(variant_id):
    prices = lemonsqueezy_request(
        method="GET", endpoint="/prices", params={"filter[variant_id]": variant_id}
    ).json()
    return prices


def get_product(product_id: int):
    product = lemonsqueezy_request(
        method="GET", endpoint=f"/products/{product_id}"
    ).json()
    return product


def get_subscription(subscription_id):
    subscription = lemonsqueezy_request(
        method="GET", endpoint=f"/subscriptions/{subscription_id}"
    ).json()
    return subscription


def get_order(order_id):
    order = lemonsqueezy_request(method="GET", endpoint=f"/orders/{order_id}").json()
    return order


def process_webhook(webhook: dict):
    if webhook["data"]:
        if webhook["meta"]["event_name"].startswith("subscription_payment_"):
            # Save subscription invoices; eventBody is a SubscriptionInvoice
            pass
        elif webhook["meta"]["event_name"].startswith("subscription_"):
            # Save subscription events; obj is a Subscription
            pass

        elif webhook["meta"]["event_name"].startswith("order_"):
            # Save orders; eventBody is a "Order"
            attributes = webhook["data"]["attributes"]
            variant_id = str(attributes["first_order_item"]["variant_id"])
            # We assume that the plan table is up to date
            plan = Plan.objects.filter(variant_id=variant_id).first()

            if plan is None:
                raise Exception(
                    f"no single payment product found with with the variant id {variant_id}"
                )

            price = attributes["first_order_item"]["price"]
            job_id = webhook["meta"]["custom_data"]["job_id"]
            order, created = Order.objects.update_or_create(
                lemonsqueezy_id=str(webhook["data"]["id"]),
                defaults={
                    "lemonsqueezy_id": str(webhook["data"]["id"]),
                    "order_number": int(attributes["order_number"]),
                    "order_id": int(attributes["first_order_item"]["order_id"]),
                    "name": str(attributes["user_name"]),
                    "email": str(attributes["user_email"]),
                    "status": str(attributes["status"]),
                    "status_formatted": str(attributes["status_formatted"]),
                    "refunded": str(attributes["refunded"]),
                    "refunded_at": str(attributes["refunded_at"]),
                    "price": str(price) if price else "",
                    "receipt": str(attributes["urls"]["receipt"]),
                    "order_item_id": attributes["first_order_item"]["id"],
                    "user": get_user_model()
                    .objects.filter(pk=webhook["meta"]["custom_data"]["user_id"])
                    .first(),
                    "plan": plan,
                },
            )

            print(f"Order {order} created" if created else f"Order {order} updated")
            job = Job.objects.filter(id=job_id).first()
            if job:
                job.visible = True
                job.verified = True
                job.save(update_fields=["visible", "verified"])
                print(f"Job {job} is now visible")
            else:
                print(f"Job id {job_id} was not found")

        elif webhook["meta"]["event_name"].startswith("license_"):
            # Save license keys; eventBody is a "License key"
            pass
