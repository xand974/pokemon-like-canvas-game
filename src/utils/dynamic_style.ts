import {DOMContentLoadedPromise} from './dom_ready';

export const DynamicStyle = (() => {
  const _style = document.createElement('style');   // we will modify this style in order to block "iframe" and set custom scroll cursor
  const readyPromise = DOMContentLoadedPromise.then(onDomLoaded);

  return {
    loadCSS: loadCSS,
    unloadAll: unloadAll,
  };

  function onDomLoaded() {
    document.head.appendChild(_style);
  }

  async function loadCSS(style: string) {
    await readyPromise;
    const _styleSheet = _style.sheet as CSSStyleSheet;
    _styleSheet.insertRule(style);
  }

  async function unloadAll() {
    await readyPromise;
    const _styleSheet = _style.sheet as CSSStyleSheet;
    while (_styleSheet.cssRules.length > 0)
      _styleSheet.deleteRule(0);
  }
})();