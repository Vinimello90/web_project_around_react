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

- Foi aplicado o evento `onClick()` nos botões para manipular o estado das popups, utilizando uma função com o `useState()`. Assim, ao clicar para abrir a popup, o elemento é montado e renderizado na página. Com o `useEffect()`, foi adicionado o ouvinte de evento `addEventListener()` com o tipo `keydown` para fechar as popups ao pressionar a tecla "esc". Ao fechar, os elementos são desmontados o ouvinte de evento é removido com `removeEventListener()`. As informações de cada popup foram armazenadas no estado e passadas via `props` do componente, permitindo abrir a popup para edição do avatar, perfil do usuário e adição de novos cards. Além disso, com o uso de `onChange()`, `useRef()` e `onSubmit()` foi possível passar os valores dos inputs para os estados, renderizá-los na página e persistir as mudanças na API.

<img src="./src/images/popup_avatar.png" alt="" width="49.4%"> <img src="./src/images/profile-edit.png" alt="" width="49.2%">

<p align="center"><img src="./src/images/add-card.png" alt="" width="49.4%"></p>
<br>

- Foi utilizado o método `map()` para iterar sobre os cartões e montar o componente de cada um. Os dados foram passados como `props` do componente para renderizar na seção "gallery" da página, além de incluir a função que altera o estado para abrir a popup da imagem.

<p align="center"><img src="./src/images/popup_image.png" alt="" width="100%"></p>
<br>

- Foi instanciada uma classe no `useEffect()` para validar os formulários, alterando estado para manipular e aprimorar a UX do popup. A classe desabilita o botão de `submit`, sublinhando de vermelho o `input` inválido e exibe uma mensagem abaixo do `input`, explicando o que está invalidando o formulário. Dessa forma, o botão de `submit` só é habilitado quando o formulário for validado corretamente.

<img src="./src/images/popup_validation.png" alt="" width="100%">

### API

Foi criado uma classe para usar a API que permite interagir com dados externos, utilizando o método `fetch` atráves dos métodos de solicitações `GET`, `POST`, `PATCH`, `PUT` e `DELETE` para solicitar os dados do usuário ou dos cartões, adiconar cartões, alterar ou remover do servidor que necessita de um `token` para autorizar a solicitação.

- Foi adicionada uma função para manipular e alterar o estado do botão de salvar, indicando quando alguma solicitação está sendo processada. Ao finalizar o processo, o texto do botão volta ao padrão e a popup é fechada.

<img src="./src/images/saving_button.png" alt="" width="100%">

<br>

- Foi adicionado uma nova popup para fazer a confirmação da remoção do cartão, antes de enviar a solicitação de remoção pela API e remover da página.

<img src="./src/images/confirmation.png" alt="" width="100%">

## Tecnologias

- Adicionar um sistema de login e identificar, através do `ID` do usuário, se o card foi adicionado por ele. Caso tenha sido exibir o botão de excluir o card.
