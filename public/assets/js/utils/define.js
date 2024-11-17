/**
 * @param {string} name
 * @param {(el: Element) => void} init
 */
export function define(name, init) {
  customElements.define(
    name,
    class extends HTMLElement {
      connectedCallback() {
        init(this);
      }
    },
  );
}
