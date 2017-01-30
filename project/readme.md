# Desafio estagiário - Linx+Neemu+Chaordic

> **Apresentação**

Saudações. O desafio cumprido consistia em criar uma **landing page** simulando um Encurtador de Links. Apesar de a descrição do desafio se apresentar com o objetivo de testar as habilidades e qualidade de código de um desenvolvedor front-end, acabei indo mais adiante e desenvolvendo um sistema back-end para administrar o conteúdo e realizar as principais funções do Encurtador de Links, visto também que a oferta de vaga mencionava **Estagio Desenvolvedor Fullstack** (https://linxneemuchaordic.recruiterbox.com/jobs/fk0mj64).

### Ferramentas utilizadas no Projeto

- Foi utilizado [AngularJS] para a criação da **single-page application** e sistema de **routes**.
- Foi utilizado a ferramenta **Realtime Database** da plataforma [Firebase] para armazenar os dados do sistema, em conjunto com a diretiva [AngularFire] para desenvolver o back-end.
- O projeto foi construído em um servidor local utilizando [NodeJS], em conjunto com o framework [Express].
- O [Grunt] foi utilizado como ferramenta de automatização com os plugins [grunt-contrib-less], [grunt-contrib-watch] e [jit-grunt].
- O [Less] foi utilizado como pré-processador CSS.
- Foram utilizadas algumas funções de [jQuery] quando o [AngularJS] não atendia certas necessidades.
- Não foram utilizadas bibliotecas e frameworks CSS prontos para tornar o site responsivo.


### Instruções de instalação

- As dependências do projeto podem ser instaladas utilizando o comando 'npm install' no diretório 'project/'.

- Tendo as dependências instaladas, é necessário iniciar o servidor utilizando o comando 'npm start'.

- O servidor está configurado para atender a porta 3000, caso necessário, a porta pode ser alterada no diretório 'project/' dentro do script 'server.js'.


### Utilizando o Encurtador de Links

- Uma vez o servidor no ar, é possível acessar a **single-page** entrando no endereço "localhost:3000" (ou outra porta configurada anteriormente) em algum navegador de Internet.

- A função de Encurtar Link pode ser testada. Basta digitar ou colar um link no campo destinado e apertar no botão 'Encurtar' e a URL comprimida será gerada.

- A URL comprimida é composta pelo domínio do site (no caso, o domínio é 'localhost:3000/') e por um código gerado a partir do timestamp em que o link foi gerado.

- Para testar a veracidade do link gerado, basta copiá-lo (o botão 'Copiar' pode ser acionado) e utilizá-lo como entrada em algum navegador de Internet e apertar Enter, e então, será redirecionado.


### O Top 5

- O [JSON](./Assets/urls.json) já foi consumido e adicionado ao banco de dados. 

- Alguns valores de 'hits' podem estar diferentes do valor inicial do [JSON](./Assets/urls.json). O motivo é porque alguns desses links já foram clicados, e então, seus contadores incrementaram.

- Para testar, basta clicar num dos links, e você será redirecionado para seus links originais.

- Para avaliar a veracidade do Ranking, os dois últimos links possuem 'hits' próximos. Dê um cliques visando reordená-los.

- Note que os contadores de 'hits' são incrementados em tempo real quando clicados. 

- O comando "Abrir em uma nova aba" está indisponível, mas caso queira visualizar os valores de hits mudando em tempo real, pode-se usar duas janelas.

- Outra opção é copiar e colar os links no endereço de busca do navegador e pressionar Enter em outra aba. O contador de 'hits' continua funcional.

- Note que os links também estão diferentes do [mockup], visto que eles não possuem domínio e estão num servidor local.


### O Contador de Hits

- Esse contador também está diferente do apresentado no [mockup], pois apresenta a soma dos hits do [JSON](./Assets/urls.json) mais alguns outros links que foram criados para testes.

- Gere links e visite-os para aumentar o contador, ou simplesmente visite algum no TOP 5.


### Site Responsivo

- A página foi construída visando atender a resolução de todos os dispositivos. Teste redimensionando ou acionando a [Toggle Device] do seu navegador.