# Sistema de Solicitações

Aplicação full-stack para cadastro, listagem, filtro e atualização de status de solicitações.

![.NET](https://img.shields.io/badge/.NET-9.0-512BD4?logo=dotnet&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-Web%20API-5C2D91)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-0A7EA4)

## Sumário

- [Visão Geral](#visão-geral)
- [Arquitetura da Solução](#arquitetura-da-solução)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Como Executar Localmente](#como-executar-localmente)
- [Como Usar a Aplicação](#como-usar-a-aplicação)
- [API Endpoints](#api-endpoints)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Solução de Problemas](#solução-de-problemas)

## Visão Geral

Este projeto centraliza o controle de solicitações em uma interface web simples e objetiva, permitindo:

- cadastrar solicitações;
- listar solicitações cadastradas;
- filtrar por status (`Todos`, `Pendente`, `Concluída`);
- atualizar status para concluído;
- visualizar contadores de pendentes e concluídas em tempo real.

## Arquitetura da Solução

A solução foi construída com uma abordagem prática para execução local rápida:

- **Back-end:** ASP.NET Core Web API (`src/SistemaSolicitacoes.Api`)
- **Front-end:** HTML/CSS/JavaScript puro (`src/SistemaSolicitacoes.Web`)
- **Integração:** o front-end é servido pela própria API como conteúdo estático.

Benefício dessa abordagem: com apenas um processo (`dotnet run`) você sobe API e interface web no mesmo host local.

## Tecnologias Utilizadas

- .NET 9
- ASP.NET Core Web API
- HTML5
- CSS3
- JavaScript (Vanilla)

## Pré-requisitos

Antes de iniciar, garanta que você possui instalado:

- [Git](https://git-scm.com/)
- [.NET SDK 9.0](https://dotnet.microsoft.com/download)

Para validar a instalação do .NET:

```bash
dotnet --version
```

## Como Executar Localmente

### 1) Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

### 2) Acessar a pasta da API

```bash
cd sistema-solicitacoes/src/SistemaSolicitacoes.Api
```

### 3) Restaurar dependências

```bash
dotnet restore
```

### 4) Executar a aplicação

```bash
dotnet run
```

### 5) Abrir no navegador

Com a aplicação em execução, acesse:

- **Front-end + API:** `http://localhost:5006`

Observação: em ambiente de desenvolvimento, também é exposta uma URL HTTPS conforme perfil de execução local.

## Como Usar a Aplicação

1. Preencha os campos de cadastro de solicitação.
2. Clique em **Enviar Solicitação**.
3. Utilize o filtro para visualizar solicitações por status.
4. Clique em **Marcar como concluída** para atualizar uma solicitação pendente.
5. Acompanhe os indicadores de pendentes e concluídas no topo da tela.

## API Endpoints

Base URL local: `http://localhost:5006`

### Listar solicitações

- **GET** `/solicitacoes`

Exemplo:

```bash
curl http://localhost:5006/solicitacoes
```

### Criar solicitação

- **POST** `/solicitacoes`

Payload:

```json
{
  "titulo": "Ajustar acesso ao sistema",
  "solicitante": "Maria",
  "status": "Pendente"
}
```

Exemplo:

```bash
curl -X POST http://localhost:5006/solicitacoes \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Ajustar acesso ao sistema","solicitante":"Maria","status":"Pendente"}'
```

### Atualizar status de uma solicitação

- **PUT** `/solicitacoes/{id}`

Payload:

```json
{
  "status": "Concluída"
}
```

Exemplo:

```bash
curl -X PUT http://localhost:5006/solicitacoes/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"Concluída"}'
```

## Estrutura de Pastas

```text
sistema-solicitacoes/
├─ src/
│  ├─ SistemaSolicitacoes.Api/
│  │  ├─ Controllers/
│  │  ├─ Models/
│  │  ├─ Properties/
│  │  └─ Program.cs
│  └─ SistemaSolicitacoes.Web/
│     ├─ css/
│     ├─ js/
│     └─ index.html
└─ README.md
```

## Solução de Problemas

- **Porta em uso (`5006`)**
  - Encerre o processo que está usando a porta ou rode com outro profile/porta local.
- **Comando `dotnet` não reconhecido**
  - Reinstale o SDK .NET 9 e confira se o `PATH` do sistema foi atualizado.
- **Front-end não carrega**
  - Garanta que o comando foi executado dentro de `src/SistemaSolicitacoes.Api`, pois o front é servido pela API.
