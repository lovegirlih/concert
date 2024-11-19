$(document).ready(function () {
    $('#go-to-top').click(function () {
        $('html,body').animate({scrollTop: 0}, 400);
        return false;
    });

    function validateForm(formData) {
        // 필수 입력 항목을 체크하는 로직
        if (!formData.joinName) {
            alert("이름을 입력해 주세요.");
            return false; // 유효성 검사를 통과하지 못하면 false 반환
        }

        if (!formData.memberCount) {
            alert("인원 수를 선택해 주세요.");
            return false;
        }

        if (!formData.withCar) {
            alert("차량 여부를 선택해 주세요.");
            return false;
        }

        // 모든 필수 값이 입력된 경우 true 반환
        return true;
    }

    $("#send").click(function () {
        const formData = {
            joinName: document.getElementById('join-name').value,
            email: 'lovegirlih2@hamail.net',
            message: document.getElementById('message').value,
            memberCount: document.getElementById('memberCount').value,
            withCar: document.getElementById('withCar').value
        };

        if (validateForm(formData)) {
            $("#send").text("전송중...");
            $("#send").prop("disabled", true);

            emailjs.init({
                publicKey: "NjVes-fKuq3CdGKdC",
            });

            emailjs.send('service_6om247t', 'template_v6ccxrb', formData, null).then(
                (response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    $('#joinModal').modal('hide');
                    alert(formData.joinName + "님의 참석여부 전달이 정상적으로 완료되었습니다.");
                },
                (error) => {
                    console.log('FAILED...', error);
                    $('#joinModal').modal('hide');
                    alert("일시적인 에러로 참석여부 전달에 실패하였습니다. 한번만 다시 시도해 주실래요?");
                },
            );
        }
    })
})

// Smooth scroll for links with hashes
$("a.smooth-scroll").click(function (event) {
    // On-page links
    if (
        location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
    ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $("html, body").animate(
                {
                    scrollTop: target.offset().top
                },
                1000,
                function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    }
                }
            );
        }
    }
});
