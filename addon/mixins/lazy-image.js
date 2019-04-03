import Mixin from '@ember/object/mixin';
import { dasherize } from '@ember/string';
import { setProperties, computed, set, get } from '@ember/object';

import { storageFor } from 'ember-local-storage';

export default Mixin.create({
  _cache: storageFor('cache', { legacyKey: 'ember-lazy-images-loader' }),

  lazyUrl: null,

  didInsertElement() {
    setProperties(this, {
      viewportScrollSensitivity: 20,
      viewportListeners: [
        { context: window, event: 'scroll.scrollable' },
        { context: window, event: 'resize.resizable' },
        { context: document, event: 'touchmove.scrollable' }
      ]
    });

    this._super(...arguments);
  },

  didRender() {
    this._super(...arguments);
    this._setupAttributes();
  },


  didEnterViewport(){
    if (this.isDestroying || this.isDestroyed) { return; }

    const url             = get(this, 'url');
    const cache           = get(this, '_cache');
    const lazyUrl         = get(this, 'lazyUrl');
    const cacheKey        = get(this, '_cacheKey');

    if (cacheKey && get(cache, cacheKey)) {
      this._safeSet('lazyUrl', url);
    }

    if (lazyUrl === null) {
      this._safeSet('lazyUrl', url);

      if (cacheKey) {
        if (!(this.isDestroying || this.isDestroyed)) {
          set(cache, cacheKey, true);
        }
      }
    }
  },

  _cacheKey: computed('url', function() {
    var url = this.get('url');
    var key;

    if (url) {
      key = dasherize(url.toString().replace(/^http[s]?:\/\/|\.|\//g, ''));
    }

    if (key) {
      return key;
    }
  }),

  _safeSet(key, val) {
    if (!(this.isDestroying || this.isDestroyed)) {
      set(this, key, val);
    }
  }
});
