document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#search_settings button").addEventListener("click", function() {

        const minRating = parseFloat(document.querySelector("#min-rating").value);


        if (!isNaN(minRating)) {

            document.querySelectorAll(".title_container").forEach(title => {

                const ratingText = title.querySelector(".rating").innerText;
                const ratingValue = parseFloat(ratingText.replace(/[^\d.]/g, ''));


                if (ratingValue < minRating) {
                    title.style.display = "none";
                } else {
                    title.style.display = "block";
                }
            });
        }
    });
});
