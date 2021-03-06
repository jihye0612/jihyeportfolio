$(function(){
	$('#container .section1 .nav_top>.navT_big>li').hover(function(){
		var tg=$(this);
		var dep2=$(this).find('.dep2');
		if($(window).width()>=1280){
			dep2.stop().animate({width:240},{duration:350, deasing:'easeInOutCubic'})
		}
	},function(){
		var tg=$(this);
		var dep2=$(this).find('.dep2');
		if($(window).width()>=1280){
			dep2.stop().animate({width:0},{duration:250, deasing:'easeOutCubic'})
		}
	});
	$('#container .section1 .nav_top>.navT_min>li').hover(function(){
		var tg=$(this);
		var dep2=$(this).find('.dep2');
		if($(window).width()<1280 && $(window).width()>=768){
			dep2.slideDown('fast');
		};
	},function(){
		var tg=$(this);
		var dep2=$(this).find('.dep2');
		if($(window).width()<1280 && $(window).width()>=768){
			dep2.slideUp('fast');
		};
	});
	var nav_num=1;
	$('.header_mobile #nav_btn a').click(function(){
		var nav=$('.navT_mobile');
		var navBtn=$(this);
		var overlay=$('#header .nav_overlay');
		if(nav_num<=1){
			navBtn.addClass('active');
			nav.css('left','-64%').stop().animate({left:0});
			overlay.fadeIn();
			nav_num++;
		}else{
			navBtn.removeClass('active');
			nav.css('left','0').stop().animate({left:'-64%'});
			overlay.fadeOut();
			nav_num--;
		}
		return false;
	});
	$('#header .nav_overlay').click(function(){
		$('.header_mobile #nav_btn a').removeClass('active');
		$('.navT_mobile').css('left','0').stop().animate({left:'-64%'});
		$('#header .nav_overlay').fadeOut();
		nav_num=1;
	});
	$('.navT_mobile .dep2').hide();
	$('.navT_mobile>ul>li>a').click(function(){
		var dep2=$(this).next('.dep2');
		$('.navT_mobile>ul>li').removeClass('active');
		$('.navT_mobile .dep2').slideUp();
		if(dep2.is(':visible')){
			$(this).parent('li').removeClass('active');
			dep2.slideUp();
		}else{
			$(this).parent('li').addClass('active');
			dep2.slideDown();
		}
		return false;
	});
	$('.header_mobile #search_btn a').click(function(){
		$('.search').css('top','-54px').stop().animate({top:4},50)
		return false;
		
	});
	$('#header .search .close').click(function(){
		$('.search').css('top','4').stop().animate({top:'-54px'},50)
		return false;
	});
	
	
	function moveSlider(index){
		var sliderWidth=$('.main_slider').innerWidth();
		var sliderHeight=$('.main_slider img:first').innerHeight()+1;
		var willMoveLeft=-(index%3*sliderWidth);
		var willMoveTop=Math.floor(index/3)*(-sliderHeight); 
		
		$('.main_slider .slidebox').animate({left:willMoveLeft},'slow');
		$('.main_slider .slidebox').animate({top:willMoveTop},'slow'); //이미지 슬라이드
		
		$('.main_slider .control_btn[data-index='+index+']').addClass('active');
		$('.main_slider .control_btn[data-index!='+index+']').removeClass('active'); //버튼 활성화
		
		$('.main_slider .slider_text[data-index='+index+']').show().animate({top:-97},'slow');
		$('.main_slider .slider_text[data-index!='+index+']').slideUp('slow',function(e){$(this).css('top','0')}); //텍스트 활성화. 자연스럽게 들어가는 효과를 위해, hide 안에 function으로 css를 넣음. 넣지 않으면 사라지고 나서 움직이므로, 효과가 보이지 않음.
	}
	
	$('.main_slider .slider_text').css('top','0').each(function(index){
		$(this).attr('data-index',index);
	});//첫 실행시 텍스트 보이지 않게
	
	$('.main_slider .control_btn').each(function(index){
		$(this).attr('data-index',index);
	}).click(function(){
		var index=$(this).attr('data-index');
		moveSlider(index)
	});//버튼 클릭시 인덱스를 클릭된 버튼으로 변경, 변경된 index로 moveSlider(index) 즉시 다시 실행
	
	var randomNumber=Math.round(Math.random()*5);//random함수에서 0~1 사이의 난수 지정(소수점포함), round함수에서 반올림하여 정수로 바꿈
	moveSlider(randomNumber);//moveSlider(index) 요구되는 index에 randomNumber 값을 넣어 실행.
	
	var visual=$('.main_slider .slidebox > img');
	var button=$('.main_slider .control > div');
	var current=randomNumber;
	var setIntervalId;
	
	button.on({click:function(){
		var tg=$(this);//클릭된 버튼
		var i=tg.index();//클릭된 버튼의 순번
		
		button.removeClass('active');//다른버튼 비활성화
		tg.addClass('active');
		move(i)//선택된 순번에 맞게 이미지 슬라이드하기
	}
	});
	
	function move(i){//자동슬라이드를 위해 이미지 움직이는 함수를 다시 만듦
		var currentEl=visual.eq(current);//새로고침시 처음 보이는 이미지
		var nextEl=visual.eq(i);//클릭된 버튼의 순번에 해당하는 이미지를, 이제 보여야 하는 nextEl로 설정
		
		currentEl.css({left:0}).stop().animate({left:'-100%'});
		nextEl.css({left:'100%'}).stop().animate({left:0}); //클릭된 버튼에 해당하는 이미지를 보여줌
		
		current=i; //슬라이드가 완료된, 클릭되었던 이미지를 현재이미지로 삼음
	}
	
	timer() //사용자 정의 함수이므로 불러서 실행 명령
	function timer(){
		setIntervalId=setInterval(function(){//clearInterval을 사용하기 위해 setIntervalId이라는 변수 지정
			var n=current+1; //현재 보이는 이미지의 다음 이미지의 순번
			if(n==visual.size()){
				n=0;//순번 갯의 끝(5)를 넘으면(6), 0(첫번째)으로 초기화
			}
			button.eq(n).trigger('click');//다음 순번의 버튼에 클릭이벤트 강제 발생
		},4000);
		
	}
	bb=true;
	$('.stop_btn').click(function(){
		if(bb==true){
			$(this).removeClass('stop');
			$(this).addClass('play');
			clearInterval(setIntervalId);
			bb=false;
		}else{
			$(this).removeClass('play');
			$(this).addClass('stop');
			timer();
			bb=true;
		}
	});	
});