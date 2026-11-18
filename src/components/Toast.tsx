import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';

export interface ToastState {
  id: number;
  type: 'success' | 'warning';
  title: string;
  description: string;
}

interface ToastProps {
  toast: ToastState | null;
  onDismiss: () => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-live="polite"
      className="fixed top-20 right-4 left-4 sm:left-auto sm:w-96 z-[70] pointer-events-none"
    >
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            className={`pointer-events-auto rounded-xl border p-4 shadow-lg backdrop-blur-md flex items-start gap-3 ${
              toast.type === 'success'
                ? 'bg-[#081D2B]/95 border-[#D9B978]/50 text-white'
                : 'bg-amber-950/95 border-amber-400/50 text-amber-50'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-[#D9B978] shrink-0 mt-0.5" aria-hidden="true" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-sm leading-snug">{toast.title}</p>
              <p className="text-xs text-white/80 mt-1 leading-relaxed">{toast.description}</p>
            </div>
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss notification"
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#D9B978]"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
