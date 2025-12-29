chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	(async () => {
		try {
			switch (request.action) {
				case "ping": {
					sendResponse({
						success: true,
						message: "pong",
					});
					console.log(
						"Tab is active:",
						request.tabId,
					);

					break;
				}
				case "login": {
					const mobile = request.mobile;
					if (mobile) {
						sendResponse({ success: true });
						const mclick =
							document.querySelector(
								"#mHamburger",
							);
						const mobileMenu =
							document.querySelector(
								"#HBContent",
							);
						if (mclick && !mobileMenu)
							mclick.click();
						const menuLink =
							document.querySelector(
								"#HBSignIn a[role='menuitem']:not([style*='display: none'])",
							);
						const isLoggedIn =
							menuLink &&
							menuLink.href.includes(
								"account.microsoft.com",
							);

						if (
							!isLoggedIn &&
							menuLink &&
							menuLink.href.includes(
								"/fd/auth/signin",
							)
						) {
							await delay(1000);
							menuLink.click();
							console.log(
								"Clicked sign in link",
							);
						} else {
							console.log(
								"User already logged in or no login link",
							);
						}
					} else {
						sendResponse({ success: true });
						const click =
							document.querySelector(
								".b_clickarea",
							);
						const desktopMenu =
							document.querySelector(
								"#rewid-f",
							);
						if (click && !desktopMenu)
							click.click();
					}
					break;
				}

				case "query": {
					const input =
						document.querySelector(
							"#sb_form_q",
						);
					if (
						input &&
						input.value !== request.query
					) {
						sendResponse({ success: true });
						input.value = "";
						for (const char of request.query) {
							input.value += char;
							await delay(
								50 +
								Math.floor(
									Math.random() *
									50,
								),
								true,
							);
						}
					} else {
						sendResponse({ success: true });
					}
					break;
				}

				case "perform": {
					const input =
						document.querySelector(
							"#sb_form_q",
						);

					if (!input) {
						sendResponse({
							success: false,
							message: "Input not found",
						});
						return;
					}

					input.value = request.query;
					input.focus();
					input.dispatchEvent(
						new Event("input", {
							bubbles: true,
						}),
					);

					const form = input.closest("form");
					if (form) {
						await delay(1000);
						form.submit();
						sendResponse({ success: true });
					} else {
						sendResponse({
							success: false,
							message: "Form not found",
						});
					}
					break;
				}

				case "closePopups": {
					const close = document.querySelector(
						".dashboardPopUpPopUpCloseButton",
					);
					if (close) {
						close.click();
					}
					sendResponse({ success: true });
					break;
				}

				default:
					console.warn(
						"Unknown content script action:",
						request.action,
					);
					sendResponse({
						success: false,
						message: "Unknown action.",
					});
					return;
			}
		} catch (err) {
			console.error("Content script action failed:", err);
			sendResponse({ success: false, message: err.message });
		}
	})();
	return true; // Keeps sendResponse alive for async
});

async function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

let config = {
	search: {
		desk: 10,
		mob: 0,
		min: 15,
		max: 30,
	},
	schedule: {
		desk: 0,
		mob: 0,
		min: 15,
		max: 30,
		mode: "m1",
	},
	device: {
		name: "",
		ua: "",
		h: 844,
		w: 390,
		scale: 3,
	},
	control: {
		niche: "random",
		consent: 0,
		clear: 1,
		act: 0,
		log: 0,
	},
	runtime: {
		done: 0,
		total: 0,
		failed: 0,
		running: 0,
		rsaTab: null,
		mobile: 0,
		act: 0,
		pcSearch: 0,
		mobileSearch: 0,
	},
	user: {
		country: "",
		countryCode: "",
		city: "",
	},
	pro: {
		key: "",
		seats: 0,
	},
};

// check if the page is rewards.bing.com
(async () => {
	if (window.location.hostname.includes("rewards.bing.com")) {
		const stored = await get();
		if (stored) {
			Object.assign(config, stored);
		}

		fetch("https://rewards.bing.com/api/getuserinfo")
			.then((response) => {
				if (!response.ok)
					throw new Error(
						"HTTP error " + response.status,
					);
				return response.json();
			})
			.then(async (data) => {
				console.log(data);
				const pcSearch =
					data?.status?.userStatus?.counters
						?.pcSearch[0]?.complete ?? 0;
				const mobileSearch =
					data?.status?.userStatus?.counters
						?.mobileSearch[0]?.complete ?? 0;

				log(
					`Fetched pc: ${pcSearch}, mob: ${mobileSearch}`,
					"update",
				);

				// ✅ Update config.runtime before saving
				config.runtime.pcSearch = pcSearch;
				config.runtime.mobileSearch = mobileSearch;

				await set(config);
			})
			.catch((err) =>
				log("Fetch Error: " + err.message, "error"),
			);
	}
})();

function log(message, type = "default") {
	const colorMap = {
		default: "#555555",
		success: "#48d17e",
		warning: "#f0a500",
		error: "#ff0000",
		update: "#00aaff",
	};
	const color = colorMap[type] || colorMap.default;
	const time = new Date().toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
	console.log(
		`%c[${time}] - [${type.toUpperCase()}] - ${message}`,
		`color: ${color}; font-weight: bold;`,
	);
}

function chromeSet(data) {
	return new Promise((resolve, reject) => {
		chrome.storage.local.set(data, () => {
			if (chrome.runtime.lastError)
				return reject(chrome.runtime.lastError);
			resolve();
		});
	});
}

function chromeGet(keys) {
	return new Promise((resolve, reject) => {
		chrome.storage.local.get(keys, (items) => {
			if (chrome.runtime.lastError)
				return reject(chrome.runtime.lastError);
			resolve(items);
		});
	});
}

async function set(value) {
	const logs = value?.control?.log;
	try {
		await chromeSet({ config: value });
		logs && log("[SET] Config data successfully set.", "success");
	} catch (err) {
		log(`[SET] Failed to set config data: ${err.message}`, "error");
		throw err;
	}
}

async function get() {
	try {
		const { config } = await chromeGet("config");
		const logs = config?.control?.log;
		logs &&
			log(
				"[GET] Config data successfully retrieved.",
				"success",
			);
		return config || null;
	} catch (err) {
		log(
			`[GET] Error retrieving config data: ${err.message}`,
			"error",
		);
		throw err;
	}
}
