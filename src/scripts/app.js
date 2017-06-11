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
    
    (function($svgHouse) {
        if (!$svgHouse) {
            return;
        }

        //убираем active класс со всех иконок
        function removeActive() {
            iconWrap.forEach(function(item) {
                item.classList.remove('is-active');
            });
        }

        //логика текстовых блоков
        function toogleText() {
            var textBlock = document.querySelectorAll('.j-smart-text');
            textBlock.forEach(function(item) {
                item.style.display = 'none';
                var textId = item.getAttribute('data-id');
                console.log(textId);
            });
        }

        var svg = document.querySelector('#houseset');
        var iconWrap = svg.querySelectorAll('.icon-wrap');
        iconWrap.forEach(function(item) {
            item.addEventListener('click', function() {
                removeActive();
                toogleText();
                this.classList.add('is-active');
                var id = this.getAttribute('id');
            });
        });


    })($('.j-svg-house'));

    return {};
});
