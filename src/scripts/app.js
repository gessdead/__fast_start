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

        //colors
        var iconColor = '#2fa0a9';
        var bgColor = '#fff';

        var svg = document.querySelector('#houseset');
        var iconWrap = svg.querySelectorAll('.icon-wrap');
        iconWrap.forEach(function(item, index) {
            item.addEventListener('click', function() {
                var icon = this.querySelector('.icon');
                var bg = this.querySelector('.background');
                icon.style.fill = bgColor;
                bg.style.fill = iconColor;
            });
        });
    })($('.j-svg-color'));

    return {};
});
