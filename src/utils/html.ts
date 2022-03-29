import {isString, timeoutPromise} from "./utils_module";
import {option} from 'ts-option';
import {AnyObject} from './types';
import {wrapToArray} from './array_utils';

export const MAX_Z_INDEX = 2147483647;
export const MIN_Z_INDEX = -2147483648;
export const EMPTY_IMAGE_SRC = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
export const IMPORTANT = '!important';

// NOTE: this is here just for the sake of TS
export const cloneNode = <T extends Node>(node: T, deep?: boolean) => <T>node.cloneNode(deep);

export function removeChildNodes(node: HTMLElement) {
  while (node.hasChildNodes())
    node.removeChild(node.lastChild!);
}

export function replaceChildNodes(node: HTMLElement, nodesList: (HTMLElement | DocumentFragment) | (HTMLElement | DocumentFragment)[]) {
  removeChildNodes(node);
  if (!nodesList) return;                                   // if there is nothing to append, we just clear and exit
  if (!Array.isArray(nodesList)) nodesList = [nodesList];   // upgrade to array
  const fragment = document.createDocumentFragment();
  nodesList.forEach(node => fragment.appendChild(node));
  node.appendChild(fragment);
}

export function createFragment(nodesArray: HTMLElement[]) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < nodesArray.length; i++) fragment.appendChild(nodesArray[i]);
  return fragment;
}

interface CustomAttributes extends AnyObject {
  handlers?: { [key: string]: Function },
  text?: string,
  textContent?: string,
}
type Attributes = string | CustomAttributes;

/**
 * NOTE:
 * - event handlers needs to be wrapped under "handlers" key
 * - dataset items like "data-custom-attr" are supported
 */
export function buildElement<T extends HTMLElement>(name: string, attrs?: Attributes, childNodesOpt?: HTMLElement | DocumentFragment | Array<DocumentFragment | HTMLElement | undefined | null> | null): T {
  const node = name === 'svg' || name === 'path' ? document.createElementNS('http://www.w3.org/2000/svg', name) : document.createElement(name);   // SVG requires createElementNS because the default one would lowercase element names
  if (attrs) {
    const att = isString(attrs) ? {textContent: attrs} : attrs;
    // if (isString(attrs)) attrs = {textContent: attrs};    // allow using text content as second parameter
    Object.entries(att).forEach(([key, value]) => {
      switch (key) {
        case 'text':  // falls through
        case 'textContent':
          // @ts-ignore   // todo ts
          node[key] = value;
          break;                   // todo: find out why do we use this instead of "setAttribute"
        case 'handlers':
          Object.assign(node, att.handlers);
          break;    // event handlers can be set only using `Object.assign` function!
        default:
          node.setAttribute(key, value);
          break;                  // everything else using `setAttribute` function - NOTE: this can handle "data-stuff" AND read-only "width" in SVG nodes!
      }
    });
  }
  if (childNodesOpt) {
    wrapToArray(childNodesOpt).forEach(childNode => {
      if (childNode) node.appendChild(childNode)
    });
  }
  return node as unknown as T;
}

export const getNode = <T extends HTMLElement>(nodeOrId: HTMLElement | string): T => (isString(nodeOrId) ? byId(nodeOrId) : nodeOrId) as T;

export function replaceNode(targetNodeOrId: HTMLElement | string, createNodeFn: (target: HTMLElement) => Element) {
  const targetNode = getNode(targetNodeOrId);
  option(targetNode).forEach(targetNode => {
    targetNode.insertAdjacentElement('afterend', createNodeFn(targetNode));
    targetNode.remove();
  })
}

export function copyNodeStyle(sourceNode: HTMLElement, targetNode: HTMLElement) {
  const computedStyle = window.getComputedStyle(sourceNode);
  Array.from(computedStyle).forEach(key => targetNode.style.setProperty(key, computedStyle.getPropertyValue(key), computedStyle.getPropertyPriority(key)))
}

export const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
export const byIdOpt = (id: string) => option(document.getElementById(id));
export const byClass = (node: HTMLElement, className: string) => node.getElementsByClassName(className)[0] as HTMLElement;
export const removeNode = (node?: Element) => node && node.remove();
export const findNodeIndex = (nodes: HTMLElement[], node: HTMLElement) => {
  for (let i = 0; i < nodes.length; i++) if (nodes[i].isSameNode(node)) return i
};
export const stripHtml = (htmlString: string) => new DOMParser().parseFromString(htmlString, 'text/html').body.textContent || '';
export const setStyle = (node: HTMLElement, style: string, value: string) => node.style.setProperty(style, value, 'important');
export const hideNode = (node?: Element | null) => {
  if (node) (node as HTMLElement).style.display = 'none'
};
export const unHideNode = (node?: Element | null) => {
  if (node) (node as HTMLElement).style.display = ''
};
export const makeInvisible = (node: HTMLElement) => {
  node.style.visibility = 'hidden'
};
export const makeVisible = (node: HTMLElement) => {
  node.style.visibility = 'visible'
};

export const makeVisibleFor = async (node: HTMLElement, {
  time = 1500,
  animate = false,
  animationTime = 200,
  removeAfter = false,
} = {}) => {
  makeVisible(node);
  if (animate) {
    node.style.transition = `opacity ${animationTime}ms ease 0s`;
    await timeoutPromise(time);
    node.style.opacity = '0';
    await timeoutPromise(animationTime);
  }
  else await timeoutPromise(time);
  removeAfter ? node.remove() : makeInvisible(node);
  return node;
};

export const sendClick = (node: HTMLElement) => node.dispatchEvent(new MouseEvent('click', {view: window, bubbles: true, cancelable: true}));

// inline style builder
export function iStyle(styles = '', {important = true, allToInitial = true} = {}): string {
  if (!allToInitial && !important) return styles;   // this line is performance optimization (most probably totally useless)
  const customStyles = styles.split(';').filter(x => x.trim());
  const resultStyles = allToInitial ? [
    `all: initial`,
    `z-index: ${MAX_Z_INDEX}`,
    `font-family: Verdana, Helvetica, sans-serif`,
    `font-size: 12px`,
    ...customStyles
  ] : customStyles;
  return (!important ? resultStyles : resultStyles.map(s => `${s}!important;`)).join('');
}

// https://developer.mozilla.org/docs/Web/API/Selection
export const getSelectedText = () => window.getSelection()!.toString();
// Styles:
export const ELLIPSIS_TRIO = `overflow: hidden; white-space: nowrap; text-overflow: ellipsis;`;
export const USER_SELECT_TRIO = `-moz-user-select: none; user-select: none;`;

export const querySelector = <T extends HTMLElement>(selector: string, node: Element = document as unknown as Element) => option(node.querySelector(selector) as T);
export const querySelectorAll = <T extends HTMLElement>(selector: string, node: Element = document as unknown as Element) => Array.from(node.querySelectorAll(selector)) as T[];
