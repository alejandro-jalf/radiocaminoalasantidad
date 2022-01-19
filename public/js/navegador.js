window.addEventListener('load', function () {
    const tabHome = document.querySelector("#home");
    const tabAbout = document.querySelector("#about");
    const aNavHome = document.querySelector("#aNavHome");
    const aNavAbout = document.querySelector("#aNavAbout");
    const contentHome = document.querySelector("#contentHome");
    const contentAbout = document.querySelector("#contentAbout");
    const divapp = document.querySelector("#app");
    let haveFocus = "home";

    const changeTab = function(from) {
        haveFocus = from;
        if (haveFocus === 'home') {
            divapp.classList.add("container");
            aNavHome.classList.add("active-nav");
            aNavAbout.classList.remove("active-nav");
            contentAbout.style.display = 'none';
            contentHome.style.display = 'block';
        } else {
            divapp.classList.remove("container");
            aNavHome.classList.remove("active-nav");
            aNavAbout.classList.add("active-nav");
            contentAbout.style.display = "block";
            contentHome.style.display = "none";
        }
    }

    /* tabHome.addEventListener('click', function() {
        changeTab('home');
    });
    tabAbout.addEventListener('click', function() {
        changeTab('about');
    }); */

    changeTab('home');

});
