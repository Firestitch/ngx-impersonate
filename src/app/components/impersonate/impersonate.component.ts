import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit,
} from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  templateUrl: './impersonate.component.html',
  styleUrls: ['./impersonate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImpersonateComponent implements OnInit {

  public code;
  public signinLink;
  public email;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _cdRef: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    const code$ = this._data.code;
    code$
      .subscribe((code) => {
        this.email = this._data.email;
        this.code = this._data.code;
        this.code = code;
        const url = new URL(window.location.href);
        url.pathname = 'signin';
        url.search = '';
        this.signinLink = url.toString();
        this._cdRef.markForCheck();
      });
  }

}
