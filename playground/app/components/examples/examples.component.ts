import { Component } from '@angular/core';

@Component({
  templateUrl: 'examples.component.html'
})
export class ExamplesComponent {

  mainModule = `@NgModule({
      FsMetaModule.forRoot({
        defaults: [
          { property: 'og:title', content: 'The Rock' },
          { property: 'og:test', content: 'The Test' },
        ]
      });`;
}
