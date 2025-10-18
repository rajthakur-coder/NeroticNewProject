import React from 'react';
import clsx from 'clsx';
import Icon from '../ui/Icon';
interface SearchInputProps {
  /** The current value of the input field. */
  value: string;
  /** Callback function to be called when the input value changes. */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Placeholder text for the input field. */
  placeholder?: string;
  /** Optional custom width for the input field (e.g., '100%', '300px'). */
  width?: string;
  /** Optional custom height for the input field (e.g., '48px'). */
  height?: string;
  /** Optional class names to apply to the input element. */
  className?: string;
  /** Optional class names to apply to the outer div wrapper. */
  wrapperClassName?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  width = '100%',
  height = '48px',
  className,
  wrapperClassName,
}) => {
  const inputStyles = {
    width: width,
    height: height,
  };

  return (
    <div className={clsx("relative flex-1", wrapperClassName)}>
      <Icon
        name="ri-search-line"
        className="absolute -translate-y-1/2 text-text-subtle left-3 top-1/2"
        size={18} // Assuming a default size for the icon
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={inputStyles}
        className={clsx(
          `px-3 pl-10 text-sm border rounded-lg cursor-pointer bg-surface-card text-text-main placeholder-text-subtle
           border-border-input hover:border-[var(--color-border-input-hover)] 
           focus:border-[var(--color-border-input-focus)] focus:ring-primary`,
          className
        )}
      />
    </div>
  );
};

export default SearchInput;