declare type Color = 'primary' | 'secondary' | 'selected' | 'success' | 'warning' | 'danger' | 'help' | 'info' | 'note' | 'light' | 'dark';
declare type Scrolling = 'auto' | 'custom' | 'none';
declare type Type = 'button' | 'submit';
declare type Align = 'top' | 'middle' | 'bottom' | 'baseline';
declare type Justify = 'start' | 'center' | 'end' | 'space-between' | 'stretch';
declare type InputType = 'email' | 'number' | 'password' | 'tel' | 'text';
declare type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'x2l' | 'x3l' | 'none';
declare type Priority = 'filled' | 'outline' | 'flat';
declare type Size = 'small' | 'medium' | 'large';
declare type Position = 'before' | 'after';
declare type Validation = 'invalid' | 'valid' | 'warning';
declare type Layout = 'horizontal' | 'vertical';
declare type Placement = 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
declare type AutoScroll = 'always' | 'detectEnd' | 'off';
declare type Direction = 'asc' | 'desc';
declare type Hyphens = 'none' | 'auto' | 'manual';
declare type WordWrapping = 'normal' | 'long-words' | 'anywhere';
declare type VerticalModalPosition = 'top' | 'center';
declare type PredefinedLabelWidthValues = 'auto' | 'default' | 'limited';

declare type AssertFn = (rootElement: HTMLElement) => void;
declare interface NonMandatoryProps {
  [key: string]: unknown;
}
declare type TestingProps = [nonMandatoryProps, AssertFn];

