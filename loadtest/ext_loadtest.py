# Locust load test

from locust import HttpUser, task

class LoadTest(HttpUser):
    @task
    def get_fixed_zip_code(self):
      headers = {}
      payload = {}
      self.client.get("/location?cep=01310100", headers=headers, data=payload)
