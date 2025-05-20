const bodyElement = document.querySelector("body");
const headerMenu = document.querySelector(".header__menu");

// скрипт для попапа меню в шапке
document.addEventListener("DOMContentLoaded", () => {
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
});

// скрипт для попапа поиска в шапке
document.addEventListener("DOMContentLoaded", () => {
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
});

// скрипт для аккордиона
document.addEventListener("DOMContentLoaded", () => {
    const accordions = document.querySelectorAll(".d-accordion");

    accordions.forEach((accordion) => {
        const head = accordion.querySelector(".accordion-head");
        const arrow = head.querySelector(".arrow");
        let isHovered = false;

        head.addEventListener("click", () => {
            const accordionBody = accordion.querySelector(".accordion-body");
            const dataAccordion = accordion.getAttribute("data-accordion");

            if (dataAccordion) {
                const groupAccordions = document.querySelectorAll(`.d-accordion[data-accordion="${dataAccordion}"]`);
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

        if (!arrow) {
            head.addEventListener("mouseenter", () => {
                const accordionBody = accordion.querySelector(".accordion-body");
                const dataAccordion = accordion.getAttribute("data-accordion");

                if (dataAccordion) {
                    const groupAccordions = document.querySelectorAll(
                        `.d-accordion[data-accordion="${dataAccordion}"]`
                    );
                    groupAccordions.forEach((groupAccordion) => {
                        const groupBody = groupAccordion.querySelector(".accordion-body");
                        if (groupAccordion !== accordion) {
                            groupAccordion.classList.remove("active");
                            groupBody.style.maxHeight = null;
                        }
                    });
                }

                if (!isHovered) {
                    accordion.classList.add("active");
                    accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
                    isHovered = true;
                }
            });

            head.addEventListener("mouseleave", () => {});
        }

        if (!arrow) {
            const dataAccordion = accordion.getAttribute("data-accordion");

            if (dataAccordion) {
                const groupAccordions = document.querySelectorAll(`.d-accordion[data-accordion="${dataAccordion}"]`);
                groupAccordions.forEach((groupAccordion) => {
                    groupAccordion.addEventListener("mouseenter", () => {
                        if (accordion !== groupAccordion && isHovered) {
                            const accordionBody = accordion.querySelector(".accordion-body");
                            accordion.classList.remove("active");
                            accordionBody.style.maxHeight = null;
                            isHovered = false;

                            const newAccordionBody = groupAccordion.querySelector(".accordion-body");
                            groupAccordion.classList.add("active");
                            newAccordionBody.style.maxHeight = newAccordionBody.scrollHeight + "px";
                            isHovered = true;
                        }
                    });
                });
            }
        }
    });
});

// скрипт для пунктов меню в шапке
document.addEventListener("DOMContentLoaded", () => {
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
                        .querySelector(
                            `.popup-menu .menu__items[data-item='${menuListItem.getAttribute("data-item")}']`
                        )
                        .classList.add("active");
                }
            });
        });
    }
});

// скрипт для пунктов меню в шапке на мобилке
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

// скрипт для селекта в поиске в шапке
document.addEventListener("DOMContentLoaded", () => {
    const selects = document.querySelectorAll(".d-select");

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

// функция для закрытия попапов (меню и поиск в шапке)
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

// слайдер с другими объектами на карточке объекта
document.addEventListener("DOMContentLoaded", () => {
    if ($(".other-objects")) {
        $(".other-objects .objects__slider").slick({
            arrows: false,
            variableWidth: true,
        });
    }

    if ($(".popup-object-card")) {
        $(".popup-object-card .screen-slider").slick({
            prevArrow: $("#screen-slide-prev"),
            nextArrow: $("#screen-slide-next"),
            slidesToShow: 1,
            slidesToScroll: 1,
        });
    }
});

// общий скрипт для попапов
document.addEventListener("DOMContentLoaded", () => {
    let popuped = document.querySelectorAll(".popuped");

    popuped.forEach((elementToClick) => {
        elementToClick.addEventListener("click", () => {
            let targetPopup = elementToClick.getAttribute("data-popup");

            document.querySelector("." + targetPopup).classList.toggle("show");

            const hasShowClass = Array.from(document.querySelectorAll(".popup-item")).some((element) =>
                element.classList.contains("show")
            );

            if (hasShowClass) {
                bodyElement.classList.add("stop-scroll");
            } else {
                bodyElement.classList.remove("stop-scroll");
            }
        });
    });
});

// скрипт для показа карточек в аккордионе по клику на "Показать больше"
document.addEventListener("DOMContentLoaded", () => {
    let showMore = document.querySelectorAll(".d-accordion .cards__more");

    showMore.forEach((element) => {
        element.addEventListener("click", () => {
            let items = element.closest(".body-cards");

            items.classList.toggle("show-all");
        });
    });
});

// скрипт для слайдеров изображений
document.addEventListener("DOMContentLoaded", () => {
    $(".popup-images .slider-for .items").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $("#popup-images-slide-prev"),
        nextArrow: $("#popup-images-slide-next"),
        fade: true,
        asNavFor: ".popup-images .slider-nav",
        draggable: true,
    });
    $(".popup-images .slider-nav").slick({
        slidesToScroll: 1,
        slidesToShow: 1,
        asNavFor: ".popup-images .slider-for .items",
        arrows: false,
        dots: false,
        focusOnSelect: true,
        variableWidth: true,
    });
});

