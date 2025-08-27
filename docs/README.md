# 🌊 Dashboard Hidrológico Río Claro - Pucón

## 📋 Índice de Documentación

Esta documentación está dividida en módulos para facilitar la navegación y comprensión del proyecto.

### 🏗️ **Estructura General**
- [📁 Estructura del Proyecto](./01-estructura-proyecto.md) - Organización de carpetas y archivos
- [🔧 Configuración](./02-configuracion.md) - Variables, constantes y configuraciones
- [📊 Tipos de Datos](./03-tipos-datos.md) - TypeScript interfaces y tipos

### 🎨 **Componentes de UI**
- [🖼️ Layout y Navegación](./04-layout-navegacion.md) - Header, Sidebar, Layout principal
- [📈 Gráficos y Visualización](./05-graficos-visualizacion.md) - Charts, Gauges, Sparklines
- [🧩 Componentes Reutilizables](./06-componentes-ui.md) - Cards, Tooltips, Botones

### 📊 **Sistema de Datos**
- [🔄 Contexto y Estado](./07-contexto-estado.md) - DashboardContext, manejo de estado global
- [🎣 Hooks Personalizados](./08-hooks.md) - Hooks para datos optimizados
- [🛠️ Utilidades](./09-utilidades.md) - Funciones auxiliares y helpers

### 🗺️ **Funcionalidades Especiales**
- [🗺️ Mapas Interactivos](./10-mapas.md) - Implementación de mapas con Leaflet
- [📄 Sistema de Reportes](./11-reportes.md) - Generación de PDFs y exportación
- [🎭 Temas y Estilos](./12-temas-estilos.md) - Sistema de temas claro/oscuro

### 🚀 **Desarrollo**
- [💻 Guía de Desarrollo](./13-desarrollo.md) - Cómo trabajar con el proyecto
- [🔍 Debugging y Testing](./14-debugging.md) - Herramientas de desarrollo
- [📦 Deployment](./15-deployment.md) - Cómo desplegar la aplicación

---

## 🚀 **Inicio Rápido**

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

3. **Compilar para producción:**
   ```bash
   npm run build
   ```

## 🔧 **Configuración Rápida**

Los valores principales están en `src/config/constants.ts`:
- **Título de la app:** `APP_CONFIG.name`
- **Colores principales:** `VISUAL_CONFIG.colors`
- **Textos de interfaz:** `TEXTOS_INTERFACE`

## 📂 **Estructura Rápida**
```
src/
├── components/     # Componentes React organizados por tipo
├── contexts/       # Context providers (estado global)
├── hooks/         # Custom hooks
├── utils/         # Funciones auxiliares
├── config/        # Configuración centralizada
└── types/         # Tipos TypeScript
```

---
*Documentación generada automáticamente - Última actualización: $(date +"%Y-%m-%d")*