$(document).ready(function () {
  var _win = $(window);
  var win_width= _win.width();
  var _cnt = $('#content .tg');
  var tgIdx = 0; //로딩시 보여지는 섹션의 인덱스 번호 #cnt1
  var total = _cnt.length; //섹션의 전체 개수
  var timerResize = 0; //resize이벤트의 실행문 누적을 방지 하기위해 
  var timerWheel = 0; //mousewheel 이벤트의 실행문 누적을 방지
  var swiper_timer = 0;
  var delta;
  var mtMax = -($('#cnt2 .list_wrap').outerHeight() - _win.height() + 100);
  //본문2 비전과미션 휠제어시 margin-top값 지정
  //console.log($('#cnt2 .list_wrap').outerHeight(), _win.height(), mtMax);
  var marginT = 0;  //$('#cnt2 .list_wrap')의 margin-top

    //1) resize이벤트
    _win.on('resize', function () {
      clearTimeout(timerResize);
  
      //.tg들은 relative 속성으로 top좌표를 0%, -100%, -200%, -300%, -400%로 위치를 옮긴다. 
      timerResize = setTimeout(function () {
        if(win_width>=1367){
          //css에서 transition처리
          $('.tg').css({top: -(tgIdx*100) + '%'});
          $('#footer').css({top: -37 +(-(tgIdx*100)) + 'vh'});  
        }
        //태블릿,모바일 버전 ==> 마우스휠 이벤트 제거, 위치 제자리로 
        else if(win_width<1367){ 
          $('.tg').css({top:0});
          $('#footer').css({top:0});
        }
      }, 50);
    });
    _win.trigger('resize');

  //마우스 휠 이벤트
  _cnt.on('mousewheel DOMMouseScroll', function (e) {
    var _this = $(this);
    clearTimeout(timerWheel);

    timerWheel = setTimeout(function () {
      //현재 애니메이트(.cnt_wrap) 중이면 함수 강제 종료
      if ( $('html, body').is(':animated') ) return false;
      if(win_width<1367){
        return false;
      }
      //delta값 구하기
      //e.originalEvent.wheelDelta 파이어폭스를 제외한 나머지 브라우저
      //e.originalEvent.detail*-1 파이어폭스 only
      delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
      console.log(delta);

      if (_this.hasClass('subwheel')) {
        subWheel();
      } else {
        onePageScrolling();
      }
    
    }, 200);
  });

    // 키보드 이벤트
    _win.keydown(function(e){
   
      if ( _cnt.eq(tgIdx).hasClass('subwheel') ) { //.subwheel은 원페이지스크롤링이 아닌 섹션
        subWheel(tgIdx);
      } else {
        if(e.keyCode == 38 || e.keyCode == 33) { // 윗방향키와 page up
            delta = +120;
        } else if(e.keyCode == 40 || e.keyCode == 34) { // 아래방향키와 page down
            delta = -120;
        }      
        onePageScrolling(tgIdx);
      }
  });

  //수직 animate
  function onePageScrolling() {
    if ( $('html, body').is(':animated') ) return false;
    //console.log('onePageScrolling() 실행, tgIdx: ' + tgIdx);
    if (delta < 0 && tgIdx < total - 1) {  //마우스휠을 내렸을 때 
      tgIdx++;
    } else if (delta > 0 && tgIdx > 0) {    //마우스휠을 올렸을 때
      tgIdx--;
    }
    $('.tg').css({top: -(tgIdx*100) + '%'});
    console.log(tgIdx);
    if(tgIdx===3){
        $('#footer').css({'z-index':90}).stop().fadeOut('fast');
    }

    if (tgIdx < 1 && delta > 0) {
      $('#pcHeader').removeClass('active on');
    } else {
      $('#pcHeader').addClass('active on');
    }
  }

  //본문2(margin-top), 본문 4/5(수평 animate)에서 제어
  function subWheel() {
    console.log('subWheel()');
    if (tgIdx === 1) {
      marginT = marginT + delta * 1.3;
      console.log(marginT);
      if (marginT > 0) {
        marginT = 0;
        clearTimeout(timeout3);
        var timeout3 = setTimeout(function(){
          onePageScrolling();
        },200);
      } else if (marginT < mtMax) {
        marginT = mtMax;
        var timeout3 = setTimeout(function(){
          onePageScrolling();
        },200);
      }
      //
      $('#cnt2 .list_wrap').css('marginTop', marginT);
    } else if (tgIdx === 3) {
      if ( !$('#cnt5').hasClass('on') ) {  //#cnt4에서 wheel
        if (delta < 0) {
          $($('#sec45')).stop().animate({left: '-100%'}, 400, function () {
            $(this).children('#cnt5').addClass('on');
          });
        } else if (delta > 0) {
          onePageScrolling();
         
        }
      } else {  //#cnt5에서 wheel
        if (delta < 0) {
            $('#footer').css({'z-index':100}).fadeIn('fast');
          onePageScrolling();

          
        } else if (delta > 0) {
          $($('#sec45')).stop().animate({left: 0}, 400, function () {
            $(this).children('#cnt5').removeClass('on');
          });
        }
      }
    }
  }

  //index section1 슬라이드
  var mySwiper1 = new Swiper('#cnt1 .swiper-container', {
    // Optional parameters
    loop: true,
    effect: 'fade',
    allowTouchMove: false,
    autoplay: {
      delay: 8000,
      disableOnInteraction: false,
    },

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    on: {
      slideChange:function(){
        $('#cnt1 .controller .slide_timer').removeClass('on');
        setTimeout(function(){
          $('#cnt1 .controller .slide_timer').addClass('on');
        },1)
      },
      slideChangeTransitionStart: function () {
        $('.swiper-slide').find('strong,p').removeClass('in');
        $('.swiper-slide-active').find('strong,p').addClass('in');
      },
    }
  });

  /* section4 탭브라우징 제어 */

  //1) 초기설정 => 탭버튼 포커스 제어 추가
  $('.tab:first-of-type, .tabpanel:first-of-type').addClass('active').attr({
    tabIndex: 0
  });
  $('.tab:first-of-type').attr({
    'aria-selected': true
  }).siblings().attr('aria-selected', false);
  $('.tabpanel:first-of-type').attr({
    'aria-hidden': false
  }).siblings('.tabpanel').attr('aria-hidden', true);

  //키보드 제어 keydown : 오른쪽39, 왼쪽37, HOME36, END35, Enter13, Spacebar32
  $('.tab').on('keydown', function (e) {
    var key = e.keyCode;
    switch (key) {
      case 40: //아래쪽
        $(this).attr('tabIndex', -1);
        if ($(this).hasClass('last')) $(this).siblings('.first').attr('tabIndex', 0).focus();
        else $(this).next().attr('tabIndex', 0).focus();
        break;

      case 38: //위쪽 
        $(this).attr('tabIndex', -1);
        if ($(this).hasClass('first')) $(this).siblings('.last').attr('tabIndex', 0).focus();
        else $(this).prev().attr('tabIndex', 0).focus();
        break;

      case 36: //HOME
        e.preventDefault();
        $(this).attr('tabIndex', -1);
        $(this).siblings('.first').attr('tabIndex', 0).focus();
        break;

      case 35: //END
        e.preventDefault();
        $(this).attr('tabIndex', -1);
        $(this).siblings('.last').attr('tabIndex', 0).focus();
        break;

      case 13: //Enter
      case 32: //Spacebar
        var _tg = $(this); //함수를 호출할 때 어떤 li에서 keydown되었는지를 매개변수로 전달
        tabActive(_tg);
        break;
    }

  });

  $('.tab').on('click', function () {
    var _tg = $(this);
    tabActive(_tg);
  });

  function tabActive(_target) {
    _target.addClass('active').attr({
      'aria-selected': true,
      tabIndex: 0
    }).siblings().removeClass('active').attr({
      'aria-selected': false,
      tabIndex: -1
    });
    var panel = '#' + _target.attr('aria-controls');
    $(panel).addClass('active').attr({
      'aria-hidden': false,
      tabIndex: 0
    }).siblings('.tabpanel').removeClass('active').attr({
      'aria-hidden': true,
      tabIndex: -1
    });
  }

  //section4(서비스) li에 hover,focusin이벤트
  $('#cnt4 .tabpanel ul li').attr('tabindex', 0);
  $('#cnt4 .tabpanel ul li').on({
    'mouseenter focusin': function () {
      $(this).addClass('on');
    },
    'mouseleave focusout': function () {
      $(this).removeClass('on');
    }
  });






});