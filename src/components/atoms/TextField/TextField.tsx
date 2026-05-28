'use client';

import React, { forwardRef, useId, useState } from 'react';
import './TextField.css';

export type TextFieldType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label displayed above the input */
  label?: string;
  /** Input type */
  type?: TextFieldType;
  /** Helper text shown below the input */
  helperText?: string;
  /** Error message — replaces helperText and applies error styles */
  errorText?: string;
  /** Warning message — applies warning styles */
  warningText?: string;
  /** Marks the field as required — appends * to the label */
  required?: boolean;
  /** Icon rendered on the left side of the input */
  leadingIcon?: React.ReactNode;
  /** Icon rendered on the right side of the input */
  trailingIcon?: React.ReactNode;
  /** Shows a character count (requires maxLength prop) */
  showCount?: boolean;
}

const EyeOpenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" />
  </svg>
);

/**
 * TextField — single-line text input for the design system.
 *
 * - Extends all native `<input>` HTML attributes
 * - Supports label, helper/error/warning text, leading and trailing icons
 * - Built-in password visibility toggle when type="password"
 * - Fully accessible: linked label, aria-describedby, aria-invalid, aria-required
 * - Uses forwardRef for ref forwarding
 * - Built on CSS design tokens
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      type = 'text',
      helperText,
      errorText,
      warningText,
      required = false,
      disabled = false,
      leadingIcon,
      trailingIcon,
      showCount = false,
      maxLength,
      value,
      defaultValue,
      onChange,
      onBlur,
      className,
      id: externalId,
      ...nativeProps
    },
    ref
  ) => {
    const autoId = useId();
    const id = externalId ?? autoId;
    const helperId = `${id}-helper`;

    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const [touched, setTouched] = useState(false);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const charCount = String(currentValue ?? '').length;

    // Required validation fires on blur — external errorText always takes priority
    const requiredError = required && touched && !String(currentValue ?? '').trim()
      ? 'This field is required.'
      : undefined;

    const hasError   = !!(errorText ?? requiredError);
    const hasWarning = !!warningText && !hasError;
    const activeError  = errorText ?? requiredError;
    const feedbackText = activeError ?? warningText ?? helperText;
    const feedbackType = hasError ? 'error' : hasWarning ? 'warning' : 'helper';

    const isPassword = type === 'password';
    const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setTouched(true);
      onBlur?.(e);
    };

    const wrapperClasses = [
      'textfield-wrapper',
      disabled && 'textfield-wrapper--disabled',
    ]
      .filter(Boolean)
      .join(' ');

    const inputWrapperClasses = [
      'textfield__input-wrapper',
      hasError   && 'textfield__input-wrapper--error',
      hasWarning && 'textfield__input-wrapper--warning',
      disabled   && 'textfield__input-wrapper--disabled',
    ]
      .filter(Boolean)
      .join(' ');

    const inputClasses = [
      'textfield__input',
      leadingIcon  && 'textfield__input--leading',
      (trailingIcon || isPassword) && 'textfield__input--trailing',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label className="textfield__label" htmlFor={id}>
            {label}
            {required && (
              <span className="textfield__required" aria-hidden="true"> *</span>
            )}
          </label>
        )}

        <div className={inputWrapperClasses}>
          {leadingIcon && (
            <span className="textfield__icon textfield__icon--leading" aria-hidden="true">
              {leadingIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            type={resolvedType}
            className={inputClasses}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            value={isControlled ? value : internalValue}
            aria-invalid={hasError || undefined}
            aria-required={required || undefined}
            aria-describedby={feedbackText ? helperId : undefined}
            onChange={handleChange}
            onBlur={handleBlur}
            {...nativeProps}
          />

          {/* Password toggle — takes priority over trailingIcon */}
          {isPassword ? (
            <button
              type="button"
              className="textfield__icon textfield__icon--trailing textfield__password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
              disabled={disabled}
            >
              {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
            </button>
          ) : trailingIcon && (
            <span className="textfield__icon textfield__icon--trailing" aria-hidden="true">
              {trailingIcon}
            </span>
          )}
        </div>

        <div className="textfield__footer">
          {feedbackText && (
            <span
              id={helperId}
              className={`textfield__helper textfield__helper--${feedbackType}`}
              role={hasError ? 'alert' : 'status'}
              aria-live={hasError ? 'assertive' : 'polite'}
            >
              {feedbackText}
            </span>
          )}
          {showCount && maxLength && (
            <span
              className={`textfield__count ${charCount >= maxLength ? 'textfield__count--limit' : ''}`}
              aria-live="polite"
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

TextField.displayName = 'TextField';
