let nPortJSON;

$.ajax({
    url: "../../../../../config.json",
    async: false,
    dataType: "json",
    success: function (response) {
        nPortJSON = response.APP_PORT;
    },
});

$("button.accueil").on("click", function () {
    window.location.href = "../../home/vue/index.html";
});

$("#nPortButton").unbind("click");
$("#nPortButton").on("click", function () {
    let nPort = $("#nPort").val();

    $.post(`http://localhost:${nPortJSON}/port`, {
        data: nPort,
    });
});

$("#sTokenButton").unbind("click");
$("#sTokenButton").on("click", function () {
    let sToken = $("#sToken").val();

    $.post(`http://localhost:${nPortJSON}/token`, {
        data: sToken,
    });
});
