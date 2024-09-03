const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;")
});

document.addEventListener('click', e => {
    cursor.classList.add("expand");
    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500);
});


document.addEventListener('DOMContentLoaded', function () {
    try {
        // Initialize custom selects
        document.querySelectorAll('.custom-select').forEach(customSelect => {
            const selectTitle = customSelect.querySelector('.title');
            const itemWrapper = customSelect.querySelector('.itemWrapper');
            const selectOptions = customSelect.nextElementSibling;

            // Ensure elements exist
            if (!selectTitle || !itemWrapper || !selectOptions) {
                console.error('Required elements for custom select not found.');
                return;
            }

            // Toggle dropdown open/close with smooth transition
            selectTitle.addEventListener('click', function (event) {
                try {
                    event.stopPropagation();
                    itemWrapper.classList.toggle('show');
                } catch (error) {
                    console.error('Error while toggling dropdown:', error);
                }
            });

            // Close dropdown when clicking outside of it
            document.addEventListener('click', function (event) {
                try {
                    if (!selectTitle.contains(event.target) && !itemWrapper.contains(event.target)) {
                        itemWrapper.classList.remove('show');
                    }
                } catch (error) {
                    console.error('Error while closing dropdown:', error);
                }
            });

            // Handle pills for selected options
            itemWrapper.querySelectorAll('.form-check-input').forEach(checkbox => {
                checkbox.addEventListener('change', function () {
                    try {
                        const value = checkbox.value;

                        if (checkbox.checked) {
                            // Add pill
                            const pill = document.createElement('div');
                            pill.className = 'pill';
                            pill.innerHTML = `${value} <span>&times;</span>`;
                            pill.querySelector('span').addEventListener('click', () => removePill(value));
                            selectOptions.appendChild(pill);
                        } else {
                            // Remove pill
                            removePill(value);
                        }
                    } catch (error) {
                        console.error('Error while handling pill creation/removal:', error);
                    }
                });
            });

            // Remove pill function
            function removePill(value) {
                try {
                    // Find and remove the pill
                    const pills = selectOptions.querySelectorAll('.pill');
                    pills.forEach(pill => {
                        if (pill.textContent.includes(value)) {
                            pill.remove();
                        }
                    });

                    // Uncheck the corresponding checkbox
                    const checkboxes = itemWrapper.querySelectorAll('.form-check-input');
                    checkboxes.forEach(checkbox => {
                        if (checkbox.value === value) {
                            checkbox.checked = false;
                        }
                    });
                } catch (error) {
                    console.error('Error while removing pill or unchecking checkbox:', error);
                }
            }
        });
    } catch (error) {
        console.error('Error initializing custom selects:', error);
    }
});


$(document).ready(function () {
    // Set initial position of the ball
    gsap.set(".ball", {xPercent: -50, yPercent: -50});

    // QuickTo tweens for smoother mouse tracking
    let xTo = gsap.quickTo(".ball", "x", {duration: 0.6, ease: "power3"}),
        yTo = gsap.quickTo(".ball", "y", {duration: 0.6, ease: "power3"});

    // Mousemove event for ball animation
    $(window).on("mousemove", function (e) {
        xTo(e.clientX);
        yTo(e.clientY);
    });

    // Hide linkWrapper initially
    $(".linkWrapper").hide(500);

    // Toggle linkWrapper on hamburger click
    $("#hamburger").on("click", function () {
        $("#wrapper").toggle();
        $(".linkWrapper").toggle(500);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Initialize ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    function createScrollTrigger(trigger, start, end, onEnterCallback, onLeaveBackCallback) {
        ScrollTrigger.create({
            scroller: ".scroller-grid",
            trigger: trigger,
            start: start,
            end: end,
            // markers: true,
            onEnter: onEnterCallback,
            onLeaveBack: onLeaveBackCallback
        });
    }

    // First ScrollTrigger
    createScrollTrigger(
        ".third-section",
        "top 10%",
        "bottom 50%",
        () => document.body.classList.add("change-body-color"),
        () => document.body.classList.remove("change-body-color")
    );

    // Second ScrollTrigger
    createScrollTrigger(
        ".ctaWrapper",
        "top 0",
        "bottom 50%",
        () => document.body.classList.remove("change-body-color"),
        () => document.body.classList.add("change-body-color")
    );
});
