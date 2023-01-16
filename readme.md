# API de Cobrança

API desenvolvida para realizar cobranças por e-mail.


## Stack utilizada

**Back-end:** Node, Typescript, Express, Prisma ORM,


## Documentação da API

Para facilitar os testes na API, no link abaixo contém um arquivo de exportação no formato JSON, referente a collection do postman com as requisições prontas. E também um arquivo CSV de exemplo para ser utilizado no body da requisição:
[Google DRIVE - KANASTRA](https://drive.google.com/drive/folders/1Jd-rA715hSr-Z0dokXRxknev7xljepre?usp=sharing)

OBS: Para a requisição POST onde será enviado o arquivo CSV, o body deve ser enviado como "form-data", conforme a imagem de exemplo abaixo:
![exemplo POST /charge](assets/POSTcharge.png)


#### Enviar cobranças: 
```http
  POST /charge
```
| Form-data   | Tipo       | Descrição                                           |
| :---------- | :--------- | :-------------------------------------------------- |
| `file`      | `file`     | **Obrigatório**. Arquivo CSV contendo as cobranças  |


#### Enviar notificação via Webhook: 
Rota POST disponibilizada como webhook para receber as notificações do banco, quando um boleto for pago.
```http
  POST /webhook
```
| Campos do JSON  | Tipo     | Descrição                        |
| :----------     | :------- | :------------------------------- |
| `debtId`        | `string` | **Obrigatório**. Identificação do débito          |
| `paidAt`        | `string` | **Obrigatório**. Data de pagamento                |
| `paidAmount`    | `number` | **Obrigatório**. Valor pago                       |
| `paidBy`        | `string` | **Obrigatório**. Nome do pagador                  |


#### Listar todas as cobranças:
Rota GET disponibilizada para listar todas as cobranças que estão salvas no banco de dados.
OBS: Essa rota não espera nem um parâmetro, pois é retornando todos os registros que estão no banco de dados.
```http
  GET /charge
```


## Executando a aplicação local com o docker-compose 

1. Baixe o repositório do projeto em seu computador.
2. Acesse o diretório raiz do projeto.
4. Crie uma cópia do arquivo ".env.example" e renomeei o mesmo para: ".env".
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