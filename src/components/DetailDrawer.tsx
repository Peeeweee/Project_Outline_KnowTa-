import { m, AnimatePresence } from 'motion/react';
import { useDeckStore } from '../store/deckStore';

export function DetailDrawer() {
  const { activeDetail, setActiveDetail } = useDeckStore();

  return (
    <AnimatePresence>
      {activeDetail && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveDetail(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm cursor-pointer"
        >
          <m.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="bg-paper p-8 md:p-12 w-full max-w-2xl text-left border border-black/10 shadow-2xl rounded-[32px] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-6">{activeDetail.title}</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{activeDetail.body}</p>
            
            {activeDetail.source && (
              <div className="mt-8 pt-6 border-t border-black/10">
                <span className="text-xs font-mono text-gray-500 opacity-60">
                  {activeDetail.source}
                </span>
              </div>
            )}
            
            <button
              onClick={() => setActiveDetail(null)}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
              aria-label="Close detail view"
            >
              ×
            </button>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
