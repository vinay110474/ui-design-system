'use client';

import React, { forwardRef, useId } from 'react';
import './TextArea.css';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label displayed above the textarea */
  label?: string;
  /** Helper text shown below the textarea */
  helperText?: string;
  /** Error message — replaces helperText and applies error styles */
  errorText?: string;
  /** Warning message — applies warning styles */
  warningText?: string;
  /** Marks the field as required — appends * to the label */
  required?: boolean;
  /** Shows a character count (requires maxLength prop) */
  showCount?: boolean;
}

/**
 * TextArea — multi-line text input for the design system.
 *
 * - Extends all native `<textarea>` HTML attributes
 * - Supports label, helper text, error, warning, character count
 * - Fully accessible: linked label, aria-describedby, aria-invalid, aria-required
 * - Uses forwardRef for ref forwarding
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helperText,
      errorText,
      warningText,
      required = false,
      showCount = false,
      disabled = false,
      className,
      id: externalId,
      maxLength,
      value,
      defaultValue,
      onChange,
      ...nativeProps
    },
    ref
  ) => {
    const autoId = useId();
    const id = externalId ?? autoId;
    const helperId = `${id}-helper`;

    const hasError   = !!errorText;
    const hasWarning = !!warningText && !hasError;
    const feedbackText = errorText ?? warningText ?? helperText;
    const feedbackType = hasError ? 'error' : hasWarning ? 'warning' : 'helper';

    const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const charCount = String(currentValue ?? '').length;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    };

    const wrapperClasses = [
      'textarea-wrapper',
      hasError   && 'textarea-wrapper--error',
      hasWarning && 'textarea-wrapper--warning',
      disabled   && 'textarea-wrapper--disabled',
    ]
      .filter(Boolean)
      .join(' ');

    const textareaClasses = [
      'textarea',
      hasError   && 'textarea--error',
      hasWarning && 'textarea--warning',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label className="textarea__label" htmlFor={id}>
            {label}
            {required && (
              <span className="textarea__required" aria-hidden="true"> *</span>
            )}
          </label>
        )}

        <div className="textarea__field-wrapper">
          <textarea
            ref={ref}
            id={id}
            className={textareaClasses}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            value={isControlled ? value : internalValue}
            aria-invalid={hasError || undefined}
            aria-required={required || undefined}
            aria-describedby={feedbackText ? helperId : undefined}
            onChange={handleChange}
            {...nativeProps}
          />
        </div>

        <div className="textarea__footer">
          {feedbackText && (
            <span
              id={helperId}
              className={`textarea__helper textarea__helper--${feedbackType}`}
              role={hasError ? 'alert' : 'status'}
              aria-live={hasError ? 'assertive' : 'polite'}
            >
              {feedbackText}
            </span>
          )}
          {showCount && maxLength && (
            <span
              className={`textarea__count ${charCount >= maxLength ? 'textarea__count--limit' : ''}`}
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

TextArea.displayName = 'TextArea';
