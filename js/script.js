let bodyElement = document.querySelector("body");
let headerMenu = document.querySelector(".header__menu");

if (headerMenu) {
    headerMenu.addEventListener("click", () => {
        headerMenu.classList.toggle("opened");

        headerMenu.querySelector(".text").innerHTML = headerMenu.classList.contains("opened") ? "Закрыть" : "Меню";

        let menuPopup = document.querySelector(".popups .popup-menu");

        if (menuPopup) {
            if (!menuPopup.classList.contains("show")) {
                checkOpenedPopups("popup-menu");
            }

            menuPopup.classList.toggle("show");
            bodyElement.classList.toggle("stop-scroll");
        }
    });
}

let headerSearches = document.querySelectorAll(".header__search");
let searchPopupClose = document.querySelector(".popup-search .search__close");

if (headerSearches && searchPopupClose) {
    [...headerSearches, searchPopupClose].forEach((headerSearch) => {
        headerSearch.addEventListener("click", () => {
            let menuPopup = document.querySelector(".popups .popup-search");

            if (menuPopup) {
                if (!menuPopup.classList.contains("show")) {
                    checkOpenedPopups("popup-search");
                }

                menuPopup.classList.toggle("show");
                bodyElement.classList.toggle("stop-scroll");
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach((accordion) => {
        const head = accordion.querySelector(".accordion-head");

        head.addEventListener("click", () => {
            const accordionBody = accordion.querySelector(".accordion-body");
            const dataAccordion = accordion.getAttribute("data-accordion");

            if (dataAccordion) {
                const groupAccordions = document.querySelectorAll(`.accordion[data-accordion="${dataAccordion}"]`);
                groupAccordions.forEach((groupAccordion) => {
                    const groupBody = groupAccordion.querySelector(".accordion-body");
                    if (groupAccordion !== accordion) {
                        groupAccordion.classList.remove("active");
                        groupBody.style.maxHeight = null;
                    }
                });
            }

            if (accordion.classList.contains("active")) {
                accordion.classList.remove("active");
                accordionBody.style.maxHeight = null;
            } else {
                accordion.classList.add("active");
                accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
            }
        });
    });
});

let menuListItems = document.querySelectorAll(".popup-menu .menu__list .list-item");

if (menuListItems) {
    menuListItems.forEach((menuListItem) => {
        menuListItem.addEventListener("mouseover", () => {
            menuListItems.forEach((element) => {
                element.classList.remove("active");
            });

            menuListItem.classList.add("active");
            let hasChildren = menuListItem.hasAttribute("data-item");

            document.querySelectorAll(`.popup-menu .menu__items`).forEach((element) => {
                element.classList.remove("active");
            });

            if (hasChildren) {
                let menuItems = document
                    .querySelector(`.popup-menu .menu__items[data-item='${menuListItem.getAttribute("data-item")}']`)
                    .classList.add("active");
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu__items");
    const rightColumn = document.querySelector(".menu__col.right");

    function moveMenuItems() {
        const windowWidth = window.innerWidth;

        menuItems.forEach((menu) => {
            const dataItem = menu.getAttribute("data-item");
            const correspondingListItem = document.querySelector(`.list-item[data-item="${dataItem}"]`);

            if (windowWidth <= 650) {
                if (correspondingListItem && !correspondingListItem.contains(menu)) {
                    correspondingListItem.appendChild(menu);
                }
            } else {
                if (menu.parentNode !== rightColumn) {
                    rightColumn.appendChild(menu);
                }
            }
        });
    }

    moveMenuItems();

    window.addEventListener("resize", moveMenuItems);
});

document.addEventListener("DOMContentLoaded", () => {
    const selects = document.querySelectorAll(".select-custom");

    const formatSquareMeters = (text) => {
        return text.replace(/м2/g, `<span class="lighter">м<span class="upper-num">2</span></span>`);
    };

    selects.forEach((selectCustom) => {
        const nativeSelect = selectCustom.querySelector("select");
        const placeholder = nativeSelect.querySelector('[data-role="placeholder"]').innerHTML;

        const selectHead = document.createElement("div");
        selectHead.className = "select-head";
        selectHead.innerHTML = `
            <div class="text">${placeholder}</div>
            <div class="arrow"></div>
        `;

        const selectBody = document.createElement("div");
        selectBody.className = "select-body";
        const bodyWrap = document.createElement("div");
        bodyWrap.className = "body-wrap";

        nativeSelect.querySelectorAll("option").forEach((option) => {
            if (!option.hasAttribute("data-role")) {
                const bodyItem = document.createElement("div");
                bodyItem.className = "body-item";

                const formattedText = formatSquareMeters(option.innerHTML);

                bodyItem.innerHTML = formattedText;
                bodyItem.dataset.value = option.value;

                bodyItem.addEventListener("click", () => {
                    selectHead.querySelector(".text").innerHTML = formattedText;

                    nativeSelect.value = option.value;
                    nativeSelect.querySelectorAll("option").forEach((opt) => {
                        opt.removeAttribute("selected");
                    });
                    option.setAttribute("selected", "selected");

                    selectBody.querySelectorAll(".body-item").forEach((item) => {
                        item.classList.remove("selected");
                    });
                    bodyItem.classList.add("selected");

                    selectCustom.classList.remove("open");
                });

                bodyWrap.appendChild(bodyItem);
            }
        });

        selectBody.appendChild(bodyWrap);

        selectCustom.appendChild(selectHead);
        selectCustom.appendChild(selectBody);

        selectHead.addEventListener("click", () => {
            selectCustom.classList.toggle("open");
        });

        document.addEventListener("click", (event) => {
            if (!selectCustom.contains(event.target)) {
                selectCustom.classList.remove("open");
            }
        });

        nativeSelect.addEventListener("change", () => {
            const selectedValue = nativeSelect.value;
            selectBody.querySelectorAll(".body-item").forEach((item) => {
                item.classList.toggle("selected", item.dataset.value === selectedValue);
            });
            const selectedOption = nativeSelect.querySelector("option[selected]");
            if (selectedOption) {
                const formattedText = formatSquareMeters(selectedOption.innerHTML);
                selectHead.querySelector(".text").innerHTML = formattedText;
            }
        });
    });
});

function checkOpenedPopups(exceptFor) {
    let popups = document.querySelectorAll(".popups .popup-item");

    if (popups) {
        popups.forEach((popup) => {
            if (
                popup.classList.contains("show") &&
                popup.classList.contains("popup-menu") &&
                exceptFor !== "popup-menu"
            ) {
                headerMenu.classList.toggle("opened");

                headerMenu.querySelector(".text").innerHTML = headerMenu.classList.contains("opened")
                    ? "Закрыть"
                    : "Меню";
            }

            popup.classList.remove("show");
        });

        bodyElement.classList.remove("stop-scroll");
    }
}
