'use client';

import React, { forwardRef } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visible label text */
  label: string;
  /** Visual style of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Icon node (SVG, img, or any ReactNode) */
  icon?: React.ReactNode;
  /** Side the icon appears on */
  iconPosition?: 'left' | 'right';
  /** Shows a spinner and disables interaction */
  loading?: boolean;
  /** Stretches the button to fill its container */
  fullWidth?: boolean;
  /** Marks the button as being in an error state — applies a red ring. Default: false */
  error?: boolean;
  /** Runtime warning message shown below the button — signals a cautionary state */
  warning?: string;
}

const Spinner = () => (
  <svg
    className="button__spinner"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="12" cy="12" r="10"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="32"
      strokeDashoffset="12"
    />
  </svg>
);

/**
 * Button — core interactive element of the design system.
 *
 * Supports all native `<button>` HTML attributes via prop spreading,
 * making it safe to use in forms, with ARIA attributes, data attributes,
 * and any native event handler.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      variant = 'primary',
      size = 'medium',
      disabled = false,
      icon,
      iconPosition = 'left',
      loading = false,
      fullWidth = false,
      error = false,
      warning,
      className,
      type = 'button',
      id,
      ...nativeProps
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Unique ID links the warning message to the button for screen readers
    const warningId = id ? `${id}-warning` : undefined;

    const classes = [
      'button',
      `button--${variant}`,
      `button--${size}`,
      loading   && 'button--loading',
      fullWidth && 'button--full-width',
      error     && 'button--has-error',
      warning   && 'button--has-warning',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={`button-wrapper${fullWidth ? ' button-wrapper--full-width' : ''}`}>
        <button
          ref={ref}
          id={id}
          type={type}
          className={classes}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          aria-busy={loading}
          aria-invalid={error || undefined}
          aria-describedby={warning && warningId ? warningId : undefined}
          {...nativeProps}
        >
          {loading && <Spinner />}

          {!loading && icon && iconPosition === 'left' && (
            <span className="button__icon" aria-hidden="true">{icon}</span>
          )}

          <span className="button__label">{label}</span>

          {!loading && icon && iconPosition === 'right' && (
            <span className="button__icon" aria-hidden="true">{icon}</span>
          )}
        </button>

        {warning && (
          <span
            id={warningId}
            className="button__message button__message--warning"
            role="status"
            aria-live="polite"
          >
            {warning}
          </span>
        )}
      </div>
    );
  }
);

Button.displayName = 'Button';
