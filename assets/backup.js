
    gsap.registerPlugin(ScrollTrigger);

    // GSAP animation based on scroll progress
    gsap.to(".video-container video", {
    width: () => window.innerWidth,   // Final width (full viewport width)
    height: () => window.innerHeight, // Final height (full viewport height)
    ease: "none",
    scrollTrigger: {
    trigger: ".first-section",
    start: "top top",      // Start the animation as soon as the section enters the viewport
    end: "bottom top",     // End when the bottom of the section leaves the top of the viewport
    scrub: true,           // Makes the animation tied to the scrollbar progress
    onUpdate: self => {
    // Update video size based on the scroll distance
    const progress = self.progress; // Progress is a value between 0 and 1
    const newSize = 300 + (progress * window.innerHeight); // Start size + scroll-based increase
    gsap.set(".video-container video", {width: newSize + "px", height: newSize + "px"});
}
}
});