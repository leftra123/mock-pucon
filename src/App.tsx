import React from 'react';
import { DashboardProvider } from './contexts/DashboardContext';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/ui/ErrorBoundary';

/**
 * ===================================================================
 * === COMPONENTE RAÍZ DE LA APLICACIÓN ===
 * ===================================================================
 * 
 * Este es el punto de entrada principal del Dashboard Hidrológico
 * Arquitectura implementada:
 * 
 * 🏗️ ESTRUCTURA:
 * - ErrorBoundary: Captura errores de React para evitar crashes
 * - DashboardProvider: Maneja el estado global de datos hidrológicos  
 * - Layout: Renderiza la interfaz principal del dashboard
 * 
 * 🔧 HARDCODED: 
 * - Layout importado desde './components/layout/Layout'
 * - Si necesitas el nuevo layout hidrológico, cambia a 'HydrologicalLayout'
 * 
 * 📋 RESPONSABILIDADES:
 * - Inicializar contexto global de datos
 * - Manejar errores de toda la aplicación
 * - Proveer punto único de entrada
 * 
 * 🎯 PATRÓN USADO: Provider Pattern + Error Boundaries
 */

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      {/* 
        🔧 HARDCODED: DashboardProvider maneja el estado global
        Los datos se actualizan cada 3 segundos (ver constants.ts)
      */}
      <DashboardProvider>
        {/* 
          🔧 HARDCODED: Layout actual del sistema
          Para usar el nuevo layout hidrológico, cambiar a:
          <HydrologicalLayout />
        */}
        <Layout />
      </DashboardProvider>
    </ErrorBoundary>
  );
};

export default App;