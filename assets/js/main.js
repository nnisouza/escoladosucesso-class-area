var master = {window: {el: null, width: null, height: null}};


function calc() {
    master.window.height = $(window).height();
    master.window.width = $(window).width();
    
    afterLoaded();
}
function drawPage() {
    
}
function actions() {
    cheet('s h a k e s p e a r e', function () {
      alert('Doubt thou the stars are fire; \nDoubt that the sun doth move; \nDoubt truth to be a liar; \nBut never doubt I love. \n                                                        - William Shakespeare');
    });
}
function afterLoaded() {
    alert('Go!');
}



$(window).load(drawPage);
$(document).ready(actions);
$(window).resize(calc).trigger('resize');