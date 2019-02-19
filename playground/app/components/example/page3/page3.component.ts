import { FsMeta } from '@firestitch/meta';
import { Component } from '@angular/core';


@Component({
  selector: 'page3',
  templateUrl: './page3.component.html'
})
export class Page3Component {
  constructor(private _meta: FsMeta) {
  }
}
