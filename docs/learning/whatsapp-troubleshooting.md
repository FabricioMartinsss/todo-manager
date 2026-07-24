# Etapa 7 — Integração com WhatsApp (Parte 2)

## Objetivo

Registrar decisões técnicas, erros encontrados e como eles foram investigados.

Este documento representa o processo de aprendizado durante o desenvolvimento.

---

# Erro 1

## Container reiniciando continuamente

Sintoma

Restarting...

Erro

Database provider invalid

Causa

O docker-compose original possuía diversas variáveis e dependências que não estavam configuradas.

Decisão

Não insistir na configuração original.

Foi criada uma versão simplificada contendo apenas os serviços necessários.

Aprendizado

Nem sempre utilizar a configuração oficial é a melhor escolha para aprender.

---

# Erro 2

localhost

Durante os testes a Evolution não conseguia acessar o n8n.

Inicialmente foi utilizado

http://localhost:5678

Aprendizado

Dentro de um container Docker, localhost representa o próprio container.

Não representa o computador hospedeiro.

Foi necessário utilizar

host.docker.internal

para acessar serviços executados fora do Docker.

Esse foi um dos maiores aprendizados da etapa.

---

# Erro 3

Webhook de teste

Inicialmente foi utilizado

/webhook-test

Esse endpoint funciona apenas durante os testes do n8n.

Posteriormente tentou-se migrar para

/webhook

para utilizar o ambiente de produção.

Foi identificado um problema na integração que ainda não foi completamente resolvido.

---

# Como investigar problemas

Antes desta etapa eu normalmente tentaria alterar configurações aleatoriamente.

Durante esta integração aprendi um fluxo melhor.

1. Confirmar se a mensagem chega ao WhatsApp.

↓

2. Confirmar se chega à Evolution.

↓

3. Ler os logs.

↓

4. Verificar a URL do Webhook.

↓

5. Confirmar se o n8n recebe a requisição.

↓

6. Isolar a camada com problema.

Esse processo reduz muito o tempo gasto procurando erros.

---

# Ferramentas utilizadas para diagnóstico

docker ps

Verificar containers.

docker logs

Verificar erros.

docker logs -f

Acompanhar eventos em tempo real.

docker compose config

Validar configuração do Compose.

Esses comandos passaram a fazer parte da rotina durante o desenvolvimento.

---

# Decisão de interromper a implementação

No final da etapa foi identificado um problema envolvendo o Webhook de produção do n8n.

Apesar de existirem novas possibilidades para investigação, foi tomada a decisão de interromper a implementação.

Motivos

- o ambiente principal já estava funcionando;
- o WhatsApp já estava conectado;
- o problema encontrava-se isolado;
- o aprendizado obtido durante a investigação já havia cumprido o objetivo da etapa;
- continuar cansado aumentaria a chance de criar novos problemas.

Essa decisão foi tomada pensando como um desenvolvedor profissional.

Nem sempre o melhor caminho é continuar programando.

Às vezes organizar, documentar e retornar descansado produz resultados melhores.

---

# Principais aprendizados

- Docker não é apenas "rodar containers".
- Redes Docker possuem regras próprias.
- Logs são a principal ferramenta de diagnóstico.
- Integrações devem ser depuradas por camadas.
- Arquitetura facilita descobrir onde um problema está acontecendo.
- Resolver um bug começa entendendo o problema, não escrevendo código.

Essa etapa fortaleceu muito mais minha capacidade de diagnosticar problemas do que minha capacidade de implementar funcionalidades.