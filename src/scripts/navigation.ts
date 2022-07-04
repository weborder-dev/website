class Navigation {
   constructor() {
      document.querySelectorAll('.navigation a[href^="/index.html#"]').forEach(anchor => {
         anchor.addEventListener('click', this.anchorClick);
     });
   }

   anchorClick(this: HTMLElement, e: any) {
      e.preventDefault();
      const hashPosition: number | undefined = this.getAttribute('href')?.indexOf('#');
      const hashString: string | undefined = this.getAttribute('href')?.substring(hashPosition || 0);
      const isIndex: boolean = window.location.href.indexOf('index.html') == -1? false : true;

      if (isIndex) {
         document.querySelector(hashString!)!.scrollIntoView({
            behavior: 'smooth'
         });
      }
      else {
         window.location.assign('/index.html' + hashString);
      }
   }
}

new Navigation();
