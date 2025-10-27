import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AccountResolve } from './app/resolves/account.resolve';
import { Routes, provideRouter } from '@angular/router';
import { ExamplesComponent, Page1Component, Page2Component, ComponentClassComponent, ComponentClassPageComponent, ObserverComponent, ObserverPage1Component, ObserverPage2Component } from './app/components';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  {
    path: '', component: ExamplesComponent, children:
      [
        { path: 'body/page1', component: Page1Component },
        {
          path: 'body/page2',
          component: Page2Component,
          data: { bodyClass: 'body-feed,body-class' },
        },
      ],
  },
  {
    path: '', component: ComponentClassComponent, children:
      [
        { path: 'component/class1', component: ComponentClassPageComponent },
        { path: 'component/class2', component: ComponentClassPageComponent },
      ],
  },
  {
    path: '', component: ComponentClassComponent, children:
      [
        { path: 'component/class1', component: ComponentClassPageComponent },
        { path: 'component/class2', component: ComponentClassPageComponent },
      ],
  },
  {
    path: '', component: ObserverComponent,
    resolve: { account: AccountResolve },
    children:
      [
        { path: 'observer/page1', component: ObserverPage1Component },
        { path: 'observer/page2', component: ObserverPage2Component },
      ],
  },
];



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, FsSkeletonModule, FsExampleModule.forRoot(), FsMessageModule.forRoot()),
        AccountResolve,
        provideAnimations(),
        provideRouter(routes)
    ]
})
  .catch(err => console.error(err));

