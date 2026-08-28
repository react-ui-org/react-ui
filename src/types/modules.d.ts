declare module '*.module.scss' {
  const classes: { readonly [className: string]: string };
  export default classes;
}

declare module '*.scss';

declare module '*.svg' {
  import type {
    FunctionComponent,
    SVGProps,
  } from 'react';

  const component: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default component;
}
