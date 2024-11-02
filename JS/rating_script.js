document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#search_settings button").addEventListener("click", function() {
        // Get the minimum rating value from the input field
        const minRating = parseFloat(document.querySelector("#min-rating").value);

        // Check if minRating is a valid number
        if (!isNaN(minRating)) {
            // Loop through each title container
            document.querySelectorAll(".title_container").forEach(title => {
                // Get the rating text and extract the number
                const ratingText = title.querySelector(".rating").innerText;
                const ratingValue = parseFloat(ratingText.replace(/[^\d.]/g, ''));

                // Hide or show the title based on the rating
                if (ratingValue < minRating) {
                    title.style.display = "none";  // Hide title
                } else {
                    title.style.display = "block"; // Show title
                }
            });
        }
    });
});
