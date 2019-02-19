import { Component } from '@angular/core';


@Component({
  selector: 'example',
  templateUrl: 'example.component.html'
})
export class ExampleComponent {
  public tabs = [
    { path: '/meta/page1', label: 'Page 1' },
    { path: '/meta/page2', label: 'Page 2' },
    { path: '/meta/page3', label: 'Page 3' },
  ];

  constructor() {}
}
