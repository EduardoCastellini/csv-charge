# API de Cobrança

API desenvolvida para realizar cobranças por E-mail.


## Stack utilizada

**Back-end:** Node, Typescript, Express, Prisma ORM,


## Documentação da API

#### Enviar cobranças: 
```http
  POST /charge
```
| Form-data   | Tipo       | Descrição                                           |
| :---------- | :--------- | :-------------------------------------------------- |
| `file`      | `file`     | **Obrigatório**. Arquivo CSV contendo as cobranças  |


#### Enviar notificação via Webhook: 
```http
  POST /webhook
```
| Campos do JSON  | Tipo     | Descrição                        |
| :----------     | :------- | :------------------------------- |
| `debtId`        | `string` | Identificação do débito          |
| `paidAt`        | `string` | Data de pagamento                |
| `paidAmount`    | `number` | Valor pago                       |
| `paidBy`        | `string` | Nome do pagador                  |


#### Listar todas as cobranças:
```http
  GET /charge
```


## Executando a aplicação local com o docker-compose 

1. Baixe o repositório do projeto em seu computador.
2. Acesse o diretório raiz do projeto.
4. Crie uma copia do arquivo ".env.example" e renomeei o mesmo para: ".env".
4. Execute o seguinte comando:
```bash
# realiza o build e já sobe o container
$ docker-compose up --build
```
5. Aplicação ficará disponível na porta 3000, exemplo: http://localhost:3000/charge


**Testes:** Para executar os testes: 
```bash
# executa todos os testes
$ yarn teste
```