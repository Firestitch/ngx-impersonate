import { Inject, Injectable } from '@angular/core';
import { ActivationEnd, ActivationStart, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

import { filter } from 'rxjs/operators';

import { FS_META_DEFAULT_CONFIG } from '../fs-meta.providers';


@Injectable()
export class FsMetaService {

  private _activeProperties: string[] = [];
  private _tagsByUrl = new Map();
  private _defaults = new Map();

  private _currentUrl = null;

  constructor(private _meta: Meta,
              private _router: Router,
              @Inject(FS_META_DEFAULT_CONFIG) _defaults) {
    if (_defaults && Array.isArray(_defaults)) {
      _defaults.forEach((item) => {
        this._defaults.set(item.property, item.content);
      })
    }
    this._subscribeToRouteChange();
  }

  public set(property: string, content: string) {
   if (this._router.url && !this._tagsByUrl.has(this._router.url)) {
     this._tagsByUrl.set(this._router.url, new Map());
   }

   const urlTags = this._tagsByUrl.get(this._router.url);
   urlTags.set(property, content);
  }

  private _addMetaTag(property, content) {
    this._activeProperties.push(property);
    this._meta.addTag({ name: property, content: content });
  }

  private _setTagsForUrl() {

    const urlTags = this._tagsByUrl.get(this._router.url);

    this._defaults.forEach((content, property) => {
      if (!urlTags.has(property)) {
        this._addMetaTag(property, content);
      }
    });

    urlTags.forEach((content, property) => {
      this._addMetaTag(property, content);
    });
  }

  private _removeActiveTags() {
    this._activeProperties.forEach((property) => {
      console.log('get tag:', `name='${property}'`);
      if (this._meta.getTag(`name='${property}'`)) {
        this._meta.removeTag(`name='${property}'`);
      }
    });

    this._activeProperties = [];
  }

  private _subscribeToRouteChange() {
    this._router
      .events
      .pipe(
        filter(event => event instanceof ActivationStart || event instanceof ActivationEnd)
      )
      .subscribe((event: any) => {
        console.log(event);
        if (event instanceof ActivationStart) {
          console.log(this._router.url);
          this._removeActiveTags();
        }
        if (event instanceof ActivationEnd) {
          this._setTagsForUrl();
        }
      });
  }
}
