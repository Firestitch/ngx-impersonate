import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FsImpersonate } from '@firestitch/meta';

import { of } from 'rxjs';


@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {

  constructor(
    private _impersonate: FsImpersonate,
  ) { }

  public impersonate(): void {
    this._impersonate.impersonate({
      email: 'admin@admin.com',
      code: of('dj389d233'),
    });
  }
}
