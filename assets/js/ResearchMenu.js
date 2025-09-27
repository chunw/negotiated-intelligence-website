$( document ).ready(function() {
    const menuItems = document.querySelectorAll(".submenu.desktop .menu-li");
    const iframe = document.querySelector("iframe");
    const MENU_IFRAME_LINK_MAP = {
      "RESEARCH": "flashlight.html",
      "STUDY 01": "dunhuang-manuscripts.html",
      "STUDY 02": "dunhuang-music-reconstruction.html",
      "STUDY 03": "dunhuang-dance-reconstruction.html",
      "STUDY 04": "dunhuang-music-culture.html",
      "STUDY 05": "dunhuang-dance-culture.html",
      "STUDY 06": "buddhist-imagination-of-dance.html",
    };
    menuItems.forEach(item => {
      item.addEventListener("click", e => {
        const targetClicked = e.target;
        console.log(targetClicked)
        menuItems.forEach(item => {
          item.classList.remove("bold");
        });
        targetClicked.classList.add("bold");
        const textClicked = targetClicked.innerText.split(" | ")[0];
        iframe.src = MENU_IFRAME_LINK_MAP[textClicked];
      }, false);
    });
});

