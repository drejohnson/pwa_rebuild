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
@Inject('$log')
// end-non-standard

// Home Controller
class Home {
  constructor($log) {
    this.$log = $log;
    this.activated = false;

    // On load
    this.activate();
  }

  /**
   * Handles on load processing, and loading initial data
 */
  activate() {

    this.timer = () => {
      this.counter = 0;
      this.count = this.$interval(() => {
        this.counter++;
        if (this.counter > 600) {
          this.showPostBtn = true;
        }
      }, 1000);
    };

    this.activated = true;
  }
}

export default Home;
