/**
 * Props that are never transferred to the HTML element by `transferProps`.
 */
export type TransferPropsInvalidProp =
  | 'children'
  | 'className'
  | 'contentEditable'
  | 'dangerouslySetInnerHTML'
  | 'ref'
  | 'staticContext'
  | 'style'
  | 'suppressContentEditableWarning';
