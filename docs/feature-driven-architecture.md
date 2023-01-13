# Feature Driven Architecture

A Feature Driven Architecture (FDA) é um framework estrutural que ajuda a organizar a base de código para interfaces visuais de uma maneira que permite manter uma velocidade de desenvolvimento constante enquanto a quantidade de recursos está crescendo.

Estes são três tipos de limites que esta especificação define:

- **Sistema de arquivos** - como nomear arquivos e pastas
- **Dependências** - quais limites podem depender um do outro
- **Escopo de conhecimento** - limite do Conhecimento

## Razão

Temos vários modelos de componentes que nos permitem compor a UI. Temos vários modelos de fluxo de dados que simplificam o trabalho com os dados. E, no entanto, lutamos para construir um aplicativo que permita que muitas pessoas trabalhem em paralelo. Sofremos uma desaceleração exponencial quando a base de código cresce.

O motivo é a falta de acordo sobre a divisão de um aplicativo de uma forma que permita que mais pessoas trabalhem em paralelo e mantenham a complexidade sob controle.

A FDA é a peça que faltava que se baseia em modelos de fluxo de dados e componentes existentes.

Em vez de organizar o código por dados e tipos de abstração, queremos organizar o código com base nos recursos voltados para o usuário que resolvem um problema do usuário. Dessa forma, acreditamos que é mais fácil dimensionar, comunicar e navegar na base de código.

## Metas

**Descoberta e navegação** - veja como o software está estruturado observando o sistema de arquivos. Ajude a encontrar qualquer funcionalidade voltada para o usuário no código.

**Paralelização de trabalho** - permite trabalhar em paralelo com várias pessoas. Reduza o número de conflitos de mesclagem. Reduza o número de discussões sobre onde colocar algum pedaço de código.

**Refatoração** - entenda melhor o escopo de uma mudança. Ganhe muito mais confiança ao alterar um recurso sabendo que ele não afetará outros recursos. Veja quais recursos serão afetados ao alterar uma abstração compartilhada.

**Experimentos** - permite criar e remover recursos experimentais.

## Princípios Fundamentais

1. Princípios fundamentais

   Evite um ponto central de falha, tanto quanto possível.

1. Co-localização

   Localize as dependências o mais próximo possível de seus consumidores.

1. Isolamento

   Os subsistemas devem saber o mínimo possível. Cada pedaço de conhecimento tem um preço de acoplamento.

1. Descartabilidade

   Otimize para facilitar a remoção. A remoção de uma pasta de recursos em uma implementação ideal removeria a maior parte do recurso. O resto deve ser fácil de rastrear e remover de forma limpa.

1. Compartilhamento explícito

   Torne o compartilhamento de código entre limites super explícito.

## Feature

> Uma feature é um bloco(s) de construção complexo reutilizável e isolado voltado para o usuário que resolve um problema específico para um usuário.

O escopo da feature geralmente depende do produto e das necessidades organizacionais, mas um feature específica deve ter um escopo claramente definido por seus mantenedores.

[Leia mais sobre como identificar uma Feature.](./feature.md)

Uma feature segue estes princípios:

1. Uma feature não pode saber da existência de qualquer outra Feature.

   Este princípio é **o mais importante** e, sem ele, toda a sua arquitetura é considerada quebrada.

1. Uma feature não pode saber sobre a tela em que foi usado.

   Sem ele, você não poderá reutilizar uma Feature em várias telas.

1. Uma feature deve ser coeso.

   Uma feature deve colocar sua implementação no local associado ao nome do feature.

1. Uma feature pode ter dependências.

   Uma feature deve expressar dependências em um formato projetado para ser entendido e fornecido por seus consumidores.

1. Uma feature deve ser descartável.

   Você deve ser capaz de remover um feature sem deixar nenhum resquício para trás.

1. Uma feature deve ser composta.

   Você deve ser capaz de compor várias features na mesma tela ou em telas diferentes sem modificar uma feature.

---

# Estrutura de pastas

```sh
└── src/
    ├── app/
    |
    ├── assets/
    |   ├── brand/
    |   |   ├── {some-image}/
    |   ├── images/
    |   |   ├── {some-image}/
    |   ├── svg/
    |   |   ├── {some-svg}/
    |   ...
    |
    ├── components/
    |   ├── {some-component}/
    |   ├── layouts/
    |   |   ├── {some-component}/
    |   ...
    |
    ├── config/
    |   ├── {some-config}/
    |   |   ├── lib/
    |   ...
    |
    ├── constants/
    |   ├── {some-constant}/
    |   ...
    |
    ├── store/
    |   ├── {some-context}/
    |   ...
    |
    ├── feature/
    |   ├── {some-feature}/
    |   |   ├── api/
    |   |   ├── components/
    |   |   └── contexts/
    |   |   └── hooks/
    |   |   └── constants.ts/
    |   |   └── index.tsx/
    |   |   └── types.ts/
    |   |   └── utils.ts/
    |   ...
    |
    ├── hooks/
    |   ├── {some-hook}/
    |   ...
    |
    ├── pages/
    |   ├── {some-page}/
    |   ...
    |
    ├── services/
    |   ├── {some-service}/
    |   ...
    |
    ├── styles/
    |   ├── {some-style}/
    |   ...
    |
    ├── types/
    |   ├── {some-type}/
    |   ...
    |
    ├── utils/
    |   ├── {some-util}/
    |   ...
    |
    └── index.tsx/
```

