(function() {
    document.addEventListener("DOMContentLoaded", function() {

        const currentPage = document.location.pathname.split("/").pop();

        const menuLinks = document.querySelectorAll("#title_sections a");


        menuLinks.forEach(link => {
            const linkPage = link.getAttribute("href");


            if (linkPage === currentPage) {
                link.classList.add("active");
            }
        });
    });
})();
