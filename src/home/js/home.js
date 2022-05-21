$("button").on("click", function () {
    const vButtonAction = $(this).attr("data-home");

    switch (vButtonAction) {
        case "config":
            window.location.href = "../../config/vue/index.html";
            break;
        default:
            location.replace();
            break;
    }
});
