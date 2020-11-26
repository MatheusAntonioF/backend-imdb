# API do IMDB

**RNF**

- Typescript.
- ExpressJS.
- Typeorm.
- SOLID.
- TDD para realização de testes.
- DDD.
- JWT para autenticação.

## Autenticação

- [x] Autenticação no formato JWT

## Administrador

**RF**

- [x] Deve ser possível cadastrar um novo adm
- [x] Deve ser possível editar um adm
- [x] Deve ser possível desativar um adm (exclusão lógica)

## Usuário

**RF**

- [x] O usuário deve poder fazer um cadastro
- [x] O usuário deve poder editar seus dados
- [x] O usuário deve poder desativar sua conta (exclusão lógica)

## Filme

**RF**

- [x] O adm deve poder cadastrar um novo filme
- [x] Um filme terá uma contagem de votos
- [x] Os filmes poderão ser listados por: diretor, nome, gênero e atores
- [x] Detalhe do filme trazendo todas as informações sobre o filme, inclusive a média dos votos

**RN**

- [x] Somente o adm pode cadastrar um novo filme
- [x] O voto será contabilizado de 0-4 pelo usuário
