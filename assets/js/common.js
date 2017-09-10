 // 幻灯片插件
 $(document).ready(function() {
$(".banner .slide").eSlide({//首页幻灯片
		autoPlay : true
});
});
;(function($) {
	$.fn.eSlide = function(options) {
		var defaults = {
			time: 3000,
			autoPlay: false,
			start: 0,
			curClass: "current",
			delay: 500
		}
		var opts = $.extend({}, defaults, options);
		var t = $(this);
		return this.each(function() {
			var $container = $(this).find(".slide-container");
			var $item = $container.find("ul").children();
			var timer, total = $item.size(),index = opts.start;
			var html = '<div class="wrap"><div class="pagination"><ul></ul></div></div>';
			$item.eq(opts.start).addClass(opts.curClass);
			function createElement() {
				$(html).appendTo(t);
				$item.each(function(i) {
					t.find(".pagination ul").append('<li><a href="javascript:;">'+(i+1)+'</a></li>')
				})
			};
			total > 1 ? createElement() : !0;
			$pagination = t.find(".pagination");
			$pagination.find("li").eq(opts.start).addClass(opts.curClass);
			function play() {
				$item.eq(index).fadeOut(opts.delay).next().fadeIn(opts.delay);
				index++;
				if (index == total) {
					index = 0;
					goto(index)
				}
				$pagination.find("li").eq(index).addClass("current").siblings().removeClass("current")
			}
			function goto(i) {
				$item.eq(i).fadeIn(opts.delay).siblings().fadeOut(opts.delay)
			}
			$pagination.find("li").on("click",function() {
				$(this).addClass("current").siblings().removeClass("current");
				goto($(this).index());
				index = $(this).index()
			});
			if (opts.autoPlay && total > 1) {
				timer = setInterval(play, opts.time);
				t.hover(function() {
				clearInterval(timer)
				},function() {
				  timer = setInterval(play, opts.time)
			})
			}
			
		})
	}
})(jQuery);

//图片滚动插件 
;(function($){
	$.fn.eScroll = function(options){
		var defaults = {
			autoPlay : false,
			container : ".container",
			nextPrev : false,
			time : 3000
			}
		var opts = $.extend({}, defaults, options);
		return this.each(function(a){
			var $this = $(this);
			var index = 1;
			var ul = $this.find("ul");
			var li = ul.children();
			var w = ul.find("li").outerWidth(true);
			var crrent = index = 0;
			li.clone().appendTo(ul);
			var lisize = ul.find("li").size();
			ul.width(w * lisize);
			if(opts.nextPrev){
				$this.append('<a href="javascript:;" class="prev"></a><a href="javascript:;" class="next"></a>');
				}
			var $next = $this.find(".next");
			var $prev = $this.find(".prev");
			function next(){
				if(index >= lisize / 2){
					ul.css("left", "0px");
					index = 0;
					}
					index++;
					ul.animate({left:-w*index},500);
					
				}
			function prev(){
				if(index <= 0){
					ul.css("left", -ul.width() / 2);
					index = lisize / 2;
					}
					index--;
					ul.animate({left:-index*w},500);
					
				}
			$next.on("click",function(){
				next()
				});
			$prev.on("click",function(){
				prev()
				});
			if(opts.autoPlay){
				var timer = setInterval(function(){
					next()
					}, opts.time);
				$this.hover(function(){
				  clearInterval(timer)
				},function(){
				  timer = setInterval(next, opts.time);
				})
				}
			})
		}
})(jQuery);

// slider调用配置
$(document).ready(function() {
    $(".partners .img-scroll").eScroll({
        autoPlay: true
    });
    $(".adviser-slider").eScroll({
        nextPrev: true,
        autoPlay: true
    });
});

