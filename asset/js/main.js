$(document).ready(function () {
  var _win = $(window);
  var _cnt = $('#content .tg');
  var cntPosY; //섹션의 offset().top 값을 배열에 저장
  var tgIdx = 0; //로딩시 보여지는 섹션의 인덱스 번호
  var cntPosY; //섹션의 offset().top 값을 배열에 저장
  var timerScroll = 0; //scroll 이벤트의 실행문 누적을 방지
  var total = _cnt.length; //섹션의 전체 개수
  var timerResize = 0; //resize이벤트의 실행문 누적을 방지 하기위해 
  var timerWheel = 0; //mousewheel 이벤트의 실행문 누적을 방지
  var sec45_top =  $('#sec45').offset().top;

  //1) resize이벤트 cntPosY배열에 섹션의 offset().top 저장 + 하단푸터인식
  _win.on('resize', function () {
    clearTimeout(timerResize);

    timerResize = setTimeout(function () {
      cntPosY = new Array(total);
      /* cntPosY[0] = $cnt.eq(0).offset().top;
      cntPosY[1] = $cnt.eq(1).offset().top;
      cntPosY[2] = $cnt.eq(2).offset().top; */

      for (var i = 0; i < total; i++) {
        cntPosY[i] = _cnt.eq(i).offset().top;
      }
      console.log(cntPosY);

      //창사이즈에 변화가 생길때 현재 활성화된 섹션이 잘 보여지도록 애니메이트 추가 처리
      $('html, body').stop().animate({
        scrollTop: cntPosY[tgIdx]
      }, 1000, 'easeOutBack');
    }, 50);
  });
  _win.trigger('resize');

  //마우스 휠 이벤트
  _cnt.on('mousewheel DOMMouseScroll', function (e) {
    var _this = $(this);
    clearTimeout(timerWheel);

    timerWheel = setTimeout(function () {
      //4-1) 현재 애니메이트(.cnt_wrap) 중이면 함수 강제 종료
      console.log(e);
      if ( $('html, body').is(':animated') ) return false;

      //4-2) delta값 구하기
      //e.originalEvent.wheelDelta 파이어폭스를 제외한 나머지 브라우저
      //e.originalEvent.detail*-1 파이어폭스 only
      var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
      //console.log(delta);

      //4-3) if : 휠내리기-음수-오른쪽,  else if : 휠올리기-양수-왼쪽 => tgIdx
      if (delta < 0 && tgIdx < total - 1 ) {  //마우스휠을 내렸을 때 
        if(tgIdx === 3){
          $(window).scrollTop(sec45_top);
          $('#sec45').stop().animate({left:'-100%'});
        }else{
          tgIdx++;
          $('html, body').stop().animate({
            scrollTop: cntPosY[tgIdx]
          }, 700, 'easeOutCubic');
        }
/*         console.log(_this);
        console.log(delta, tgIdx, '휠내리기'); */

      
      } else if (delta > 0 && tgIdx > 0) {    //마우스휠을 올렸을 때 
          if(tgIdx === 3){                  
                  $(window).scrollTop(sec45_top);
                  $('#sec45').stop().animate({left:'0%'});
                }else{
                  tgIdx--;
                  $('html, body').stop().animate({
                    scrollTop: cntPosY[tgIdx]
                  }, 700, 'easeOutCubic');
                }
      }
     


    }, 200);
  });



















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
      init: function () {
        /* do something */
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
    console.log(key);
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