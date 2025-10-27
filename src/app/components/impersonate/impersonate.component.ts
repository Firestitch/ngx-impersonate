import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FsDialogModule } from '@firestitch/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsOneTimePasswordCodeModule } from '@firestitch/one-time-password';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';


@Component({
    templateUrl: './impersonate.component.html',
    styleUrls: ['./impersonate.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsDialogModule,
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        FsSkeletonModule,
        FsOneTimePasswordCodeModule,
        RouterLink,
        MatDialogActions,
        MatButton,
        MatDialogClose,
    ],
})
export class ImpersonateComponent implements OnInit {
  private _data = inject(MAT_DIALOG_DATA);
  private _cdRef = inject(ChangeDetectorRef);


  public code;
  public signinLink;
  public email;

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
