# Locust load test

from locust import HttpUser, task
from random import choice

name_list = ["alex", "adriana", "maria", "caio", "julia", "antonio", "roger", "david", "janes", "taylor"]

class LoadTest(HttpUser):
    @task
    def get_genre(self):
      headers = {}
      payload = {}
      query = "/?name=" + choice(name_list)
      with self.client.get(query , headers=headers, data=payload, name="genre", catch_response=True) as response:
        if response.status_code == 200:
          response.success()
      
