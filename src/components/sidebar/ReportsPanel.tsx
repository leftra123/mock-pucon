import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  FileText, 
  Table, 
  BarChart3, 
  CheckCircle,
  Clock,
  AlertCircle,
  Trash2,
  BarChartHorizontal
} from 'lucide-react';
import { ReportConfig, ReportFormat, ReportVariable } from '../../types/reports';
import { useReports, defaultReportVariables } from '../../hooks/useReports';

// --- Constantes (fuera del componente para optimizar) ---
const SUPPORTED_FORMATS: { 
  value: ReportFormat; 
  label: string; 
  icon: React.ReactNode; 
  description: string 
}[] = [
  { 
    value: 'pdf', 
    label: 'PDF', 
    icon: <FileText className="w-4 h-4" />, 
    description: 'Documento profesional para presentar.' 
  },
  { 
    value: 'excel', 
    label: 'Excel', 
    icon: <Table className="w-4 h-4" />, 
    description: 'Hoja de cálculo para análisis detallado.' 
  },
  { 
    value: 'csv', 
    label: 'CSV', 
    icon: <BarChart3 className="w-4 h-4" />, 
    description: 'Datos puros para máxima compatibilidad.' 
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-500" title="Pendiente" />;
    case 'generating':
      return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" title="Generando..." />;
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-500" title="Completado" />;
    case 'error':
      return <AlertCircle className="w-4 h-4 text-red-500" title="Error" />;
    default:
      return <Clock className="w-4 h-4 text-gray-500" title="Desconocido" />;
  }
};

// --- Componente Principal ---

interface ReportsPanelProps {
  className?: string;
}

