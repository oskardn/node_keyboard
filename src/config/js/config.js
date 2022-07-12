$("button").unbind("click").on("click", function() {
	const buttonAction = $(this).attr("data-config");
	const port = $("#port").val();
	const token = $("#token").val();

	switch (buttonAction) {
		case "port":
            window.apiSikontrol.sendNewPort(port);
			break;
		case "token":
            window.apiSikontrol.sendNewToken(token);
			break;
		case "accueil":
            window.location.href = "../../home/vue/index.html";
			break;
		default:
			return;
			break;
	}
});