/*tab切换*/
$(document).delegate(".ui-tab", "mouseenter",function() {
    $(this).delegate(".ui-tab-nav li","mouseover",function(){
		var $icon = $(this).closest(".ui-tab-nav").find(".icon-cur");
		if($icon.length){
		    //var left = $(this).position().left + $(this).outerWidth() / 2 - 17;
		    var left = $(this).position().left;
	        $icon.stop(true,false).animate({left:left});
			};
	    $(this).addClass("active").siblings('li').removeClass("active");
        $(this).closest(".ui-tab").find(".ui-tab-item").eq($(this).closest('.ui-tab-nav').find('li').index(this)).show().siblings(".ui-tab-item").hide();
        $(this).closest(".ui-tab").find(".fr.dk-more").eq($(this).closest('.ui-tab-nav').find('li').index(this)).show().siblings(".fr.dk-more").hide();
	})
}),

/*模拟下拉框*/
$(document).delegate(".ui-select", "mouseenter",function(){ 
	var input = $("input[type=hidden]",this),
	    sleHd = $(".select-value",this),
	    list = $(".select-list",this);
	$(this).delegate(".select-value","click",function(){
		$(this).parent().parent().css("zIndex","9");
		$(this).parent().addClass("active")
		list.is(":hidden") ? list.show() : !0;
	}),
	$(this).delegate(".select-list li","click",function(){
		sleHd.find("span").text($(this).text()).css("color","#333");
		$(this).css("background-color","#ebf5ff").siblings().css("background-color","");
		input.val($(this).attr("data-val"));
		list.hide();
	})
}),
$(document).delegate(".ui-select","mouseleave",function(){
	$(this).parent().css("zIndex","");
	$(this).removeClass("active");
	$(".select-list",this).hide();
}),
/*下拉菜单*/
$(function(){
	$menu = $(".ui-menu");
	$menu.hover(function(){
		var $icon = $(this).find(".icon-down");
		$(this).css({zIndex:"99"}).find(".ui-menu-list").height($("li",$(this)).length * 35).stop().slideDown();
		$icon.length && !!$.fn.rotate && $icon.rotate({animateTo: 180});
	},function(){
		$(this).css({zIndex:""}).find(".ui-menu-list").stop().slideUp();
		var $icon = $(this).find(".icon-down");
		$icon.length && !!$.fn.rotate && $(this).find(".icon-down").rotate({animateTo:0});
	})
})

//URL重新组合
function reSeoJumpUrl(obj,str){
    var oldurl = $(obj).attr('oldurl');
    var url = oldurl + str;
    $(obj).attr('href',url);
}

//回呼移上去的号码显示效果
$(document).ready(function(){
	$('.dk-zx-i').mouseover(function(){
		//自动读取cookie中拨打过yidai站商家的手机号码
		if(lastestPhone){
			if($(this).find('.ui-input').val()=='输入手机号码'){
				$(this).find('.ui-input').val(lastestPhone).css('color','#222');
			}	
		}
	}).mouseleave(function(){
		if($(this).find('.ui-input').attr('tag')!=1){
			obj = $(this).find('.ui-input').val('输入手机号码').css('color','#ababab');
		}
	})
	$('.dl-zx-tel').find('.ui-input').css('color','#ababab');
})
//顶部二维码
	function showQrcode(ti,img){
	var d = dialog({
		 cancelValue: "关闭",
		 fixed: true,
		 title: ti,
		 width: 260,
		 content: '<div style="text-align:center"><img src="'+img+'"></div>'
});
    d.showModal();
}

