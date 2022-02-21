menuService();
yearService();

function menuService() {
    const nav = document.querySelector("#header ._fl-menu");
    const toggle = document.querySelectorAll("._fl-menu .toggle");

    for (const element of toggle) {
        element.addEventListener("click", function () {
            nav.classList.toggle("show");
        });
    }

    const links = document.querySelectorAll("nav ul li a");

    for (const link of links) {
        link.addEventListener("click", function () {
            nav.classList.remove("show");
        });
    }
}

function yearService() {
    const year = document.getElementById("copyright");
    const yearCurrent = new Date();

    year.innerHTML = yearCurrent.getFullYear();
}
