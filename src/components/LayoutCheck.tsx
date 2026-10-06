import { useEffect, useState } from 'react';
import { getSceneComponent } from '../App';
import { Nav } from './Nav';
import { useDeckStore } from '../store/deckStore';

export function LayoutCheck() {
  const [reports, setReports] = useState<string[]>([]);
  const { getActiveSections, getScenesForSection } = useDeckStore();
  const activeSections = getActiveSections();
  
  useEffect(() => {
    // Run checks after a short delay to allow for rendering
    setTimeout(() => {
      const issues: string[] = [];
      const vw = document.documentElement.clientWidth;
      
      document.querySelectorAll('*').forEach((el) => {
        if (el === document.body || el === document.documentElement) return;
        const rect = el.getBoundingClientRect();
        
        // Skip hidden elements or empty rects
        if (rect.width === 0 || rect.height === 0) return;
        
        // Skip full-width wrappers
        if (rect.left <= 0 && rect.right >= vw) return;
        
        // Skip SVG paths and SVGs
        if (el.tagName.toLowerCase() === 'path' || el.tagName.toLowerCase() === 'svg' || el.tagName.toLowerCase() === 'g') return;
        
        // Skip elements that are supposed to be full width
        if (el.tagName.toLowerCase() === 'section' || el.classList.contains('grain') || el.classList.contains('glow-dark') || el.classList.contains('paper-light') || el.classList.contains('container-ui')) return;
        
        // Skip nav and its children
        if (el.closest('header')) return;
        
        // Skip progress dots
        if (el.closest('nav[aria-label="Section progress"]')) return;
        
        // Skip hidden details
        if (el.closest('.fixed')) return;
        
        const ident = `${el.tagName}.${el.className} [${(el.textContent || '').slice(0, 20)}]`;
        if (rect.left < 24) {
          issues.push(`${ident} is too far left (${rect.left}px)`);
        }
        if (rect.right > vw - 24) {
          issues.push(`${ident} is too far right (${rect.right}px)`);
        }
        if (rect.top < 72 && rect.bottom > 0) {
          issues.push(`${ident} overlaps nav (${rect.top}px)`);
        }
      });
      
      setReports(issues.length > 0 ? issues : ['No issues found!']);
    }, 1000);
  }, []);
  
  return (
    <div className="text-black bg-white min-h-screen overflow-hidden">
      <Nav />
      <div className="fixed top-24 left-8 z-50 bg-red-500 text-white p-4 font-mono text-xs max-h-[80vh] overflow-y-auto max-w-sm">
        <h3>Layout Reports ({window.innerWidth}x{window.innerHeight}):</h3>
        <ul>
          {reports.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>
      
      <div className="flex flex-col w-full">
        {activeSections.map((section) => {
          const scenes = getScenesForSection(section.slug);
          return scenes.map(s => {
            const Comp = getSceneComponent(s.id);
            if (!Comp) return null;
            return <Comp key={s.id} data={s} isActive={true} theme={section.theme} />;
          });
        })}
      </div>
    </div>
  );
}
