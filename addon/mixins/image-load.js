import Mixin from '@ember/object/mixin';
import { run } from '@ember/runloop';
import { set, getWithDefault, computed } from '@ember/object';

export default Mixin.create({
  errorThrown: false,

  init() {
    this._super(...arguments);
    this.loaded = false;
    this.listenersNotSet = true;
  },

  defaultErrorText: computed('errorText', function() {
    return getWithDefault(this, 'errorText', 'Image failed to load');
  }),

  didRender() {
    this._super(...arguments);

    const image = this.$('img');
    const isCached = image[0].complete;

    if (isCached) {
      return run.scheduleOnce('afterRender', this, this._safeSet, 'loaded', true);
    }

    if (this.listenersNotSet) {
      image.one('load', () => {
        image.off('error');
        run(null, run.scheduleOnce, 'afterRender', this, this._safeSet, 'loaded', true);
      });

      image.one('error', () => {
        image.off('load');
        run(null, run.scheduleOnce, 'afterRender', this, this._safeSet, 'errorThrown', true);
      });

      this.listenersNotSet = false;
    }
  },

  _safeSet(key, val) {
    if (!(this.isDestroying || this.isDestroyed)) {
      set(this, key, val);
    }
  }
});
