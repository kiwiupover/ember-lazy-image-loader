# ember-lazy-image-loader


![CircleCI branch](https://img.shields.io/circleci/project/github/kiwiupover/ember-lazy-image-loader/master.svg?style=for-the-badge)

`ember-lazy-image-loader` is a modern fork of the great work by [twokul](https://github.com/twokul/ember-lazy-image)
`ember-lazy-image-loader` is a component that allows you to gracefully handle image loading.

Component will load images lazily, only if they appeared in the view port.
This optimization brings page load time down.

Default loading placeholder is stolen from [aurer](https://github.com/aurer) and his awesome [codepen](http://codepen.io/aurer/pen/jEGbA).

### Installation

From inside your ember-cli project, run the following:

```bash
ember install ember-lazy-image-loader
```

```

### lazy-image

```hbs
{{lazy-image url='http://my-valid-url.com/foo.jpg'}}
```

Component will wait until the image is loaded and while waiting it will show default
loading placeholder (see above).

You can customize `loading` placeholder by passing it as an parameter:

```hbs
{{#lazy-image url='http://my-valid-url.com/foo.jpg'}}
  <!-- custom template goes here, spinner, svg, etc. -->
{{/lazy-image}}
```

You can also define the fallback if the image failed to load. By default, component will render
`Image failed to load` text.

You can customize `error` text by passing it as an parameter:

```hbs
{{lazy-image url='http://my-not-valid-url.com/foo.jpg' errorText='Something went wrong.'}}
```

### `width`, `height` and `data-*` attributes

Lazy Image supports `width`, `height` and `data-*` attribute bindings.

```hbs
{{lazy-image url='http://my-valid-url.com/foo.jpg' width=400 height=400 data-foo-bar="my-foo-bar"}}
{{lazy-image url='http://my-valid-url.com/foo.jpg' width=400 height=400 data-foo-bar=foo.bar.path}}
```

### `class` attribute

You can also pass class names for the image element.

```hbs
{{lazy-image url='http://my-valid-url.com/foo.jpg' class='foo-bar baz-bar'}}
```

### `alt` attribute

You can pass the alt attribute to the component and it will be rendered on the image element

```hbs
{{lazy-image url='http://my-valid-url.com/foo.jpg' alt='foo description'}}
```

### ember-in-viewport options

Lazy Image uses [ember-in-viewport](https://github.com/dockyard/ember-in-viewport/) for viewport detection. Due to the way listeners and `requestAnimationFrame` is setup, you'll have to override the `ember-in-viewport` options by creating `app/components/lazy-image.js`:

```js
// app/components/lazy-image.js

import Ember from 'ember';
import LazyImage from 'ember-lazy-image/components/lazy-image';

export default LazyImage.extend({
  viewportOptionsOverride: Ember.on('didInsertElement', function() {
    Ember.setProperties(this, {
      viewportUseRAF      : true,
      viewportSpy         : false,
      viewportRefreshRate : 150,
      viewportTolerance: {
        top    : 50,
        bottom : 50,
        left   : 20,
        right  : 20
      }
    });
  })
});
```

See [Advanced usage (options)](https://github.com/dockyard/ember-in-viewport/tree/1.0.0#advanced-usage-options) for more in detail `ember-in-viewport` options.

The use of `threshold` is deprecated in favor of `viewportTolerance`.

### Experimental `lazy-background-image`

This is an experimental component that will add `background-image` style attribute to a component's `div`. It also
sets `min-height` attribute to `270px` so the image is visible. You should be able to overwrite it by using `lazy-background-image` class.

## Installation

* `git clone https://github.com/kiwiupover/ember-lazy-image-loader.git` this repository
* `yarn install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
