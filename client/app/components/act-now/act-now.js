import template from './act-now.html!text';
import { VideoLinks } from '../../core/constants/constants';
import {RouteConfig, Component, View, Inject} from '../../core/decorators/decorators';

// start-non-standard
@RouteConfig('act-now', {
  url: '/act-now',
  template: '<act-now></act-now>',
  resolve: {
    // Constant Meta
    $title: () => 'Act Now',
    $description: () => 'Act Now description'
  }
})
@Component({
  selector: 'act-now'
})
@View({
  template: template
})
@Inject('$state', '$sce', '$log')
// end-non-standard

// ActNow Controller
class ActNow {
  constructor($state, $sce, $log) {
    this.$sce = $sce;
    this.$state = $state;
    this.$log = $log;
    this.title = 'Act Now';
    this.activated = false;
    // On load
    this.activate();
  }

  /**
   * Handles on load processing, and loading initial data
 */
  activate() {
    // this.title = this.$title;
    this.config = {
      preload: 'none',
      sources: [
        {src: this.$sce.trustAsResourceUrl(VideoLinks.actNow), type: 'video/mp4'},
      ],
      plugins: {
        poster: '/images/video-covers/v1.jpg',
        analytics: {
          category: 'WEb ACTs videos',
          label: 'Act Now',
          events: {
            ready: true,
            play: true,
            pause: true,
            stop: true,
            complete: true,
            progress: 10
          }
        }
      }
    };

    this.activated = true;
  }
}

export default ActNow;
