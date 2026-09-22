const toggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.site-nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));toggle.textContent=open?'Menu':'Close';nav.classList.toggle('is-open',!open)});nav.addEventListener('click',e=>{if(e.target.matches('a')){toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu';nav.classList.remove('is-open')}});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('is-open')){toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu';nav.classList.remove('is-open');toggle.focus()}})}

