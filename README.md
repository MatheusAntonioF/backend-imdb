# API do IMDB

---

## 🔥 Como executar a aplicação

1. Baixar a imagem do postgres diretamente do dockerhub e exeuta-lá

    ```bash
    docker run --name imdb_db -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
    ```

    > Por padrão o username é: postgres

2. Criar banco de dados com o nome: imdb
3. Dentro do diretório raiz no projeto, execute: 

    ```bash
    yarn typeorm migration:run
    ```

4. Instalar todas as dependências (yarn ou npm): 

    ```bash
    yarn 
    ```

    ```bash
    npm install
    ```

5. Rodar a aplicação (por padrão ela vai ser iniciada na porta 3333): 

    ```bash
    yarn dev:server
    ```

---

## 🧐 Iniciar a documentação da api

1. Executar o script no diretório raiz da aplicação:

    ```bash
    yarn start:documentation
    ```

    > Port padrão a documentação será executada na porta 5000

    1.1 (opcional) Para importar os arquivos para o Insomnia(Testar a aplicação), clique em Import/Export

    ![doc1](https://user-images.githubusercontent.com/40186689/100471154-70d42880-30b8-11eb-963d-8e4d68745771.png)

    1.2 Selecione o arquivo em:  ./insominia/documentation/insomnia.json, e importe ele nesta tela:

    ![doc2](https://user-images.githubusercontent.com/40186689/100471186-7e89ae00-30b8-11eb-95aa-4297f9c479cf.png)

---

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

# Sobre

Estes documento README tem como objetivo fornecer as informações necessárias para realização do projeto de avaliação de candidatos.

# 🏗 O que fazer?

- Você deve realizar um fork deste repositório e, ao finalizar, enviar o link do seu repositório para a nossa equipe. Lembre-se, NÃO é necessário criar um Pull Request para isso, nós iremos avaliar e retornar por email o resultado do seu teste.

# 🚨 Requisitos

- A API deverá ser construída em **NodeJS** ou **Rails**
- Implementar autenticação e deverá seguir o padrão **JWT**, lembrando que o token a ser recebido deverá ser no formato **Bearer**
- Caso seja desenvolvida em NodeJS o seu projeto terá que ser implementado em **ExpressJS** ou **SailsJS**
- Para a comunicação com o banco de dados utilize algum **ORM**/**ODM**
- Bancos relacionais permitidos:
  - MySQL
  - MariaDB
  - Postgre
- Bancos não relacionais permitidos:
  - MongoDB
- Sua API deverá seguir os padrões Rest na construção das rotas e retornos
- Sua API deverá conter a collection/variáveis do postman ou algum endpoint da documentação em openapi para a realização do teste
- Serão aceitos testes somente em **JavaScript** buscando avaliar o entendimento completo da linguagem e não de estruturas ou dependências que abstraiam determinadas definições não alheias ao ECMAScript.

# 🕵🏻‍♂️ Itens a serem avaliados

- Estrutura do Projeto
- Segurança da API, como autenticação, senhas salvas no banco, SQL Injection e outros
- Boas práticas da Linguagem/Framework
- Seu projeto deverá seguir tudo o que foi exigido na seção [O que desenvolver?](##--o-que-desenvolver)
- Migrations para a criação das tabelas do banco relacional

# 🎁 Extra

Esses itens não são obrigatórios, porém desejados.

- Testes unitários
- Linter
- Code Formater

**Obs.: Lembrando que o uso de algum linter ou code formater irá depender da linguagem que sua API for criada**

# 🖥 O que desenvolver?

Você deverá criar uma API que o site [IMDb](https://www.imdb.com/) irá consultar para exibir seu conteúdo, sua API deve conter as seguintes features:

- Admin

  - Cadastro
  - Edição
  - Exclusão lógica (Desativação)

- Usuário

  - Cadastro
  - Edição
  - Exclusão lógica (Desativação)

- Filmes

  - Cadastro (Somente um usuário administrador poderá realizar esse cadastro)
  - Voto (A contagem dos votos será feita por usuário de 0-4 que indica quanto o usuário gostou do filme)
  - Listagem (deverá ter filtro por diretor, nome, gênero e/ou atores)
  - Detalhe do filme trazendo todas as informações sobre o filme, inclusive a média dos votos

**Obs.: Apenas os usuários poderão votar nos filmes e a API deverá validar quem é o usuário que está acessando, ou seja, se é admin ou não**

# 🔗 Links

- Documentação JWT https://jwt.io/
- Frameworks NodeJS:

  1. https://expressjs.com/pt-br/
  2. https://sailsjs.com/

- Guideline rails http://guides.rubyonrails.org/index.html
