module phonesCat.components {
    var component = {
		bindings: {
			count: '='
		},
		controller: function () {
			function increment() {
				this.count++;
			}
			function decrement() {
				this.count--;
			}
			this.increment = increment;
			this.decrement = decrement;
		},
		template: [
			'<div class="todo">',
			'<input type="text" ng-model="$ctrl.count">',
			'<button type="button" ng-click="$ctrl.decrement();">-</button>',
			'<button type="button" ng-click="$ctrl.increment();">+</button>',
			'</div>'
		].join('')
    }
    
	angular.module('phonesCat').component('counter', component);
} 