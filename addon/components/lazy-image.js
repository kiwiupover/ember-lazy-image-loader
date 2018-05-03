import { computed, get } from '@ember/object';
import Component from '@ember/component';
import ImageLoadMixin  from '../mixins/image-load';
import LazyImageMixin  from '../mixins/lazy-image';
import InViewportMixin from 'ember-in-viewport';
import layout from '../templates/components/lazy-image'

export default Component.extend(InViewportMixin, ImageLoadMixin, LazyImageMixin, {
  layout,

  classNames: ['lazy-image-container'],

  classNameBindings: ['loaded', 'errorThrown'],

  concatenatedProperties: ['class'],

  init() {
    this._super(...arguments);
    const classArray = get(this, 'class') || [];
    classArray.push('lazy-image');
    this.className = classArray.join(' ');
  },

  _setupAttributes() {
    const img       = this.$('img');
    const component = this;

    Object.keys(component).forEach((key) => {
      if (key.substr(0, 5) === 'data-' && !key.match(/Binding$/)) {
        img.attr(key, component.get(key));
      }
    });
  },

  useDimensionsAttrs: computed('width', 'height', function() {
    return !this.get('width') || !this.get('height') ? false : true;
  })
});
