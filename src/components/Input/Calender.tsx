import cx from "classnames";

const getDaysInMonth = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate();

const canGoPrevMonth = (
  selectedMonth: number,
  selectedYear: number,
  currentMonth: number,
  currentYear: number
) => {
  return (
    selectedYear > currentYear ||
    (selectedYear === currentYear && selectedMonth > currentMonth)
  );
};

interface RenderCalendarProps {
  today: Date;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  selectedMonth: number;
  selectedYear: number;
  selectedDate: Date | null;
  handleDateSelect: (day: number) => void;
  setIsDateShow: (show: boolean) => void;
  // setInputValue: (value: string) => void;
}

const RenderCalendar = ({
  today,
  setSelectedMonth,
  setSelectedYear,
  selectedMonth,
  selectedYear,
  selectedDate,
  handleDateSelect,
  setIsDateShow,
  // setInputValue,
}: RenderCalendarProps) => {
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const handlePrevMonth = () => {
    if (canGoPrevMonth(selectedMonth, selectedYear, currentMonth, currentYear)) {
      setSelectedMonth((m) => (m === 0 ? 11 : m - 1));
      if (selectedMonth === 0) setSelectedYear((y) => y - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  };

  const handlePrevYear = () => {
    if (selectedYear > today.getFullYear()) {
      setSelectedYear((y) => y - 1);
    }
  };

  const handleNextYear = () => {
    setSelectedYear((y) => y + 1);
  };

  const handleClear = () => {
    // setInputValue("");
    setIsDateShow(false);
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className="calendar-grid">
        {days.map((day) => {
          const date = new Date(selectedYear, selectedMonth, day);
          const isPastDate =
            date.getTime() < new Date(today.setHours(0, 0, 0, 0)).getTime();
          const isSelected =
            selectedDate &&
            date?.getDate() === selectedDate?.getDate() &&
            date?.getMonth() === selectedDate?.getMonth() &&
            date?.getFullYear() === selectedDate?.getFullYear();

          return (
            <button
              key={day}
              onClick={() => !isPastDate && handleDateSelect(day)}
              className={cx({ selected: isSelected, disabled: isPastDate })}
              disabled={isPastDate}
            >
              {day}
            </button>
          );
        })}
      </div>
    );
  };

  const renderCalendarHeader = () => (
    <div className="calendar-header">
      <button
        onClick={handlePrevMonth}
        disabled={!canGoPrevMonth(selectedMonth, selectedYear, currentMonth, currentYear)}
      >
        ‹
      </button>
      <span>{`${selectedMonth + 1} / ${selectedYear}`}</span>
      <button onClick={handleNextMonth}>›</button>
      <button
        onClick={handlePrevYear}
        disabled={selectedYear <= today.getFullYear()}
      >
        «
      </button>
      <button onClick={handleNextYear}>»</button>
    </div>
  );

  return (
    <div className="custom-calendar">
      {renderCalendarHeader()}
      {renderCalendarGrid()}
      <div className="close-and-clear">
        <button className="calendar-close" onClick={() => setIsDateShow(false)}>
          Close
        </button>
        <button className="calendar-close" onClick={handleClear}>
          x
        </button>
      </div>
    </div>
  );
};

export default RenderCalendar;