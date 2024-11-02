(function() {
    window.addEventListener("load", function() {

        const loadTime = performance.now();

        const loadTimeInSeconds = (loadTime / 1000).toFixed(2);

        const loadTimeElement = document.getElementById("load-time");


        loadTimeElement.textContent = `Время загрузки страницы: ${loadTimeInSeconds} секунд`;
    });
})();
