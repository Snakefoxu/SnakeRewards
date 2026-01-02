// SnakeRewards - Popup
// Sin telemetría, sin anuncios, 100% PRO desbloqueado
import "/js/jquery.js";
import { log, set, get, resetRuntime, verify } from "/js/utils.js";
import { devices } from "/js/devices.js";
let config = {
	search: {
		desk: 10,
		mob: 0,
		min: 10,
		max: 30,
	},
	schedule: {
		desk: 0,
		mob: 0,
		min: 10,
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
		key: "UNLOCKED",  // PRO siempre desbloqueado
		seats: 999,
	},
};
const limitsMap = {
	searchDesk: { min: 0, max: [100, 300] },
	searchMob: { min: 0, max: [100, 300] },
	searchMin: { min: 10, max: [40, 600] },
	searchMax: { min: 15, max: [60, 900] },

	scheduleDesk: { min: 0, max: [100, 300] },
	scheduleMob: { min: 0, max: [100, 300] },
	scheduleMin: { min: 10, max: [40, 600] },
	scheduleMax: { min: 15, max: [60, 900] },
};
// PRO siempre activo - Sin anuncios
const $nav = $(".nav");
const $section = $("section");

$nav.on("click", (event) => {
	event.preventDefault();
	if (!config?.control?.consent)
		return log(
			"[NAV] - Consent not given, navigation blocked.",
			"error",
		);
	const logs = config?.control?.log;
	$nav.removeClass("active");
	$(event.currentTarget).addClass("active");
	$section.hide();
	const sectionId = $(event.currentTarget).data("open");
	$(`#${sectionId}`).show();
	logs && log(`[NAV] - Section changed to: ${sectionId}`);
});

// Anuncios eliminados - Extensión limpia

const $searchDesk = $("#searchDesk");
const $searchMob = $("#searchMob");
const $searchMin = $("#searchMin");
const $searchMax = $("#searchMax");
const $searchMode = $("#searchMode");
const $searchModeA = $("#searchMode a");
const $searchTrigger = $("#searchTrigger");

const $scheduleDesk = $("#scheduleDesk");
const $scheduleMob = $("#scheduleMob");
const $scheduleMin = $("#scheduleMin");
const $scheduleMax = $("#scheduleMax");
const $scheduleMode = $("#scheduleMode");
const $scheduleModeA = $("#scheduleMode a");
const $scheduleTrigger = $("#scheduleTrigger");

const $requirePro = $(".pro");

const $menuItem = $(".menuItem");
const $version = $("#version");
const $uuid = $("#uuid");
const $userManual = $("#userManual");
const $deviceName = $("#deviceName");
const $resetDevice = $("#resetDevice");
const $clear = $("#clear");
const $log = $("#log");
const $pro = $("#pro");
const $niche = $("#niche");
const $activity = $("#activity");
const $act = $("#act");

const $simulate = $("#simulate");
const $download = $("#download");
const $delete = $("#delete");
const $runtime = $("#runtime");
const $reset = $("#reset");
const $consent = $("#consent");
const $consentForm = $("#consentForm");
const $accept = $("#accept");

const $progressBar = $(".progressBar");
const $progress = $(".progress:not(.act)");
const $failed = $(".failed");

const $promo = $("#promo");
const $rating = $("#rating");
const $ratingSpan = $("#rating span");
const $footer = $("footer");
//CONFIGURACION BUSQUEDAS
function compare() {
	const logs = config?.control?.log;
	const desk = Number($searchDesk.val());
	const mob = Number($searchMob.val());
	$searchModeA.removeClass("active");
	const modeMap = {
		m1: { desk: 10, mob: 0 },
		m2: { desk: 20, mob: 10 },
		m3: { desk: 30, mob: 20 },
		m4: { desk: 60, mob: 40 },
	};
	for (const [id, val] of Object.entries(modeMap)) {
		if (desk === val.desk && mob === val.mob) {
			$searchMode.find(`a.${id}`).addClass("active");
			logs &&
				log(
					`[COMPARE] - Search mode set to: ${id}`,
					"update",
				);
			config.search.mode = id;
			$searchMode.val(id);
			break;
		}
	}
}

