var master = {window: {el: null, width: null, height: null}};


function calc() {
    master.window.height = $(window).height();
    master.window.width = $(window).width();
    
    $content = master.window.height - 112;
    $container = master.window.width - 385;
    
    $('.content').height($content);
    $('.container').width($container);
    
    drawPage();
}
function drawPage() {
    afterLoaded();
}
function actions() {
    cheet('s h a k e s p e a r e', function () {
      alert('Doubt thou the stars are fire; \nDoubt that the sun doth move; \nDoubt truth to be a liar; \nBut never doubt I love. \n                                                        - William Shakespeare');
    });
    
    
    
    
    $('.videoList>ul>li').each(function() {
        var id = $(this).data('hash'),
            timer = $(this).find('.timing span'),
            ytapiurl    = 'http://gdata.youtube.com/feeds/api/videos/' + id + '?alt=json';
        
        $.getJSON(ytapiurl, function(data) {
            var time = formatSecondsAsTime(data['entry']['media$group']['media$content'][0]['duration']);
            timer.text(time);
        });
        
        $(this).removeClass('invisible');
        $(this).addClass('fadeInUp animated');
        
    });
}


function formatSecondsAsTime(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (hr < 10) {
        hr = "0" + hr;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    if (hr) {
        hr = "00";
    }
    if (hr == '00'){
        return min + ':' + sec;
    } else {
        return hr + ':' + min + ':' + sec;
    }

}

function afterLoaded() {
    $('.wrapper').fadeIn('medium');
}



$(window).load(calc);
$(document).ready(actions);
$(window).resize(calc).trigger('resize');