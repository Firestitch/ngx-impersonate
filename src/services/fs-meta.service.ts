import { Inject, Injectable } from '@angular/core';
import { ActivationEnd, ActivationStart, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

import { filter } from 'rxjs/operators';

import { FS_META_DEFAULT_CONFIG } from '../fs-meta.providers';


@Injectable()
export class FsMeta {

  private _activeProperties: string[] = [];
  private _tagsByUrl = new Map();
  private _defaults = new Map();

  constructor(private _meta: Meta,
              private _router: Router,
              @Inject(FS_META_DEFAULT_CONFIG) _defaults) {
    this._setupDefaults(_defaults);
    this._subscribeToRouteChange();
  }

  /**
   * Set new meta tag for current url
   * @param {string} property
   * @param {string} content
   */
  public set(property: string, content: string) {
   if (this._router.url && !this._tagsByUrl.has(this._router.url)) {
     this._tagsByUrl.set(this._router.url, new Map()); // Init store for current URL
   }

   const urlTags = this._tagsByUrl.get(this._router.url);
   urlTags.set(property, content);  // Push tag into store
  }

  /**
   * Remove meta tag for current url
   * @param {string} property
   */
  public remove(property: string) {
    if (this._router.url && this._tagsByUrl.has(this._router.url)) {
      this._tagsByUrl.get(this._router.url).delete(property);  // Delete tag from store

      const activePropertyIndex = this._activeProperties.findIndex((prop) => prop === property);

      if (activePropertyIndex > -1) {
        this._activeProperties.splice(activePropertyIndex, 1); // Delete from active props
      }

      this._meta.removeTag(`name='${property}'`); // Delete from HTML
    }
  }

  /**
   * Process default tags
   * @param defaults
   * @private
   */
  private _setupDefaults(defaults) {
    if (defaults && Array.isArray(defaults)) {
      defaults.forEach((item) => {
        this._defaults.set(item.property, item.content);
      })
    }
  }

  /**
   * Attach meta tag to HTML and save name of its tag to array with active props.
   * @param property
   * @param content
   * @private
   */
  private _addMetaTag(property, content) {
    this._activeProperties.push(property);  // Push to active props store. They are applied for page now
    this._meta.addTag({ name: property, content: content }); // Attach new tag to HTML
  }

  /**
   * Attach meta tags for active URL
   * @private
   */
  private _setTagsForUrl() {

    const urlTags = this._tagsByUrl.get(this._router.url);

    // At the beginning let's apply default tags for activated page
    this._defaults.forEach((content, property) => {
      if (!urlTags || !urlTags.has(property)) {
        this._addMetaTag(property, content);
      }
    });

    // And after that apply tags from store (some of them will be overwritten)
    if (urlTags) {
      urlTags.forEach((content, property) => {
        this._addMetaTag(property, content);
      });
    }
  }

  /**
   * Remove all meta tags which has been setted up
   * @private
   */
  private _removeActiveTags() {
    this._activeProperties.forEach((property) => {
      if (this._meta.getTag(`name='${property}'`)) {
        this._meta.removeTag(`name='${property}'`);
      }
    });

    this._activeProperties = [];
  }

  /**
   * Subscribe to route changing and remove/add meta tags
   * @private
   */
  private _subscribeToRouteChange() {
    this._router
      .events
      .pipe(
        filter(event => event instanceof ActivationStart || event instanceof ActivationEnd)
      )
      .subscribe((event: any) => {
        if (event instanceof ActivationStart) {
          this._removeActiveTags();
        }
        if (event instanceof ActivationEnd) {
          this._setTagsForUrl();
        }
      });
  }
}
