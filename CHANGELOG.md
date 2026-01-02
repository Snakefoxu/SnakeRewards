# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

## [1.0.3] - 2026-01-02

### 🔧 Corrección Crítica
- **Fix búsquedas móviles**: Restaurada funcionalidad del parche de recuperación
- `cookies: true` en función `clear()` - necesario para el parche
- `config.control.clear = 1` forzado en startup/update
- Botón "Limpiar datos de Bing" eliminado del UI (evita logout accidental)

### 📁 Archivos Modificados
- `js/service.js` - Parche móvil restaurado
- `js/popup.js` - Config clear:1, botón eliminado
- `popup.html` - Botón limpiar eliminado
- `manifest.json` - Versión 1.0.3

---

## [1.0.2] - 2026-01-01

### 🛡️ Mejoras Anti-Detección

#### Delays Humanos
- Delays entre búsquedas aumentados de 5-10s a **10-30s** por defecto
- Límites ajustados: mínimo 10-40s, máximo 15-60s
- Delays base del sistema: 2s/5s/8s (antes 1s/3s/5s)
- Nueva función `gaussianRandom()` para distribución natural

#### Typing 100% Humano
- **Inicio de palabra**: 180-400ms (simulando pensamiento)
- **Mitad de palabra**: 60-200ms (escritura fluida)
- **Fin de palabra/puntuación**: 250-600ms (pausa natural)
- **Micro-pausas aleatorias**: 5% probabilidad de +400-1000ms
- Implementado en `service.js` y `content.js`

#### Anti-Fingerprinting
- `navigator.webdriver` oculto (`undefined`)
- Variables `cdc_*` de Chrome DevTools eliminadas
- Viewport variable ±5px en cada sesión móvil

#### Diccionario de Búsquedas Ampliado
- **+400 nuevas búsquedas** en 6 categorías adicionales
- Nuevas categorías: `gaming`, `sports`, `cooking`, `health`, `news`, `spanish`
- Archivo `queriesExtension.js` fusionado con diccionario original

### 📁 Archivos Modificados
- `js/service.js` - Delays, typing, anti-fingerprint, integración queries
- `js/content.js` - Typing 100% humano
- `js/popup.js` - Límites de delay ajustados
- `js/queriesExtension.js` - **NUEVO** +400 búsquedas en 6 categorías
- `manifest.json` - Versión 1.0.2

### 🔄 Backups Creados
- `js/service.js.bak`
- `js/content.js.bak`
- `js/popup.js.bak`

---

## [1.0.1] - 2025-12-29

### Inicial
- Rebranding a SnakeRewards
- PRO siempre desbloqueado
- Telemetría eliminada
- Tema verde esmeralda
- Iconos personalizados

---

## [1.0.0] - 2025-12-29

### Lanzamiento Inicial
- Fork de Rewards Search Automator
- Automatización de búsquedas PC y móvil
- Programación de búsquedas
- Actividades diarias automáticas
