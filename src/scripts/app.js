define('app', [
    'jquery'
], function ($) {

    (function($testFunc) {
        if (!$testFunc) {
            return;
        }
        
        $testFunc.on('click', function() {
            console.log('require test done');
        });
    })($('.b-icon__camera'));
    
    (function($svgColor) {
        if (!$svgColor) {
            return;
        }

        //убираем active класс со всех иконок
        function removeActive() {
            iconWrap.forEach(function(item) {
                item.classList.remove('is-active');
            });
        }

        var svg = document.querySelector('#houseset');
        var iconWrap = svg.querySelectorAll('.icon-wrap');
        iconWrap.forEach(function(item) {
            item.addEventListener('click', function() {
                removeActive();
                this.classList.add('is-active');
            });
        });
    })($('.j-svg-color'));

    return {};
});
