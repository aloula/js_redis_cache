# Locust load test

from locust import HttpUser, task, between


class LoadTest(HttpUser):
    wait_time = between(1, 2.5)
    @task
    def send_form(self):
      headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      payload = 'number=100'
      self.client.post("/", headers=headers, data=payload)
