let bLaunch = false;

$("button").unbind("click").on("click", function () {
	const vButtonAction = $(this).attr("data-home");

	switch (vButtonAction) {
		case "config":
			window.location.href = "../../config/vue/index.html";
			break;
		case "start":
			if (bLaunch == false) {
				bLaunch = true;
				window.apiSikontrol.vStopServer();

				$(".stop").prop("disabled, false");
				$(".start").prop("disabled, true");
			}
			break;
		case "stop":
			if (bLaunch == true) {
				bLaunch = false;
				indow.apiSikontrol.vStartServer();

				$(".stop").prop("disabled, true");
				$(".start").prop("disabled, false");
			}
			break;
		default:
			return;
			break;
	}
});
