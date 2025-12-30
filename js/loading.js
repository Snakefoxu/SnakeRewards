const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get("type");
const map = {
	clear: {
		h1: "Loading AI searches with anti-detection patch",
		h2: "Please wait while we apply the patch. Avoid using any Microsoft services during while using this setting.",
	},
	attach: {
		h1: "Attaching Debugger",
		h2: "Please wait while we attach the Debugger. You may be able to see a notification from the browser that the extension started debugging the browser.",
	},
	simulate: {
		h1: "Switching Simulation Device",
		h2: "Please wait while we switch the simulation device. You may be able to see a notification from the browser that the extension started debugging the browser.",
	},
	detach: {
		h1: "Detaching Simulation Device",
		h2: "Please wait while we detach the Debugger. You may be able to see a notification from the browser that the extension started debugging the browser will be removed.",
	},
	complete: {
		h1: "Completing specified Device searches.",
		h2: "Please wait while we complete the specified Device searches."
	},
	default: {
		h1: "No action specified",
		h2: "Please specify an action to perform.",
	},
};
const patch = map[type];
if (patch) {
	h1.innerText = patch.h1;
	h2.innerText = patch.h2;
} else {
	h1.innerText = map.default.h1;
	h2.innerText = map.default.h2;
}
// get screen width
const screenWidth = screen.width;
if (screenWidth > 720) {
	const scale = screenWidth / 1920;
	document.body.style.setProperty("--scale", scale);
} else {
	const scale = 1;
	document.body.style.setProperty("--scale", scale);
}
