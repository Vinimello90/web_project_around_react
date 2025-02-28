# Around the U.S. - EUA Afora

Este é um projeto da Around the U.S. - EUA Afora, destinado ao usuário para adicionar, remover ou curtir fotos. O layout é responsivo, adaptando-se a diferentes tamanhos de tela, utilizando `unidades de medida relativas` e `media queries` para ajustar o design conforme os pontos de interrupção, garantindo que o layout permaneça intacto e não quebre. Foi feito uma reimplantação do código a tecnologia do `REACT` e separado em componentes `JSX (JavaScript XML)`.

## Tecnologias

- HTML5 semântico
- Metodologia BEM
- Flexbox
- Grid
- Text-overflow
- Hover
- Pseudo-classe
- Unidades de medida relativas
- Media queries
- React JS
- API

## Descrição das Tecnologias e Técnicas Utilizadas

### HTML semântico

O `HTML semântico` foi aplicado para tornar o código mais compreensível.

### Metodologia BEM

A `metodologia BEM` facilita a manutenção e a compreensão do código.

### Flexbox

O `Flexbox` foi utilizado juntamente com `unidades de medida relativas` para organizar e otimizar a responsividade do layout.

### Grid e text-overflow

O `Grid` foi utilizado nos cartões das fotos da seção "gallery" para criar um layout mais organizado e melhor distribuído. A propriedade `text-overflow:ellipsis` foi aplicada em conjunto com `overflow:hidden` e `white-space: nowrap` para reduzir os textos que excedem o layout.

- Seção "Gallery"

<img src="./src/images/gallery.png" alt="" width="100%">

### Pseudo-classe

Foi aplicada a pseudo-classe `:hover` para mudar o estilo na parte interativa quando o usuário passar o cursor sobre o elemento, e a pseudo-classe `:active` quando o elemento for clicado.

<p align="center"><img src="./src/images/pseudo-classes.png" alt="" width="60%"></p>

### Media Queries

As `media queries` foram implementadas para ajustar o layout de acordo com os pontos de interrupção e garantir a responsividade em várias resoluções de tela. Foram adicionados pontos de interrupção para assegurar a responsividade, definidos com base nos intervalos:

- 320-768px (590px, 650px)
- 768-1280px (785px)
- 1280px e acima

<p align="center"><img src="./src/images/screen-size.png" alt="" width="90%"></p>

### React JS

No `React` o código do site foi reimplatado no formato `JSX` separados em componentes para serem montados e renderizados à página.

- Foi aplicado o evento `onClick()` nos botões para manipular o estado das popups, utilizando uma função com o `useState()`. Assim, ao clicar para abrir a popup, o elemento é montado e renderizado na página, e ao clicar para fechar os elementos são desmontados e removidos. As informações e o componente de cada popup foram passados através das `props` do componente, permitindo abrir a popup para edição do avatar, perfil e adição de novos cards e através do `onChange()`, `useRef()` e `onSubmit()` foi possivel passar os valores dos inputs para os estados e renderizar na página.

<img src="./src/images/popup_avatar.png" alt="" width="49.4%"> <img src="./src/images/profile-edit.png" alt="" width="49.2%">

<p align="center"><img src="./src/images/add-card.png" alt="" width="49.4%"></p>
<br>

- Foi utilizado o método `map()` para iterar sobre os cartões e montar o componente de cada um. Os dados foram passados como `props` do componente para renderizar na seção "gallery" da página, além de incluir a função que altera o estado para abrir a popup da imagem.

<p align="center"><img src="./src/images/popup_image.png" alt="" width="100%"></p>
<br>

- Foi usada uma classe para instanciar no useEffect() para validar os formulários alterando estado para manipular e aprimorar a UX do popup, desabilitando o botão de `submit`, sublinhando de vermelho o `input` inválido e exibindo uma mensagem abaixo do `input` explicando o que está invalidando o formulário para que o botão de `submit` seja habilitado.

<img src="./src/images/popup_validation.png" alt="" width="100%">

### API

Foi criado uma classe para usar a API que permite interagir com dados externos, utilizando o método `fetch` atráves dos métodos de solicitações `GET`, `POST`, `PATCH`, `PUT` e `DELETE` para solicitar os dados do usuário ou dos cartões, adiconar cartões, alterar ou remover do servidor que necessita de um `token` para autorizar a solicitação. E foram adicionado funções e métodos para interagir com o usuário indicando quando alguma solicitação está sendo processada.

- Foi adicionado uma função para manipular e alterar o estado do botão de salvar indicando que está salvando e ao finalizar o processo vai voltar o texto padrão do botão e fechar a popup.

<img src="./src/images/saving_button.png" alt="" width="100%">

<br>

- Foi adicionado uma nova popup para fazer a confirmação da remoção do cartão, antes de enviar a solicitação de remoção pela API e remover da página.

<img src="./src/images/confirmation.png" alt="" width="100%">
