import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ]
})
export class FsCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsCoreModule
    };
  }
}
