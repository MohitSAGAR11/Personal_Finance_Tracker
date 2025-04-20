import React, { forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef(
  (
    {
      type = 'text',
      label,
      error,
      helpText,
      id,
      name,
      placeholder,
      required = false,
      disabled = false,
      fullWidth = true,
      className = '',
      startIcon,
      endIcon,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const inputId = id || name;

    const inputClasses = clsx(
      'block rounded-2xl border px-4 py-2 text-sm shadow-sm transition focus:outline-none',
      {
        'w-full': fullWidth,
        'pl-10': startIcon,
        'pr-10': endIcon,
        'bg-gray-100 cursor-not-allowed text-gray-500': disabled,
        'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300': !error && !disabled,
        'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-300': error,
      },
      className
    );

    return (
      <div className={fullWidth ? 'w-full' : 'max-w-xs'}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              {startIcon}
            </div>
          )}

          <input
            type={type}
            id={inputId}
            name={name}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={inputClasses}
            ref={ref}
            onChange={onChange}
            value={value}
            {...props}
          />

          {endIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              {endIcon}
            </div>
          )}
        </div>

        {(error || helpText) && (
          <p
            className={clsx('mt-1 text-sm', {
              'text-red-600': error,
              'text-gray-500': !error,
            })}
          >
            {error || helpText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
