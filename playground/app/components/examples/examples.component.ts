import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';


@Component({
  templateUrl: 'examples.component.html'
})
export class ExamplesComponent {

  public config = environment;

  mainModule = `@NgModule({
      FsMetaModule.forRoot({
        defaults: [
          { property: 'og:title', content: 'The Rock' },
          { property: 'og:test', content: 'The Test' },
        ]
      });`;
}
