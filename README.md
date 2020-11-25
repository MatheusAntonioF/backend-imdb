# API do IMDB

**RNF**

- Typescript.
- ExpressJS.
- Typeorm.
- SOLID.
- TDD para realização de testes.
- DDD.
- JWT para autenticação.

## Administrador

**RF**

[] - Deve ser possível cadastrar um novo adm;
[] - Deve ser possível editar um adm;
[] - Deve ser possível desativar um adm (exclusão lógica);

## Usuário

**RF**

[x] - O usuário deve poder fazer um cadastro;
[x] - O usuário deve poder editar seus dados;
[x] - O usuário deve poder desativar sua conta (exclusão lógica);

## Filme

**RF**

[] - O adm deve poder cadastrar um novo filme;
[] - Um filme terá uma contagem de votos;
[] - Os filmes poderão ser listados por: diretor, nome, gênero e atores;

**RN**

[] - Somente o adm pode cadastrar um novo filme;
[] - O voto será contabilizado de 0-4 pelo usuário;
