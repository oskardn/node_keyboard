$("button").on("click", function() {
	const vButtonAction = $(this).attr("data-home");

	switch (vButtonAction) {
		case "config":
			window.location.href = "../../config/vue/index.html";
			break;
		case "start":
			window.electronAPI.vStartServer();
			break;
		case "stop":
			window.electronAPI.vStopServer();
			break;
		default:
			return;
			break;
	}
});
