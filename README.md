## API Cache com NodeJS e Redis

Scripts Javascript para cache de requisições HTTP com Redis.

![](./img/js_api_cache_redis.png)


### Requisitos:

- NodeJS: <https://nodejs.org/en/download>
- Docker: <https://www.docker.com/products/docker-desktop>
- Redis: <https://redis.io/download>

### Instruções gerais:
1 - Instale a imagem Docker do Redis:
``` 
$ docker pull redis
``` 

2 - Rode o container Redis:
```
$ docker run -d -p 6379:6379 -v data:/data --name redis redis
```

3 - Instale os módulos Javascript:
``` 
$ npm install
```

4 - As configurações podem ser encontradas no arquivo 'cfg/config.json'

### Instruções para API Externa:

Esse teste verifica a conexão do sistema de cache para a API externa 'https://api.genderize.io/'. Se o nome 'https://api.genderize.io/?name=<nome>' informado for o mesmo dentro do tempo de expiração do cache configurado em 'cfg/config.json', a resposta será dada pelo sistema.

1 - Rode a API externa:
```
$ node ext_api.js
Using the following configuration from: 'cfg/config.json'
Redis Server: localhost | Port: 6379 | Enabled:  true | Cache Expire Time(s): 600
Back Server Port: 8080
Console Output: false
Server listening on 8080 port...
```

2 - Abra outro terminal e verifique a tempo de resposta entre as requisições. A primeira deve ser maior e as subsequentes menores por conta do cache:
```
$ curl -v -w "@curl-format.txt" "http://localhost:8080/?name=alex"

*   Trying 127.0.0.1:8080...
* Connected to localhost (127.0.0.1) port 8080 (#0)
> GET /?name=alex HTTP/1.1
> Host: localhost:8080
...
"time_total": 0.654944,
...
```

### Intruções para API Interna:

Esse teste verifica a conexão do sistema de cache para a API interna 'http://localhost:8080'. Se o número informado no front for o mesmo dentro do tempo de expiração do cache configurado em 'cfg/config.json', a resposta será dada pelo sistema.


1 - Execute a API Interna (back):
```
$ node int_back.js
Using the following configuration from: 'cfg/config.json'
Back Server Port: 3000
Console Output: false
Waiting connections from API front...
```

2 - Abra outro terminal e execute a API Interna (front):
```
$ node int_front.js
Using the following configuration from: 'cfg/config.json'
Redis Server: localhost | Port: 6379 | Enabled:  true | Cache Expire Time(s): 600
Front Server Port: 8080
Back Server Port: 3000
Console Output: false
```

3 - Abra o browser em <http://localhost:8080>

4 - Digite um número para cálculo da função Fatorial pressione 'Enviar'. Se repetir o mesmo número dentro do tempo de expiração do cache a resposta será dada pelo Redis mais rapidamente. Observe os tempos no console:
```
Resultado da API: 13 ms // número inicial
Resultado da API: 15 ms // outro número
Resultado com cache: 1 ms // número repetido
Resultado com cache: 0 ms // número repetido
```

### Teste de Desempenho:
1 - Instale o Locust: <https://locust.io/>

2 - Vá para a pasta **loadtest** e edite os scripts caso necessário

3 - Execute o script:
```
$ locust -f loadtest/<script.py> 
```

4 - Abra o browser em <http://localhost:8089> e execute o teste



