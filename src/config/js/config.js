$("button").unbind("click").on("click", function() {
	const vButtonAction = $(this).attr("data-config");
	const nPort = $("#nPort").val();
	const sToken = $("#sToken").val();

	switch (vButtonAction) {
		case "port":
            window.apiSikontrol.vSendNewPort(nPort);
			break;
		case "token":
            window.apiSikontrol.vSendNewToken(sToken);
			break;
		case "accueil":
            window.location.href = "../../home/vue/index.html";
			break;
		default:
			return;
			break;
	}
});
