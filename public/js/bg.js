// Background particle/star generation (JavaScript)
(function(){
  function generateParticles(n){
    var parts = [];
    for (var i=0;i<n;i++){ var x=Math.random()*100; var y=Math.random()*100; parts.push(x+'vw '+y+'vh #000'); }
    return parts.join(',');
  }
  function generateStars(n){
    var parts = [];
    for (var i=0;i<n;i++){ var x=Math.random()*100; var y=Math.random()*100; parts.push(x+'vw '+y+'vh #fff'); }
    return parts.join(',');
  }
  function initBG(){
    var particlesSmall = generateParticles(1000);
    var particlesMedium = generateParticles(500);
    var particlesLarge = generateParticles(250);
    var particles1 = document.getElementById('particles1');
    var particles2 = document.getElementById('particles2');
    var particles3 = document.getElementById('particles3');
    if (particles1) { particles1.style.cssText = 'width:1px;height:1px;border-radius:50%;box-shadow:'+particlesSmall+';animation:animStar 50s linear infinite;'; }
    if (particles2) { particles2.style.cssText = 'width:1.5px;height:1.5px;border-radius:50%;box-shadow:'+particlesMedium+';animation:animateParticle 100s linear infinite;'; }
    if (particles3) { particles3.style.cssText = 'width:2px;height:2px;border-radius:50%;box-shadow:'+particlesLarge+';'; }
    var starsSmall = generateStars(1000);
    var starsMedium = generateStars(500);
    var starsLarge = generateStars(250);
    var stars1 = document.getElementById('stars1');
    var stars2 = document.getElementById('stars2');
    var stars3 = document.getElementById('stars3');
    if (stars1) stars1.style.cssText = 'width:1px;height:1px;border-radius:50%;box-shadow:'+starsSmall+';';
    if (stars2) stars2.style.cssText = 'width:1.5px;height:1.5px;border-radius:50%;box-shadow:'+starsMedium+';';
    if (stars3) stars3.style.cssText = 'width:2px;height:2px;border-radius:50%;box-shadow:'+starsLarge+';';
  }
  if (typeof document !== 'undefined'){
    document.addEventListener('astro:after-swap', initBG);
    window.addEventListener('load', initBG);
  }
})();
