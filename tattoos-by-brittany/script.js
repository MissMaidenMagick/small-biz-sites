document.querySelectorAll('[data-menu]').forEach((button)=>button.addEventListener('click',()=>document.querySelector('nav')?.classList.toggle('open')));

const siteRoot = document.body?.querySelector('.site-header')?.getAttribute('data-site-root') || (location.pathname.includes('/tattoos-by-brittany/') ? location.pathname.split('/tattoos-by-brittany/')[1].split('/').filter(Boolean).length ? '../' : './' : './');
const flamingoPath = `${siteRoot}images/flamingo-logo.png`;
document.querySelectorAll('.brand-mark').forEach((mark)=>{
  mark.textContent='';
  mark.setAttribute('aria-label','Tattoos by Brittany logo');
  const logo=document.createElement('img');
  logo.src=flamingoPath;
  logo.alt='';
  mark.append(logo);
});
document.querySelectorAll('img[src*="floral-ribbon-strawberries"]').forEach((image)=>{
  image.src=`${siteRoot}images/pink-flower-moon.png`;
  image.alt='Pink flower and blue moon tattoo';
});
const accent=document.createElement('div');
accent.className='flamingo-accent';
accent.setAttribute('aria-hidden','true');
accent.innerHTML=`<img src="${flamingoPath}" alt="">`;
document.querySelector('main')?.append(accent);
