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


# -------- Reviews --------
def test_create_review_success(client):
    payload = {
        "name": "TEST_Reviewer",
        "suburb": "Glenelg",
        "rating": 5,
        "text": "Brilliant job, would highly recommend.",
    }
    r = client.post(f"{API}/reviews", json=payload)
    assert r.status_code == 201, r.text
    data = r.json()
    assert "id" in data and isinstance(data["id"], str) and len(data["id"]) >= 8
    assert data["name"] == payload["name"]
    assert data["suburb"] == payload["suburb"]
    assert data["rating"] == 5
    assert data["text"] == payload["text"]
    assert data["published"] is True
    assert "created_at" in data


def test_create_review_rating_out_of_range_high(client):
    r = client.post(f"{API}/reviews", json={"name": "TEST_X", "rating": 6, "text": "good"})
    assert r.status_code == 422


def test_create_review_rating_out_of_range_low(client):
    r = client.post(f"{API}/reviews", json={"name": "TEST_X", "rating": 0, "text": "good"})
    assert r.status_code == 422


def test_create_review_missing_fields(client):
    r = client.post(f"{API}/reviews", json={"name": "TEST_only"})
    assert r.status_code == 422


def test_create_review_text_too_short(client):
    r = client.post(f"{API}/reviews", json={"name": "TEST_X", "rating": 4, "text": "hi"})
    assert r.status_code == 422


def test_list_reviews_sorted_desc(client):
    # Create two reviews, then ensure newest first
    import time
    r1 = client.post(f"{API}/reviews", json={"name": "TEST_A", "rating": 4, "text": "First review here"})
    assert r1.status_code == 201
    time.sleep(1.1)
    r2 = client.post(f"{API}/reviews", json={"name": "TEST_B", "rating": 5, "text": "Second review here"})
    assert r2.status_code == 201
    id1, id2 = r1.json()["id"], r2.json()["id"]

    lst = client.get(f"{API}/reviews")
    assert lst.status_code == 200
    data = lst.json()
    assert isinstance(data, list)
    ids = [x["id"] for x in data]
    assert id1 in ids and id2 in ids
    # second (newer) must appear before first
    assert ids.index(id2) < ids.index(id1)
    # all returned should be published=true
    assert all(x.get("published", True) is True for x in data)
