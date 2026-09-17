import React, { useState, useRef, useEffect } from 'react';

interface InlineEditProps {
  value: string;
  onChange: (newValue: string) => void;
  isEditable: boolean;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';
  style?: React.CSSProperties;
  labelTooltip?: string;
}

export const InlineEdit: React.FC<InlineEditProps> = ({
  value,
  onChange,
  isEditable,
  className = '',
  multiline = false,
  placeholder = 'Click to edit...',
  tag = 'span',
  style,
  labelTooltip,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if ('select' in inputRef.current) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (draft.trim() !== value) {
      onChange(draft);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      setIsEditing(false);
      onChange(draft);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setDraft(value);
    }
  };

  if (!isEditable) {
    const Tag = tag;
    return (
      <Tag className={className} style={style}>
        {value || placeholder}
      </Tag>
    );
  }

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`w-full p-2 rounded border-2 border-[var(--gold)] bg-[var(--cream)] text-[var(--ink)] font-inherit resize-y outline-none transition-all ${className}`}
          style={style}
          rows={3}
          placeholder={placeholder}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full px-2 py-1 rounded border-2 border-[var(--gold)] bg-[var(--cream)] text-[var(--ink)] font-inherit outline-none transition-all ${className}`}
        style={style}
        placeholder={placeholder}
      />
    );
  }

  const Tag = tag;
  return (
    <Tag
      onClick={() => setIsEditing(true)}
      title={labelTooltip ? `Click to edit ${labelTooltip}` : 'Click to edit'}
      className={`group relative cursor-pointer transition-colors duration-150 hover:bg-[var(--line-soft)] hover:outline-dashed hover:outline-1 hover:outline-[var(--gold)] rounded px-1 -mx-1 inline-block ${className}`}
      style={style}
    >
      {value || <span className="opacity-50 italic">{placeholder}</span>}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5 right-0 text-[10px] uppercase font-sans tracking-wider bg-[var(--gold)] text-white px-1.5 py-0.5 rounded shadow pointer-events-none z-30">
        ✎ Edit
      </span>
    </Tag>
  );
};
