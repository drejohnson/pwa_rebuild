// Have to import angular first before angular-mocks
// https://github.com/Workiva/karma-jspm/issues/23
import angular from 'angular';
import 'angular-mocks';
import Lets-talk-about-lifeModule from './lets-talk-about-life'
import Lets-talk-about-lifeTemplate from './lets-talk-about-life.html!text';

describe('Lets-talk-about-life', ()=>{
	let $rootScope,
	makeController;

	beforeEach(angular.mock.module(Lets-talk-about-lifeModule.name));
	beforeEach(angular.mock.inject((_$rootScope_)=>{
		$rootScope = _$rootScope_;
		makeController = ()=>{
			return new Lets-talk-about-lifeController();
		};
	}));

	describe('Module', ()=>{
		// test things about the component module
		// checking to see if it registers certain things and what not
		// test for best practices with naming too
		// test for routing
	});

	describe('Controller', ()=>{
		// test your controller here

		it('should have a name property [REMOVE]', ()=>{ // erase me if you remove this.name from the controller
			let controller = makeController();

			expect(controller).to.have.property('name');
		});
	});

	describe('Template', ()=>{
		// test the template
		// use Regexes to test that you are using the right bindings {{  }}

		it('should have name in template [REMOVE]', ()=>{
			expect(Lets-talk-about-lifeTemplate).to.match(/{{\s?vm\.name\s?}}/g);
		});
	});


	describe('Component', ()=>{
			// test the component/directive itself
			let component = Lets-talk-about-lifeComponent();

			it('should use the right template',()=>{
				expect(component.template).to.equal(Lets-talk-about-lifeTemplate);
			});

			it('should use controllerAs', ()=>{
				expect(component).to.have.property('controllerAs');
			});

			it('should use the right controller', ()=>{
				expect(component.controller).to.equal(Lets-talk-about-lifeController);
			});
	});
});
