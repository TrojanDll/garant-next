import { ru } from "date-fns/locale";
import React from "react";
import { DayPicker, OnSelectHandler } from "react-day-picker";
import CustomChevron from "../CustomChevron/CustomChevron";

import CalendarSelect from "../CalendarSelect/CalendarSelect";

import Button from "../Button/Button";

import styles from "./Calendar.module.scss";

interface IProps {
  value: Date | undefined;
  setValue: OnSelectHandler<Date | undefined>;
  onClose?: () => void;
  className?: string;
}

const Calendar = ({ value, setValue, className, onClose }: IProps) => {
  return (
    <div className={className}>
      <DayPicker
        numberOfMonths={1}
        required={true}
        locale={ru}
        animate={false}
        mode="single"
        selected={value}
        onSelect={setValue}
        // footer={value ? `Selected: ${value.toLocaleDateString()}` : "Pick a day."}
        components={{
          Chevron: CustomChevron,
          MonthCaption: CalendarSelect,
        }}
        // styles={{
        //   root: { fontFamily: 'Inter, sans-serif', fontSize: '14px' },
        //   caption: { backgroundColor: '#f5f5f5', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' },
        // }}
        classNames={{
          root: `${styles.dayPickerRoot} rdp-root`,
          dropdown: `${styles.dropdown} rdp-dropdown`,
          caption_label: `${styles.captionLabel} rdp-caption_label`,
          chevron: `${styles.chevron} rdp-chevron`,
          dropdowns: `${styles.dropdowns} rdp-dropdowns`,
          day: `${styles.day} rdp-day`,
          months: `${styles.months} rdp-months`,
          nav: `${styles.nav} rdp-nav`,
          weekday: `${styles.weekday} rdp-weekday`,
          weekdays: `${styles.weekdays} rdp-weekdays`,
          day_button: `${styles.dayButton} rdp-day_button`,
          selected: `${styles.selected} rdp-selected`,
          month: `${styles.month} rdp-month`,
        }}
        footer={
          <div className={styles.calendarFooter}>
            <Button onClickEvent={onClose} type="button" className={styles.submitDateBtn}>
              Подтвердить
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default Calendar;
