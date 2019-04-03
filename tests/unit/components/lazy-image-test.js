import { get } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, settled } from '@ember/test-helpers';

import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | lazy-image', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    window.sessionStorage.clear();
  });

  const placeholderSelector    = '.lazy-image-placeholder';
  const errorMessageSelector   = '.lazy-image-error-message';

  test('it has correct defaults', async function(assert) {
    assert.expect(5);

    await render(hbs`{{lazy-image}}`);

    const component = this.owner.lookup('component:lazy-image');

    assert.equal(get(component, 'loaded'),           false);
    assert.equal(get(component, 'errorThrown'),      false);
    assert.equal(get(component, 'lazyUrl'),          null);
    assert.equal(get(component, 'defaultErrorText'), 'Image failed to load');
    assert.equal(get(component, 'className'),            'lazy-image');
  });

  test('it renders default placeholder', async function(assert) {
    assert.expect(1);

    await render(hbs`{{lazy-image}}`);

    assert.ok(find(placeholderSelector), 'placeholder is correctly rendered');
  });

  test('it renders default error message if image fails to load', async function(assert) {
    assert.expect(2);

    await render(hbs`{{lazy-image errorThrown=true}}`);

    assert.ok(find(errorMessageSelector), 'error message is correctly rendered');
    assert.equal(this.element.textContent.trim(), 'Image failed to load', 'default error message is rendered correctly');
  });

  test('it leverages cache', async function(assert) {
    assert.expect(1);
    await render(hbs`{{lazy-image url='https://emberjs.com/images/team/kselden-abe74f5f4c87ed593201f880553516af.jpg'}}`);

    await settled();

    let lazyImages = window.sessionStorage['ember-lazy-images-loader']
    let cache = lazyImages ? JSON.parse(lazyImages) : lazyImages;

    assert.deepEqual(cache, {
      'emberjscomimagesteamkselden-abe74f5f4c87ed593201f880553516afjpg': true
    });
  });

  test('`width` and `height` bindings work correctly', async function(assert) {
    assert.expect(2);

    await render(hbs`{{lazy-image width=400 height=400}}`);

    let image = find('img');
    assert.equal(image.width, 400, 'width is correct');
    assert.equal(image.height, 400, 'height is correct');
  });

  test('`width` and `height` are not used if set to 0 or unset', async function(assert) {
    assert.expect(2);

    await render(hbs`{{lazy-image width=400}}`);

    let image = find('img');
    assert.notOk(image.width, 'width is not used');
    assert.notOk(image.height, 'height is not used');
  });

  test('`data-*` attribute bindings work correctly', async function(assert) {
    assert.expect(1);

    await render(hbs`{{lazy-image data-person-id=1234}}`);

    assert.equal(find('img').dataset.personId, 1234, 'data attribute is correct');
  });

  test('passing class names for the <img> element', async function(assert) {
    assert.expect(2);

    await render(hbs`{{lazy-image class='img-responsive image-thumbnail'}}`);

    assert.ok(find('img').classList.contains('img-responsive'));
    assert.ok(find('img').classList.contains('image-thumbnail'));
  });

  test('passing alt attribute for the <img> element', async function(assert) {
    assert.expect(1);

    await render(hbs`{{lazy-image alt='alternate text'}}`);

    assert.equal(find('img').alt, 'alternate text');
  });
});
