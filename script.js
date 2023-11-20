// Seleção de elementos HTML
const slideContainer = document.querySelector(".slide-container");
const slide = document.querySelector(".slides");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const interval = 3000; // Intervalo de tempo entre os slides em milissegundos

let slides = document.querySelectorAll(".slide");
let index = 1; // Índice do slide atual
let slideId; // Identificador do intervalo para automação do slideshow

// Clones do primeiro e último slide para criar um efeito de loop contínuo
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

slide.append(firstClone);
slide.prepend(lastClone);

// Configuração inicial do slide
const slideWidth = slides[index].clientWidth; // Largura do slide atual
slide.style.transform = `translateX(${-slideWidth * index}px)`;

// Função para obter todos os slides
const getSlides = () => document.querySelectorAll(".slide");

// Função para resetar a transição do slide
const resetSlideTransition = () => {
  slide.style.transition = "none";
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};

// Função chamada ao final da transição do slide
const handleTransitionEnd = () => {
  slides = getSlides();
  // Se o slide atual for o clone do primeiro, reseta a transição e define o índice para o segundo slide original
  if (slides[index].id === firstClone.id) {
    resetSlideTransition();
    index = 1;
  }
  // Se o slide atual for o clone do último, reseta a transição e define o índice para o penúltimo slide original
  if (slides[index].id === lastClone.id) {
    resetSlideTransition();
    index = slides.length - 2;
  }
  // Aplica a transição e move para o slide correspondente ao índice
  slide.style.transition = ".7s ease-out";
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};

// Função para mover para o próximo ou anterior slide
const moveToSlide = (direction) => {
  slides = getSlides();
  index += direction;
  // Aplica a transição e move para o slide correspondente ao novo índice
  slide.style.transition = ".7s ease-out";
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};

// Função para iniciar o slideshow automaticamente
const startSlide = () => {
  slideId = setInterval(() => {
    moveToSlide(1);
  }, interval);
};

// Adiciona um event listener para lidar com o evento de transição do slide
slide.addEventListener("transitionend", handleTransitionEnd);

const stopSlide = () => clearInterval(slideId);

// Adiciona event listeners para parar o slideshow quando o mouse entra no contêiner e reiniciá-lo quando o mouse sai
slideContainer.addEventListener("mouseenter", stopSlide);
slideContainer.addEventListener("mouseleave", startSlide);

// Adiciona event listeners para a navegação manual com os botões "Próximo" e "Anterior"
nextBtn.addEventListener("click", () => moveToSlide(1));
prevBtn.addEventListener("click", () => moveToSlide(-1));

// Inicia o slideshow automaticamente
startSlide();