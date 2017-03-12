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

    return {};
});
