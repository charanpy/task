'use strict';

define('task/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/icons/audio-icon.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/icons/audio-icon.js should pass ESLint\n\n');
  });

  QUnit.test('components/icons/calender-icon.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/icons/calender-icon.js should pass ESLint\n\n');
  });

  QUnit.test('components/icons/info-icon.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/icons/info-icon.js should pass ESLint\n\n');
  });

  QUnit.test('components/icons/location-icon.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/icons/location-icon.js should pass ESLint\n\n');
  });

  QUnit.test('components/icons/phone-icon.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/icons/phone-icon.js should pass ESLint\n\n');
  });

  QUnit.test('components/icons/tick-icon.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/icons/tick-icon.js should pass ESLint\n\n');
  });

  QUnit.test('components/icons/video-icon.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/icons/video-icon.js should pass ESLint\n\n');
  });

  QUnit.test('components/meeting-header.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/meeting-header.js should pass ESLint\n\n');
  });

  QUnit.test('components/meeting-input.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/meeting-input.js should pass ESLint\n\n');
  });

  QUnit.test('components/meeting-type.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/meeting-type.js should pass ESLint\n\n');
  });

  QUnit.test('components/schedule-container.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/schedule-container.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass ESLint\n\n');
  });
});
define('task/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
});
define('task/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'task/tests/helpers/start-app', 'task/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var resolve = Ember.RSVP.resolve;
});
define('task/tests/helpers/resolver', ['exports', 'task/resolver', 'task/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('task/tests/helpers/start-app', ['exports', 'task/app', 'task/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = Ember.merge({}, _environment.default.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('task/tests/integration/components/icons/audio-icon-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('icons/audio-icon', 'Integration | Component | icons/audio icon', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "SJZw/NMd",
      "block": "{\"statements\":[[1,[26,[\"icons/audio-icon\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "djHYi28a",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"icons/audio-icon\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('task/tests/integration/components/icons/calender-icon-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('icons/calender-icon', 'Integration | Component | icons/calender icon', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "TgoXj+zB",
      "block": "{\"statements\":[[1,[26,[\"icons/calender-icon\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "BfaRSiee",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"icons/calender-icon\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('task/tests/integration/components/icons/info-icon-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('icons/info-icon', 'Integration | Component | icons/info icon', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "njmjr49B",
      "block": "{\"statements\":[[1,[26,[\"icons/info-icon\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "97iw2AQk",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"icons/info-icon\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('task/tests/integration/components/icons/location-icon-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('icons/location-icon', 'Integration | Component | icons/location icon', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "LysSsB93",
      "block": "{\"statements\":[[1,[26,[\"icons/location-icon\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Wh7P/wwu",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"icons/location-icon\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('task/tests/integration/components/icons/phone-icon-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('icons/phone-icon', 'Integration | Component | icons/phone icon', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "HKl6epUr",
      "block": "{\"statements\":[[1,[26,[\"icons/phone-icon\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "tHH7i8iV",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"icons/phone-icon\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('task/tests/integration/components/icons/tick-icon-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('icons/tick-icon', 'Integration | Component | icons/tick icon', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "zTdLs6sP",
      "block": "{\"statements\":[[1,[26,[\"icons/tick-icon\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "5RQrGz+8",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"icons/tick-icon\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('task/tests/integration/components/icons/video-icon-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('icons/video-icon', 'Integration | Component | icons/video icon', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "jaE0Gm5d",
      "block": "{\"statements\":[[1,[26,[\"icons/video-icon\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "EhHi7ZaU",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"icons/video-icon\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('task/tests/integration/components/meeting-header-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('meeting-header', 'Integration | Component | meeting header', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "b2dgzo6R",
      "block": "{\"statements\":[[1,[26,[\"meeting-header\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "xvGu9tht",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"meeting-header\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('task/tests/integration/components/meeting-input-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('meeting-input', 'Integration | Component | meeting input', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Y9m1i4UK",
      "block": "{\"statements\":[[1,[26,[\"meeting-input\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "3vilTvrz",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"meeting-input\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('task/tests/integration/components/meeting-type-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('meeting-type', 'Integration | Component | meeting type', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "ebaLzSL7",
      "block": "{\"statements\":[[1,[26,[\"meeting-type\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "H8i51mRW",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"meeting-type\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('task/tests/integration/components/schedule-container-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('schedule-container', 'Integration | Component | schedule container', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "NVUDAwBz",
      "block": "{\"statements\":[[1,[26,[\"schedule-container\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "tE5519jb",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"schedule-container\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('task/tests/test-helper', ['task/tests/helpers/resolver', 'ember-qunit', 'ember-cli-qunit'], function (_resolver, _emberQunit, _emberCliQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
  (0, _emberCliQunit.start)();
});
define('task/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/icons/audio-icon-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/icons/audio-icon-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/icons/calender-icon-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/icons/calender-icon-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/icons/info-icon-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/icons/info-icon-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/icons/location-icon-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/icons/location-icon-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/icons/phone-icon-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/icons/phone-icon-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/icons/tick-icon-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/icons/tick-icon-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/icons/video-icon-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/icons/video-icon-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/meeting-header-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/meeting-header-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/meeting-input-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/meeting-input-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/meeting-type-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/meeting-type-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/schedule-container-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/schedule-container-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass ESLint\n\n');
  });
});
define('task/tests/unit/routes/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
require('task/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
