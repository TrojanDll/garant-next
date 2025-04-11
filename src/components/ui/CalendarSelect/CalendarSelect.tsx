import React, { useState } from "react";
import { formatDate, getYear } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarMonth, useDayPicker } from "react-day-picker";
import dynamic from "next/dynamic";

import { ICalendarSelectOptions } from "@/types/ICalendarSelectOptions";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

import styles from "./CalendarSelect.module.scss";

interface IProps {
  calendarMonth: CalendarMonth;
  displayIndex: number;
}

const CalendarSelect = ({ calendarMonth, displayIndex }: IProps) => {
  const { goToMonth, months } = useDayPicker();
  const [isMonthSelectOpened, setIsMonthSelectOpened] = useState(false);
  const [isMonthJustSelected, setIsMonthJustSelected] = useState(false);
  const [isYearSelectOpened, setIsYearSelectOpened] = useState(false);
  const [isYearJustSelected, setIsYearJustSelected] = useState(false);

  const currentMonth = months[0].date;

  const currentMonthIndex = new Date().getMonth();

  const monthsList = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: formatDate(new Date(2025, i), "LLLL", { locale: ru }),
  }));

  const currentYear = getYear(new Date());
  let years = Array.from({ length: 6 }, (_, i) => currentYear + i);
  const yearsList: ICalendarSelectOptions[] = years.map((year) => {
    const option: ICalendarSelectOptions = {
      value: year,
      label: year.toString(),
    };

    return option;
  });

  const currentMonthOption: ICalendarSelectOptions = {
    label: monthsList[calendarMonth.date.getMonth()].label,
    value: monthsList[calendarMonth.date.getMonth()].value,
  };

  const currentYearOption: ICalendarSelectOptions = {
    label: calendarMonth.date.getFullYear().toString(),
    value: calendarMonth.date.getFullYear(),
  };

  const handleMonthChange = (value: ICalendarSelectOptions) => {
    const newMonth = value.value;
    goToMonth(new Date(currentMonth.getFullYear(), newMonth));
  };

  const handleYearChange = (value: ICalendarSelectOptions) => {
    const newYear = value.value;
    goToMonth(new Date(newYear, currentMonth.getMonth()));
  };

  const handleMenuOpen = (index: number) => {
    if (index === 0) {
      setIsMonthSelectOpened(true);
      setIsMonthJustSelected(false);
    } else {
      setIsYearSelectOpened(true);
      setIsYearJustSelected(false);
    }
  };

  const handleMenuClose = (index: number) => {
    if (index === 0) {
      if (isMonthJustSelected) {
        setIsMonthJustSelected(false);
        return;
      }
      setIsMonthSelectOpened(false);
    } else {
      if (isYearJustSelected) {
        setIsYearJustSelected(false);
        return;
      }
      setIsYearSelectOpened(false);
    }
  };

  return (
    <div className={styles.selectsContainer}>
      <Select
        defaultValue={monthsList[currentMonthIndex]}
        value={currentMonthOption}
        key={9283754}
        openMenuOnFocus={false}
        onMenuOpen={() => handleMenuOpen(0)}
        onMenuClose={() => handleMenuClose(0)}
        onChange={(value) => handleMonthChange(value as ICalendarSelectOptions)}
        classNames={{
          container: () => `${styles.container}`,
          control: () => `${styles.control} ${isMonthSelectOpened ? styles.controlOpened : ""}`,
          placeholder: () => `${styles.placeholder} `,
          indicatorSeparator: () => styles.indicatorCustomSeparator,
          indicatorsContainer: () =>
            `${styles.indicatorCustomContainer} ${
              isMonthSelectOpened ? styles.indicatorCustomContainerOpened : ""
            }`,
          singleValue: () => styles.singleCustomValue,
          menu: () => styles.dropdown,
          option: (state) =>
            `${styles.option} ${state.isFocused ? styles.optionFocused : ""} ${
              state.isSelected ? styles.optionFocused : ""
            }`,
          menuList: () => styles.menuList,
        }}
        options={monthsList}
      />

      <Select
        value={currentYearOption}
        defaultValue={yearsList[0]}
        key={129365}
        openMenuOnFocus={false}
        onMenuOpen={() => handleMenuOpen(1)}
        onMenuClose={() => handleMenuClose(1)}
        onChange={(value) => handleYearChange(value as ICalendarSelectOptions)}
        classNames={{
          container: () => `${styles.container}`,
          control: () => `${styles.control} ${isYearSelectOpened ? styles.controlOpened : ""}`,
          placeholder: () => `${styles.placeholder} `,
          indicatorSeparator: () => styles.indicatorCustomSeparator,
          indicatorsContainer: () =>
            `${styles.indicatorCustomContainer} ${
              isYearSelectOpened ? styles.indicatorCustomContainerOpened : ""
            }`,
          singleValue: () => styles.singleCustomValue,
          menu: () => styles.dropdown,
          option: (state) =>
            `${styles.option} ${state.isFocused ? styles.optionFocused : ""} ${
              state.isSelected ? styles.optionFocused : ""
            }`,
          menuList: () => styles.menuList,
        }}
        options={yearsList}
      />
    </div>
  );
};

export default CalendarSelect;
