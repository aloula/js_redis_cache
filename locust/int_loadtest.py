# Locust load test

from locust import HttpUser, task
from random import randint


class LoadTest(HttpUser):
    @task
    def send_form(self):
      headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      num = randint(1, 100)
      payload = 'number=' + str(num)
      self.client.post("/", headers=headers, data=payload)
