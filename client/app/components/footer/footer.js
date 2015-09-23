import template from './footer.html!text';
import {RouteConfig, Component, View, Inject} from '../../core/decorators/decorators';

// start-non-standard
@RouteConfig('app.footer', {
  url: '/',
  template: '<footer></footer>',
  resolve: {
    // Constant Meta
    $title: () => 'Footer',
    $description: () => 'Footer description'
  }
})
@Component({
  selector: 'footer'
})
@View({
  template: template
})
@Inject('$log')
// end-non-standard

// Footer Controller
class Footer {
  constructor($log) {
    this.$log = $log;
    this.name = 'footer';
    this.year = new Date().getFullYear();
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

export default Footer;
