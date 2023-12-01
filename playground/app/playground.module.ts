import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';


import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsSkeletonModule } from '@firestitch/skeleton';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {
  BasicComponent,
  BasicDialogComponent,
  ComponentClassComponent,
  ComponentClassPageComponent,
  ComponentExampleComponent,
  ExampleComponent,
  ExamplesComponent,
  ObserverComponent,
  ObserverPage1Component,
  ObserverPage2Component,
  Page1Component,
  Page2Component,
} from './components';
import { AppMaterialModule } from './material.module';
import { AccountResolve } from './resolves/account.resolve';


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

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsSkeletonModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
  ],
  entryComponents: [
    BasicDialogComponent,
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    ExampleComponent,
    Page1Component,
    Page2Component,
    BasicDialogComponent,
    BasicComponent,
    ComponentClassComponent,
    ComponentClassPageComponent,
    ComponentExampleComponent,
    ObserverPage2Component,
    ObserverPage1Component,
    ObserverComponent,
  ],
  providers: [
    AccountResolve,
  ],
})
export class PlaygroundModule {
}
