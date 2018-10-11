import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyClassRenderer } from './services';

@NgModule({
  imports: [
    CommonModule,
  ]
})
export class FsCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsCoreModule,
      providers: [BodyClassRenderer]
    };
  }
}
