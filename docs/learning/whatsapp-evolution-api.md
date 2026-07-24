# Etapa 7 — Integração com WhatsApp (Parte 1)

## Objetivo

Nesta etapa o objetivo foi adicionar uma nova porta de entrada para o sistema.

Até este momento o fluxo terminava no n8n.

Agora o usuário passa a conversar diretamente pelo WhatsApp.

A arquitetura permanece exatamente a mesma.

Usuário
↓
WhatsApp
↓
Evolution API
↓
n8n
↓
IA
↓
Backend
↓
PostgreSQL

O WhatsApp apenas substitui a interface tradicional.

---

# Por que utilizar a Evolution API?

Inicialmente foi estudada a API oficial da Meta.

Apesar de ser gratuita para pequenos projetos, sua configuração exige diversos passos:

- criação de aplicativo;
- configuração de Webhooks;
- Facebook Developer;
- Meta Business.

Como o objetivo deste projeto é aprender arquitetura e integração de sistemas, optou-se pela Evolution API.

Ela abstrai toda a comunicação com o WhatsApp Web e permite focar na integração.

---

# Tecnologias utilizadas

- Docker Desktop
- Docker Compose
- Evolution API
- PostgreSQL
- Redis
- n8n

---

# Por que utilizar Docker?

A Evolution depende de vários serviços.

Executá-los manualmente tornaria o ambiente mais complexo.

Com Docker Compose foi possível iniciar toda a infraestrutura utilizando um único comando.

Serviços executados:

- Evolution API
- PostgreSQL
- Redis

---

# Estrutura criada

evolution-local/

├── docker-compose.yml

└── .env

O projeto principal permanece separado da infraestrutura da Evolution.

Isso evita misturar responsabilidades.

---

# Docker Compose

Foi criada uma versão simplificada do docker-compose.

Objetivos:

- remover dependências desnecessárias;
- facilitar o aprendizado;
- utilizar apenas o necessário para este projeto.

Containers utilizados:

- evolution_api
- evolution_postgres
- evolution_redis

---

# Inicializando o ambiente

Subir containers

docker compose up -d

Verificar containers

docker ps

Visualizar logs

docker logs evolution_api

Acompanhar logs

docker logs -f evolution_api

Parar ambiente

docker compose down

---

# Primeiro acesso

API

http://localhost:8080

Manager

http://localhost:8080/manager

Login utilizando a API Key configurada no .env.

---

# Criando uma instância

Após acessar o Manager:

Create Instance

↓

Nome da instância

↓

Salvar

↓

Conectar

↓

Escanear QR Code

Após esse processo o WhatsApp fica conectado à Evolution API.

---

# Configurando Webhook

Foi configurado um Webhook apontando para o n8n.

Durante os testes foram utilizadas duas URLs.

Teste

/webhook-test

Produção

/webhook

Também foi habilitado o evento:

MESSAGES_UPSERT

responsável pelo recebimento de mensagens.

---

# Aprendizados

Durante esta etapa aprendi:

- Docker Compose
- Containers
- Redes Docker
- Redis
- Banco separado da aplicação
- Como uma API de WhatsApp funciona
- Conceito de instâncias
- Eventos
- Webhooks
- Comunicação entre sistemas

O principal aprendizado foi perceber que o WhatsApp é apenas mais uma entrada da arquitetura.

Toda inteligência continua localizada na IA e no backend.