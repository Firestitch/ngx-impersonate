import { Injectable, inject } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';


import { Observable } from 'rxjs';

import { ImpersonateComponent } from '../components';


@Injectable({
  providedIn: 'root',
})
export class FsImpersonate {
  private _dialog = inject(MatDialog);


  public impersonate(
    options: {
      email: string;
      code: Observable<string>;
    },
  ): Observable<any> {
    const dialogRef = this._dialog.open(ImpersonateComponent, {
      data: options,
    });

    return dialogRef.afterClosed();
  }

}
