angular.
    module('myApp', []).
      directive('bootstrapSlider', function() {
        return {
            link: function(scope, element, attrs) {
            $(document).ready(function() {
                // var init = scope.$eval(attrs.ngModel);
                var min = scope.$eval(attrs.min);
                var max = scope.$eval(attrs.max);
                var milestones = attrs.milestones.split(',');
                var steps =  attrs.steps.split(',');
                // scope[attrs.alertVisible] = false;
                //Check to see if steps between all milestones covered
                if ((milestones.length +1) != steps.length){
                    // scope[attrs.alertVisible] = true;
                }else{
                    $('.angular-slider').slider({
                        value : [300,4000],
                        min : min,
                        max : max,
                        tooltip : 'show',
                        handle: 'triangle',
                        selection: 'after',
                        step:1000
                    });

                
                // Update view to reflect model
                    scope.$watch(attrs.ngModel, function(v) {
                        console.log(v);
                        $('.angular-slider').slider('setValue', v);
                    });
                    
                    // Update model to reflect view
                    $('.angular-slider').slider().on('slide', function(ev) {
                        scope.$apply(function() {
                            scope[attrs.ngModel] = ev.value;
                        });
                    });
             };
            });
        },
        scope:{
            index: '=index'
        },
        templateUrl: 'angular-slider.html'
    }
});
