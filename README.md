# 🐍 SnakeRewards

🌐 **Language / Idioma:** **English** | [Español](README_ES.md)

![Version](https://img.shields.io/badge/version-1.0.2-green?style=flat-square)
![Downloads](https://img.shields.io/github/downloads/Snakefoxu/SnakeRewards/total?style=flat-square&color=blue)
![Chrome](https://img.shields.io/badge/Chrome-Extension-blue?style=flat-square&logo=googlechrome)
![License](https://img.shields.io/badge/license-MIT-orange?style=flat-square)
![PRO](https://img.shields.io/badge/PRO-Unlocked-gold?style=flat-square)
![Telemetry](https://img.shields.io/badge/telemetry-none-red?style=flat-square)

Chrome extension to automate Bing searches and earn Microsoft Rewards points.

---

## 🆕 What's New in v1.0.2

> **Anti-Detection + Extended Dictionary**

### 🛡️ Anti-Detection
- **Human-like delays**: 10-30s with Gaussian distribution
- **100% human typing**: Variable speed, micro-pauses
- **Anti-fingerprint**: Hidden `navigator.webdriver`, viewport ±5px

### 📚 Extended Dictionary
- **+400 new searches** across 6 categories
- New categories: `gaming`, `sports`, `cooking`, `health`, `news`, `spanish`

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🖥️ **PC + Mobile** | Simulates both device types |
| ⏰ **Scheduling** | Automatic scheduled searches |
| 🎯 **Activities** | Auto-completes daily tasks |
| 🛡️ **Anti-Detection** | Human-like delays and typing |
| 📚 **13 Categories** | Varied search dictionary |
| 🔒 **No Telemetry** | 100% private, no ads |

---

## 🚀 Installation

1. Download the [latest release](https://github.com/Snakefoxu/SnakeRewards/releases/latest)
2. Extract the ZIP
3. Open `chrome://extensions/`
4. Enable **Developer mode**
5. Click **Load unpacked**
6. Select the folder

---

## ⚙️ Configuration

| Option | Description | Default |
|--------|-------------|---------|
| PC | Desktop searches | 10 |
| Mobile | Mobile searches | 0 |
| Min Delay | Minimum time (s) | 10 |
| Max Delay | Maximum time (s) | 30 |
| Category | Search niche | random |

---

## 📁 Structure

```
SnakeRewards/
├── css/              # Styles (emerald theme)
├── js/
│   ├── service.js    # Main Service Worker
│   ├── content.js    # Content script
│   ├── popup.js      # UI logic
│   ├── queries.js    # Original dictionary
│   └── queriesExtension.js  # +400 new queries
├── logo/             # Custom icons
├── manifest.json     # v3 configuration
└── popup.html        # Main interface
```

---

## ⚠️ Legal Notice

This extension is for **personal and educational use only**. Using automation tools may violate Microsoft's Terms of Service. Use at your own risk.

---

## 🔒 Security & Permissions

### `debugger` Permission

This extension requires Chrome's `debugger` permission. Here's why:

| Purpose | Details |
|---------|---------|
| **Human-like typing simulation** | Injects realistic keyboard events via Chrome DevTools Protocol |
| **Detection evasion** | Simulated events are indistinguishable from real actions |
| **Precise control** | Enables natural delays and pauses between characters |

### ⚠️ Security Implications

> **IMPORTANT:** The `debugger` permission is very powerful. This extension:
> - ✅ ONLY interacts with `*.bing.com` and `*.microsoft.com` pages
> - ✅ Does NOT collect personal data or telemetry
> - ✅ 100% open source code for auditing
> - ❌ Does NOT access other tabs or pages

### Other Permissions

| Permission | Usage |
|------------|-------|
| `tabs` | Open/close search tabs |
| `storage` | Save configuration locally |
| `alarms` | Schedule automatic searches |
| `browsingData` | Clear session cookies (optional) |
| `webNavigation` | Detect page loads |

---

## 📜 Changelog

See [CHANGELOG.md](CHANGELOG.md) for full history.

---

## 📜 License

MIT License - Free to use

---

<p align="center">
  <i>Made with 🐍 by Snake</i>
</p>