async function resetDevice() {
	const logs = config?.control?.log;
	try {
		const randomDevice =
			devices[Math.floor(Math.random() * devices.length)];
		config.device.name = randomDevice.name;
		config.device.ua = randomDevice.userAgent;
		config.device.h = randomDevice.height;
		config.device.w = randomDevice.width;
		config.device.scale = randomDevice.deviceScaleFactor;
		await set(config);
		logs &&
			log(
				`[RESET] - Device reset to: ${JSON.stringify(
					config.device.name,
				)}`,
				"success",
			);
		return true;
	} catch (error) {
		logs &&
			log(
				`[RESET] - Error resetting device: ${error?.message}`,
				"error",
			);
		return false;
	}
}

async function updateUI() {
	const storedConfig = await get();
	Object.assign(config, storedConfig);
	const logs = config?.control?.log;

	for (const [key, limits] of Object.entries(limitsMap)) {
		const $el = $(`#${key}`);
		$el.attr("min", limits.min);
		$el.attr(
			"max",
			config?.pro?.key ? limits.max[1] : limits.max[0],
		);
	}

	$searchDesk.val(config.search.desk);
	$searchMob.val(config.search.mob);
	$searchMin.val(config.search.min);
	$searchMax.val(config.search.max);
	compare();

	$scheduleDesk.val(config.schedule.desk);
	$scheduleMob.val(config.schedule.mob);
	$scheduleMin.val(config.schedule.min);
	$scheduleMax.val(config.schedule.max);
	$scheduleModeA.removeClass("active");
	$scheduleMode.find(`.${config.schedule.mode}`).addClass("active");

	if (config?.runtime?.running) {
		$searchTrigger.text("Stop");
	} else {
		$searchTrigger.text("Search");
	}

	const { total, done, failed } = config.runtime;
	const success = done - failed || 0;

	const performedPercent = isFinite(done / total)
		? ((done / total) * 100).toFixed(2)
		: "0.00";
	const successPercent = isFinite(success / total)
		? ((success / total) * 100).toFixed(2)
		: "0.00";
	const failedPercent = isFinite(failed / total)
		? ((failed / total) * 100).toFixed(2)
		: "0.00";
	const progressPercent = isFinite((success + failed) / total)
		? (((success + failed) / total) * 100).toFixed(2)
		: "0.00";

	$progressBar
		.parent()
		.attr(
			"title",
			`Total: ${total}, Performed: ${done} - (${performedPercent}%), Success: ${success} - (${successPercent}%), Failed: ${failed} - (${failedPercent}%) - Progress: ${progressPercent}%`,
		);

	$progress.width((success / total) * 100 + "%");
	$failed.width((failed / total) * 100 + "%");

	if (config?.device?.name) {
		$deviceName.text(config.device.name);
	} else {
		await resetDevice();
	}

	if (config?.control?.consent) {
		$consentForm.hide();
		$menuItem.removeClass("noConsent");
	} else {
		$section.hide();
		$consentForm.show();
		$menuItem.addClass("noConsent");
	}

	if (config?.pro?.key) {
		$requirePro.removeClass("noPro");
		$scheduleTrigger.removeClass("noPro");
		$pro.val(config.pro.key);
		if (Math.random() < 0.5) {
			$promo.hide();
			$rating.show();
		} else {
			$footer.hide();
		}
	} else {
		$requirePro.addClass("noPro");
		$scheduleTrigger.addClass("noPro");
		$pro.val("");
		if (Math.random() < 0.5) {
			$promo.show();
			$rating.hide();
		} else {
			$promo.hide();
			$rating.show();
		}
	}

	$clear.prop("checked", config?.control?.clear);
	$log.prop("checked", config?.control?.log);
	$niche.val(config?.control?.niche || "random");
	$act.prop("checked", config?.control?.act ? true : false);
	if (config.runtime.act) {
		$("#activity ~ .progressBar > .progress").addClass("running");
	} else {
		$("#activity ~ .progressBar > .progress").removeClass(
			"running",
		);
	}

	logs && log(`[UPDATE] - UI updated`, "update");
}