// скрипт для изменения высоты адреса в блоке с карточками помещений на мобильной версии
document.addEventListener("DOMContentLoaded", function () {
    function setMaxAddressHeight() {
        const container = document.querySelector(".cards__items");
        const rows = Array.from(container.children);

        let currentRow = [];
        let lastOffsetTop = -1;
        let rowsWithAddresses = [];

        rows.forEach((row) => {
            if (row.offsetTop === lastOffsetTop || lastOffsetTop === -1) {
                currentRow.push(row);
            } else {
                rowsWithAddresses.push(currentRow);
                currentRow = [row];
            }
            lastOffsetTop = row.offsetTop;
        });

        if (currentRow.length > 0) {
            rowsWithAddresses.push(currentRow);
        }

        rowsWithAddresses.forEach((row) => {
            let maxHeight = 0;

            row.forEach((card) => {
                const address = card.querySelector(".info-lower .item__address");
                if (address) {
                    maxHeight = Math.max(maxHeight, address.offsetHeight);
                }
            });

            maxHeight = Math.max(maxHeight, 42);

            row.forEach((card) => {
                const address = card.querySelector(".info-lower .item__address");
                if (address) {
                    address.style.minHeight = `${maxHeight}px`;
                }
            });
        });
    }

    setMaxAddressHeight();
    window.addEventListener("resize", setMaxAddressHeight);
});

// скрипт для маска в инпуте типа телефон
document.addEventListener("DOMContentLoaded", function () {
    const telInputs = document.querySelectorAll("input[type='tel']");

    telInputs.forEach((input) => {
        const placeholder = input.getAttribute("placeholder").replace(/[^\d_+() -]/g, "");
        const staticDigits = placeholder.replace(/[^\d]/g, "");

        input.addEventListener("focus", function () {
            if (!input.value) input.value = placeholder;
        });

        input.addEventListener("input", function (e) {
            let rawInput = input.value.replace(/[^\d]/g, "");
            let userInput = rawInput.replace(new RegExp("^" + staticDigits), "");
            let formatted = "";
            let numIndex = 0;

            for (let i = 0; i < placeholder.length; i++) {
                if (placeholder[i] === "_") {
                    formatted += numIndex < userInput.length ? userInput[numIndex] : "_";
                    if (numIndex < userInput.length) numIndex++;
                } else {
                    formatted += placeholder[i];
                }
            }

            input.value = formatted;

            if (!userInput.length) input.value = "";
        });

        input.addEventListener("keydown", function (e) {
            if (e.key === "Backspace" || e.key === "Delete") {
                let cursorPos = input.selectionStart;
                let value = input.value.split("");

                while (cursorPos > 0) {
                    cursorPos--;
                    if (placeholder[cursorPos] === "_") {
                        value[cursorPos] = "_";
                        input.value = value.join("");
                        input.setSelectionRange(cursorPos, cursorPos);
                        e.preventDefault();
                        break;
                    }
                }
            }
        });

        input.addEventListener("blur", function () {
            let hasDigits = /\d/.test(input.value);
            if (!hasDigits) input.value = "";
        });
    });
});

// сксрипт для шапки при скролле
window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");

    if (window.scrollY >= 98) {
        header.classList.add("header-scroll");
    } else {
        header.classList.remove("header-scroll");
    }
});

// скрипт для печати попапа карточки
function printPopupAsImage(popupSelector) {
    const popupBody = document.querySelector(`${popupSelector} .body`);
    if (!popupBody) {
        console.error("Не найден элемент для скриншота");
        return;
    }

    popupBody.classList.add("print-hide");

    html2canvas(popupBody).then(function (canvas) {
        var imgData = canvas.toDataURL("image/png");

        popupBody.classList.remove("print-hide");

        let printWindow = window.open("", "_blank");
        printWindow.document.write(`
            <html>
            <head>
                <title>PDF Export</title>
                <style>
                    @media print {
                        body {
                            margin: 0;
                            padding: 0;
                        }
                        img {
                            width: 100%;
                            display: block;
                            page-break-before: avoid;
                        }
                    }
                </style>
            </head>
            <body onload="window.print(); window.close();">
                <img src="${imgData}" style="width:100%;" crossorigin="anonymous">
            </body>
            </html>
        `);

        printWindow.document.close();
    });
}
