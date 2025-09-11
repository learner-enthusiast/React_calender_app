import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
const CustomToolbar = ({ label, onNavigate, onView, view }) => {
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group" style={{ display: 'flex', gap: '0' }}>
        <button
          type="button"
          className="rbc-btn rbc-btn-back"
          onClick={() => onNavigate('PREV')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 12px',
            border: '1px solid #ccc',
            backgroundColor: '#f8f9fa',
            cursor: 'pointer',
            borderRadius: '4px 0 0 4px'
          }}
        >
          <FaChevronLeft />
        </button>
        <button
          type="button"
          className="rbc-btn rbc-btn-today"
          onClick={() => onNavigate('TODAY')}
          style={{
            padding: '8px 12px',
            border: '1px solid #ccc',
            backgroundColor: '#f8f9fa',
            cursor: 'pointer',
            borderRadius: '0',
            borderRight: 'none'
          }}
        >
          Today
        </button>
        <button
          type="button"
          className="rbc-btn rbc-btn-next"
          onClick={() => onNavigate('NEXT')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 12px',
            border: '1px solid #ccc',
            backgroundColor: '#f8f9fa',
            cursor: 'pointer',
            borderRadius: '0 4px 4px 0'
          }}
        >
          <FaChevronRight />
        </button>
      </span>

      <span className="rbc-toolbar-label" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
        {label}
      </span>

      <span className="rbc-btn-group">
        <button
          type="button"
          className={view === 'month' ? 'rbc-btn rbc-active' : 'rbc-btn'}
          onClick={() => onView('month')}
          style={{
            padding: '8px 12px',
            border: '1px solid #ccc',
            backgroundColor: view === 'month' ? '#007bff' : '#f8f9fa',
            color: view === 'month' ? 'white' : 'black',
            cursor: 'pointer'
          }}
        >
          Month
        </button>
        <button
          type="button"
          className={view === 'week' ? 'rbc-btn rbc-active' : 'rbc-btn'}
          onClick={() => onView('week')}
          style={{
            padding: '8px 12px',
            border: '1px solid #ccc',
            backgroundColor: view === 'week' ? '#007bff' : '#f8f9fa',
            color: view === 'week' ? 'white' : 'black',
            cursor: 'pointer'
          }}
        >
          Week
        </button>
        <button
          type="button"
          className={view === 'day' ? 'rbc-btn rbc-active' : 'rbc-btn'}
          onClick={() => onView('day')}
          style={{
            padding: '8px 12px',
            border: '1px solid #ccc',
            backgroundColor: view === 'day' ? '#007bff' : '#f8f9fa',
            color: view === 'day' ? 'white' : 'black',
            cursor: 'pointer'
          }}
        >
          Day
        </button>
        <button
          type="button"
          className={view === 'agenda' ? 'rbc-btn rbc-active' : 'rbc-btn'}
          onClick={() => onView('agenda')}
          style={{
            padding: '8px 12px',
            border: '1px solid #ccc',
            backgroundColor: view === 'agenda' ? '#007bff' : '#f8f9fa',
            color: view === 'agenda' ? 'white' : 'black',
            cursor: 'pointer'
          }}
        >
          Agenda
        </button>
      </span>
    </div>
  );
};

export default CustomToolbar;
