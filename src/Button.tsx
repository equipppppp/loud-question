import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const Button = ({ title, ...rest }: ButtonProps) => (
  <button {...rest} className="button">
    {title}
  </button>
);
