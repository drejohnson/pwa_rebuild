import template from './<%= name %>.html!text';
import {RouteConfig, Component, View, Inject} from '../../core/decorators/decorators';

// start-non-standard
@RouteConfig('<%= name %>', {
  url: '/<%= name %>',
  template: '<<%= name %>></<%= name %>>',
  resolve: {
    // Constant Meta
    $title: () => '<%= upCaseName %>',
    $description: () => '<%= upCaseName %> description'
  }
})
@Component({
  selector: '<%= name %>'
})
@View({
  template: template
})
@Inject('$log')
// end-non-standard

// <%= camelCaseName %> Controller
class <%= camelCaseName %> {
  constructor() {
    this.name = '<%= name %>';
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

export default <%= camelCaseName %>;
