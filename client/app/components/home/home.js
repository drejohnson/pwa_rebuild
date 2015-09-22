import template from './home.html!text';
import './home.css!';
import {RouteConfig, Component, View, Inject} from '../../core/decorators/decorators';

// start-non-standard
@RouteConfig('home', {
  url: '/',
  template: '<home></home>',
  resolve: {
    // Constant Meta
    $title: () => 'Home',
    $description: () => 'My App description'
  }
})
@Component({
  selector: 'home'
})
@View({
  template: template
})
@Inject('$scope', '$rootScope', '$http', '$state', '$interval', '$location', '$log')
// end-non-standard

// Home Controller
class Home {
  constructor($scope, $rootScope, $http, $state, $interval, $location, $log) {
    this.$scope = $scope;
    this.$http = $http;
    this.$state = $state;
    this.$interval = $interval;
    this.$location = $location;
    this.$log = $log;
    this.name = 'home';
    this.intro = [{
      'heading': 'The Facts'
    }];
    this.isHome = this.$state.current.url === '/';
    this.activated = false;

    // On load
    this.activate();
  }

  /**
   * Handles on load processing, and loading initial data
 */
  activate() {
    this.$log.log(this.$state.current.url === '/');

    const stateChangeSuccess = this.$scope.$on('$stateChangeSuccess', (event, toState) => {
      this.isHome;
    });

    const unbind = [
      stateChangeSuccess
    ];

    this.$scope.$on('$destroy', () => {
      unbind.forEach((fn) => {
        fn();
      });
    });

    this.activated = true;
  }
}

export default Home;
