/*
 * No ES6 to maximize compatibility
 * */

window.site = {
    removeAllStyles: function(source) {
        source.removeAttribute("title");
        console.log("Removed the tooltip from the source:", source);

        var stylesheets = document.querySelectorAll("style, link[rel=stylesheet]");

        console.log("Starting removal of " + stylesheets.length + " stylesheets:");
        for (var i = stylesheets.length - 1; i >= 0; --i) {
            var element = stylesheets[i];
            console.log("Removing", element);
            element.remove();
        }
        console.log("Successfully removed all stylesheets from page.");
    }
};