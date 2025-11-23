// Shared header behavior: product dropdown (desktop) and mobile menu toggles
(function(){
  function qs(sel){return document.querySelector(sel)}
  function qsa(sel){return document.querySelectorAll(sel)}

  // Desktop product menu
  const prodBtn = qs('[data-products-btn]');
  const prodMenu = qs('[data-products-menu]');
  if (prodBtn && prodMenu){
    prodBtn.addEventListener('click', (e)=>{ e.stopPropagation(); prodMenu.classList.toggle('hidden'); });
    document.addEventListener('click', ()=>{ if (!prodMenu.classList.contains('hidden')) prodMenu.classList.add('hidden'); });
  }

  // Mobile menu toggle
  const mobileToggle = qs('#mobileToggle');
  const mobileMenu = qs('#mobileMenu');
  if (mobileToggle && mobileMenu){
    mobileToggle.addEventListener('click',(e)=>{ e.stopPropagation(); mobileMenu.classList.toggle('hidden'); });
    document.addEventListener('click', ()=>{ if (!mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden'); });
  }

  // Mobile products submenu
  const mobileProductsBtn = qs('#mobileProductsBtn');
  const mobileProductsMenu = qs('#mobileProductsMenu');
  if (mobileProductsBtn && mobileProductsMenu){
    mobileProductsBtn.addEventListener('click',(e)=>{ e.stopPropagation(); mobileProductsMenu.classList.toggle('hidden'); });
  }
})();
