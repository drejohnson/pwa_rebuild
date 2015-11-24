import template from './pre-study.html!text';
import {RouteConfig, Component, View, Inject} from '../../core/decorators/decorators';

// start-non-standard
@RouteConfig('pre-study', {
  url: '/pre-study',
  template: '<pre-study></pre-study>',
  resolve: {
    // Constant Meta
    $title: () => 'Pre Study',
    $description: () => 'Pre Study description'
  }
})
@Component({
  selector: 'pre-study'
})
@View({
  template: template
})
@Inject('$rootScope', '$state', '$log')
// end-non-standard

// Pre-study Controller
class PreStudy {
  constructor($rootScope, $state, $log) {
    this.$state = $state;
    this.$log = $log;
    // this.title = this.$state.current.title;
    this.activated = false;
    // On load
    this.activate();
  }

  /**
   * Handles on load processing, and loading initial data
 */
  activate() {
    this.$log.log(this.$state);
    this.activated = true;
  }
}

export default PreStudy;
