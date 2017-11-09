/*
 * Using ES6 because if you don't use a decent and recent browser,
 * you don't deserve the usability improvements this script offers.
 *
 * Also these scripts aren't really a big deal.
 * */

const siteConfig = window.siteConfig;

const unscrambleEmails = within => {
    const elementToTextReplacer = text => element => element.outerHTML = text;

    for (let element of within.querySelectorAll("[data-email-unscramble]")) {
        element.querySelectorAll(".meta-at").forEach(elementToTextReplacer("@"));
        element.querySelectorAll(".meta-dot").forEach(elementToTextReplacer("."));
        element.removeAttribute("title");
        element.removeAttribute("data-email-unscramble");
        element.innerText = element.innerText.trim();
    }
};

/**
 * Automatically selects all text of any element with the attribute `data-handy-select`,
 * where the attribute value is a selector defining which descendants are autoselectable.
 * Upon moving the mouse outside these elements, the seleciton is reset.
 * If there is an ongoing selection somewhere not tagged `data-handy-select`, then nothing happens.
 * */
const registerHandySelect = within => {
    for (let root of within.querySelectorAll("[data-handy-select]")) {
        for (let element of root.querySelectorAll(root.getAttribute("data-handy-select"))) {
            const selectElement = () => {
                if (!siteConfig.handySelect) {
                    return;
                }

                const selection = document.getSelection();

                if (!root.contains(selection.anchorNode) && selection.type === "Range") {
                    return;
                }
                if (element === selection.anchorNode) {
                    return;
                }

                selection.removeAllRanges();
                selection.selectAllChildren(element);
            };
            element.addEventListener("mouseover", selectElement, {passive: true});
            element.addEventListener("selectstart", selectElement, {passive: true});
            element.addEventListener("mouseout", () => {
                const selection = document.getSelection();
                if (root.contains(selection.anchorNode)) {
                    selection.removeAllRanges();
                }
            }, {passive: true});
        }
    }
};

window.addEventListener("load", () => {
    if (siteConfig.unscrambleEmailsOnLoad) {
        unscrambleEmails(document);
    }
    registerHandySelect(document);
});
