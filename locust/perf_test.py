# Locust load test

from locust import HttpUser, task
from random import choice

pokemon_name_list = ["Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod"]


class LoadTest(HttpUser):
    @task
    def get_pokemon(self):
      headers = {}
      payload = {}
      query = "/?pokemonName=" + choice(pokemon_name_list)
      with self.client.get(query , headers=headers, data=payload, name="PokemonData", catch_response=True) as response:
        if response.status_code == 200:
          response.success()
      
