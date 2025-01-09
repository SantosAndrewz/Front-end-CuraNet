import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Button = ({
  children,
  variant = "filled", // "filled" | "outlined" | "text"
  size = "md", // "sm" | "md" | "lg"
  color = "primary", // "primary" | "secondary" | "danger"
  onClick,
  className,
  ...props
}) => {
  // Base Styles
  const baseStyles = "font-semibold rounded transition duration-300 focus:outline-none";

  // Size Variants
  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Color Variants
  const colorStyles = {
    primary: {
      filled: "bg-green-500 text-white hover:bg-green-600",
      outlined: "border border-green-500 text-green-500 hover:bg-green-500 hover:text-white",
      text: "text-green-500 hover:underline",
    },
    secondary: {
      filled: "bg-gray-500 text-white hover:bg-gray-600",
      outlined: "border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white",
      text: "text-gray-500 hover:underline",
    },
    danger: {
      filled: "bg-red-500 text-white hover:bg-red-600",
      outlined: "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
      text: "text-red-500 hover:underline",
    },
  };

  // Compute Final Class Name
  const classes = clsx(
    baseStyles,
    sizeStyles[size],
    colorStyles[color][variant],
    className // Custom classes
  );

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

// Define PropTypes for better type-checking
Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["filled", "outlined", "text"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  color: PropTypes.oneOf(["primary", "secondary", "danger"]),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
