import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme === 'dark') {
      document.body.classList.add('dark');
  } else {
      document.body.classList.remove('dark');
  }
  