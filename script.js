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
  const newElem = document.createElement('p');
  newElem.innerHTML = `${newKeys[key]}: ${value}`;
  content.appendChild(newElem);
};

// Constrói e exibe o resultado com base nos dados obtidos. Ela itera sobre os pares de 
// chave-valor dos dados obtidos e verifica se a chave existe no objeto newKeys. Se existir, ela 
// chama a função createResultElement com os valores apropriados para criar e anexar o elemento 
// <p> do resultado.
const buildResult = (result) => {
  Object.entries(result).forEach(([key, value]) => {
    if (newKeys.hasOwnProperty(key)) {
      if (typeof value !== 'object') {
        createResultElement(key, value);
      } else if (Array.isArray(value)) {
        const arrayResult = value.join('\r\n');
        createResultElement(key, arrayResult);
      } else if (key === 'origin') {
        createResultElement(key, value.name);
      }
    }
  });
};

// Evento de escuta para o clique no botão 'Go'
btnGo.addEventListener('click', async (event) => {
  // Previne o comportamento padrão do formulário de ser enviado
  event.preventDefault();

  // Se o campo de characterId estiver vazio, exibe uma mensagem no conteúdo e encerra a função
  if (characterId.value === '') {
    return (content.innerHTML = 'É necessário fazer um filtro.'); 
  } else if (characterId.value < 0) {
    return (content.innerHTML = 'Informe um número positivo'); 
  } 

  // Busca os dados da API com base no valor fornecido em characterId e aguarda a resposta
  const result = await fetchApi(characterId.value); 
 
  content.innerHTML = '';
  conteinerResult.className = 'result-style';
  image.src = result.image;
  buildResult(result);
});

// Evento de escuta para o clique no botão 'Reset'
btnReset.addEventListener('click', () => location.reload());
