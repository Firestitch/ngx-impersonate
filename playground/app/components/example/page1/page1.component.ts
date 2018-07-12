import { Component } from '@angular/core';
import { FsMetaService } from '../../../../../src/services';


@Component({
  selector: 'page1',
  templateUrl: './page1.component.html'
})
export class Page1Component {
  constructor(private _meta: FsMetaService) {
    this._meta.set('test:page1', 'page1');
    this._meta.set('og:test', 'test_from_page1');
  }
}
