var master = {window: {el: null, width: null, height: null}};


function calc() {
    master.window.height = $(window).height();
    master.window.width = $(window).width();
    
    $content = master.window.height - 112
    
    $('.content').height($content);
    
    drawPage();
}
function drawPage() {
    
    afterLoaded();
}
function actions() {
    cheet('s h a k e s p e a r e', function () {
      alert('Doubt thou the stars are fire; \nDoubt that the sun doth move; \nDoubt truth to be a liar; \nBut never doubt I love. \n                                                        - William Shakespeare');
    });
}
function afterLoaded() {
    $('.wrapper').fadeIn('medium');
}



$(window).load(calc);
$(document).ready(actions);
$(window).resize(calc).trigger('resize');