//找贷款顾问轮播效果
$(document).ready(
    function() {
         var interval;
        	interval = setInterval(function() {
           		$(".next").triggerHandler("click");
	       		$(".no4").find(".info").fadeIn(1000).find("input[type='text']").val("");
	        }, 3000);

	        $("#adviser").hover(function(){
	        	clearInterval(interval);
	        } , function(){
		        	interval = setInterval(function() {
	           		$(".next").triggerHandler("click");
		       		$(".no4").find(".info").fadeIn(1000).find("input[type='text']").val("");
		        }, 3000);
	        });

        var json0 = {
            "width": 120,
            "height": 180,
            "top": 45,
            "left": -130
        }
        var json1 = {
            "width": 120,
            "height": 180,
            "top": 45,
            "left": 0
        }
        var json2 = {
            "width": 120,
            "height": 180,
            "top": 45,
            "left": 130
        }
        var json3 = {
            "width": 120,
            "height": 180,
            "top": 45,
            "left": 260
        }
        var json4 = {
            "width": 420,
            "height": 260,
            "top": 0,
            "left": 390
        }
        var json5 = {
            "width": 120,
            "height": 180,
            "top": 45,
            "left": 820
        }
        var json6 = {
            "width": 120,
            "height": 180,
            "top": 45,
            "left": 950
        }
        var json7 = {
            "width": 120,
            "height": 180,
            "top": 45,
            "left": 1080
        }
        var json8 = {
            "width": 120,
            "height": 180,
            "top": 45,
            "left": 1210
        }
        $(".next").click(
            function() {
            	
                if (!$("#adviser li").is(":animated")) {
                    //先交换位置
                    $(".no1").animate(json0, 400);
                    $(".no2").animate(json1, 400);
                    $(".no3").animate(json2, 400);
                    $(".no4").animate(json3, 400 );
                    $(".no5").animate(json4, 400);
                    $(".no6").animate(json5, 400);
                    $(".no7").animate(json6, 400);
                    $(".no8").animate(json7, 400);
                    $(".no0").css(json6);
                    //再交换身份
                    $(".no0").attr("class", "wait");
                    $(".no1").attr("class", "no0").find(".info").hide();
                    $(".no2").attr("class", "no1").find(".info").hide();
                    $(".no3").attr("class", "no2").find(".info").hide();
                    $(".no4").attr("class", "no3").find(".info").hide();
                    $(".no5").attr("class", "no4").find(".info").fadeIn(1000).find("input[type='text']").val("");
                    $(".no6").attr("class", "no5").find(".info").hide();
                    $(".no7").attr("class", "no6").find(".info").hide();
                    $(".no8").attr("class", "no7").find(".info").hide();
                    //$(".no3").next().find(".info").fadeIn(20000).find("input[type='text']").val("");
                    //上面的交换身份，把no0搞没了！所以，我们让no1前面那个人改名为no0
                    if ($(".no7").next().length != 0) {
                        //如果no5后面有人，那么改变这个人的姓名为no6
                        $(".no7").next().attr("class", "no8");
                    } else {
                        //no5前面没人，那么改变此时队列最开头的那个人的名字为no0
                        $("#adviser li:first").attr("class", "no8");
                    }
                    //发现写完上面的程序之后，no6的行内样式还是json0的位置，所以强制：
                    $(".no8").css(json8);
                }
            }
        );
        $(".prev").click(
            function() {
                if (!$("#adviser li").is(":animated")) {
                    $(".no0").animate(json1, 400);
                    $(".no1").animate(json2, 400);
                    $(".no2").animate(json3, 400);
                    $(".no3").animate(json4, 400);
                    $(".no4").animate(json5, 400);
                    $(".no5").animate(json6, 400);
                    $(".no6").animate(json7, 400);
                    $(".no7").animate(json8, 400);
                    $(".no8").css(json0);
                    $(".no8").attr("class", "wait");
                    $(".no7").attr("class", "no8").find(".info").hide();
                    $(".no6").attr("class", "no7").find(".info").hide();
                    $(".no5").attr("class", "no6").find(".info").hide();
                    $(".no4").attr("class", "no5").find(".info").hide();
                    $(".no3").attr("class", "no4").find(".info").fadeIn(1000).find("input[type='text']").val("");
                    $(".no2").attr("class", "no3").find(".info").hide();
                    $(".no1").attr("class", "no2").find(".info").hide();
                    $(".no0").attr("class", "no1").find(".info").hide();
                    //上面的交换身份，把no0搞没了！所以，我们让no1前面那个人改名为no0
                    if ($(".no1").prev().length != 0) {
                        //如果no1前面有人，那么改变这个人的姓名为no0
                        $(".no1").prev().attr("class", "no0");
                    } else {
                        //no1前面没人，那么改变此时队列最后的那个人的名字为no0
                        $("#adviser li:last").attr("class", "no0");
                    }
                    $(".no0").css(json0);
                }
            }
        );
    }
);