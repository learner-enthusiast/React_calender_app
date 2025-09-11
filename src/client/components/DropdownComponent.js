import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
export default function Dropdown({
  options,
  selectedValue,
  onChange,
  placeholder = 'Search or select...',
  isSearchBox = false
}) {
  const [selected, setSelected] = useState(options[0] || null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  // Sync with parent-provided selectedValue
  useEffect(() => {
    if (selectedValue || selectedValue.trim !== '') {
      const match = options.find((opt) => opt.value === selectedValue);
      if (match) {
        setSelected(match);
        setSearchTerm(match.label);
      }
    } else if (options.length > 0 && !selected) {
      setSelected(options[0]);
      setSearchTerm(options[0].label);
    }
  }, [selectedValue, options, selected]);

  // Filter options based on search term
  useEffect(() => {
    const filtered = options.filter((opt) => opt.label.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
        // Reset search term to selected value when closing
        if (selected) {
          setSearchTerm(selected.label);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selected]);

  const handleSelect = (opt) => {
    setSelected(opt);
    setSearchTerm(opt.label);
    setOpen(false);
    if (onChange) onChange(opt);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (!open) setOpen(true);
  };

  const handleInputClick = () => {
    setOpen(true);
    // Clear search term when opening to show all options
    if (searchTerm === selected?.label) {
      setSearchTerm('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filteredOptions.length > 0) {
      handleSelect(filteredOptions[0]);
    } else if (e.key === 'Escape') {
      setOpen(false);
      if (selected) {
        setSearchTerm(selected.label);
      }
    }
  };

  const styles = {
    container: {
      position: 'relative',
      display: 'inline-block',
      fontFamily: 'Arial, sans-serif',
      minWidth: '200px'
    },
    inputContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      border: '1px solid #ccc',
      borderRadius: '6px',
      backgroundColor: '#fff',
      cursor: 'pointer'
    },
    input: {
      flex: 1,
      padding: '8px 12px',
      border: 'none',
      outline: 'none',
      borderRadius: '6px',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      fontSize: '14px'
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      paddingLeft: selected?.icon ? '8px' : '0'
    },
    chevron: {
      padding: '8px 12px',
      transition: 'transform 0.2s ease',
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      color: '#666'
    },
    list: {
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '100%',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '6px',
      marginTop: '4px',
      margin: 0,
      padding: 0,
      zIndex: 10,
      maxHeight: '200px',
      overflowY: 'auto',
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
      listStyle: 'none'
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 12px',
      cursor: 'pointer',
      borderBottom: '1px solid #f0f0f0'
    },
    selectedItem: {
      backgroundColor: '#e0e0e0'
    },
    noResults: {
      padding: '8px 12px',
      color: '#999',
      fontStyle: 'italic'
    },
    iconLabel: {
      flex: 1,
      padding: '8px 12px',
      border: 'none',
      outline: 'none',
      borderRadius: '6px',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      fontSize: '14px'
    }
  };

  return (
    <div ref={containerRef} style={styles.container}>
      {/* Search input with selected icon and arrow */}
      <div style={styles.inputContainer}>
        <div style={styles.iconContainer}>{selected?.icon && <span>{selected.icon}</span>}</div>
        {isSearchBox ? (
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onClick={handleInputClick}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            style={styles.input}
          />
        ) : (
          <div
            style={styles.iconLabel}
            onClick={() => {
              setOpen(!open);
              if (searchTerm === selected?.label && !open) {
                setSearchTerm('');
              } else {
                setSearchTerm(selected.label);
              }
            }}
          >
            <span>{selected?.label || 'Select...'}</span>
          </div>
        )}

        <div
          style={styles.chevron}
          onClick={() => {
            setOpen(!open);
            if (searchTerm === selected?.label && !open) {
              setSearchTerm('');
            } else {
              setSearchTerm(selected.label);
            }
          }}
        >
          <ChevronDown size={16} />
        </div>
      </div>

      {/* Dropdown list */}
      {open && (
        <ul style={styles.list}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <li
                key={opt.value}
                onClick={() => handleSelect(opt)}
                style={{
                  ...styles.listItem,
                  ...(selected?.value === opt.value ? styles.selectedItem : {})
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = selected?.value === opt.value ? '#e0e0e0' : '#fff')
                }
              >
                {opt.icon && <span>{opt.icon}</span>}
                <span>{opt.label}</span>
              </li>
            ))
          ) : (
            <li style={styles.noResults}>No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}
