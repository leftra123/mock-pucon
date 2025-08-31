# 🌊 Dashboard Hidrológico Río Claro - Pucón

## 📋 Índice de Documentación

Esta documentación está dividida en módulos para facilitar la navegación y comprensión del proyecto.

### 🏗️ **Project Fundamentals**
- [📁 Project Structure](./project-structure.md) - Folder organization and file structure
- [🔧 Configuration](./configuration.md) - Variables, constants and settings
- [📊 Data Types](./data-types.md) - TypeScript interfaces and types

### 🎨 **UI Components**
- [🖼️ Layout & Navigation](./layout-navigation.md) - Header, Sidebar, Layout structure  
- [📈 Charts & Visualization](./charts-visualization.md) - Charts, Gauges, Sparklines
- [🧩 Reusable UI Components](./ui-components.md) - Cards, Tooltips, Buttons, Modals

### 📊 **Data System**
- [🔄 Context & State](./07-contexto-estado.md) - DashboardContext, global state management
- [🎣 Custom Hooks](./08-hooks.md) - Hooks for optimized data handling
- [🛠️ Utilities](./09-utilidades.md) - Helper functions and utilities

### 🗺️ **Special Features**
- [🗺️ Interactive Maps](./10-mapas.md) - Leaflet maps implementation
- [📄 Reports System](./11-reportes.md) - PDF generation and data export
- [🎭 Themes & Styling](./12-temas-estilos.md) - Light/dark theme system

### 🚀 **Development**
- [💻 Development Guide](./development-guide.md) - Architecture, performance and tooling
- [🔍 Debugging & Testing](./14-debugging.md) - Development tools and testing
- [📦 Deployment](./15-deployment.md) - How to deploy the application

### 📚 **Advanced Documentation**
- [🧩 Components Reference](./components-reference.md) - Complete component documentation
- [⚙️ Development Reference](./development-reference.md) - Architecture, testing, performance
- [🏗️ Technical Decisions](./technical-decisions.md) - Technology choices and patterns

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