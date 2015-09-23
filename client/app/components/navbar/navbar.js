import template from './navbar.html!text';
import {RouteConfig, Component, View, Inject} from '../../core/decorators/decorators';

// start-non-standard
@RouteConfig('app.navbar', {
  url: '/',
  template: '<navbar></navbar>',
  resolve: {
    // Constant Meta
    $title: () => 'Navbar',
    $description: () => 'Navbar description'
  }
})
@Component({
  selector: 'navbar'
})
@View({
  template: template
})
@Inject('$log')
// end-non-standard

// Navbar Controller
class Navbar {
  constructor($log) {
    this.$log = $log;
    this.navigation = [
      { state: 'act-now', label: 'Act Now' },
      { state: 'fairness-in-organ-allocation', label: 'Fairness In Organ Allocation' },
      { state: 'fairness-in-healthcare-delivery', label: 'Fairness In Healthcare Delivery' },
      { state: 'religious-beliefs', label: 'Religious Beliefs' },
      { state: 'lets-talk-about-life', label: 'Let\'s Talk About Life: Donation Intentions' }
    ];
    this.activated = false;

    // On load
    this.activate();
  }

  /**
   * Handles on load processing, and loading initial data
 */
  activate() {
    this.$log.log('Navbar Initialized');
    this.activated = true;
  }
}

export default Navbar;