const ReportsPanel: React.FC<ReportsPanelProps> = ({ className = "" }) => {
  const { 
    reportJobs, 
    isGenerating, 
    generateReport, 
    downloadReport, 
    deleteReport,
    clearCompletedReports 
  } = useReports();

  const [variables, setVariables] = React.useState<ReportVariable[]>(defaultReportVariables);
  const [selectedFormat, setSelectedFormat] = React.useState<ReportFormat>('pdf');
  const [dateRange, setDateRange] = React.useState(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);
    return { startDate, endDate };
  });
  const [includeCharts, setIncludeCharts] = React.useState(true);
  const [includeAnalysis, setIncludeAnalysis] = React.useState(true);
  
  // ✅ MANTENEMOS ESTA LÍNEA OCULTA para compatibilidad, pero sin su checkbox.
  // Siempre enviaremos 'false' ya que no hay opción para activarlo.
  const [aiAnalysis, setAiAnalysis] = React.useState(false);

  const toggleVariable = React.useCallback((variableId: string) => {
    setVariables(prev => prev.map(v => 
      v.id === variableId ? { ...v, selected: !v.selected } : v
    ));
  }, []);

  const handleGenerateReport = React.useCallback(async () => {
    const selectedVariables = variables.filter(v => v.selected);
    if (selectedVariables.length === 0) {
      alert('Por favor, selecciona al menos una variable para incluir en el reporte.');
      return;
    }

    const config: ReportConfig = {
      variables: selectedVariables,
      format: selectedFormat,
      dateRange,
      includeCharts,
      includeAnalysis,
      aiAnalysis, // ✅ SE VUELVE A INCLUIR para que coincida con el tipo ReportConfig
    };

    try {
      await generateReport(config);
    } catch (error) {
      console.error('Error al solicitar la generación del reporte:', error);
      alert('Ocurrió un error al generar el reporte. Por favor, inténtalo de nuevo.');
    }
  }, [
    variables, 
    selectedFormat, 
    dateRange, 
    includeCharts, 
    includeAnalysis, 
    aiAnalysis, // ✅ SE AÑADE A LAS DEPENDENCIAS
    generateReport
  ]);

  const selectedVariablesCount = React.useMemo(() => 
    variables.filter(v => v.selected).length,
    [variables]
  );

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-md ${className}`}>
      <header className="p-4 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-1">
          <Download className="w-6 h-6 text-cyan-500" />
          <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
            Generador de Reportes
          </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-slate-400">
          Configura y exporta la información que necesitas.
        </p>
      </header>

      <div className="p-4 space-y-6">
        {/* ... (el resto del JSX es idéntico a la versión mejorada, sin la opción de IA) ... */}
        {/* Selección de Variables */}
        <section>
          <h4 className="font-medium text-gray-800 dark:text-white mb-3 text-sm">
            Variables a Incluir ({selectedVariablesCount}/{variables.length})
          </h4>
          <div className="space-y-2">
            {variables.map(variable => (
              <label key={variable.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={variable.selected}
                  onChange={() => toggleVariable(variable.id)}
                  className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500"
                />
                <span className="text-lg">{variable.icon}</span>
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-800 dark:text-white">{variable.name}</span>
                  <p className="text-xs text-gray-500 dark:text-slate-400">{variable.unit}</p>
                </div>
              </label>
            ))}
          </div>
        </section>

        <hr className="border-t border-gray-200 dark:border-slate-700" />

        {/* Configuración del Reporte */}
        <section className="space-y-6">
            {/* ... Formato, Fechas y Opciones Adicionales ... */}
            <div>
            <h4 className="font-medium text-gray-800 dark:text-white mb-3 text-sm">Formato de Salida</h4>
            <div className="grid grid-cols-3 gap-2">
              {SUPPORTED_FORMATS.map(format => (
                <button
                  key={format.value}
                  type="button"
                  onClick={() => setSelectedFormat(format.value)}
                  className={`p-3 rounded-lg border text-center transition-all duration-200 ${selectedFormat === format.value ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 ring-2 ring-cyan-500' : 'border-gray-200 dark:border-slate-600 hover:border-gray-400 dark:hover:border-slate-500 text-gray-700 dark:text-slate-300'}`}
                  title={format.description}
                >
                  <div className="flex justify-center mb-1">{format.icon}</div>
                  <span className="text-xs font-medium">{format.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 dark:text-white mb-3 text-sm">Período de Datos</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="startDate" className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">Desde</label>
                <input
                  id="startDate" type="date"
                  value={dateRange.startDate.toISOString().split('T')[0]}
                  onChange={e => setDateRange(prev => ({ ...prev, startDate: new Date(e.target.value) }))}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-300 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">Hasta</label>
                <input
                  id="endDate" type="date"
                  value={dateRange.endDate.toISOString().split('T')[0]}
                  onChange={e => setDateRange(prev => ({ ...prev, endDate: new Date(e.target.value) }))}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-300 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
            
            {/* Opciones Adicionales SIN la opción de IA */}
            <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-3 text-sm">Contenido Adicional</h4>
                <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={includeCharts} onChange={e => setIncludeCharts(e.target.checked)} className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500" />
                    <span className="text-sm text-gray-700 dark:text-slate-300">Incluir gráficos visuales</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={includeAnalysis} onChange={e => setIncludeAnalysis(e.target.checked)} className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500" />
                    <span className="text-sm text-gray-700 dark:text-slate-300">Incluir análisis estadístico</span>
                </label>
                </div>
            </div>
        </section>

        <button
          type="button"
          onClick={handleGenerateReport}
          disabled={isGenerating || selectedVariablesCount === 0}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium shadow-lg transition-all"
        >
            {isGenerating ? (
                <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generando Reporte...</span>
                </>
            ) : (
                <>
                <BarChartHorizontal className="w-5 h-5" />
                <span>Generar Reporte</span>
                </>
            )}
        </button>

        {/* ... (el resto del JSX para la lista de reportes es idéntico) ... */}
        {reportJobs.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-800 dark:text-white text-sm">Reportes Recientes</h4>
              <button
                type="button"
                onClick={clearCompletedReports}
                className="text-xs text-gray-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                title="Limpiar reportes completados"
              >
                Limpiar
              </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              <AnimatePresence>
                {reportJobs.map(job => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-slate-700/50 rounded-lg"
                  >
                    {getStatusIcon(job.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 dark:text-slate-300 truncate">{job.config.format.toUpperCase()} • {job.config.variables.length} variables</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">{job.createdAt.toLocaleTimeString('es-CL')}</p>
                      {job.status === 'generating' && (
                        <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-1 mt-1.5">
                          <div className="bg-cyan-600 h-1 rounded-full" style={{ width: `${job.progress}%` }}></div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {job.status === 'completed' && (
                        <button type="button" onClick={() => downloadReport(job.id)} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full text-cyan-600 dark:text-cyan-400" title="Descargar">
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                      <button type="button" onClick={() => deleteReport(job.id)} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full text-red-500" title="Eliminar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ReportsPanel;