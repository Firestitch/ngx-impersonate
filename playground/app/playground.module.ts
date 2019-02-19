import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsMetaModule } from '@firestitch/meta';
import { FsMessageModule } from '@firestitch/message';
import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { ExampleComponent, ExamplesComponent } from './components';
import { Page1Component } from './components/example/page1';
import { Page2Component } from './components/example/page2';
import { Page3Component } from './components/example/page3';


const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/meta/page1' },
      { path: 'meta/page1', component: Page1Component },
      { path: 'meta/page2', component: Page2Component },
      { path: 'meta/page3', component: Page3Component },
    ]
  },
];


@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FsMetaModule.forRoot({
      defaults: [
        { property: 'og:title', content: 'The Rock' },
        { property: 'og:test', content: 'The Test' },
      ]
    }),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsExampleModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    FsMessageModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  entryComponents: [],
  declarations: [
    AppComponent,
    ExamplesComponent,
    ExampleComponent,
    Page1Component,
    Page2Component,
    Page3Component,
  ],
  providers: [],
})
export class PlaygroundModule {
}
