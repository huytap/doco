new WOW().init();
$('.dropdown-menu').find('li>a').click(function(){
    if($(this).hasClass('other') && $(this).find('input').val() == ''){
        $(this).find('input').focus();
        return false;
    }else{
        if($(this).hasClass('other')){
            var txt = $(this).find('input').val();
            txt = 'Khác: '+ txt;
            $(this).parent().parent().parent().parent().find('.text-name').text(txt);
            $(this).parent().parent().parent().find('input[type="hidden"]').val(txt);
        }else{
            let p = $(this).text();
            $(this).parent().parent().parent().find('.text-name').text(p)
            $(this).parent().parent().parent().find('input[type="hidden"]').val(p);
        }
    }
})
$('#viewVideo').click(function(){
    $('#myVideo').removeClass('hidden-xs');
    playVid();
});

var vid = document.getElementById("myVideo"); 
function playVid() { 
    vid.play(); 
    $('.close').show();
    $('.close').click(function(){
        $(this).hide();
        pauseVid()
        $('#myVideo').addClass('hidden-xs')
    })
} 
function pauseVid() {
    vid.pause();
}

var swiper = new Swiper('.myswiper', {
    spaceBetween: 30,
    slidesPerView: "auto",
    navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
    },
});

$(document).ready(function () {
    var lastScroll = 90;
    window.onscroll = function () {
        var st = $(this).scrollTop();
        if (st > lastScroll){
            $('.header').addClass('nav-up');
            $('.header').removeClass('nav-down');
        }else if(st>=100 && st<=lastScroll){
            $('.header').removeClass('nav-up');
            $('.header').addClass('nav-down');
        }else{
            $('.header').removeClass('nav-up');
            $('.header').removeClass('nav-down');
        }
        lastScroll = st<0?0:st;
    }
    var url = location.hash;
    if(url)
    $('html,body').animate({scrollTop:$(url).offset().top}, 1700);
    $(".btn-register").click(function () {
        $('html,body').animate({scrollTop:$('#dang-ky-nhan-uu-dai').offset().top}, 1700);
    });
    $('.btnSubmit').unbind().click(function(e){
        if($.trim($('input[name="full_name"]').val()) == ''){
            $('input[name="full_name"]').focus();
            return false;
        }else if($.trim($('input[name="phone_number"]').val()) == ''){
            $('input[name="phone_number"]').focus();
            return false;
        }else if($.trim($('input[name="email"]').val()) == ''){
            $('input[name="email"]').focus();
            return false;
        }else if(!validateEmail($('input[name="email"]').val())){
            $('input[name="email"]').focus();
            return false;
        }else if($.trim($('input[name="who_register"]').val()) == ''){
            $('input[name="who_register"]').parent().addClass('hasError');
            return false;
        }else if($.trim($('input[name="your_difficulties"]').val()) == ''){
            $('input[name="who_register"]').parent().removeClass('hasError');
            $('input[name="your_difficulties"]').parent().addClass('hasError');
            return false;
        }else if($.trim($('input[name="reason"]').val()) == ''){
            $('input[name="your_difficulties"]').parent().removeClass('hasError');
            $('input[name="reason"]').parent().addClass('hasError');
            return false;
        }else if($.trim($('input[name="what_channel"]').val()) == ''){
            $('input[name="reason"]').parent().removeClass('hasError');
            $('input[name="what_channel"]').parent().addClass('hasError');
            return false;
        }else{
            $('input[name="what_channel"]').parent().removeClass('hasError');

            const scriptURL = 'https://script.google.com/macros/s/AKfycbwcmd4bzliyfPqEu1d15K7B6WD3LGueLveAipZQZM3lKdwnD25NvDdFhXeZTP2lbBrH/exec';
            const form = document.forms['submit-to-google-sheet']
            form.addEventListener('submit', e => {
                e.preventDefault()
                fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                .then(response => console.log("Success!"))
                .catch(error => console.error('Error!', error.message));
                document.getElementById("myForm").reset();
                $('#who_register').find('.text-name').text('Bạn đăng ký cho mình hay cho người thân?')
                $('#your_difficulties').find('.text-name').text('Bạn cần luyện tập phục hồi chức năng để cải thiện vấn đề sức khoẻ gì?')
                $('#remote_issue').find('.text-name').text('Xin hãy cho chúng tôi biết nguyên nhân dẫn đến những vấn đề mà bạn gặp phải ở câu trên');
                $('#what_channel').find('.text-name').text('Bạn biết đến Docodemo Reha qua kênh nào?')
            })
        }
    })
});
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}