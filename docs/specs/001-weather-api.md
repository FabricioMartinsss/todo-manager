# Consumo de API Pública de Clima

## Objetivo
Consumir uma API pública de clima para aprender a realizar requisições HTTP e interpretar respostas JSON.

## Entradas
- Nome de uma cidade.

## Saídas
- Temperatura atual.
- Descrição do clima.

## Regras de negócio
- Informar uma cidade válida.
- Exibir mensagem de erro se a consulta falhar.

## Possíveis erros
- Cidade não encontrada.
- API indisponível.
- Erro de conexão.

## Critérios de aceitação
- Ao informar uma cidade válida, o sistema retorna os dados do clima.
- Em caso de erro, informa o motivo de forma clara.