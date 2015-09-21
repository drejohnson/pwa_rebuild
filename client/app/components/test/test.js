import template from './test.html!text';
import {RouteConfig, Component, View, Inject} from '../../core/decorators/decorators';

// start-non-standard
@RouteConfig('app.test', {
  url: '/',
  template: '<test></test>',
  resolve: {
    // Constant Meta
    $title: () => 'Test',
    $description: () => 'Test description'
  }
})
@Component({
  selector: 'test'
})
@View({
  template: template
})
@Inject('$log')
// end-non-standard

// Test Controller
class Test {
  constructor() {
    this.name = 'test';
    this.activated = false;
    // On load
    this.activate();
  }

  /**
   * Handles on load processing, and loading initial data
 */
  activate() {

    this.activated = true;
  }
}

export default Test;
