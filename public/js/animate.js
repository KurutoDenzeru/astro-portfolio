// Simple animate on reveal utilities (JavaScript)
(function(){
  function animate(){
    var animateElements = document.querySelectorAll('.animate');
    animateElements.forEach(function(element, index){
      setTimeout(function(){ element.classList.add('show'); }, index * 150);
    });
  }
  function initializeAnimate(){
    animate();
    document.addEventListener('astro:after-swap', animate);
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('load', initializeAnimate);
  }
})();
