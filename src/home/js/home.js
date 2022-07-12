$("button").unbind("click").on("click", function () {
	const vButtonAction = $(this).attr("data-home");

	switch (vButtonAction) {
		case "config":
			window.location.href = "../../config/vue/index.html";
			break;
		case "start":
			window.apiSikontrol.startServer();
			break;
		case "stop":
			window.apiSikontrol.stopServer();
			break;
		default:
			return;
			break;
	}
});
