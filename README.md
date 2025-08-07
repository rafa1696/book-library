# Book Library

[![Deploy static content to Pages](https://github.com/rafa1696/book-library/actions/workflows/deploy.yml/badge.svg)](https://github.com/rafa1696/book-library/actions/workflows/deploy.yml)
[![Tests with Jest and Coverage](https://github.com/rafa1696/book-library/actions/workflows/jest.yml/badge.svg)](https://github.com/rafa1696/book-library/actions/workflows/jest.yml)

Este projeto é uma aplicação de biblioteca de livros desenvolvida com React, TypeScript e Vite. O objetivo é fornecer uma interface de usuário interativa e eficiente para gerenciar uma coleção de livros.

## Principais Tecnologias

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipos estáticos.
- **Vite**: Ferramenta de build rápida e leve para projetos front-end.
- **Jest**: Framework de testes unitários.
- **Testing Library**: Utilizada para testes de componentes React.
- **GitHub Actions**: CI/CD para deploy e execução dos testes automatizados.

## Funcionalidades

- Listagem de livros com dados mockados.
- Busca de livros por título.
- Visualização de detalhes do livro.
- Truncamento automático de textos longos.
- Testes unitários para funções utilitárias e componentes.
- Deploy automático via GitHub Pages.

## Configuração do Projeto

### Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/rafa1696/book-library.git
    cd book-library
    ```

2. Instale as dependências:

    ```bash
    yarn
    ```

### Executando o Projeto

Para iniciar o servidor de desenvolvimento com Hot Module Replacement (HMR):

```bash
yarn dev
```

### Executando os Testes

Para rodar os testes unitários com cobertura:

```bash
npm run test
```

### Estrutura de Pastas

- `src/components`: Componentes React reutilizáveis.
- `src/utils`: Funções utilitárias (ex: truncamento de texto).
- `src/mocks`: Dados mockados para desenvolvimento e testes.
