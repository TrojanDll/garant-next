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
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [isJustSelected, setIsJustSelected] = useState(false);
  // const [selectedMonth, setSelectedMonth] = useState();
  // const [selectedYear, setSelectedYear] = useState();

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

  const handleMenuOpen = () => {
    setIsSelectOpened(true);
    setIsJustSelected(false);
  };

  const handleMenuClose = () => {
    if (isJustSelected) {
      setIsJustSelected(false);
      return;
    }
    setIsSelectOpened(false);
  };

  return (
    <div className="flex gap-2 p-2">
      <Select
        defaultValue={monthsList[currentMonthIndex]}
        value={currentMonthOption}
        // defaultInputValue={monthsList[0].label}
        key={9283754}
        openMenuOnFocus={false}
        onMenuOpen={() => handleMenuOpen()}
        onMenuClose={() => handleMenuClose()}
        onChange={(value) => handleMonthChange(value as ICalendarSelectOptions)}
        classNames={{
          control: () => `${styles.control} ${isSelectOpened ? styles.controlOpened : ""}`,
          placeholder: () => `${styles.placeholder} `,
          indicatorSeparator: () => styles.indicatorCustomSeparator,
          indicatorsContainer: () =>
            `${styles.indicatorCustomContainer} ${
              isSelectOpened ? styles.indicatorCustomContainerOpened : ""
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
        onMenuOpen={() => handleMenuOpen()}
        onMenuClose={() => handleMenuClose()}
        onChange={(value) => handleYearChange(value as ICalendarSelectOptions)}
        classNames={{
          control: () => `${styles.control} ${isSelectOpened ? styles.controlOpened : ""}`,
          placeholder: () => `${styles.placeholder} `,
          indicatorSeparator: () => styles.indicatorCustomSeparator,
          indicatorsContainer: () =>
            `${styles.indicatorCustomContainer} ${
              isSelectOpened ? styles.indicatorCustomContainerOpened : ""
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
      {/* <select
        value={currentMonth.getMonth()}
        onChange={handleMonthChange}
        className="border rounded p-1"
      >
        {monthsList.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
      <select
        value={currentMonth.getFullYear()}
        onChange={handleYearChange}
        className="border rounded p-1"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select> */}
    </div>
  );
};

export default CalendarSelect;
