import * as React from 'react'
import { DayPicker, getDefaultClassNames, type ChevronProps } from 'react-day-picker'
import './calendar.css'

function CalendarChevron({ className, orientation }: ChevronProps) {
  const rotation = orientation === 'right' ? 180 : orientation === 'up' ? 90 : orientation === 'down' ? -90 : 0
  return <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rotation}deg)` }} aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
}

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export function Calendar({ className = '', classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const defaults = getDefaultClassNames()

  return <DayPicker
    showOutsideDays={showOutsideDays}
    className={`shadcn-calendar ${className}`}
    classNames={{
      root: `${defaults.root} shadcn-calendar-root`,
      months: `${defaults.months} shadcn-calendar-months`,
      month: `${defaults.month} shadcn-calendar-month`,
      month_caption: `${defaults.month_caption} shadcn-calendar-caption`,
      caption_label: `${defaults.caption_label} shadcn-calendar-caption-label`,
      nav: `${defaults.nav} shadcn-calendar-nav`,
      button_previous: `${defaults.button_previous} shadcn-calendar-nav-button shadcn-calendar-previous`,
      button_next: `${defaults.button_next} shadcn-calendar-nav-button shadcn-calendar-next`,
      month_grid: `${defaults.month_grid} shadcn-calendar-grid`,
      weekdays: `${defaults.weekdays} shadcn-calendar-weekdays`,
      weekday: `${defaults.weekday} shadcn-calendar-weekday`,
      week: `${defaults.week} shadcn-calendar-week`,
      day: `${defaults.day} shadcn-calendar-day`,
      day_button: `${defaults.day_button} shadcn-calendar-day-button`,
      today: `${defaults.today} shadcn-calendar-today`,
      outside: `${defaults.outside} shadcn-calendar-outside`,
      selected: `${defaults.selected} shadcn-calendar-selected`,
      disabled: `${defaults.disabled} shadcn-calendar-disabled`,
      hidden: `${defaults.hidden} shadcn-calendar-hidden`,
      ...classNames,
    }}
    components={{ Chevron: CalendarChevron }}
    {...props}
  />
}
