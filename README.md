# API Testing - Restful Booker

Este projeto contém testes para a API do **Restful Booker**, utilizando **Jest** e **Supertest** para validar os endpoints principais. Os testes abrangem operações de autenticação, criação, consulta, atualização e exclusão de reservas.

---

## **Pré-requisitos**

Antes de executar os testes, certifique-se de que você possui as seguintes ferramentas instaladas:

- Node.js (v16 ou superior)
- PNPM (v8 ou superior)
- A API do Restful Booker disponível publicamente no link: [Restful Booker](https://restful-booker.herokuapp.com)

---

## **Configuração do Projeto**

1. Clone o repositório:
````
git clone <URL_DO_REPOSITORIO>
````

2. Navegue até a pasta do projeto:
````
cd <NOME_DA_PASTA>
````

3. Instale as dependências:
````
pnpm install
````

## Scripts Disponíveis
Os seguintes scripts estão disponíveis no arquivo package.json para facilitar a execução dos testes:

* Executar todos os testes:
````
pnpm test
````

* Executar um teste específico:
````
pnpm test tests/auth.test.ts
````

* Executar testes com verbose:
````
pnpm test -- --verbose
````


## Testes Implementados

1. Autenticação
* Gerar token com credenciais válidas
* Gerar token com credenciais inválidas

2. Gestão de Reservas
- POST /booking
    * Criar uma nova reserva
    * Validar erros com payloads inválidos
- GET /booking/:id
    * Consultar uma reserva específica
    * Listar todas as reservas
- PUT /booking/:id
    * Atualizar uma reserva existente
- DELETE /booking/:id
    * Deletar uma reserva existente


## Estrutura do Projeto
````
src/
├── utils/
│   ├── apiClient.ts        # Configuração do Axios para a API
│   ├── authUtils.ts        # Funções auxiliares para autenticação
tests/
├── auth.test.ts            # Testes de autenticação
├── booking.test.ts         # Testes de gestão de reservas
package.json                # Scripts e dependências
pnpm-lock.yaml              # Arquivo de bloqueio do PNPM
tsconfig.json               # Configurações do TypeScript
````

## Exemplo de Configuração do Token
A autenticação na API é feita via token. Um exemplo de requisição para obter o token está no método abaixo:
````
const generateToken = async (): Promise<string> => {
  const tokenResponse = await request(API_BASE_URL)
    .post('/auth')
    .send({ username: 'admin', password: 'password123' });

  console.log('Token Response:', tokenResponse.body);

  expect(tokenResponse.status).toBe(200);
  expect(tokenResponse.body).toHaveProperty('token');

  return tokenResponse.body.token;
};
````

## Resultados dos Testes
Os resultados dos testes podem ser visualizados diretamente no terminal após a execução. Abaixo está um exemplo de saída:
````
PASS  tests/auth.test.ts
✓ should generate a token with valid credentials (500ms)
✓ should fail to generate a token with invalid credentials (300ms)

PASS  tests/booking.test.ts
✓ should create a new booking (800ms)
✓ should retrieve a specific booking (600ms)
✓ should list all bookings (700ms)
✓ should update an existing booking (1500ms)
✓ should delete a booking (1400ms)

Test Suites: 2 passed, 2 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        6.5s
````

## Relatório de Bugs
1. DELETE /booking/:id retorna 405 Method Not Allowed
* Descrição: O endpoint /booking/:id retorna 405 Method Not Allowed ao tentar deletar uma reserva com um token válido.
* Impacto: Afeta a funcionalidade de exclusão de reservas.
* Recomendação: Verificar permissões de token e configuração do método DELETE na API.

