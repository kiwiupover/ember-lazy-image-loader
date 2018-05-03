import { A } from '@ember/array';
import Route from '@ember/routing/route';

export default Route.extend({
  model: function() {
    return A([{
      text: 'Yehuda Katz',
      url:  'https://emberjs.com/images/team/ykatz-f12c13d5.jpg'
    }, {
      text: 'Tom Dale',
      url:  'https://emberjs.com/images/team/tdale-839fa52a.jpg'
    }, {
      text: 'Kris Selden',
      url:  'https://emberjs.com/images/team/kselden-8c01e5e1.jpg'
    }, {
      text: 'Stefan Penner',
      url:  'https://emberjs.com/images/team/spenner-41e53a7a.jpg'
    }, {
      text: 'Leah Silber',
      url:  'https://emberjs.com/images/team/lsilber-8a46f1f4.jpg'
    }, {
      text: 'Katie Gengler',
      url:  'https://emberjs.com/images/team/kgengler-4e2d8f33.jpg'
    }, {
      text: 'Robert Jackson',
      url:  'https://emberjs.com/images/team/rjackson-2906e4e0.jpg'
    }, {
      text: 'Igor Terzic',
      url:  'https://emberjs.com/images/team/iterzic-bdc895ee.jpeg'
    }]);
  }
});
