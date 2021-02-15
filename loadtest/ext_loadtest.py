# Locust load test

from locust import HttpUser, task


class LoadTest(HttpUser):
    @task
    def send_form(self):
      headers = {}
      payload = {}
      self.client.get("/book?isbn=8535914846", headers=headers, data=payload)
