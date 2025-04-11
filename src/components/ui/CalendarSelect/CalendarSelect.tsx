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
  const [isSelectOpened, setIsSelectOpened] = useState<boolean[]>([false, false]);
  const [isJustSelected, setIsJustSelected] = useState<boolean[]>([false, false]);
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

  const handleMenuOpen = (index: number) => {
    setIsSelectOpened((prev) => {
      const newArr = prev;
      newArr[index] = !newArr[index];
      return newArr;
    });
    setIsJustSelected((prev) => {
      const newArr = prev;
      newArr[index] = false;
      return newArr;
    });
  };

  const handleMenuClose = (index: number) => {
    if (isJustSelected) {
      setIsJustSelected((prev) => {
        const newArr = prev;
        newArr[index] = false;
        return newArr;
      });
      return;
    }
    setIsSelectOpened((prev) => {
      const newArr = prev;
      newArr[index] = !newArr[index];
      return newArr;
    });
  };

  return (
    <div className="flex gap-2 p-2">
      <Select
        defaultValue={monthsList[currentMonthIndex]}
        value={currentMonthOption}
        // defaultInputValue={monthsList[0].label}
        key={9283754}
        openMenuOnFocus={false}
        onMenuOpen={() => handleMenuOpen(0)}
        onMenuClose={() => handleMenuClose(0)}
        onChange={(value) => handleMonthChange(value as ICalendarSelectOptions)}
        classNames={{
          container: () => `${styles.container}`,
          control: () => `${styles.control} ${isSelectOpened[0] ? styles.controlOpened : ""}`,
          placeholder: () => `${styles.placeholder} `,
          indicatorSeparator: () => styles.indicatorCustomSeparator,
          indicatorsContainer: () =>
            `${styles.indicatorCustomContainer} ${
              isSelectOpened[0] ? styles.indicatorCustomContainerOpened : ""
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
          control: () => `${styles.control} ${isSelectOpened[1] ? styles.controlOpened : ""}`,
          placeholder: () => `${styles.placeholder} `,
          indicatorSeparator: () => styles.indicatorCustomSeparator,
          indicatorsContainer: () =>
            `${styles.indicatorCustomContainer} ${
              isSelectOpened[1] ? styles.indicatorCustomContainerOpened : ""
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
