import * as Styled from "./Button.styles";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Styled.Button {...props}>{children}</Styled.Button>
);
