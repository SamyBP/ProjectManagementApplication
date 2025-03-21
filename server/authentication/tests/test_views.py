import random
import secrets
import string
from datetime import datetime, timedelta

import jwt
import pytest
from django.urls import reverse
from rest_framework.test import APIClient

from conftest import TokenResponse, ObtainTokenRequest
from constants import Endpoints


@pytest.mark.django_db
def test_whenObtainPairValidCredentials_returnsAccessRefresh(api_client: APIClient, token_request: ObtainTokenRequest):
    url = reverse(Endpoints.TOKEN)
    response = api_client.post(url, data=token_request.__dict__)

    assert response.status_code == 200
    assert "access" in response.data
    assert "refresh" in response.data


@pytest.mark.django_db
def test_whenObtainTokenPairWrongCredentials_returnsUnauthorized(api_client: APIClient):
    url = reverse(Endpoints.TOKEN)
    response = api_client.post(url, data={"username": "wrong", "password": "wrong"})

    assert response.status_code == 401
    assert "detail" in response.data


@pytest.mark.django_db
def test_whenObtainTokenPairInvalidBodyStructure_returnsBadRequest(api_client: APIClient):
    url = reverse(Endpoints.TOKEN)
    no_body_response = api_client.post(url, data={})
    unexpected_body_response = api_client.post(url, data={"wrong": "will result in 400"})

    assert no_body_response.status_code == 400
    assert unexpected_body_response.status_code == 400


@pytest.mark.django_db
def test_whenVerifyWithValidAccessToken_returnsOK(api_client: APIClient, token: TokenResponse):
    url = reverse(Endpoints.TOKEN_VERIFY)
    response = api_client.post(url, data={'token': token.access})

    assert response.status_code == 200


@pytest.mark.django_db
def test_whenVerifyInvalidBody_returnsBadRequest(api_client: APIClient, token: TokenResponse):
    url = reverse(Endpoints.TOKEN_VERIFY)

    response = api_client.post(url, data={'access': token.access})

    assert response.status_code == 400


def test_whenVerifyInvalidToken_returnsUnauthorized(api_client: APIClient):
    url = reverse(Endpoints.TOKEN_VERIFY)
    bad_token = ''.join(random.choices(string.ascii_letters, k=64))
    response = api_client.post(url, data={'token': bad_token})

    assert response.status_code == 401


@pytest.mark.django_db
def test_whenVerifyInvalidSignature_returnsUnauthorized(api_client: APIClient):
    url = reverse(Endpoints.TOKEN_VERIFY)
    payload = {'user_id': 1, 'exp': datetime.now() + timedelta(minutes=1)}
    secret = secrets.token_hex(20)
    invalid_token = jwt.encode(payload=payload, key=secret, algorithm='HS256')

    response = api_client.post(url, data={'token': invalid_token})

    assert response.status_code == 401
