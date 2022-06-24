class Global {
   constructor() {
      window.addEventListener('load', () => {
         this.onPageLoad();
      });

      // navigation bar
      let navScrollButtons = [
         ...document.getElementsByClassName('navigation__scroll-cta')
      ];

      navScrollButtons.forEach((singleButton) => {
         singleButton.addEventListener('click', (e: Event) => {
            e.stopPropagation();
            this.onScrollButtonClick(e);
         });
      });
   }

   isLandingPage(): Boolean {
      const currentURL = window.location.pathname;
      return Boolean(currentURL === '/' || currentURL.includes('index.html'));
   }

   onPageLoad() {
      console.log('onload');

      if (this.isLandingPage()) {
         this.onLandingPageLoad();
         return;
      }
   }

   onLandingPageLoad() {
      console.log('onload landing');
      const queryParams = new URLSearchParams(window.location.search);
      const sectionParam = queryParams.get('section');

      if (sectionParam) {
         this.scrollToElement(sectionParam);
      }
   }

   scrollToElement(targetElementId: string) {
      if (targetElementId) {
         const targetElement = document.getElementById(targetElementId);
         targetElement?.scrollIntoView({ behavior: 'smooth' });
      }
   }

   onScrollButtonClick(e: Event) {
      const currentElement = e.target as HTMLElement;
      const targetElementId = currentElement.getAttribute('scroll-to');
      const currentURL = window.location.pathname;

      // redirecting to landing page if we are in another page
      if (!this.isLandingPage()) {
         window.location.assign(`/index.html?section=${targetElementId}`);
         return;
      }

      this.scrollToElement(targetElementId ?? '');
   }
}

new Global();
