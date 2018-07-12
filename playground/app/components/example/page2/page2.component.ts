import { Component } from '@angular/core';
import { FsMetaService } from '../../../../../src/services';


@Component({
  selector: 'page2',
  templateUrl: './page2.component.html'
})
export class Page2Component {
  constructor(private _meta: FsMetaService) {
    this._meta.set('test:page2', 'page2');
  }
}
