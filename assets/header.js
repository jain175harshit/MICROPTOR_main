// Shared header behavior: product dropdown (desktop) and mobile menu toggles
(function(){
  function qs(sel){return document.querySelector(sel)}
  function qsa(sel){return document.querySelectorAll(sel)}

  // Desktop product menu
  const prodBtn = qs('[data-products-btn]');
  const prodMenu = qs('[data-products-menu]');
  if (prodBtn && prodMenu){
    prodBtn.addEventListener('click', (e)=>{ 
      e.stopPropagation(); 
      prodMenu.classList.toggle('hidden'); 
    });
    document.addEventListener('click', (e)=>{ 
      if (!prodMenu.contains(e.target) && !prodBtn.contains(e.target)) {
        prodMenu.classList.add('hidden');
      }
    });
  }

  // Mobile menu toggle
  const mobileToggle = qs('#mobileToggle');
  const mobileMenu = qs('#mobileMenu');
  if (mobileToggle && mobileMenu){
    function setMobile(open){
      if (open){
        mobileMenu.classList.remove('hidden');
        document.body.classList.add('menu-open');
      } else {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('menu-open');
      }
    }
    mobileToggle.addEventListener('click',(e)=>{ 
      e.stopPropagation(); 
      const open = mobileMenu.classList.contains('hidden');
      setMobile(open);
    });
    
    // Prevent menu from closing when clicking inside it
    mobileMenu.addEventListener('click', (e)=>{ 
      e.stopPropagation(); 
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e)=>{ 
      if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        setMobile(false);
      }
    });
  }

  // Mobile products submenu
  const mobileProductsBtn = qs('#mobileProductsBtn');
  const mobileProductsMenu = qs('#mobileProductsMenu');
  if (mobileProductsBtn && mobileProductsMenu){
    mobileProductsBtn.addEventListener('click',(e)=>{ 
      e.stopPropagation(); 
      mobileProductsMenu.classList.toggle('hidden'); 
    });
  }
})();
