import { Component } from '@angular/core';
import { FsMeta } from '../../../../../src/services';


@Component({
  selector: 'page2',
  templateUrl: './page2.component.html'
})
export class Page2Component {
  constructor(private _meta: FsMeta) {
    this._meta.set('test:page2', 'page2');
  }
}
