# Locust load test

from locust import HttpUser, task


class LoadTest(HttpUser):
    @task
    def send_form(self):
      headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      payload = 'number=100'
      self.client.post("/", headers=headers, data=payload)