## assets/

- A pasta assets contém todas as imagens, icones, arquivos de fonte, etc. para seu projeto.

## components/

- Contém componentes reutilizáveis ​​que são usados ​​com mais frequência para compor uma Feature ou Página.
- Esses componentes são quase sempre puros e de apresentação, sem [side-effects](https://medium.com/@remoteupskill/what-is-a-react-side-effect-a5525129d251).

## layouts/

- Contém componentes de layout reutilizáveis. Um Componente de Layout é um componente que compõe o layout de uma página. Muitas vezes, ele importa componentes como sidebar,footer, sidebar.
- Se for provável que seu projeto tenha apenas um único layout, esse diretório pode não ser necessário e o Layout Component pode residir no diretório de componentes.

## config/

- Todas as configurações do aplicativo devem ser mantidas neste caminho.
- Código de configuração do projeto, variáveis ​​globais, urls etc.

## lib/

- Esta pasta contém [fachadas](https://blog.webdevsimplified.com/2022-07/facade-pattern/) para as várias bibliotecas diferentes que você usa em seu projeto.
- Por exemplo, se você usar o axios library, esta pasta conterá um arquivo para essa biblioteca axios que cria sua própria API sobre a API axios que você usa em seu aplicativo.
- Isso significa que, em vez de importar axios diretamente em seu projeto, você importaria o arquivo desta pasta associado a axios.

## constants/

- Contém strings reutilizáveis ​​e imutáveis, como URLs ou padrões Regex.

## store/

- Redux Store.

## feature/

- Toda a lógica necessária para uma Feature é colocada em um único diretório. Uma Feature geralmente é composto de muitos outros componentes, locais ou compartilhados.
  O mesmo vale para todos os recursos: utils, types, hooks e assim por diante.
- Features geralmente incluem [side-effects](https://medium.com/@remoteupskill/what-is-a-react-side-effect-a5525129d251).
- Se estiver usando Redux e interagir com o Store, a Feature incluirá um arquivo slice que define o “slice” do Redux Store que o recurso representa.

## hooks/

- Contém React Hooks reutilizáveis.

## pages/

- Page componente de página. Cada componente de página está associado a uma rota.
- Page componente compõem o conteúdo de uma página importando Componentes e Features.
- Um Page componente raramente deve incluir [side-effects](https://medium.com/@remoteupskill/what-is-a-react-side-effect-a5525129d251) e, em vez disso, deve delegar [side-effects](https://medium.com/@remoteupskill/what-is-a-react-side-effect-a5525129d251) as Features.

## services/

- Esta pasta contém todo o seu código para interface com qualquer API externa.

## styles/

- Estilos reutilizáveis ​​ou globais.
- Pode incluir configurações, redefinições ou variáveis.

## types/

- Tipos reutilizáveis ​​para projetos que utilizam TypeScript.

## utils/

- Funções utilitárias reutilizáveis. Essas funções devem ser sempre puras e não produzir [side-effects](https://medium.com/@remoteupskill/what-is-a-react-side-effect-a5525129d251).

---

# Nomeação de arquivos

kebab-case para nomes de arquivos dos aplicativos React.

```sh
// my-component
// my-component.tsx

return (
    <MyComponent />
)
```

---

# TypeScript

```ts
ComponentProps = {};
MethodApiResponse = {};
MethodApiParams = {};
```

Utilizar Interface sempre que possível, Types devem ser utilizados somente quanto obrigado pelo TypeScript,
como na atribuição de valores.
Ex:

```ts
type value = string | number;
```

Objetos com mais de 3 atributos precisam de atenção. Se sua interface está ficando grande considere
quebrar o objeto em outra interface.

Ex:

```ts
/* Interface não precisa ser quebrada */
interface ObjectOne {
  dummyData: {
    _id: string;
    name: string;
    price: number;
  };
}

/* Interface precisa ser quebrada */
// Ruim
interface ObjectTwo {
  dummyDataOne: {
    _id: string;
    name: string;
    price: number;
  };
  dummyDataTwo: {
    _id: string;
    name: string;
    image: {
      publicId: string;
      src: string;
      version: string;
    };
  };
}

// Bom
interface DummyDataOne {
  _id: string;
  name: string;
  price: number;
}

interface DummyDataTwo {
  _id: string;
  name: string;
  price: number;
  image: {
    publicId: string;
    src: string;
    version: string;
  };
}

interface ObjectTwo {
  dummyDataOne: DummyDataOne;
  dummyDataTwo: DummyDatTwo;
}
```
