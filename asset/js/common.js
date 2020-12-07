$(document).ready(function(){
    //#pcHeader초기화
    var _pcGnb = $('#pcHeader>#gnb');
    _pcGnb.find('.dep2_bg, .dep1_txt,.dep2').hide();

    $('#pcHeader').on({
        //pcHeeader에 마우스가 들어가거나 포커스가 들어갔을 때
        'mouseenter focusin': function(){
            $(this).addClass('on').find('.dep2_bg').stop().slideDown(250,function(){
                _pcGnb.find('.dep2').show();
            });

        },
         //pcHeader에 마우스가 나오거나 포커스가 나왔을 때
        'mouseleave focusout': function(){
            if(!$(this).hasClass('active')){
                $(this).removeClass('on');
            }
            $(this).find('.dep2').hide();
            $('.dep2_bg').stop().slideUp('fast');
        }
    });


    //스크롤이벤트
    $(window).on('scroll',function(){
        var scroll = $(this).scrollTop();
        //#pcHeader의 .on이 붙는 타이밍
        if(scroll > 300){
            $('#pcHeader').addClass('active on');
        }else{
            $('#pcHeader').removeClass('active on');
        }  
    });
    $(window).trigger('scroll');
  
    //depth1 li에 hover또는 focus이벤트
    _pcGnb.find('>ul>li').on({
        'mouseenter focusin' : function(){
            var dep1txt = $(this).children('a').text();
            var dep1src = $(this).children('a').data('src');
            _pcGnb.find('.dep1_txt').show().children('img').attr({'src':dep1src}).next().text(dep1txt);
        },
        'mouseleave focusout' : function(){
            _pcGnb.find('.dep1_txt').hide().children('img').attr({'src':''}).next().text('');
        }
    });



    //투명 버튼 호버 또는 포커스 효과
    $('.btn_more.transparent').on({
        'mouseenter focus':function(){
            $(this).find('.btn_arrow').stop().animate({right: 70},300);
        },
        'mouseleave blur':function(){
            $(this).find('.btn_arrow').stop().animate({right: 80},300);
        }
    });

    //보라색 버튼 호버 또는 포커스 효과
    $('.btn_more.purple').on({
        'mouseenter focus':function(){
            $(this).find('.btn_arrow').stop().animate({right: 20},300).prev().stop().animate({width:'75%'});
        },
        'mouseleave blur':function(){
            $(this).find('.btn_arrow').stop().animate({right: 30},300).prev().stop().animate({width:'0%'});
        }
    });





});