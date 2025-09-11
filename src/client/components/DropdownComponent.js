import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function Dropdown({ options, selectedValue, onChange }) {
  const [selected, setSelected] = useState(options[0] || null);
  const [open, setOpen] = useState(false);

  // Sync with parent-provided selectedValue
  useEffect(() => {
    if (selectedValue) {
      const match = options.find((opt) => opt.value === selectedValue);
      if (match) setSelected(match);
    } else if (options.length > 0) {
      setSelected(options[0]);
    }
  }, [selectedValue, options]);

  const handleSelect = (opt) => {
    setSelected(opt);
    setOpen(false);
    if (onChange) onChange(opt);
  };

  const styles = {
    container: { position: 'relative', display: 'inline-block', width: '200px', fontFamily: 'Arial, sans-serif' },
    button: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: '8px 12px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      backgroundColor: '#fff',
      cursor: 'pointer',
      outline: 'none'
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
      padding: '8px 12px',
      zIndex: 10,
      maxHeight: '200px',
      overflowY: 'auto',
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
      cursor: 'pointer'
    },
    selectedItem: { backgroundColor: '#e0e0e0' },
    iconLabel: { display: 'flex', alignItems: 'center', gap: '8px' }
  };

  return (
    <div style={styles.container}>
      {/* Selected option */}
      <button type="button" onClick={() => setOpen((prev) => !prev)} style={styles.button}>
        {selected?.icon || null}
        <div style={styles.iconLabel}>
          <span>{selected?.label || 'Select...'}</span>
        </div>
        <FaChevronDown />
      </button>

      {/* Dropdown list */}
      {open && (
        <ul style={styles.list}>
          {options.map((opt) => (
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
              {opt.icon || null}
              <span>{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
