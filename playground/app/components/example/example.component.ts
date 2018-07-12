import { Component } from '@angular/core';
import { FsMetaService } from '../../../../src/services';

@Component({
  selector: 'example',
  templateUrl: 'example.component.html'
})
export class ExampleComponent {
  public tabs = [
    { path: '/body/page1', label: 'Page Without Class' },
    { path: '/body/page2', label: 'Page With Class' }
  ];

  constructor() {}
}
