# 🖼️ Layout y Navegación

## 📍 **Ubicación de Archivos**

```
src/components/layout/
├── Layout.tsx          # 🎯 Layout principal - contenedor general
├── Header.tsx          # Barra superior con usuario y tema
├── Sidebar.tsx         # Barra lateral de navegación
├── MainContent.tsx     # Área de contenido principal
└── LazyComponents.tsx  # Componentes con carga lazy
```

## 🏗️ **Layout.tsx - Contenedor Principal**

### Estructura
```typescript
const Layout: React.FC = () => {
  return (
    <div className="relative bg-gray-50 dark:bg-slate-900 min-h-screen">
      {/* Fondo con gradientes */}
      <div className="absolute inset-0">
        <div className="bg-gradient-radial from-cyan-50/30..." />
        <div className="opacity-[0.02]" style={{backgroundImage: '...'}} />
      </div>
      
      {/* Contenido principal */}
      <div className="relative flex z-10">
        <Sidebar />
        <main className="flex-1">
          <Header />
          <MainContent />
        </main>
      </div>
    </div>
  );
};
```

### Características
- **Fondo animado:** Gradientes y patrones diferentes para tema claro/oscuro
- **Layout flex:** Sidebar fijo + contenido principal responsivo
- **Z-index:** Control de capas para modales y tooltips

## 🏠 **Header.tsx - Barra Superior**

### Elementos Principales
```typescript
const Header = () => (
  <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
    <div className="flex items-center justify-between">
      {/* Título e información del proyecto */}
      <div>
        <h1>{APP_CONFIG.name}</h1>
        <p>{APP_CONFIG.description}</p>
      </div>
      
      {/* Controles del usuario */}
      <div className="flex items-center gap-4">
        <ThemeSwitcher theme={theme} setTheme={setTheme} />
        <UserMenu user={USER_CONFIG.defaultUser} />
      </div>
    </div>
  </header>
);
```

### Componentes Incluidos
- **ThemeSwitcher:** Selector de tema (claro/oscuro/sistema)
- **UserMenu:** Menú desplegable del usuario
- **Información del proyecto:** Título y descripción

## 🧭 **Sidebar.tsx - Navegación Lateral**

### Estructura de Navegación
```typescript
const Sidebar = () => {
  const { selectedMetric, isAsideCollapsed, showReportsPanel } = state;
  
  return (
    <aside className={`${isAsideCollapsed ? 'w-16' : 'w-20 lg:w-64'}`}>
      {/* Header con logo */}
      <div className="flex items-center">
        <Waves className="text-cyan-500" />
        <h1>Variables</h1>
        <button onClick={toggleCollapse}>
          {isAsideCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
      
      {/* Navegación de métricas */}
      <nav>
        {metrics.map(metric => (
          <button 
            onClick={() => setMetric(metric)}
            className={selectedMetric === metric ? 'bg-cyan-500/10' : ''}
          >
            <Icon />
            <span>{metricInfo.nombre}</span>
          </button>
        ))}
      </nav>
      
      {/* Botón de reportes */}
      <button 
        onClick={toggleReports}
        className={showReportsPanel ? 'bg-cyan-500/10' : ''}
      >
        <FileText />
        <span>Reportes</span>
      </button>
    </aside>
  );
};
```

### Estados del Sidebar
- **Expandido:** Muestra iconos + texto (pantallas grandes)
- **Colapsado:** Solo iconos (pantallas pequeñas o colapsado manual)
- **Tooltips:** Información detallada al hacer hover
- **Indicadores activos:** Resaltado de métrica/panel seleccionado

## 📄 **MainContent.tsx - Contenido Principal**

### Administración de Contenido
```typescript
const MainContent = () => {
  const { showReportsPanel } = state;
  
  return (
    <>
      {/* Panel de Reportes (condicional) */}
      {showReportsPanel && (
        <div className="fixed right-4 top-4 bottom-4 w-80">
          <LazyReportsPanel />
        </div>
      )}
      
      {/* Grid principal del dashboard */}
      <DashboardGrid {...dashboardProps} />
      
      {/* Mapa climático */}
      <LazyRioClaroStationsMap />
      
      {/* Modal de pantalla completa */}
      <LazyFullscreenChartModal {...modalProps} />
    </>
  );
};
```

### Gestión de Paneles
- **Panel de Reportes:** Posicionado fijo, se superpone al contenido
- **Lazy Loading:** Componentes se cargan cuando son necesarios
- **Responsive:** Adaptación móvil vs escritorio

## 🔄 **Interacciones y Estado**

### Flujo de Navegación
1. **Usuario selecciona métrica** → Sidebar actualiza estado → DashboardGrid re-renderiza
2. **Usuario abre reportes** → MainContent muestra panel → Contenido se ajusta
3. **Usuario cambia tema** → Header actualiza → Layout re-aplica estilos

### Estados Globales Manejados
```typescript
interface DashboardState {
  selectedMetric: MetricType;      // Métrica activa en sidebar
  isAsideCollapsed: boolean;       // Estado del sidebar
  showReportsPanel: boolean;       // Panel de reportes visible
  timeRange: TimeRange;            // Filtro temporal
  isFullscreen: boolean;           // Modal de gráfico
}
```

## 🎨 **Temas y Estilos**

### Clases de Tema
```typescript
// Clases dinámicas basadas en tema
className={`
  bg-gray-50 dark:bg-slate-900          // Fondo principal
  text-gray-800 dark:text-white         // Texto principal
  border-gray-200 dark:border-slate-800 // Bordes
  bg-white/80 dark:bg-slate-900/80      // Fondos semitransparentes
`}
```

### Efectos Visuales
- **Backdrop blur:** Efecto de cristal en header y paneles
- **Gradientes:** Fondos sutiles con patrones
- **Transiciones:** Animaciones suaves entre estados
- **Responsive:** Adaptación automática a diferentes pantallas

## 📱 **Responsividad**

### Breakpoints Tailwind
- **Mobile (< 768px):** Sidebar colapsado, panel de reportes modal
- **Tablet (768px - 1024px):** Sidebar parcialmente expandido
- **Desktop (> 1024px):** Todo expandido, máxima funcionalidad

### Adaptaciones Móviles
```typescript
// Panel de reportes en móvil
<div className="fixed inset-0 bg-black/50 z-40 lg:hidden">
  <div className="absolute right-0 w-80 h-full">
    <ReportsPanel />
  </div>
</div>

// Panel de reportes en desktop
<div className="hidden lg:block fixed right-4 w-80">
  <ReportsPanel />
</div>
```

## 🔧 **Personalización Común**

### Cambiar Logo/Marca
```typescript
// EN: Sidebar.tsx
<div className="flex items-center">
  <YourLogo className="w-8 h-8 text-cyan-500" />  // ✅ Reemplazar Waves
  <h1>Tu Nombre de Sistema</h1>                    // ✅ Cambiar texto
</div>
```

### Modificar Colores de Estado Activo
```typescript
// EN: Sidebar.tsx - estados activos
className={`${
  selectedMetric === metric 
    ? 'bg-your-color/10 text-your-color'           // ✅ Tu color personalizado
    : 'hover:bg-gray-100 dark:hover:bg-slate-800'
}`}
```

### Agregar Nuevos Elementos al Header
```typescript
// EN: Header.tsx
<div className="flex items-center gap-4">
  <ThemeSwitcher />
  <YourNewComponent />                              // ✅ Nuevo componente
  <UserMenu />
</div>
```

---
[← Anterior: Tipos de Datos](./03-tipos-datos.md) | [Siguiente: Gráficos y Visualización →](./05-graficos-visualizacion.md)