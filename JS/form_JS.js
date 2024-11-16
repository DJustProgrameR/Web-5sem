document.addEventListener('DOMContentLoaded', () => {
    const filmListNameInput = document.getElementById("filmListName");
    const filmLinkInput = document.getElementById("filmLink");
    const filmLinkElements = document.getElementById("filmLinks");
    const clearButton = document.getElementById("clearButton");
    const addFilmButton = document.getElementById("addFilmButton");

    const resultContainer = document.getElementById("result-container");
    const offerToWatchListButton = document.getElementById("offerToWatchListButton");
    const languageSelect = document.getElementById("language");

    filmLinkInput.addEventListener('change', event => {
        localStorage.setItem("filmLink", event.target.value.trim());
    });

    filmListNameInput.addEventListener('change', event => {
        localStorage.setItem("filmListName", event.target.value.trim());
    });

    languageSelect.addEventListener('change', event => {
        localStorage.setItem("recordLanguage", event.target.value.trim());
    });

    function getFilmLinksInfo() {
        const filmLinks = [];
        for (let item of filmLinkElements.children) {
            const label = item.querySelector('label');

            const linkInfo = {
                value: item.textContent,
                classList: Array.from(label.classList),
            };

            filmLinks.push(linkInfo);
        }

        return filmLinks;
    }

    addFilmButton.addEventListener('click', event => {
        event.preventDefault();
        const filmLink = filmLinkInput.value.trim();
        localStorage.setItem("filmLink", filmLink);

        if (filmLink) {
            displayFilmLinks(filmLink);

            localStorage.setItem("filmLinks", JSON.stringify(getFilmLinksInfo()));
        }
    });

    clearButton.addEventListener('click', event => {
        event.preventDefault();
        clearAll();
    });

    offerToWatchListButton.addEventListener('click', event => {
        event.preventDefault();
        localStorage.removeItem("filmListName");
        localStorage.removeItem("recordLanguage");
        localStorage.removeItem("filmLink");
        localStorage.removeItem("filmLinks");

        const language = languageSelect.value;
        const filmListName = filmListNameInput.value;
        const filmLinksInfo = getFilmLinksInfo();

        const toWatchList = {
            filmListName: filmListName,
            language: language,
            filmLinksInfo: filmLinksInfo,
        }

        localStorage.setItem("toWatchList", JSON.stringify(toWatchList));
        addToWatchList(language, filmListName, filmLinksInfo);
    })

    function displayFilmLinks (FilmLinksContent, classList = "") {
        if (!FilmLinksContent) {
            return;
        }

        const listItem = document.createElement("li");
        const label = document.createElement("label");
        const uniqueId = `feature-${Date.now()}`;
        label.setAttribute('for', uniqueId);
        label.textContent = FilmLinksContent;
        label.classList = classList;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                label.classList.add('strikethrough');

            } else {
                label.classList.remove('strikethrough');
            }

            localStorage.setItem("filmLinks", JSON.stringify(getFilmLinksInfo()));
        });

        listItem.appendChild(label);
        listItem.appendChild(checkbox);

        filmLinkElements.appendChild(listItem);
    }

    function clearAll() {
        filmLinkElements.innerHTML = "";
        filmLinkInput.value = "";
        filmListNameInput.value = "";
        resultContainer.innerHTML = "";

        localStorage.removeItem("filmListName");
        localStorage.removeItem("filmLink");
        localStorage.removeItem("recordLanguage")
        localStorage.removeItem("filmLinks");
        localStorage.removeItem("toWatchList");
    }

   function translate(text, lang) {
       const translations = {
           "Фильм": {
               "ru": "Фильмы к просмотру",
               "en": "Films to watch",
           },
       };

       return translations[text][lang];
   }

    function restoreValue() {
        const savedFilmListName = localStorage.getItem("filmListName");
        const savedRecordLanguage = localStorage.getItem("recordLanguage");
        const savedFilmLink = localStorage.getItem("filmLink");
        const savedFilmLinks = JSON.parse(localStorage.getItem("filmLinks") || "[]");
        const savedToWatchList = JSON.parse(localStorage.getItem("toWatchList") || "{}");

        if (savedFilmListName) {
            filmListNameInput.value = savedFilmListName;
        }

        if (savedRecordLanguage) {
            languageSelect.value = savedRecordLanguage;
        }

        if (savedFilmLink) {
            filmLinkInput.value = savedFilmLink;
        }

        savedFilmLinks.forEach(item => {
            displayFilmLinks(item.value, item.classList);
        });

       if (Object.keys(savedToWatchList).length !== 0) {
           addToWatchList(savedToWatchList.language, savedToWatchList.filmListName, savedToWatchList.filmLinksInfo);
       }
    }

   function addToWatchList(language, filmListName, filmLinksInfo) {
       resultContainer.innerHTML = `<h3>${translate("Фильм", language)}: ${filmListName}</h3>`;
       const toWatchListItems = document.createElement("ul");

       filmLinksInfo.forEach(item => {
           if (!item.classList.includes("strikethrough")) {
               const listItem = document.createElement("li");
               listItem.textContent = item.value;
               toWatchListItems.appendChild(listItem);
           }
       });

       resultContainer.appendChild(toWatchListItems);
   }

    restoreValue();
})