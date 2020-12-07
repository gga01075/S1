$(document).ready(function(){
    //index section1 슬라이드
    var mySwiper1 = new Swiper('#cnt1 .swiper-container', {
        // Optional parameters
        loop: true,
        effect:'fade',
        allowTouchMove: false,
        autoplay: {
            delay: 8000,
            disableOnInteraction:false,
          },

        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          type : 'fraction',
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        on: {
          init: function () {
            /* do something */
          },
          slideChangeTransitionStart : function(){
            $('.swiper-slide').find('strong,p').removeClass('in');
            $('.swiper-slide-active').find('strong,p').addClass('in');
          },
        }

      });

    //스크롤 버튼 클릭이벤트




  /* section4 탭브라우징 제어 */

   //1) 초기설정 => 탭버튼 포커스 제어 추가
   $('.tab:first-of-type, .tabpanel:first-of-type').addClass('active').attr({tabIndex:0});
   $('.tab:first-of-type').attr({'aria-selected':true}).siblings().attr('aria-selected',false);
   $('.tabpanel:first-of-type').attr({'aria-hidden':false}).siblings('.tabpanel').attr('aria-hidden',true);

    //키보드 제어 keydown : 오른쪽39, 왼쪽37, HOME36, END35, Enter13, Spacebar32
    $('.tab').on('keydown',function(e){
        var key = e.keyCode;
        console.log(key);
        switch(key){
            case 40:  //아래쪽
                 $(this).attr('tabIndex',-1);
                 if($(this).hasClass('last'))  $(this).siblings('.first').attr('tabIndex',0).focus();
                 else $(this).next().attr('tabIndex',0).focus();
            break;

            case 38: //위쪽 
                $(this).attr('tabIndex',-1);
                if($(this).hasClass('first'))  $(this).siblings('.last').attr('tabIndex',0).focus();
                else $(this).prev().attr('tabIndex',0).focus();
            break;

            case 36: //HOME
            e.preventDefault();
            $(this).attr('tabIndex',-1);
            $(this).siblings('.first').attr('tabIndex',0).focus();
            break;

            case 35: //END
            e.preventDefault();
            $(this).attr('tabIndex',-1);
            $(this).siblings('.last').attr('tabIndex',0).focus();
            break;

            case 13: //Enter
            case 32: //Spacebar
              var _tg = $(this); //함수를 호출할 때 어떤 li에서 keydown되었는지를 매개변수로 전달
              tabActive(_tg);
            break;
        }

    });

    $('.tab').on('click',function(){
        var _tg = $(this);
        tabActive(_tg);
    });

    function tabActive(_target){
        _target.addClass('active').attr({'aria-selected':true, tabIndex:0}).siblings().removeClass('active').attr({'aria-selected':false, tabIndex:-1});
        var panel = '#'+_target.attr('aria-controls');
        $(panel).addClass('active').attr({'aria-hidden':false,tabIndex:0}).siblings('.tabpanel').removeClass('active').attr({'aria-hidden':true, tabIndex:-1});
    }

















  //section4(서비스) li에 hover,focusin이벤트
  $('#cnt4 .tabpanel ul li').attr('tabindex',0);
  $('#cnt4 .tabpanel ul li').on({
    'mouseenter focusin':function(){
      $(this).addClass('on');
    },
    'mouseleave focusout':function(){
      $(this).removeClass('on');
    }
  })





});