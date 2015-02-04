var master = {window: {el: null, width: null, height: null}};


function calc() {
    master.window.height = $(window).height();
    master.window.width = $(window).width();
    
    $content = master.window.height - 112;
    $container = master.window.width - 385;
    $videoList = $content - 52;
    
    $('.content').height($content);
    $('.container').width($container);
    $('.videoList').height($videoList);
    
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
            titler = $(this).find('.name'),
            ytapiurl    = 'http://gdata.youtube.com/feeds/api/videos/' + id + '?alt=json';
        
        $.getJSON(ytapiurl, function(data) {
            var time = formatSecondsAsTime(data['entry']['media$group']['media$content'][0]['duration']);
            var title = data['entry']['media$group']['media$title']['$t'];
            
            timer.text(time);
            titler.text(title.replace('Você Não Sabia? - ', ''));
        });
        
        $(this).removeClass('invisible');
        $(this).addClass('fadeInUp animated');
        
        var elVideoID = $(this).data('hash');
        if ($(this).hasClass('current')) {
            $('.container .videoHolder').fadeOut('medium', function() {
                $('.container .videoHolder').html('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + elVideoID + '?autoplay=1&showinfo=0" frameborder="0" allowfullscreen></iframe>');
                setTimeout(function() {
                    $('.container .videoHolder').fadeIn('medium');
                }, 400)
            });
        } else {
            var elVideoID2 = $('.videoList>ul>li').eq('0').data('hash');
            $('.videoList>ul>li').eq('0').addClass('active');
            $('.container .videoHolder').fadeOut('medium', function() {
                $('.container .videoHolder').html('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + elVideoID2 + '?autoplay=1&showinfo=0" frameborder="0" allowfullscreen></iframe>');
                setTimeout(function() {
                    $('.container .videoHolder').fadeIn('medium');
                }, 400)
            });
        }
        
    });
    
    $('.videoList>ul>li').click(function() {
        if ($(this).hasClass('active')){
            return false;
        } else {
            $('.videoList>ul>li.active').addClass('watched');
            $('.videoList>ul>li').removeClass('active');
            $(this).addClass('active');
            var videoID = $(this).data('hash');
            $('.container .videoHolder').fadeOut('medium', function() {
                $('.container .videoHolder').html('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + videoID + '?autoplay=1&showinfo=0" frameborder="0" allowfullscreen></iframe>');
                setTimeout(function() {
                    $('.container .videoHolder').fadeIn('medium');
                }, 400)
            });
        }
    });
    
    
    startScroller();
    
    $('#down').click(nextItem);
    $('#up').click(prevItem);
    
    
}

function startScroller() {
    $('#scrollerMenu').css({
        top: 0
    });
}
function nextItem() {
    var someTop = $('#scrollerMenu').css('top').replace('px','');
    var someHeight = $('#scrollerMenu').height();
    var otherHeight = $('.videoList').height();
    var diferHeight = otherHeight - someHeight;
    
    if (diferHeight > someTop) {
        
        return false;
    } else {
        $('#scrollerMenu').animate({
            top: "-=42"
        }, 400);
    }
}
function prevItem() {
    var someTop = $('#scrollerMenu').css('top').replace('px','');
    
    if (someTop == 0) {
        return false;
    } else {
        $('#scrollerMenu').animate({
            top: "+=42"
        }, 400);
    }
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