async function flashStatus($btn, originalText, result) {
	if (result?.success || result === true) {
		$btn.css("background", "#0072FF").text("Success!");
	} else {
		$btn.css("background", "#FF4D4D").text("Failed!");
	}
	await new Promise((r) => setTimeout(r, 1000));
	$btn.css("background", "").text(originalText);
}

function getBest16by9Rect(screenWidth, screenHeight) {
	const aspectRatio = 16 / 9;
	let widthByHeight = screenHeight * aspectRatio;
	if (widthByHeight <= screenWidth) {
		return {
			width: widthByHeight,
			height: screenHeight,
		};
	} else {
		let heightByWidth = screenWidth / aspectRatio;
		return {
			width: screenWidth,
			height: heightByWidth,
		};
	}
}

const bestRect = getBest16by9Rect(screen.width, screen.height);

$(document).ready(async function () {
	$("section").hide();
	$version.val(chrome.runtime.getManifest().version);
	$userManual.on("click", () => {
		chrome.tabs.create({
			url: "/Rewards Search Automator User Manual.pdf",
		});
	});
	const uuid = await chrome.storage.sync.get("user_stat_uuid");
	if (uuid?.user_stat_uuid) {
		$uuid.val(uuid.user_stat_uuid || "");
	}
	// onclick copy to clipboard
	$uuid.on("click", function () {
		const $this = $(this);
		$this.select();
		document.execCommand("copy");
		log(`[UUID] - Copied UUID: ${$this.val()}`, "success");
	});
	const scale = bestRect.width / 1920;
	$("body").css("--scale", `${scale}`);
	await updateUI();
	$nav.children().first().trigger("click");
	const logs = config?.control?.log;
	logs && log("[INIT] - UI initialized with scale: " + scale, "update");

	$accept.on("click", async () => {
		if (config?.control?.consent) {
			console.log("Consent already given.");
			$nav.children().first().trigger("click");
			return $consentForm.hide();
		}
		console.log("Accepting consent...");
		// SnakeRewards: Simplificado - sin safeBrowsingHelper
		config.control.consent = 1;
		await set(config);
		await updateUI();
		$nav.children().first().trigger("click");
		$("#search").show(); // Forzar mostrar sección de búsqueda
	});

	async function createPro() {
		if (!config?.pro?.key) {
			const tabs = await chrome.tabs.query({});
			const proTab = tabs.find((tab) =>
				tab.url.includes(pro),
			);
			if (proTab) {
				chrome.tabs.update(proTab.id, { active: true });
			} else {
				chrome.tabs.create({
					url: pro,
					active: true,
				});
			}
		}
	}

	$searchDesk.on("change", async function () {
		const { min, max } = limitsMap.searchDesk;
		const maxVal = config?.pro?.key ? max[1] : max[0];
		let val = Number($(this).val());
		if (val == maxVal && !config?.pro?.key) {
			val = maxVal;
			createPro();
		}
		if (isNaN(val)) val = min;
		else val = Math.max(min, Math.min(maxVal, val));
		config.search.desk = val;
		await set(config);
		await updateUI();
	});

	$searchMob.on("change", async function () {
		const { min, max } = limitsMap.searchMob;
		const maxVal = config?.pro?.key ? max[1] : max[0];
		let val = Number($(this).val());
		if (val == maxVal && !config?.pro?.key) {
			val = maxVal;
			createPro();
		}
		if (isNaN(val)) val = min;
		else val = Math.max(min, Math.min(maxVal, val));
		config.search.mob = val;
		await set(config);
		await updateUI();
	});

	$searchMin.on("change", async function () {
		const { min, max } = limitsMap.searchMin;
		const maxVal = config?.pro?.key ? max[1] : max[0];
		let val = Number($(this).val());
		if (val == maxVal && !config?.pro?.key) {
			val = maxVal;
			createPro();
		}
		let range = Number($searchMax.val());
		if (isNaN(val) || val < min) val = min;
		else val = Math.max(min, Math.min(maxVal, val));
		if (range < val * 1.5) {
			range = Math.ceil(val * 1.5);
			config.search.max = range;
		}
		config.search.min = val;
		await set(config);
		await updateUI();
	});

	$searchMax.on("change", async function () {
		const { min, max } = limitsMap.searchMax;
		const maxVal = config?.pro?.key ? max[1] : max[0];
		let val = Number($(this).val());
		if (val == maxVal && !config?.pro?.key) {
			val = maxVal;
			createPro();
		}
		let range = Number($searchMin.val());
		if (isNaN(val) || val < min) val = min;
		else val = Math.max(min, Math.min(maxVal, val));
		if (val < range * 1.5) {
			range = Math.floor(val / 1.5);
			config.search.min = range;
		}
		config.search.max = val;
		await set(config);
		await updateUI();
	});

	$searchModeA.on("click", async function () {
		const mode = $(this).attr("class");
		const modeMap = {
			m1: { desk: 10, mob: 0 },
			m2: { desk: 20, mob: 10 },
			m3: { desk: 30, mob: 20 },
			m4: { desk: 60, mob: 40 },
		};
		if (modeMap[mode]) {
			config.search.desk = modeMap[mode].desk;
			config.search.mob = modeMap[mode].mob;
			await set(config);
			await updateUI();
		}
	});

	$scheduleDesk.on("change", async function () {
		const { min, max } = limitsMap.scheduleDesk;
		const maxVal = config?.pro?.key ? max[1] : max[0];
		let val = Number($(this).val());
		if (val == maxVal && !config?.pro?.key) {
			val = maxVal;
			createPro();
		}
		if (isNaN(val)) val = min;
		else val = Math.max(min, Math.min(maxVal, val));
		config.schedule.desk = val;
		await set(config);
		await updateUI();
	});

	$scheduleMob.on("change", async function () {
		const { min, max } = limitsMap.scheduleMob;
		const maxVal = config?.pro?.key ? max[1] : max[0];
		let val = Number($(this).val());
		if (val == maxVal && !config?.pro?.key) {
			val = maxVal;
			createPro();
		}
		if (isNaN(val)) val = min;
		else val = Math.max(min, Math.min(maxVal, val));
		config.schedule.mob = val;
		await set(config);
		await updateUI();
	});

	$scheduleMin.on("change", async function () {
		const { min, max } = limitsMap.scheduleMin;
		const maxVal = config?.pro?.key ? max[1] : max[0];
		let val = Number($(this).val());
		if (val == maxVal && !config?.pro?.key) {
			val = maxVal;
			createPro();
		}
		let range = Number($scheduleMax.val());
		if (isNaN(val) || val < min) val = min;
		else val = Math.max(min, Math.min(maxVal, val));
		if (range < val * 1.5) {
			range = Math.ceil(val * 1.5);
			config.schedule.max = range;
		}
		config.schedule.min = val;
		await set(config);
		await updateUI();
	});

	$scheduleMax.on("change", async function () {
		const { min, max } = limitsMap.scheduleMax;
		const maxVal = config?.pro?.key ? max[1] : max[0];
		let val = Number($(this).val());
		if (val == maxVal && !config?.pro?.key) {
			val = maxVal;
			createPro();
		}
		let range = Number($scheduleMin.val());
		if (isNaN(val) || val < min) val = min;
		else val = Math.max(min, Math.min(maxVal, val));
		if (val < range * 1.5) {
			range = Math.floor(val / 1.5);
			config.schedule.min = range;
		}
		config.schedule.max = val;
		await set(config);
		await updateUI();
	});

	$scheduleModeA.on("click", async function () {
		if (!config?.pro?.key) {
			chrome.tabs.create({
				url: pro,
				active: true,
			});
			return log(
				"[SCHEDULE] - Pro membership required for this feature.",
				"error",
			);
		}
		const mode = $(this).attr("class");
		// $scheduleModeA.removeClass("active");
		// $(this).addClass("active");
		config.schedule.mode = mode;
		const modeMap = {
			m1: { desk: 0, mob: 0 },
			m2: {
				desk: config?.search?.desk,
				mob: config?.search?.mob,
			},
			m3: { desk: 3, mob: 2 },
			m4: { desk: 5, mob: 3 },
		};
		if (modeMap[mode]) {
			config.schedule.desk = modeMap[mode].desk;
			config.schedule.mob = modeMap[mode].mob;
		}
		if (mode === "m1" || mode === "m2") {
			await chrome.alarms.clear("schedule");
			logs && log(`[SCHEDULE] - Schedule cleared`, "update");
		} else if (mode === "m3") {
			const randomDelay =
				Math.floor(Math.random() * 150) + 300;
			await chrome.alarms.create("schedule", {
				when: Date.now() + randomDelay * 1000,
			});
			const alarmTime = new Date(
				Date.now() + randomDelay * 1000,
			).toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: false,
			});
			logs &&
				log(
					`[SCHEDULE] - Schedule set for: ${alarmTime}`,
					"update",
				);
		} else if (mode === "m4") {
			const randomDelay =
				Math.floor(Math.random() * 150) + 900;
			await chrome.alarms.create("schedule", {
				when: Date.now() + randomDelay * 1000,
			});
			const alarmTime = new Date(
				Date.now() + randomDelay * 1000,
			).toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: false,
			});
			logs &&
				log(
					`[SCHEDULE] - Schedule set for: ${alarmTime}`,
					"update",
				);
		}
		await set(config);
		await updateUI();
	});

	$searchTrigger.on("click", async function () {
		const originalText = $(this).text();
		if (!config?.control?.consent) {
			$consentForm.show();
			return log(
				"[SEARCH] - Consent not given, action blocked.",
				"error",
			);
		}
		if (config?.runtime?.running) {
			const response = await chrome.runtime.sendMessage({
				action: "stop",
			});
			await flashStatus($(this), originalText, response);
			logs &&
				log(
					`[SEARCH] - Search stopped: ${originalText}`,
					"update",
				);
		} else {
			const response = await chrome.runtime.sendMessage({
				action: "start",
			});
			await flashStatus($(this), originalText, response);
			logs &&
				log(
					`[SEARCH] - Search started: ${originalText}`,
					"update",
				);
		}
	});
	$scheduleTrigger.on("click", async function () {
		const originalText = $(this).text();
		if (!config?.control?.consent) {
			$consentForm.show();
			return log(
				"[SCHEDULE] - Consent not given, action blocked.",
				"error",
			);
		}
		if (!config?.pro?.key) {
			chrome.tabs.create({
				url: pro,
				active: true,
			});
			return log(
				"[SCHEDULE] - Pro membership required for this feature.",
				"error",
			);
		}
		if (config?.runtime?.running) {
			const response = await chrome.runtime.sendMessage({
				action: "stop",
			});
			await flashStatus($(this), originalText, response);
			logs &&
				log(
					`[SCHEDULE] - Schedule stopped: ${originalText}`,
					"update",
				);
		} else {
			const response = await chrome.runtime.sendMessage({
				action: "schedule",
			});
			await flashStatus($(this), originalText, response);
			logs &&
				log(
					`[SCHEDULE] - Schedule started: ${originalText}`,
					"update",
				);
		}
	});

	$resetDevice.on("click", async function () {
		await resetDevice();
		logs && log(`[DEVICE] - Device reset`, "update");
	});
	$clear.on("change", async function () {
		config.control.clear = $(this).is(":checked") ? 1 : 0;
		await set(config);
		logs &&
			log(
				`[CONTROL] - Clear browsing data set to: ${config.control.clear}`,
				"update",
			);
	});
	$log.on("change", async function () {
		config.control.log = $(this).is(":checked") ? 1 : 0;
		await set(config);
		logs &&
			log(
				`[CONTROL] - Log enabled: ${config.control.log}`,
				"update",
			);
	});

	$pro.on("change", async function (event) {
		const key = $(this).val().trim();
		if (
			// 	(event.key === "Enter" || event.type === "change") &&
			// 	key === "trial"
			// ) {
			// 	await isTrial(config);
			// } else if (
			(event.key === "Enter" || event.type === "change") &&
			key.length === 35
		) {
			const response = await verify(key, config);
			if (
				response === true ||
				response?.status === "success"
			) {
				logs &&
					log(
						`[PRO] - Key verified successfully: ${key}`,
						"update",
					);
			} else {
				logs &&
					log(
						`[PRO] - Key verification failed: ${key}`,
						"error",
					);
				// PRO siempre activo - no hacer nada
				$(this).val("");
			}
		} else {
			logs &&
				log(
					`[PRO] - PRO always active in SnakeRewards.`,
					"success",
				);
			// PRO siempre activo - no hacer nada
		}
	});
	$niche.on("change", async function () {
		if (!config?.pro?.key) {
			return log(
				"[Niche] - Pro membership required for this feature.",
				"error",
			);
		}
		config.control.niche = $(this).val().trim() || "random";
		await set(config);
		logs &&
			log(
				`[CONTROL] - Niche set to: ${config.control.niche}`,
				"update",
			);
	});
	$activity.on("click", async function () {
		if (!config?.pro?.key) {
			chrome.tabs.create({
				url: pro,
				active: true,
			});
			return log(
				"[ACTIVITY] - Pro membership required for this feature.",
				"error",
			);
		}
		const $btnText = $(this).text();
		const response = await chrome.runtime.sendMessage({
			action: "activity",
		});
		await flashStatus($(this), $btnText, response);
		logs &&
			log(
				`[ACTIVITY] - Activity started: ${response}`,
				"update",
			);
	});
	$act.on("change", async function () {
		if (!config?.pro?.key) {
			chrome.tabs.create({
				url: pro,
				active: true,
			});
			return log(
				"[ACT] - Pro membership required for this feature.",
				"error",
			);
		}
		config.control.act = $(this).is(":checked") ? 1 : 0;
		await set(config);
		logs &&
			log(
				`[CONTROL] - Act set to: ${config.control.act}`,
				"update",
			);
	});

	$simulate.on("click", async function () {
		if (!config?.pro?.key) {
			chrome.tabs.create({
				url: pro,
				active: true,
			});
			return log(
				"[SIMULATE] - Pro membership required for this feature.",
				"error",
			);
		}
		const $btnText = $(this).text();
		const response = await chrome.runtime.sendMessage({
			action: "simulate",
		});
		await flashStatus($(this), $btnText, response);
		logs &&
			log(
				`[SIMULATE] - Simulation started: ${response}`,
				"update",
			);
	});
	$download.on("click", async function () {
		if (!config?.pro?.key) {
			chrome.tabs.create({
				url: pro,
				active: true,
			});
			return log(
				"[DOWNLOAD] - Pro membership required for this feature.",
				"error",
			);
		}
		const $btnText = $(this).text();
		try {
			const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
			const results = await new Promise((resolve) => {
				chrome.history.search(
					{
						text: "bing.com",
						startTime: oneDayAgo,
						maxResults: 1000,
					},
					resolve,
				);
			});
			const blob = new Blob(
				[JSON.stringify(results, null, 2)],
				{
					type: "application/json",
				},
			);
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `[Rewards_Search_Automator]_bing_search_history_${new Date().toISOString()}.json`;
			a.click();
			URL.revokeObjectURL(url);
			a.remove();
			await flashStatus($(this), $btnText, true);
			logs &&
				log(
					`[DOWNLOAD] - Search history downloaded: ${results.length} entries`,
					"update",
				);
		} catch (error) {
			await flashStatus($(this), $btnText, false);
			log(
				`[DOWNLOAD] - Error downloading search history: ${error?.message}`,
				"error",
			);
		}
	});
	$delete.on("click", async function () {
		if (!config?.pro?.key) {
			chrome.tabs.create({
				url: pro,
				active: true,
			});
			return log(
				"[DELETE] - Pro membership required for this feature.",
				"error",
			);
		}
		const $btnText = $(this).text();
		try {
			const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
			const results = await new Promise((resolve) => {
				chrome.history.search(
					{
						text: "bing.com",
						startTime: oneDayAgo,
						maxResults: 1000,
					},
					resolve,
				);
			});
			for (const item of results) {
				await new Promise((resolve) => {
					chrome.history.deleteUrl(
						{ url: item.url },
						resolve,
					);
				});
			}
			await flashStatus($(this), $btnText, true);
			logs &&
				log(
					`[DELETE] - Search history deleted: ${results.length} entries`,
					"update",
				);
		} catch (error) {
			await flashStatus($(this), $btnText, false);
			log(
				`[DELETE] - Error deleting search history: ${error?.message}`,
				"error",
			);
		}
	});
	$runtime.on("click", async function () {
		if (!config?.pro?.key) {
			chrome.tabs.create({
				url: pro,
				active: true,
			});
			return log(
				"[RUNTIME] - Pro membership required for this feature.",
				"error",
			);
		}
		const $btnText = $(this).text();
		const response = await resetRuntime(config);
		await flashStatus($(this), $btnText, response);
		logs &&
			log(
				`[RUNTIME] - Runtime started: ${response}`,
				"update",
			);
	});
	$reset.on("click", async function () {
		if (!config?.pro?.key) {
			chrome.tabs.create({
				url: pro,
				active: true,
			});
			return log(
				"[RESET] - Pro membership required for this feature.",
				"error",
			);
		}
		const $btnText = $(this).text();
		await chrome.storage.local.remove("config");
		await flashStatus($(this), $btnText, true);
		logs && log(`[RESET] - Runtime reset: ${response}`, "update");
		location.reload();
	});
	$consent.on("click", async function () {
		$accept.text("Agreed - Use Extension");
		$section.hide();
		$consentForm.show();
		logs && log(`[CONSENT] - Consent form shown`, "update");
	});

	$ratingSpan.on("click", async function () {
		const $this = $(this);
		const $index = $this.index();
		if ($index > 3) {
			chrome.windows.create({
				url: "https://github.com/Snakefoxu/SnakeRewards",
				type: "popup",
				width: screen.width * 0.7,
				height: screen.height * 0.7,
				top: 100,
				left: 100,
			});
			logs &&
				log(
					`[RATING] - Rating clicked: ${$index + 1
					}`,
					"update",
				);
		} else {
			chrome.windows.create({
				url: "https://github.com/Snakefoxu/SnakeRewards/issues",
				type: "popup",
				width: screen.width * 0.7,
				height: screen.height * 0.7,
				top: 100,
				left: 100,
			});
			logs && log(`[RATING] - Support clicked`, "update");
		}
	});
});

chrome.storage.onChanged.addListener(async (changes, area) => {
	await updateUI();
});
