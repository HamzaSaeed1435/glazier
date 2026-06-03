import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://theo-glazier.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# -------- Root --------
def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("message") == "NikoVision API"
    assert data.get("status") == "ok"


# -------- Quotes --------
def test_create_quote_success(client):
    payload = {
        "name": "TEST_Theo Customer",
        "email": "TEST_customer@example.com",
        "phone": "0412 345 678",
        "suburb": "Glenelg",
        "job_type": "Full home window renovation",
        "message": "Need a quote for 10 windows.",
    }
    r = client.post(f"{API}/quotes", json=payload)
    assert r.status_code == 201, r.text
    data = r.json()
    assert "id" in data and isinstance(data["id"], str) and len(data["id"]) >= 8
    assert "created_at" in data
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["job_type"] == payload["job_type"]
    # persistence check
    list_r = client.get(f"{API}/quotes")
    assert list_r.status_code == 200
    ids = [q["id"] for q in list_r.json()]
    assert data["id"] in ids


def test_create_quote_missing_fields(client):
    r = client.post(f"{API}/quotes", json={"name": "X"})
    assert r.status_code == 422


def test_create_quote_invalid_email(client):
    payload = {
        "name": "TEST",
        "email": "not-an-email",
        "phone": "0412345678",
        "job_type": "Repairs",
        "message": "Hi",
    }
    r = client.post(f"{API}/quotes", json=payload)
    assert r.status_code == 422


def test_list_quotes(client):
    r = client.get(f"{API}/quotes")
    assert r.status_code == 200
    assert isinstance(r.json(), list)


# -------- Contact --------
def test_create_contact_success(client):
    payload = {"name": "TEST_C", "email": "TEST_c@example.com", "message": "Hello"}
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 201, r.text
    data = r.json()
    assert "id" in data
    assert data["email"] == payload["email"]


def test_create_contact_invalid_email(client):
    r = client.post(f"{API}/contact", json={"name": "X", "email": "bad", "message": "hi"})
    assert r.status_code == 422
