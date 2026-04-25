import cx from "classnames";
import {
  toZonedStartOfDay,
  createZonedDate,
  isPastZonedDate,
  isSameZonedDay,
} from "../../helper/date.helper";

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
  timeZone: string;
  isShowPastDate?: boolean;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  selectedMonth: number;
  selectedYear: number;
  selectedDate: Date | null;
  handleDateSelect: (day: number) => void;
  setIsDateShow: (show: boolean) => void;
}

const RenderCalendar = ({
  today,
  timeZone,
  isShowPastDate,
  setSelectedMonth,
  setSelectedYear,
  selectedMonth,
  selectedYear,
  selectedDate,
  handleDateSelect,
  setIsDateShow,
}: RenderCalendarProps) => {
  // Timezone-safe "today"
  const zonedToday = toZonedStartOfDay(today, timeZone);
  const currentMonth = zonedToday.getMonth();
  const currentYear = zonedToday.getFullYear();

  // Month/Year navigation
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
    if (selectedYear > zonedToday.getFullYear()) {
      setSelectedYear((y) => y - 1);
    }
  };

  const handleNextYear = () => {
    setSelectedYear((y) => y + 1);
  };

  const handleClear = () => {
    setIsDateShow(false);
  };

  // Render calendar grid
  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className="calendar-grid">
        {days.map((day) => {
          const date = createZonedDate(selectedYear, selectedMonth, day, timeZone);
          const isPastDate = isShowPastDate ? false : isPastZonedDate(date, zonedToday);
          const isSelected = selectedDate && isSameZonedDay(date, selectedDate);

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

  // Render calendar header
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
        disabled={selectedYear <= zonedToday.getFullYear()}
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
