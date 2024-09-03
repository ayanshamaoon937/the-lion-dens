document.addEventListener("DOMContentLoaded", () => {
    const getFontSizeMultiplier = (value) => value / 10 * parseFloat($("html").css("font-size"));

    const createLoaderCounterDigits = () => {
        const counterContainer = $(".loader-counter-3");
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 10; j++) {
                const digit = $("<div>").addClass("heading loader-num").text(j);
                digit.appendTo(counterContainer);
            }
        }
        $("<div>").addClass("heading loader-num").text("0").appendTo(counterContainer);
    };

    createLoaderCounterDigits();

    const animationSettings = {duration: 1.6, itemDelay: 0.08};

    const animateLoaderCounter = (selector, duration, delay = 0) => {
        const elementHeight = $(selector).outerHeight();
        const maxOffset = ($(selector).find(".loader-num").length - 1) * elementHeight;
        gsap.to(selector, {y: -maxOffset, duration, delay, ease: "power2.inOut"});
    };

    const progressCounter = {val: 0};
    const loaderTimeline = gsap.timeline({
        onStart() {
            gsap.set(".header", {autoAlpha: 0});
        },
        delay: 0.8
    });

    animateLoaderCounter(".loader-counter-3", 3.3);
    animateLoaderCounter(".loader-counter-2", 3.2);
    animateLoaderCounter(".loader-counter-1", 2, 1);

    loaderTimeline
        .to(".loader-cover-bg", {scaleY: 0, duration: 2})
        .to(progressCounter, {
            val: 100,
            roundProps: "val",
            duration: 2,
            onUpdate() {
                $(".loader-prog-txt").text(progressCounter.val.toString().padStart(3, '0'));
            }
        }, "0")
        .fromTo(".loader-img-inner", {scale: 0, opacity: 0}, {
            duration: 0.4,
            scale: 1,
            opacity: 1,
            stagger: 1.4 / $(".loader-img-inner").length,
            ease: "power4",
            onComplete() {
                gsap.to(".loader-counter", {autoAlpha: 1, duration: 0.4, delay: 0.6});
                animateImages();
            }
        }, "0");

    const animateImages = () => {
        let scaleValue, offsetX, offsetY;

        if ($(window).width() > 991) {
            scaleValue = $(window).height() / $(".loader-img-inner").height();
            offsetX = $(window).width() - $(".loader-img-inner").width() - getFontSizeMultiplier(56);
            offsetY = $(window).height() - $(".loader-img-inner").height() - getFontSizeMultiplier(40);
        } else if ($(window).width() > 767) {
            scaleValue = $(window).width() / $(".loader-img-inner").width() * 1.5;
            offsetX = $(window).width() - $(".loader-img-inner").width() - getFontSizeMultiplier(40);
            offsetY = $(window).height() - $(".loader-img-inner").height() - getFontSizeMultiplier(40);
        } else {
            scaleValue = $(window).width() / $(".loader-img-inner").width() * 2;
            offsetX = 0;
            offsetY = $(".home-hero-thumb").get(0).getBoundingClientRect().top - getFontSizeMultiplier(20);
        }


        $(".loader-img-inner").each((index, element) => {
            gsap.timeline({
                onComplete() {
                    $(".main-grid").addClass("loaded");
                    gsap.to(".header", {
                        autoAlpha: 0,
                        duration: 0.8,
                        onComplete: () => {
                            $("#my-video").find("video").get(0).play();
                            $(".loader").remove();
                            $("body.animate-fade").addClass("animated")
                        }
                    });
                }
            })
                .to($(element), {
                    scale: scaleValue / 2,
                    duration: animationSettings.duration / 2,
                    ease: "power4.in",
                    x: offsetX / 2,
                    y: offsetY / 2
                }, animationSettings.itemDelay * index)
                .to($(element), {
                    scale: 1,
                    duration: animationSettings.duration / 2,
                    ease: "power4",
                    x: offsetX,
                    y: offsetY
                }, ">=0");
        });
    };
});