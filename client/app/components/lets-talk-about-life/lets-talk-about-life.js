import template from './lets-talk-about-life.html!text';
import { VideoLinks } from '../../core/constants/constants';
import {RouteConfig, Component, View, Inject} from '../../core/decorators/decorators';

// start-non-standard
@RouteConfig('lets-talk-about-life', {
  url: '/lets-talk-about-life',
  template: '<lets-talk-about-life></lets-talk-about-life>',
  resolve: {
    // Constant Meta
    $title: () => 'Lets-talk-about-life',
    $description: () => 'Lets-talk-about-life description'
  }
})
@Component({
  selector: 'lets-talk-about-life'
})
@View({
  template: template
})
@Inject('$sce', '$log')
// end-non-standard

// LetsTalkAboutLife Controller
class LetsTalkAboutLife {
  constructor($sce, $log) {
    this.$sce = $sce;
    this.$log = $log;
    this.name = 'lets-talk-about-life';
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
        {src: this.$sce.trustAsResourceUrl(VideoLinks.letsTalk), type: 'video/mp4'},
      ],
      plugins: {
        poster: '/images/video-covers/v5.jpg',
        analytics: {
          category: 'WEb ACTs videos',
          label: 'Let\'s Talk About Life: Donation Intentions',
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

export default LetsTalkAboutLife;
