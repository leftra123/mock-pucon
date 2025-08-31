# 🖼️ Layout y Navegación

> **Documentación completa de componentes de layout y estructura de la aplicación**

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
            <span>{metricName}</span>
          </button>
        ))}
      </nav>
      
      {/* Panel de reportes */}
      <ReportsPanel isVisible={showReportsPanel} />
    </aside>
  );
};
```

### Métricas Disponibles

| Métrica | Icono | Descripción | Unidad |
|---------|-------|-------------|--------|
| **Flujo** | 🌊 Waves | Volumen de agua que pasa por segundo | m³/s |
| **Nivel** | 📏 BarChart3 | Altura del agua sobre punto de referencia | m |
| **Caudal** | 🚰 Droplets | Cantidad específica de agua que fluye | L/s |
| **Velocidad** | ⚡ Activity | Velocidad del flujo del agua | m/s |

### Estados del Sidebar
- **Expandido:** Muestra iconos + texto (pantallas grandes)
- **Colapsado:** Solo iconos (pantallas pequeñas o colapsado manual)
- **Tooltips:** Información detallada al hacer hover
- **Indicadores activos:** Resaltado de métrica/panel seleccionado
- **Panel de reportes**: Integrado en la barra lateral

## 📄 **MainContent.tsx - Contenido Principal**

### Componentes del MainContent
```typescript
interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  const { isFullscreen } = useDashboard();
  
  return (
    <main className={`flex-1 transition-all duration-300 ${isFullscreen ? 'p-0' : 'p-4 lg:p-6'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Grid responsivo para componentes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {children}
        </div>
      </div>
    </main>
  );
};
```

### Layout Grid Structure
```tsx
// Estructura típica del contenido principal
<MainContent>
  {/* Tarjetas de métricas */}
  <div className="col-span-1 lg:col-span-12">
    <MetricsCards data={data} />
  </div>
  
  {/* Gráfico principal */}
  <div className="col-span-1 lg:col-span-8">
    <TimeFlowChart data={data} metric={selectedMetric} />
  </div>
  
  {/* Gráfico comparativo */}
  <div className="col-span-1 lg:col-span-4">
    <ComparisonGauge data={data} metric={selectedMetric} />
  </div>
  
  {/* Mapa interactivo */}
  <div className="col-span-1 lg:col-span-12">
    <RioClaroStationsMap />
  </div>
</MainContent>
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

## 🗺️ **Mapa Interactivo de Estaciones - RioClaroStationsMap**

### Funcionalidad de Estaciones Arrastrables

El mapa de estaciones del Río Claro incluye una funcionalidad avanzada que permite **arrastrar y reposicionar** las estaciones de monitoreo para planificar ubicaciones futuras.

#### ✨ **Características Principales**

1. **🖱️ Arrastre Interactivo**
   - Las estaciones se pueden mover haciendo clic y arrastrando
   - Cursor cambia a "mano" (`grab`) al pasar sobre las estaciones
   - Cursor cambia a "puño cerrado" (`grabbing`) durante el arrastre

2. **📍 Persistencia de Posición**
   - Las nuevas posiciones se mantienen durante las actualizaciones automáticas de datos
   - No se pierden las coordenadas personalizadas al refrescarse los sensores cada 3 segundos

3. **📊 Feedback Visual**
   - Efecto hover con aumento de escala (1.1x)
   - Mensaje indicativo durante el arrastre en popup y panel lateral
   - Coordenadas actualizadas en tiempo real

4. **🎯 Captura de Coordenadas**
   - Coordenadas precisas (6 decimales) en popups
   - Coordenadas resumidas (4 decimales) en panel lateral  
   - **Notificación toast elegante** desde la parte inferior (5 segundos)
   - Log detallado en consola del navegador

#### 🔧 **Implementación Técnica**

```typescript
// Estados para arrastre optimizado y notificaciones
const [stationPositions, setStationPositions] = useState<Record<string, [number, number]>>({});
const [isDragging, setIsDragging] = useState<string | null>(null);
const [dragPosition, setDragPosition] = useState<Record<string, [number, number]>>({});
const [toast, setToast] = useState<{show: boolean, message: string, stationName: string, coordinates: string} | null>(null);

// Marcadores arrastrables con eventos optimizados
<Marker
  draggable={true}
  position={dragPosition[station.id] || stationPositions[station.id] || station.coordinates}
  eventHandlers={{
    dragstart: () => setIsDragging(station.id),
    drag: (e) => updateDragPosition(station.id, [lat, lng]), // Solo actualiza posición temporal
    dragend: (e) => {
      updateStationPosition(station.id, [lat, lng]); // Confirma posición final
      showToast(station.name, lat, lng); // Muestra notificación elegante
      setIsDragging(null);
    }
  }}
/>
```

#### ⚡ **Optimizaciones de Rendimiento**

1. **Pausado de Actualizaciones**: Las actualizaciones automáticas se detienen durante el arrastre
2. **Estados Separados**: Posición temporal (`dragPosition`) vs persistente (`stationPositions`)
3. **Cache de Iconos**: Los iconos SVG se almacenan en cache para evitar re-creación
4. **CSS Optimizado**: Transiciones removidas durante el drag para máxima fluidez
5. **Canvas Preferido**: Leaflet configurado con `preferCanvas={true}` para mejor rendimiento

#### 🔄 **Botón de Restablecimiento**

- Aparece automáticamente cuando hay estaciones movidas
- Permite restaurar todas las posiciones a ubicaciones originales  
- Confirmación mediante notificación toast elegante

#### 🍞 **Sistema de Notificaciones Toast**

**Características del Toast:**
- **Posición**: Centrado en la parte inferior de la pantalla
- **Duración**: 5 segundos con auto-desaparición
- **Animación**: Deslizamiento suave desde abajo + fade in/out
- **Contenido**: Nombre de estación + coordenadas exactas
- **Progreso**: Barra visual que indica tiempo restante
- **Diseño**: Fondo semitransparente con blur effect
- **Responsive**: Se adapta a diferentes tamaños de pantalla

**Implementación:**
```typescript
// Estado del toast
const [toast, setToast] = useState<{
  show: boolean, 
  message: string, 
  stationName: string, 
  coordinates: string
} | null>(null);

// Función para mostrar notificación
const showToast = (stationName: string, lat: number, lng: number) => {
  setToast({
    show: true,
    message: 'reubicada en:',
    stationName: stationName,
    coordinates: `${lat.toFixed(6)}, ${lng.toFixed(6)}`
  });
  
  // Auto-hide después de 5 segundos
  setTimeout(() => setToast(prev => prev ? { ...prev, show: false } : null), 5000);
  setTimeout(() => setToast(null), 5500);
};
```

**Estilos CSS:**
```css
/* Animaciones suaves de entrada y salida */
.toast-enter {
  transform: translateY(100%) translateX(-50%);
  opacity: 0;
}

.toast-show {
  transform: translateY(0) translateX(-50%);
  opacity: 1;
  transition: all 500ms ease-out;
}

/* Barra de progreso animada */
.progress-bar {
  width: 100% → 0%;
  transition: width 5000ms linear;
}
```

#### 📱 **Responsive y Accesibilidad**

- Funciona en dispositivos táctiles (móviles/tablets)
- Transiciones suaves durante el arrastre
- Tooltips informativos con instrucciones de uso

#### 💡 **Casos de Uso**

- **Planificación:** Determinar ubicaciones óptimas para nuevas estaciones
- **Simulación:** Evaluar cobertura geográfica alternativa  
- **Presentaciones:** Mostrar diferentes escenarios de despliegue
- **Análisis:** Obtener coordenadas exactas para instalación física

#### 📝 **Instrucciones para Usuarios**

1. **Mover Estación:** Clic y arrastrar sobre cualquier marcador de estación (arrastre completamente fluido)
2. **Ver Coordenadas:** Las nuevas coordenadas aparecen instantáneamente en popup y panel
3. **Confirmar Posición:** Al soltar, aparece una **notificación toast elegante** desde abajo con las coordenadas exactas
4. **Toast de 5 segundos:** La notificación se auto-oculta con barra de progreso visual
5. **Restablecer:** Usar el botón "🔄 Restablecer" en el panel lateral (también muestra toast de confirmación)

#### 🚀 **Mejoras de Experiencia**

- **Sin lag**: Arrastre completamente fluido sin "pasos pequeños"
- **Sin interrupciones**: Las notificaciones no bloquean la interfaz como los alerts
- **Feedback inmediato**: Visual feedback durante todo el proceso de arrastre
- **Optimización automática**: El sistema pausa las actualizaciones durante el arrastre para máximo rendimiento

---
[← Previous: Data Types](./data-types.md) | [Next: Charts & Visualization →](./charts-visualization.md)