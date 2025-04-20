import React from 'react';
import clsx from 'clsx';

const Card = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  noPadding = false,
  shadow = 'medium',
  hover = false,
  border = false,
  ...props
}) => {
  const shadowClasses = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow-md',
    large: 'shadow-lg',
  };

  const cardClasses = clsx(
    'bg-white rounded-2xl overflow-hidden',
    shadowClasses[shadow],
    {
      'border border-gray-200': border,
      'transition-shadow hover:shadow-lg': hover,
    },
    className
  );

  const contentPadding = noPadding ? '' : 'p-6';
  const hasHeader = title || subtitle;

  return (
    <div className={cardClasses} {...props}>
      {hasHeader && (
        <div className="px-6 pt-6">
          {title && <h3 className="text-xl font-semibold text-gray-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}

      <div className={clsx({ 'mt-4': hasHeader }, contentPadding)}>
        {children}
      </div>

      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
