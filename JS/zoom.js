document.addEventListener("DOMContentLoaded", () => {

    const zoomTriggers = document.querySelectorAll('.zoom-trigger');
    const zoomFactor = 3

    zoomTriggers.forEach(triggerElement => {
        new Drift(triggerElement, {
            paneContainer: document.body,
            inlinePane: false,
            inlineOffsetX: 100*zoomFactor,
            zoomFactor: zoomFactor,
        });
    });
});