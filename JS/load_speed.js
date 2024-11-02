(function() {
    window.addEventListener("load", function() {
        // Calculate load time
        const loadTime = performance.now(); // Time since navigation started to 'load' event

        // Convert to seconds and round to 2 decimal places
        const loadTimeInSeconds = (loadTime / 1000).toFixed(2);

        // Select the placeholder element in the footer
        const loadTimeElement = document.getElementById("load-time");

        // Set text content with load time info
        loadTimeElement.textContent = `Время загрузки страницы: ${loadTimeInSeconds} секунд`;
    });
})();
