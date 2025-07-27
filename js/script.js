document.querySelector('.hamburger').addEventListener('click', function(){
    document.querySelector('nav').classList.toggle('nav-open');
    document.querySelector('.logo').classList.toggle('nav-open');
  });

setTimeout(() => {
  document.querySelector('nav ul').style.transition = '400ms ease-in-out';
}, 100);
