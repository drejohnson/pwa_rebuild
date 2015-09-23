import template from './fairness-in-healthcare-delivery.html!text';
import {RouteConfig, Component, View, Inject} from '../../core/decorators/decorators';

// start-non-standard
@RouteConfig('fairness-in-healthcare-delivery', {
  url: '/fairness-in-healthcare-delivery',
  template: '<fairness-in-healthcare-delivery></fairness-in-healthcare-delivery>',
  resolve: {
    // Constant Meta
    $title: () => 'Fairness-in-healthcare-delivery',
    $description: () => 'Fairness-in-healthcare-delivery description'
  }
})
@Component({
  selector: 'fairness-in-healthcare-delivery'
})
@View({
  template: template
})
@Inject('$sce', '$log')
// end-non-standard

// FairnessInHealthcareDelivery Controller
class FairnessInHealthcareDelivery {
  constructor($sce, $log) {
    this.$sce = $sce;
    this.$log = $log;
    this.name = 'fairness-in-healthcare-delivery';
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
        {src: this.$sce.trustAsResourceUrl('https://www.googledrive.com/host/0B8YhAdfjIlGtbzVnRWZyMmlsZm8'), type: 'video/mp4'},
      ],
      plugins: {
        poster: '/images/video-covers/v3.jpg',
        analytics: {
          category: 'WEb ACTs videos',
          label: 'Fairness In Healthcare Delivery',
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

export default FairnessInHealthcareDelivery;
