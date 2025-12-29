// SnakeRewards - Utilidades
// Sin telemetría, sin Gumroad, 100% transparente

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
		logs && log("[GET] Config data successfully retrieved.", "success");
		return config || null;
	} catch (err) {
		log(`[GET] Error retrieving config data: ${err.message}`, "error");
		throw err;
	}
}

async function resetRuntime(config) {
	const logs = config?.control?.log;
	try {
		config.runtime.done = 0;
		config.runtime.total = 0;
		config.runtime.failed = 0;
		config.runtime.running = 0;
		config.runtime.rsaTab = null;
		config.runtime.mobile = 0;
		config.runtime.act = 0;
		await set(config);
		logs && log("[RESET RUNTIME] - Runtime reset successfully.", "success");
		return true;
	} catch (error) {
		log(`[RESET RUNTIME] - Error resetting runtime: ${error?.message}`, "error");
		return false;
	}
}

// PRO siempre desbloqueado - Sin verificación de licencia
async function verify(key, config, increment = true) {
	// Siempre retorna true - Todas las funciones PRO desbloqueadas
	log("[VERIFY] - PRO unlocked (SnakeRewards)", "success");
	return true;
}

export { log, set, get, resetRuntime, verify };
