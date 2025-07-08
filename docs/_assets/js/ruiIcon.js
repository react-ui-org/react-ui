const getSvg = (icon) => {
  if (icon === 'code') {
    return '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 32 32" width="24" aria-hidden="true"><path d="M22.79767,5.7113,13.13989,26.42261A.99991.99991,0,0,1,12.23358,27H10.65546a.5.5,0,0,1-.45313-.7113L19.86011,5.57739A.99991.99991,0,0,1,20.76642,5h1.57812A.5.5,0,0,1,22.79767,5.7113Zm8.94574,9.00208-8-4.45874A.5.5,0,0,0,23,10.69141v2.2893a.5.5,0,0,0,.25653.43677L27.88965,16l-4.63312,2.58252A.5.5,0,0,0,23,19.01929v2.2893a.5.5,0,0,0,.74341.43677l8-4.45874A.55353.55353,0,0,0,32,16.84985v-1.6997A.55353.55353,0,0,0,31.74341,14.71338ZM8.25659,10.25464l-8,4.45874A.55353.55353,0,0,0,0,15.15015v1.6997a.55353.55353,0,0,0,.25659.43677l8,4.45874A.5.5,0,0,0,9,21.30859v-2.2893a.5.5,0,0,0-.25653-.43677L4.11035,16l4.63312-2.58252A.5.5,0,0,0,9,12.98071v-2.2893A.5.5,0,0,0,8.25659,10.25464Z" /></svg>';
  }

  if (icon === 'down') {
    return '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" /></svg>';
  }

  if (icon === 'loading') {
    return '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" /><path d="M0 0h24v24H0z" fill="none" /></svg>';
  }

  if (icon === 'pencil') {
    return '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 16 16" width="24" aria-hidden="true" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"><path d="M10.844,3.116l0.255,0.255l1.53,1.53l0.255,0.255l0.255,-0.255l0.511,-0.509l0.254,-0.256c0.141,-0.139 0.141,-0.369 0,-0.51l-1.529,-1.53c-0.141,-0.141 -0.371,-0.14 -0.511,0l-0.255,0.255l-0.51,0.511l-0.255,0.254Z" fillRule="nonzero" /><path d="M10.227,3.733l-6.42,6.42l2.041,2.04l6.42,-6.42l-2.041,-2.04Z" /><path d="M3.19,10.77l-1.182,3.076c-0.051,0.131 0.015,0.197 0.146,0.146l3.076,-1.181l-2.04,-2.041Z" fillRule="nonzero" /></svg>';
  }

  if (icon === 'star') {
    return '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true"><path d="M0 0h24v24H0z" fill="none" /><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z" /></svg>';
  }

  if (icon === 'success') {
    return '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>';
  }

  if (icon === 'up') {
    return '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" /></svg>';
  }

  if (icon === 'warning-sign') {
    return '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 16 16" width="24" aria-hidden="true" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"><path d="M14.825,12.877l-6.189,-10.477c-0.134,-0.233 -0.382,-0.377 -0.65,-0.377c-0.269,0 -0.517,0.144 -0.651,0.377l-6.189,10.477c-0.133,0.232 -0.132,0.517 0.002,0.749c0.134,0.232 0.382,0.374 0.649,0.374l12.377,0c0.268,0 0.515,-0.143 0.65,-0.374c0.133,-0.232 0.134,-0.517 0.001,-0.749Zm-11.734,-0.377l4.895,-8.399l4.894,8.399l-9.789,0Zm5.645,-1.813l0,1.126c0,0.103 -0.084,0.187 -0.188,0.187l-1.125,0c-0.103,0 -0.187,-0.084 -0.187,-0.187l0,-1.125c0,-0.104 0.084,-0.188 0.187,-0.188l1.125,0c0.104,0 0.188,0.084 0.188,0.188Zm-1.251,-4.188l1.001,0c0.137,0 0.25,0.113 0.25,0.25l0,0.938c0,0.103 -0.017,0.27 -0.037,0.371l-0.337,1.726c-0.02,0.101 -0.121,0.215 -0.225,0.215l-0.294,0c-0.103,0 -0.204,-0.114 -0.225,-0.215l-0.345,-1.711c-0.021,-0.101 -0.037,-0.283 -0.037,-0.386l0,-0.939c0,-0.136 0.112,-0.249 0.249,-0.249Z" fillRule="nonzero" /></svg>';
  }

  return '';
};

const svgStyles = {
  fill: 'currentColor',
  height: 'auto',
  margin: 0,
  width: '100%',
};

class RuiIcon extends HTMLElement {
  static get observedAttributes() {
    return ['icon'];
  }

  async connectedCallback() {
    const icon = this.attributes.icon.value;
    this.innerHTML = getSvg(icon);
    this.style.height = '1rem';
    this.style.width = '1rem';
    this.style.display = 'inline-flex';
    if (this.firstChild) {
      Object.assign(this.firstChild.style, svgStyles);
    }
  }

  attributeChangedCallback() {
    const icon = this.attributes.icon.value;
    this.innerHTML = getSvg(icon);
    if (this.firstChild) {
      Object.assign(this.firstChild.style, svgStyles);
    }
  }
}
customElements.define('rui-icon', RuiIcon);
