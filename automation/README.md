# Automation

Esta pasta contém toda a camada de automação do projeto TODO Manager.

O objetivo é centralizar workflows, configurações e documentação relacionadas às integrações do sistema.

Atualmente a automação será realizada utilizando o n8n.

## Objetivos

- Consumir a API Backend.
- Orquestrar integrações entre serviços.
- Executar fluxos automatizados.
- Preparar o sistema para integração com IA.
- Preparar o sistema para integração com WhatsApp.

## Estrutura

```
automation/

├── workflows/
│   └── Workflows exportados do n8n

├── .env.example
│   └── Exemplo das variáveis necessárias

└── README.md
    └── Documentação da camada de automação
```

## Responsabilidades

A automação possui apenas responsabilidades de orquestração.

Ela não deve conter:

- regras de negócio;
- acesso direto ao banco;
- validações da aplicação.

Essas responsabilidades continuam pertencendo ao Backend.

## Fluxo Geral

```
Trigger

↓

Workflow

↓

API Backend

↓

PostgreSQL
```

Todo acesso aos dados deve ocorrer exclusivamente através da API.