
export const windowLoadedPromise = new Promise(resolve => document && document.readyState === 'complete' ? resolve() : window.addEventListener('load', resolve));
