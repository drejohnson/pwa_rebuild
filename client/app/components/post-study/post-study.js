import template from './post-study.html!text';
import {RouteConfig, Component, View, Inject} from '../../core/decorators/decorators';

// start-non-standard
@RouteConfig('post-study', {
  url: '/post-study',
  template: '<post-study></post-study>',
  resolve: {
    // Constant Meta
    $title: () => 'Post-study',
    $description: () => 'Post-study description'
  }
})
@Component({
  selector: 'post-study'
})
@View({
  template: template
})
@Inject('$state', '$log')
// end-non-standard

// Post-study Controller
class PostStudy {
  constructor($state, $log) {
    this.$state = $state;
    // this.title = this.$state.current.title;
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

export default PostStudy;
