angular.
    module('myApp', []).
      directive('bootstrapSlider', function() {
        return {
            // scope:{sub_t:}
            link: function(scope, element, attrs) {



            $(document).ready(function() {
                // var init = scope.$eval(attrs.ngModel);
                var min = scope.$eval(attrs.min);
                var max = scope.$eval(attrs.max);
                var milestones = attrs.milestones.split(',');
                var defaultval = attrs.defaultval.split(',');
                var steps =  attrs.steps.split(',');
                var lowBoundText = $(element.find('input')[0]);
                var highBoundText = $(element.find('input')[1]);
                createAlert = function(alert,valid, obj){
                    obj = obj;
                    obj.valid = valid;
                    obj.alert = alert;
                    return obj;
                };
                hideAlert = function(){
                   proxyObj = {'scope':scope,'attrs' :attrs};
                    setTimeout( $.proxy(function(){
                        this.scope.$apply($.proxy(function(){
                            this.scope[this.attrs.ngModel].alert = null;
                        },this)); 
                    }, proxyObj
                    ), 5000);
                };
                if( parseInt(defaultval[0]) >= parseInt(defaultval[1])) {
                    alert= "Default value should be in ascending order. \n Lower bound should not be greater than higher bound";
                    scope[attrs.ngModel]= createAlert(alert,false,{});
                    return null;
                };
                lowBoundText.val(defaultval[0]);
                highBoundText.val(defaultval[1]);
    


                //Check to see if steps between all milestones covered
                if ((milestones.length +1) == steps.length){

                    var obj = {};
                    obj.valid = true;
                    obj.val =[parseInt(defaultval[0]),parseInt(defaultval[1])];
                    obj.min = min;
                    obj.max = max;
                    arr=[];
                    for(j= 0 ;  j< parseInt(max/steps[0]);j++){
                        viewObj = {};
                        viewObj.value =  min + steps[0]; 
                        arr.push(viewObj);
                    }
                    obj.stepper = arr;
                    scope[attrs.ngModel] = obj; 


                    $('.angular-slider').slider({
                        value : [parseInt(defaultval[0]),parseInt(defaultval[1])],
                        min : parseInt(min),
                        max : parseInt(max),
                        tooltip : 'hide',
                        handle: 'triangle',
                        selection: 'after',
                        step:steps[0],
                        steps:steps,
                        milestones: milestones
                    });



                    // Update model to reflect view
                    $('.angular-slider').slider().on('slide', function(ev) {
                        scope.$apply(function() {
                            scope[attrs.ngModel].val = ev.value;
                            lowBoundText.val(ev.value[0]);
                            highBoundText.val(ev.value[1]);
                        });
                    });


                    lowBoundText.bind('change',function(e){
                        
                        scope.$apply(function() {

                        origVal =scope[attrs.ngModel].val; 
                        if(e.target.value >= parseInt(origVal[1],10) || e.target.value < min ){
                            alert ="Value entered should be -\n * Lower than Higher Bound. \n * Shouldnt be  more than the min value. \n * It should be numeric";
                            obj = {};
                            obj = scope[attrs.ngModel];
                            scope[attrs.ngModel] = createAlert(alert,true,obj);
                            lowBoundText.val(origVal[0]);
                            hideAlert();


                        };

                        scope[attrs.ngModel].val = [e.target.value, origVal[1]];
                        $('.angular-slider').slider('setValue', scope[attrs.ngModel].val);

                        })
                    });

                    highBoundText.bind('change',function(e){
                        scope.$apply(function() {
                        origVal =scope[attrs.ngModel].val; 
                        console.log(origVal);
                        if(e.target.value <= parseInt(origVal[0],10) || e.target.value > max){
                            alert ="Value entered should be -\n * Higher than lower Bound. \n * Shouldnt be  less than the max value. \n * It should be numeric";
                            obj = {};
                            obj = scope[attrs.ngModel];
                            scope[attrs.ngModel] = createAlert(alert,true,obj);
                            highBoundText.val(origVal[1]);
                            hideAlert();
                        };
                        scope[attrs.ngModel].val = [origVal[0] ,e.target.value];
                        $('.angular-slider').slider('setValue', scope[attrs.ngModel].val);
                    })
                    });

                }else{
                    alert = "Steps should always be exactly one more than the no of milestones.";
                    scope[attrs.ngModel] = createAlert(alert,false,{});
                };
            });
        },
        templateUrl: 'angular-slider.html'
    }
});
