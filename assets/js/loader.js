  /**
   * loader
   */
  const loader = document.getElementById('loader');
  if (loader) {
    document.body.style.overflow = 'hidden'
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.remove(); 
        document.body.style.overflow = 'auto'
      }, 500);
    });
  }