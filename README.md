# 🐍 SnakeRewards

![Version](https://img.shields.io/badge/version-1.0.2-green?style=flat-square)
![Chrome](https://img.shields.io/badge/Chrome-Extension-blue?style=flat-square&logo=googlechrome)
![License](https://img.shields.io/badge/license-MIT-orange?style=flat-square)
![PRO](https://img.shields.io/badge/PRO-Unlocked-gold?style=flat-square)
![Telemetry](https://img.shields.io/badge/telemetry-none-red?style=flat-square)

Extensión de Chrome para automatizar búsquedas en Bing y ganar puntos de Microsoft Rewards.

---

## 🆕 Novedades v1.0.2

> **Anti-Detección + Diccionario Ampliado**

### 🛡️ Anti-Detección
- **Delays humanos**: 10-30s con distribución gaussiana
- **Typing 100% humano**: Velocidad variable, micro-pausas
- **Anti-fingerprint**: `navigator.webdriver` oculto, viewport ±5px

### � Diccionario Ampliado
- **+400 búsquedas nuevas** en 6 categorías
- Nuevas: `gaming`, `sports`, `cooking`, `health`, `news`, `spanish`

---

## ✨ Características

| Feature | Descripción |
|---------|-------------|
| 🖥️ **PC + Móvil** | Simula ambos tipos de dispositivos |
| ⏰ **Programación** | Búsquedas automáticas programadas |
| 🎯 **Actividades** | Completa tareas diarias auto |
| 🛡️ **Anti-Detección** | Delays y typing humanos |
| � **13 Categorías** | Diccionario variado de búsquedas |
| � **Sin Telemetría** | 100% privado, sin anuncios |

---

## 🚀 Instalación

1. Descarga la [última release](https://github.com/Snakefoxu/SnakeRewards/releases/latest)
2. Descomprime el ZIP
3. Abre `chrome://extensions/`
4. Activa **Modo desarrollador**
5. Clic en **Cargar descomprimida**
6. Selecciona la carpeta

---

## ⚙️ Configuración

| Opción | Descripción | Default |
|--------|-------------|---------|
| PC | Búsquedas escritorio | 10 |
| Móvil | Búsquedas móviles | 0 |
| Mín Delay | Tiempo mínimo (s) | 10 |
| Máx Delay | Tiempo máximo (s) | 30 |
| Categoría | Nicho de búsquedas | random |

---

## 📁 Estructura

```
SnakeRewards/
├── css/              # Estilos (tema esmeralda)
├── js/
│   ├── service.js    # Service Worker principal
│   ├── content.js    # Script de contenido
│   ├── popup.js      # Lógica UI
│   ├── queries.js    # Diccionario original
│   └── queriesExtension.js  # +400 queries nuevas
├── logo/             # Iconos personalizados
├── manifest.json     # Configuración v3
└── popup.html        # Interfaz principal
```

---

## ⚠️ Aviso Legal

Esta extensión es solo para **uso personal y educativo**. El uso de herramientas de automatización puede violar los términos de servicio de Microsoft. Úsala bajo tu propia responsabilidad.

---

## 📜 Changelog

Ver [CHANGELOG.md](CHANGELOG.md) para historial completo.

---

## 📜 Licencia

MIT License - Uso libre

---

<p align="center">
  <i>Made with 🐍 by Snake</i>
</p>
