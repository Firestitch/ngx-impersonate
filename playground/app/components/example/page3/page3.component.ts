import { Component } from '@angular/core';
import { FsMetaService } from '../../../../../src/services';


@Component({
  selector: 'page3',
  templateUrl: './page3.component.html'
})
export class Page3Component {
  constructor(private _meta: FsMetaService) {
  }
}
