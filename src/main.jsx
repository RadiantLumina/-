import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const rootEl = document.getElementById('root');
console.log('[main] root element:', rootEl);

try {
  createRoot(rootEl).render(<App />);
  console.log('[main] render started');
} catch (e) {
  console.error('[main] render error:', e);
  rootEl.innerHTML = '<pre style="padding:40px;color:red;">' + e.stack + '</pre>';
}
