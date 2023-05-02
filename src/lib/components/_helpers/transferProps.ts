interface Props {
  [prop: string]: unknown;
  children?: React.ReactNode;
  className?: string;
  ref?: React.Ref<unknown>;
  staticContext?: unknown;
}

export const transferProps = ({
  children, className, ref, staticContext, ...restProps
}: Props) => restProps;
