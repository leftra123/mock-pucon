# 🎨 Componentes UI Reutilizables

> **Documentación completa de componentes de interfaz de usuario base y especializados**

## 📋 **Componentes Base**

### `Button.tsx`
**Propósito**: Componente button reutilizable con variantes y estados.

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}
```

#### **Variantes de estilo**:
```typescript
const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  ghost: 'bg-transparent hover:bg-gray-100',
  danger: 'bg-red-600 text-white hover:bg-red-700'
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base', 
  lg: 'px-6 py-3 text-lg'
};
```

#### **Ejemplo de uso**:
```tsx
<Button 
  variant="primary" 
  size="md" 
  icon={<Download />}
  onClick={handleDownload}
  isLoading={isDownloading}
>
  Descargar Reporte
</Button>
```

---

### `Card.tsx`
**Propósito**: Contenedor base reutilizable con variantes de estilo.

```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}
```

#### **Sistema de Cards**:
```tsx
// Componente base Card
<Card variant="elevated" size="md">
  <CardHeader title="Flujo del Río" />
  <CardContent>{children}</CardContent>
</Card>
```

#### **Variantes disponibles**:
- **default**: Card básico con background y border
- **elevated**: Con sombra para destacar
- **outlined**: Solo border, sin background

---

## 🔔 **Componentes de Feedback**

### `CustomTooltip.tsx`
**Propósito**: Tooltip personalizado para gráficos de Recharts con información detallada.

```typescript
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
    name: string;
  }>;
  label?: string | number;
}
```

#### **Características**:
- Background con blur effect: `backdrop-blur-sm`
- Formato de fecha/hora inteligente
- Colores diferenciados por estación
- Valores formateados según métrica
- Border y shadow sutil

#### **Formato condicional**:
```typescript
const formatValue = (value: number, dataKey: string) => {
  const units = {
    station1: selectedMetric === 'flow' ? 'm³/s' : 
              selectedMetric === 'level' ? 'm' : 'L/s',
    temperature: '°C'
  };
  
  return `${value.toFixed(2)} ${units[dataKey] || ''}`;
};
```

---

### `LoadingSpinner.tsx`
**Propósito**: Indicador de carga animado reutilizable.

```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}
```

#### **Animación SVG**:
```tsx
<svg 
  className={`animate-spin ${sizeClass}`}
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  viewBox="0 0 24 24"
>
  <circle 
    className="opacity-25" 
    cx="12" 
    cy="12" 
    r="10" 
    stroke="currentColor" 
    strokeWidth="4"
  />
  <path 
    className="opacity-75" 
    fill="currentColor" 
    d="m12 2a10 10 0 0 1 10 10h-2a8 8 0 0 0-8-8z"
  />
</svg>
```

---

## 🎭 **Componentes de Estado**

### `ThemeSwitcher.tsx`
**Propósito**: Selector de tema con opciones claro, oscuro y automático.

```typescript
interface ThemeSwitcherProps {
  // No props - usa hook useTheme interno
}
```

#### **Estados de tema**:
- **Light**: Forzar tema claro
- **Dark**: Forzar tema oscuro  
- **System**: Seguir preferencia del sistema

#### **Hook personalizado**:
```typescript
const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  
  useEffect(() => {
    const root = document.documentElement;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    if (theme === 'system') {
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);
  
  return { theme, setTheme };
};
```

---

### Estados de Carga (Skeleton Components)

#### `SkeletonCard.tsx`, `SkeletonChart.tsx`, `SkeletonGauge.tsx`
**Propósito**: Componentes de loading state que imitan la estructura real mientras se cargan datos.

```typescript
interface SkeletonProps {
  className?: string;
}
```

#### **Patrones de skeleton**:
- **SkeletonCard**: Rectángulos animados que imitan `MetricCard`
- **SkeletonChart**: Placeholder para gráficos con aspectos similares
- **SkeletonGauge**: Círculos animados para gráficos radiales

#### **Animación CSS**:
```css
@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.skeleton {
  animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
}
```

---

## 👤 **Componentes de Usuario**

### `UserMenu.tsx`
**Propósito**: Menú desplegable de usuario con opciones de perfil y configuración.

```typescript
interface UserMenuProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
}
```

#### **Características**:
- Avatar con fallback a iniciales
- Dropdown con opciones de perfil
- Estados hover y focus
- Responsive design
- Integración con sistema de auth

#### **Ejemplo de uso**:
```tsx
<UserMenu 
  user={{
    name: "Juan Pérez",
    email: "juan@pucon-sensors.cl",
    avatar: "/avatars/juan.jpg"
  }}
  onLogout={handleLogout}
