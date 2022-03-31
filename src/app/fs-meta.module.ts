import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FS_META_DEFAULT_CONFIG } from './fs-meta.providers';
import { FsMeta } from './services/fs-meta.service';
import { FsMetaTag } from './interfaces/meta-tag.interface';
// import { FsComponentService } from './services';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
  ],
  entryComponents: [
  ],
  declarations: [
  ],
  providers: [
    // FsComponentService,
  ],
})
export class FsMetaModule {
  static forRoot(config: { defaults?: FsMetaTag[] } = {}): ModuleWithProviders<FsMetaModule> {
    return {
      ngModule: FsMetaModule,
      providers: [
        {
          provide: FS_META_DEFAULT_CONFIG,
          useValue: config.defaults || {}
        },
        FsMeta,
      ]
    };
  }
}
