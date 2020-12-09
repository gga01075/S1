$(document).ready(function(){
    //#pcHeader초기화
    var _pcGnb = $('#pcHeader>#pcGnb');
    _pcGnb.find('.dep2, .dep2_bg, .dep1_txt').hide();

    $('#pcHeader').on({
        //pcHeeader에 마우스가 들어가거나 포커스가 들어갔을 때
        'mouseenter focusin': function(){
            $(this).addClass('on');
        },
         //pcHeader에 마우스가 나오거나 포커스가 나왔을 때
        'mouseleave focusout': function(){
            if(!$(this).hasClass('active')){
                $(this).removeClass('on');
            }
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

    //2)depth1 ul에 마우스 진입과 나가기
	_pcGnb.children().hover(
		function  () {	//moseenter
            _pcGnb.find('.dep2_bg').stop().slideDown('fast', function () {
                _pcGnb.find('.dep2').show();
            });
		},
        function  () {	//mouseleave
            _pcGnb.find('.dep2_bg').stop().slideUp();
			_pcGnb.find('.dep2').hide();
		}
    );
    
    //3)depth1 li에 마우스, 포커스 진입
    _pcGnb.find('> ul > li').on({
        'mouseenter focusin': function () {
            var dep1txt = $(this).children('a').text();
            var dep1src = $(this).children('a').data('src');
            _pcGnb.find('.dep1_txt').show().children('img').attr({'src':dep1src}).next().text(dep1txt);

            _pcGnb.find('.dep2_bg').stop().slideDown('fast', function () {
                _pcGnb.find('.dep2').show();
            });
            $(this).addClass('on').siblings().removeClass('on');
        },
        'mouseleave focusout': function () {
            _pcGnb.find('.dep1_txt').hide();
        }
    });
  
    _pcGnb.find('a:first, a:last').on('blur',function  () {
		setTimeout(function  () {
			if (!_pcGnb.find('a').is(':focus')) _pcGnb.find('> ul > li').mouseleave();
		},10);
	});


    //모바일, 태블릿 header 
    $(window).on('scroll',function(){
        var scrollY = $(this).scrollTop();
        if(scrollY > 0) $('#mHeader').addClass('on');
        else $('#mHeader').removeClass('on');
    });

    //모바일 메뉴 열기 버튼 클릭시
    $('.gnb_open_btn').on('click',function(){
        var _open_btn = $(this);
        var _first = $('#mHeader .menubar .first');
        var _last = $('#mHeader .menubar .last');
        var _menuBar = $('#mHeader .menubar');
        var _closeBtn = $('#mHeader .menubar .gnb_close_btn');
        var _mGnb = $('#mGnb>ul');

        //#dim 동적 생성 
        _menuBar.before('<div id="dim"></div>');
        var _dim = $('#dim');

        _dim.stop().fadeIn('fast');
        _menuBar.stop().fadeIn('fast');

        //모바일 메뉴바 내 첫번쨰 버튼에서 shift+tab을 누르면 마지막 버튼으로 이동
        _first.on('keydown',function(e){
            if(e.shiftKey && e.keyCode ===9 ){
                _last.focus();
            }
        });
        //모바일 메뉴바 내 마지막 버튼에서 tab을 누르면 마지막 버튼으로 이동
        _last.on('keydown',function(e){
            if(!e.shiftKey && e.keyCode ===9 ){
                _first.focus();
            }
        });

        _mGnb.find('>li>a').on('click',function(e){
            e.preventDefault();
            _mGnb.find('>li').removeClass('on');
            $(this).next().stop().slideDown('fast').parent().addClass('on');
            _mGnb.find('>li').not('li.on').children('.dep2').hide();
        });

        //모바일 메뉴 닫기 클릭시
        _closeBtn.on('click',function(){
            _dim.fadeOut('fast',function(){
                $(this).remove();
            });
            _menuBar.stop().fadeOut('fast');
            _open_btn.focus();
            _mGnb.find('li.on').removeClass('on').children('.dep2').hide();
        });

        //#dim을 클릭하는 경우도 닫겨진다.
            _dim.on('click',function(){
             _closeBtn.trigger('click');
        });
        
     //esc키보드를 누른 경우도  닫겨진다.
          $(window).on('keydown',function(e){
              if(e.keyCode === 27){
                    _closeBtn.trigger('click');
                }
        });
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













    //패밀리사이트
	var _family=$('#footer .family');
	var _btn = _family.find('a').first();		//depth1 a:familysite 텍스트가 담긴 링크
	var _go =	_family.find('a').last();		//확인(새창열기 버튼)
	var tgHref;
	
	//1-1) $btn을 클릭해서 ul 태그 열어주기
	_btn.on('click',function  (e) {
		e.preventDefault();
		$(this).next().stop().slideDown(200).parent().addClass('on');

		// ul 태그에서 마우스가 떠나면 닫아주기
		$(this).next().on('mouseleave',function  () {
			$(this).stop().slideUp(200).parent().removeClass('on');
		});

		//focus가 family 내부에 있지 않을 경우 닫아주기
		_family.find('a:first , a:last').on('blur',function  () {
			setTimeout(function  () {
				if (!_family.find('a').is(':focus')) _family.find('>ul').stop().slideUp();
			}, 1000);
		});

		// ul li a를 클릭하면 자신의 텍스트와 href를 변수에 담아 $btn에 글자를 강제로 바꾼다=> ul 태그 닫아주기
		_family.find('>ul>li>a').on('click',function  (e) {
			e.preventDefault();
			var tgTxt=$(this).text();
			tgHref=$(this).attr('href');
			//console.log(tgTxt, tgHref);

			_btn.text(tgTxt).focus().next().stop().slideUp();
		});
	});

	//3) 확인버튼 눌러 페이지 이동시키기
	_go.on('click',function  (e) {
		e.preventDefault();
		if (_btn.text()=='Family Site') return false;

		//window.open('열려질 새창의 경로명','팝업창 이름','옵션');
		window.open(tgHref, 'popup');
    });
    









});