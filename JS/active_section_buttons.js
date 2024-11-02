(function() {
    document.addEventListener("DOMContentLoaded", function() {
        // Get the current page's path
        const currentPage = document.location.pathname.split("/").pop(); // e.g., "podcast.html"

        // Get all menu links in #title_sections
        const menuLinks = document.querySelectorAll("#title_sections a");

        // Loop through each link and add 'active' class if href matches the current page
        menuLinks.forEach(link => {
            const linkPage = link.getAttribute("href");

            // Check if the link's href matches the current page
            if (linkPage === currentPage) {
                link.classList.add("active");
            }
        });
    });
})();
