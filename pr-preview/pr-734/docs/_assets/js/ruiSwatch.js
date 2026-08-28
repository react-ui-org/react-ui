class RuiSwatch extends HTMLElement {
  async connectedCallback() {
    const color = this.attributes.color.value;
    const colorCustomProperty = `--rui-color-${color}`;

    const rootEl = document.createElement('div');
    rootEl.style.display = 'inline-flex';
    rootEl.style['flex-direction'] = 'column';
    rootEl.style.width = '18%';
    rootEl.style['min-width'] = '120px';
    rootEl.style['margin-right'] = '1rem';
    rootEl.style['margin-bottom'] = '1.5rem';

    const swatchEl = document.createElement('div');
    swatchEl.style.backgroundColor = `var(${colorCustomProperty})`;
    swatchEl.style.height = '5rem';
    swatchEl.style['margin-bottom'] = '0.5rem';
    swatchEl.style.border = '1px solid rgb(0 0 0 / 15%)';

    const titleEl = document.createElement('div');
    titleEl.style.width = '100%';
    titleEl.style.overflow = 'hidden';
    titleEl.style['font-size'] = '0.85rem';
    titleEl.style['text-overflow'] = 'ellipsis';

    const label = document.createElement('strong');
    label.style.display = 'block';
    label.innerText = color;
    titleEl.appendChild(label);

    const code = document.createElement('code');
    code.innerText = colorCustomProperty;
    titleEl.appendChild(code);

    rootEl.appendChild(swatchEl);
    rootEl.appendChild(titleEl);
    this.append(rootEl);
  }
}
customElements.define('rui-swatch', RuiSwatch);
