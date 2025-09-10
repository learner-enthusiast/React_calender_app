import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { Calendar as ReactBigCalendar, dayjsLocalizer } from 'react-big-calendar';
import { onSelectSlot, onSelectEvent, onSelectView } from 'client/store/appSlice';
import { rbcEventsSelector, updateEvent } from 'client/store/eventsSlice';
import { getSmartDates } from 'client/utils/rbc';
import styles from 'client/styles/RbcWrapper.module.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { CATEGORY_OPTIONS } from '../utils/enums';

const DragAndDropCalendar = withDragAndDrop(ReactBigCalendar);

const RbcWrapper = ({ calendars, rbcSelection, view }) => {
  const dispatch = useDispatch();

  // app state
  const calendarIds = useSelector((state) => state.calendars.allIds);
  const events = useSelector(rbcEventsSelector);

  // RBC setup
  const localizer = dayjsLocalizer(dayjs);

  // derived states
  const visibleCalendarIds = calendarIds.filter((id) => calendars[id].visibility === true);
  const visibleEvents = events.filter((event) => visibleCalendarIds.includes(event.calendar));

  // get styles for displaying calendar events
  const eventStyleGetter = (event) => {
    const calendar = calendars[event.calendar];
    if (!calendar) return;

    const getCalendarColor = () => {
      if (calendar?.user_id === 'system') return calendar.color;
      else {
        let e = events.find((ev) => ev.id.toString() === event.id.toString());
        return CATEGORY_OPTIONS.find((c) => c.value === e.category)?.color || calendar.color;
      }
    };

    const style = { backgroundColor: getCalendarColor() };
    return { style: style };
  };

  const handleSelectEvent = (event) => {
    const serializedEvent = {
      ...event,
      start: event.start.toISOString(),
      end: event.end.toISOString()
    };
    dispatch(onSelectEvent(serializedEvent));
  };

  const handleSelectSlot = (slot) => {
    const serializedSlot = {
      start: slot.start.toISOString(),
      end: slot.end.toISOString(),
      action: slot.action
    };

    if (view === 'month' && slot.action === 'click') {
      let smartDates = getSmartDates(new Date(slot.start));
      serializedSlot.smartStart = smartDates.start.toISOString();
      serializedSlot.smartEnd = smartDates.end.toISOString();
    }

    dispatch(onSelectSlot(serializedSlot));
  };

  const handleView = (view) => {
    dispatch(onSelectView(view));
  };

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvent = { ...event, start: start, end: end };
    dispatch(updateEvent(updatedEvent));
  };

  const handleEventResize = ({ event, start, end }) => {
    const updatedEvent = { ...event, start: start, end: end };
    dispatch(updateEvent(updatedEvent));
  };

  const EventComponent = ({ event }) => {
    const calendar = calendars[event.calendar];
    if (!calendar) return null;

    const getCalendarColor = () => {
      if (calendar?.user_id === 'system') return calendar.color;
      else {
        return CATEGORY_OPTIONS.find((c) => c.value === event.category)?.color || calendar.color;
      }
    };

    const bgColor = getCalendarColor();

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          backgroundColor: bgColor,
          color: '#fff'
        }}
      >
        {/* if event.icon is a React element */}
        {CATEGORY_OPTIONS.find((c) => c.value === event.category)?.icon && (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {CATEGORY_OPTIONS.find((c) => c.value === event.category)?.icon}
          </span>
        )}
        <span>{event.title}</span>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <DragAndDropCalendar
        selectable
        localizer={localizer}
        events={visibleEvents}
        view={view}
        onView={(view) => handleView(view)}
        defaultDate={new Date(rbcSelection.slot?.start ?? rbcSelection.event.start)}
        scrollToTime={new Date(1970, 1, 1, 6)}
        onSelectEvent={(e) => handleSelectEvent(e)}
        onSelectSlot={(slot) => handleSelectSlot(slot)}
        startAccessor={(e) => e.start}
        endAccessor={(e) => e.end}
        eventPropGetter={(e) => eventStyleGetter(e)}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        draggableAccessor={() => true}
        components={{
          event: EventComponent // 👈 here we inject it
        }}
      />
    </div>
  );
};

export default RbcWrapper;
