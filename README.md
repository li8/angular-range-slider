#angular-range-slider

Its an implementation of bootstrap slider in angularJS- such that it reflects 2 way bindings. Has variable steps between certain defined milestones. All of which could be configured on changing the parameters of the [index.html](http://github.com/li8/angular-range-slider/blob/master/index.html) page.


```
    <div bootstrap-slider="true" ng-model="index" min="0" max="15000" milestones="5000,10000" steps="100,500,1000"  defaultval="0,400">
    </div>

```

##Parameters

* min = Minimum value of the Range Slider
* max = Maximum value of the Range Slider
* milestones = The break points at which the step changes.
* steps = The step values that would be used to increment the value of the Range Slider , between specific milestones.
* defaultval = The default value at which the Range Slider would  be initialized.

##Rules

* Slider will be used to select a range between two numbers A & B.
* There will be custom number of milestones between A & B. ( lets say x, y ) [ Configurable ]
* Milestones divides the range into sections i.e A-x, x-y & y-B
* Each section will have its different number of steps (Configurable) which decides its step size.
* Therefore, the slider will step differently between steps in different sections.
* Apart from the slider controls the slider can also be controlled via text boxes.
* If value in the text box is changed then it updates the slider controls & vice versa.
* If the value entered can-not be mapped to a step in the slider then round it off to lower step in case of the left control and to the higher step in case of the right control.
* Mix & Max of the slider ( A & B ) are configurable via arguments to the directive.
* Milestones which divide the slider into section is also configurable via arguments to directive.

**Eg:**
```
 <div slider min=0 max=15000 milestones=”1000,5000,10000” steps=”50,100,500”></div>

```
Therefore,
0 to 1000  will have steps of 50
1000 to 5000 will have steps of 100
10000 to 15000 will have steps of 500


##Demo
Hosted on plnkr.co : [demo](http://embed.plnkr.co/f5XTN3nJufS1YsEj1dev/preview)


##Template for the kick start :

Used http://jsfiddle.net/vkarpov15/zn5AM/ as my starting point.


