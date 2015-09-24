import template from './religious-beliefs.html!text';
import { VideoLinks } from '../../core/constants/constants';
import {RouteConfig, Component, View, Inject} from '../../core/decorators/decorators';

// start-non-standard
@RouteConfig('religious-beliefs', {
  url: '/religious-beliefs',
  template: '<religious-beliefs></religious-beliefs>',
  resolve: {
    // Constant Meta
    $title: () => 'Religious-beliefs',
    $description: () => 'Religious-beliefs description'
  }
})
@Component({
  selector: 'religious-beliefs'
})
@View({
  template: template
})
@Inject('$sce', '$log')
// end-non-standard

// ReligiousBeliefs Controller
class ReligiousBeliefs {
  constructor($sce, $log) {
    this.$sce = $sce;
    this.$log = $log;
    this.name = 'religious-beliefs';
    this.activated = false;
    // On load
    this.activate();
  }

  /**
   * Handles on load processing, and loading initial data
 */
  activate() {

    this.config = {
      preload: 'none',
      sources: [
        {src: this.$sce.trustAsResourceUrl(VideoLinks.religiousBeliefs), type: 'video/mp4'},
      ],
      plugins: {
        poster: '/images/video-covers/v4.jpg',
        analytics: {
          category: 'WEb ACTs videos',
          label: 'Religous Belief',
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

export default ReligiousBeliefs;