/>
```

---

## 🚫 **Componentes de Error**

### `ErrorBoundary.tsx`
**Propósito**: Captura errores de React y muestra una UI de fallback amigable.

```typescript
interface ErrorBoundaryProps {
  fallback?: React.ComponentType<{ error: Error }>;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
```

#### **Implementación clase**:
```typescript
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback || DefaultErrorFallback;
      return <Fallback error={this.state.error!} />;
    }

    return this.props.children;
  }
}
```

#### **Uso recomendado**:
```tsx
<ErrorBoundary fallback={ChartErrorFallback}>
  <TimeFlowChart data={data} />
</ErrorBoundary>
```

---

## 📄 **Componentes de Modal**

### `FullscreenChartModal.tsx`
**Propósito**: Modal que muestra el gráfico principal en modo fullscreen para análisis detallado.

```typescript
interface FullscreenChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: MetricDataPoint[];
  selectedMetric: MetricType;
  timeRange: TimeRange;
}
```

#### **Características**:
- Modal overlay con `fixed inset-0`
- Componente lazy-loaded para optimización
- `TimeFlowChart` en tamaño completo
- Botón de cierre con `X` icon de Lucide
- Animaciones de entrada/salida
- Escape key para cerrar

#### **Animaciones Framer Motion**:
```tsx
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
};
```

---

## 🔧 **Configuración y Personalización**

### Sistema de Design Tokens

#### Colores
```typescript
// Paleta de colores consistente
const colors = {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    900: '#1e3a8a'
  },
  success: {
    500: '#10b981',
    600: '#059669'
  },
  warning: {
    500: '#f59e0b',
    600: '#d97706'
  },
  danger: {
    500: '#ef4444',
    600: '#dc2626'
  }
};
```

#### Espaciado
```typescript
// Sistema de espaciado en múltiplos de 4px
const spacing = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem'   // 48px
};
```

#### Tipografía
```typescript
// Escala tipográfica consistente
const typography = {
  sizes: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }]
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  }
};
```

---

## 📱 **Responsive Design**

### Breakpoints System
```typescript
const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};
```

### Responsive Props Pattern
```tsx
interface ResponsiveProps {
  size?: {
    base?: 'sm' | 'md' | 'lg';
    md?: 'sm' | 'md' | 'lg';
    lg?: 'sm' | 'md' | 'lg';
  };
}

// Uso
<Button size={{ base: 'sm', md: 'md', lg: 'lg' }} />
```

---

## 🎨 **Animaciones y Transiciones**

### Framer Motion Presets
```typescript
// Animaciones comunes reutilizables
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" }
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.2 }
  }
};
```

### CSS Transitions
```css
/* Transiciones base para interacciones */
.transition-base {
  @apply transition-all duration-200 ease-in-out;
}

.hover-lift {
  @apply transition-transform duration-200 hover:scale-105;
}

.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}
```

---

## 🧪 **Testing de Componentes UI**

### Test de Button
```typescript
describe('Button Component', () => {
  it('renders with correct variant styles', () => {
    render(<Button variant="primary">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-blue-600');
  });
  
  it('shows loading state', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
  
  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Test de ThemeSwitcher
```typescript
describe('ThemeSwitcher', () => {
  it('toggles between themes', () => {
    render(<ThemeSwitcher />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(document.documentElement).toHaveClass('dark');
    
    fireEvent.click(button);
    expect(document.documentElement).not.toHaveClass('dark');
  });
});
```

---

## 🔍 **Accessibility Guidelines**

### ARIA Labels
```tsx
// Siempre incluir labels descriptivos
<Button aria-label="Cerrar modal de gráfico fullscreen">
  <X size={16} />
</Button>

// Estados loading
<Button aria-busy={isLoading} aria-label="Generando reporte">
  {isLoading ? <LoadingSpinner /> : 'Generar'}
</Button>
```

### Keyboard Navigation
```typescript
// Soporte para navegación por teclado
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    onClose();
  }
  
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onClick();
  }
};
```

### Focus Management
```tsx
// Focus trap en modales
import { FocusTrap } from '@headlessui/react';

<FocusTrap>
  <Modal>
    {/* Modal content */}
  </Modal>
</FocusTrap>
```

---

## 📊 **Performance Optimization**

### Lazy Loading
```typescript
// Componentes pesados con lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<LoadingSpinner />}>
  <HeavyComponent />
</Suspense>
```

### Memoización
```tsx
// Memoizar componentes costosos
const ExpensiveCard = memo(({ data, metric }) => {
  const calculatedValue = useMemo(() => {
    return heavyCalculation(data);
  }, [data]);
  
  return <Card>{calculatedValue}</Card>;
});
```

---

**Ubicación de archivos**: `/src/components/ui/`  
**Dependencias principales**: Tailwind CSS, Framer Motion, Lucide React  
**Patrones de composición**: HOCs, Render Props, Compound Components  
**Última actualización**: Agosto 2025

---
[← Previous: Charts & Visualization](./charts-visualization.md) | [Next: Development Guide →](./development-guide.md)