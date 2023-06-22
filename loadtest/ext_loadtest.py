# Locust load test

from locust import FastHttpUser, task
from random import choice

zip_code_list = ["01310100", "03174000", "03640020", "03819170", "01310010", "02040070", "04650185", "04651075", "04843475", "04843475"]


class LoadTest(FastHttpUser):
    @task
    def get_fixed_zip_code(self):
      headers = {}
      payload = {}
      query = "/location?cep=" + choice(zip_code_list)
      with self.client.get(query, headers=headers, data=payload, name="cep", catch_response=True) as response:
        if response.status_code == 200:
          response.success()
      
