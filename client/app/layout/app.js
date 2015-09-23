import '../components/navbar/navbar';
import '../components/home/home';
import '../components/pre-study/pre-study';
import '../components/post-study/post-study';
import '../components/act-now/act-now';
import '../components/fairness-in-organ-allocation/fairness-in-organ-allocation';
import '../components/fairness-in-healthcare-delivery/fairness-in-healthcare-delivery';
import '../components/lets-talk-about-life/lets-talk-about-life';
import '../components/religious-beliefs/religious-beliefs';
import '../components/footer/footer';
import template from './app.html!text';
import 'daneden/animate.css';
import 'font-awesome';
import 'videogular-themes-default/videogular.css!';
import './app.css!';
import {RouteConfig, View, Component, Inject} from '../core/decorators/decorators';

// start-non-standard
@Component({
  selector: 'app'
})
@View({
  template: template
})
@Inject('$state', '$log')
// end-non-standard

// App Controller
class AppComponent {
  constructor($state, $log) {
    $log.log('App  Initialized');
  }
}

export default AppComponent;
