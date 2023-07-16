# CONSUMO DE APIS COM O RICK AND MORTY
### Link para acesso:
## 🔗 https://rafaelmagalhaesguedes.github.io/RickAndMortyAPI.io/

API do Rick and Morty

Essa é uma API de consumo dos dados da série animada Rick and Morty. Ela fornece informações sobre os personagens, como nome, status, espécie, gênero, planeta de origem e episódios em que aparecem.
Documentação da API
Endpoint

O endpoint base da API é: https://rickandmortyapi.com/api/character/
Recursos Disponíveis

A API disponibiliza os seguintes recursos:

    GET /api/character: Retorna a lista de todos os personagens.
    GET /api/character/{id}: Retorna informações de um personagem específico pelo seu ID.

Parâmetros

    {id}: O ID do personagem desejado. É um número inteiro.

Exemplos de Uso

    Obter a lista de todos os personagens:

    sql

GET /api/character

Retorna a lista de todos os personagens da série.

Obter informações de um personagem específico:

bash

    GET /api/character/{id}

    Substitua {id} pelo ID do personagem desejado. Retorna informações detalhadas sobre o personagem correspondente.

Uso da API

A API do Rick and Morty é pública e pode ser usada para obter informações sobre os personagens da série. Você pode enviar requisições HTTP para os endpoints fornecidos e receber as respostas correspondentes em formato JSON.
Exemplo de Implementação

Aqui está um exemplo de código JavaScript usando a biblioteca Fetch para consumir a API do Rick and Morty:

javascript

const fetchCharacter = async (id) => {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Erro ao obter informações do personagem:', error);
  }
};

// Exemplo de uso:
fetchCharacter(1);

Este exemplo faz uma requisição para obter as informações do personagem com ID 1 e exibe o resultado no console.
Considerações Finais

A API do Rick and Morty fornece uma maneira fácil de obter informações sobre os personagens da série. É uma fonte valiosa de dados para desenvolvedores que desejam criar aplicativos, jogos ou qualquer outro projeto relacionado ao universo de Rick and Morty.

Para mais detalhes sobre os endpoints e parâmetros disponíveis, consulte a documentação oficial da API. Divirta-se explorando os personagens e criando projetos incríveis com base nesses dados!