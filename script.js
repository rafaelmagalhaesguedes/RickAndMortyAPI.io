const characterId = document.getElementById('characterId'); // Referência ao elemento de input com o ID 'characterId'
const btnGo = document.getElementById('btn-go'); // Referência ao elemento de botão com o ID 'btn-go'
const btnReset = document.getElementById('btn-reset'); // Referência ao elemento de botão com o ID 'btn-reset'
const content = document.getElementById('content'); // Referência ao elemento com o ID 'content'
const conteinerResult = document.getElementById('result-style'); // Referência ao elemento com o ID 'result-style'
const image = document.getElementById('img'); // Referência ao elemento de imagem com o ID 'img'

// Busca dados da API com base em um valor fornecido e 
// retorna uma Promise que é resolvida com os dados obtidos.
const fetchApi = async (value) => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${value}`);
  const data = await response.json();
  return data;
}; 

// Objeto para obter os nomes de exibição das chaves.
const newKeys = {
  name: 'Nome',
  status: 'Status',
  species: 'Espécie',
  gender: 'Gênero',
  origin: 'Planeta de origem',
  episode: 'Episódios',
};

// Cria um novo elemento <p> com o par de chave-valor fornecido e o anexa ao elemento 
// 'content'. Ela utiliza o objeto newKeys para obter o nome de exibição da chave.
const createResultElement = (key, value) => {
  // Cria um novo elemento <p>
  const newElem = document.createElement('p');
  // Define o conteúdo HTML do elemento <p> com a chave e valor fornecidos
  newElem.innerHTML = `${newKeys[key]}: ${value}`;
  // Adiciona o elemento <p> ao elemento 'content'
  content.appendChild(newElem);
};

// Constrói e exibe o resultado com base nos dados obtidos. Ela itera sobre os pares de 
// chave-valor dos dados obtidos e verifica se a chave existe no objeto newKeys. Se existir, ela 
// chama a função createResultElement com os valores apropriados para criar e anexar o elemento 
// <p> do resultado.
const buildResult = (result) => {
  Object.entries(result).forEach(([key, value]) => {
    // Verifica se a chave existe em newKeys
    if (newKeys.hasOwnProperty(key)) {
      // Verifica se o valor não é um objeto 
      if (typeof value !== 'object') {
        // Cria um novo elemento <p> com a chave e valor e o anexa ao conteúdo
        createResultElement(key, value);
        // Verifica se o valor é um array
      } else if (Array.isArray(value)) {
        // Junta os elementos do array com quebras de linha
        const arrayResult = value.join('\r\n');
        // Cria um novo elemento <p> com a chave e valor do array e o anexa ao conteúdo
        createResultElement(key, arrayResult);
        // Verifica se a chave é 'origin'
      } else if (key === 'origin') {
        // Cria um novo elemento <p> com a chave 'origin' e o nome do valor e o anexa ao conteúdo
        createResultElement(key, value.name);
      }
    }
  });
};

// Evento de escuta para o clique no botão 'Go'
btnGo.addEventListener('click', async (event) => {
  // Previne o comportamento padrão do formulário de ser enviado
  event.preventDefault();

  if (characterId.value === '') {
    // Se o campo de characterId estiver vazio, exibe uma mensagem no conteúdo e encerra a função
    return (content.innerHTML = 'É necessário fazer um filtro.'); 
  } else if (characterId.value < 0) {
    return (content.innerHTML = 'Informe um número positivo'); 
  } 

  // Busca os dados da API com base no valor fornecido em characterId e aguarda a resposta
  const result = await fetchApi(characterId.value); 
 
  // Limpa o conteúdo antes de exibir o resultado
  content.innerHTML = '';
  // Define a classe 'result-style' para o conteinerResult, alterando o estilo visual
  conteinerResult.className = 'result-style';
  // Define a origem da imagem com base no resultado obtido da API
  image.src = result.image;
  // Chama a função buildResult para construir e exibir o resultado com base nos dados obtidos
  buildResult(result);
});

// Evento de escuta para o clique no botão 'Reset'
btnReset.addEventListener('click', () => location.reload());
