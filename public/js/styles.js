// Copyright

const ano = document.getElementById("year");
const anoAtual = new Date();

ano.innerHTML = anoAtual.getFullYear();

// Menu

/*  abre e fecha o menu quando clicar no icone: hamburguer e x */
const nav = document.querySelector('#header .container')
const toggle = document.querySelectorAll('.container .toggle')

for (const element of toggle) {
  element.addEventListener('click', function () {
    nav.classList.toggle('show')
  })
}

/* quando clicar em um item do menu, esconder o menu */
const links = document.querySelectorAll('nav ul li a')

for (const link of links) {
  link.addEventListener('click', function () {
    nav.classList.remove('show')
  })
}

/* ScrollReveal: Mostrar elementos quando der scroll na pÃ¡gina */
$('.hbutton-div a[href^="#"]').on('click', function(e) {
  e.preventDefault();
  var id = $(this).attr('href'),
  targetOffset = $(id).offset().top;
    
  $('html, body').animate({ 
    scrollTop: targetOffset - 100
  }, 800);
});