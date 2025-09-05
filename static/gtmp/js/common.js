$(function(){
    // 접근성 포커싱
    var currentfocus = null
    var docWidth = $(window).outerWidth();

    if (docWidth < 750 ) {
        $("body").addClass("mobile")
    }
    else {
        $("body").removeClass("mobile")
    }

    //gnb
    //gnb 호버, 포커스하면 하위 메뉴 노출
    $("#gnb > ul > li > a").on("mouseover focus click", function(e){
        e.preventDefault();
        $(this).parent("li").addClass("on").siblings().removeClass("on");
    });

    //gnb 포커스 벗어나면 하위 메뉴 사라짐
    $("#header").on("mouseleave blur", function(){
        $("#gnb > ul > li").removeClass("on");
    });
    $("#gnb > ul > li:last a:last").on("blur", function(){
        $("#gnb > ul > li").removeClass("on");
    });

    //소재물성조회 데이터피드 클릭 이벤트
    $(".db-feed-item").on("click", function(){
        $(this).toggleClass("on");
        
        if( $(this).hasClass("on") ) {
            $(this).find("button").attr("aria-label", "닫기");
            $(this).find("i").removeClass("ico-dropup").addClass("ico-dropdown")
        }
        else {
            $(this).find("button").attr("aria-label", "열기");
            $(this).find("i").removeClass("ico-dropdown").addClass("ico-dropup")
        }
    });

    //데이터피드 탭메뉴 클릭 시 이벤트
    $('.tab-list[role="tablist"] button').on('click', function () {
        var target = '#' + $(this).attr('aria-controls');

        $(this).attr("aria-selected", true).siblings().attr("aria-selected", false);
        $(this).attr("title", "선택됨").siblings().attr("title", "")
        $(this).addClass("on").siblings().removeClass("on");
        $(target).show().siblings('[role="tabpanel"]').hide();
    });


    //메인 소재종류 드롭다운 
    $("#mainContainer .dropdown").on("click", function(){
        $(this).parent().toggleClass("on")
    });


    //팝업 관련 이벤트
    //즐겨찾기 클릭 시 텍스트 변경    
    $(".b-bookmark").on("click", function(){
        $(this).toggleClass("active")
        if ( $(".b-bookmark").hasClass("active") ){
            $(".b-bookmark").text("즐겨찾기 해제");
        }
        else {
            $(".b-bookmark").text("즐겨찾기 등록");
        }
    });

    //creep 아코디언 메뉴 열고 닫기
    $(".creep-info button").on("click", function(){
        $(this).toggleClass("on");
    });

    //그래프 버튼 클릭 시 하단 그래프 노출
    $(".b-grph").on("click", function(){
        $(this).toggleClass("on")

        if( $(".b-grph").hasClass("on") ) {
            $(".b-grph").text("그래프 닫기")
            $(".chart-wrap").show();
            window.dispatchEvent(new Event('resize'));

            $(".b-id").removeClass("on").text("Specimen ID")
            $(".id-wrap").hide();
        } 
        else {
            $(".b-grph").removeClass("on").text("그래프")
            $(".chart-wrap").hide();
        }
    });

    //이미지 버튼 클릭 시 하단 그래프 노출
    $(".b-id").on("click", function(){
        $(this).toggleClass("on")

        if( $(".b-id").hasClass("on") ) {
            $(".b-id").text("Specimen ID 닫기")
            $(".id-wrap").show();

            $(".b-grph").removeClass("on").text("그래프")
            $(".chart-wrap").hide();
        } 
        else {
            $(".b-id").removeClass("on").text("Specimen ID")
            $(".id-wrap").hide();
        }
    });

    //팝업 마지막 닫기 버튼에서 다음 탭 누르면 맨 처음으로 초점이동하기
    $(".b-popClose").on("keydown", function(e){
        if ( e.keyCode == 9) {
            $(this).parents(".popwrap").find(".i-close").focus();
        }
    });

    //이미지 확대 클릭 시 새창에서 열림
    $(".img-box img").each(function (index, element) {
        _html = $(this)[0].outerHTML

        if(!!$(this).find("img")[0]?.srcset){
            _link = $(this).attr("srcset").replace(' 2x','')
        }else{
            _link = $(this).attr("src")
        }
        _html = `<a href="${_link}" target="_blank" title="이미지 보기 새창열림">${_html}</a>`
        if($(window).width() < 750){
            $(this)[0].outerHTML =_html
        }
    });
    // 이미지 maxwidth 처리
    $(".img-box img").each(function (index, element) {
        $(this).one("load", function () {
            $(this).css('maxWidth',$(this)[0].naturalWidth)
            }).each(function () {
                if (this.complete) {
                    $(this).trigger('load');
                }
            });
    });


    //리사이징
    $(window).on("resize", function(){
        docWidth = $(window).outerWidth();
        if (docWidth < 750 ) {
            $("body").addClass("mobile")
        }
        else {
            $("body").removeClass("mobile")  
        }
    })

}); //doc end