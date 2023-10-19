import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { FsDialogModule } from '@firestitch/dialog';
import { FsOneTimePasswordCodeModule } from '@firestitch/one-time-password';
import { FsSkeletonModule } from '@firestitch/skeleton';

import { ImpersonateComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MatDialogModule,
    MatButtonModule,

    FsOneTimePasswordCodeModule,
    FsSkeletonModule,
    FsDialogModule,
  ],
  declarations: [
    ImpersonateComponent,
  ],
})
export class FsImpersonateModule {
  public static forRoot(config = {}): ModuleWithProviders<FsImpersonateModule> {
    return {
      ngModule: FsImpersonateModule,
    };
  }
}
