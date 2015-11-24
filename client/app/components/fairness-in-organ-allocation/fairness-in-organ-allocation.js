import template from './fairness-in-organ-allocation.html!text';
import {RouteConfig, Component, View, Inject} from '../../core/decorators/decorators';

// start-non-standard
@RouteConfig('fairness-in-organ-allocation', {
  url: '/fairness-in-organ-allocation',
  template: '<fairness-in-organ-allocation></fairness-in-organ-allocation>',
  resolve: {
    // Constant Meta
    $title: () => 'Fairness-in-organ-allocation',
    $description: () => 'Fairness-in-organ-allocation description'
  }
})
@Component({
  selector: 'fairness-in-organ-allocation'
})
@View({
  template: template
})
@Inject('$sce', '$log')
// end-non-standard

// FairnessInOrganAllocation Controller
class FairnessInOrganAllocation {
  constructor($sce, $log) {
    this.$sce = $sce;
    this.$log = $log;
    this.name = 'fairness-in-organ-allocation';
    this.tooltip = {
      title: 'The clinical purification of blood by dialysis, <br />as a substitute for the normal function of the kidney.'
    };
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
        {src: this.$sce.trustAsResourceUrl('https://www.googledrive.com/host/0B8YhAdfjIlGtTlBPbndnMjFWd1U'), type: 'video/mp4'},
      ],
      plugins: {
        poster: '/images/video-covers/v2.jpg',
        analytics: {
          category: 'WEb ACTs videos',
          label: 'Fairness In Organ Allocation',
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

export default FairnessInOrganAllocation;
