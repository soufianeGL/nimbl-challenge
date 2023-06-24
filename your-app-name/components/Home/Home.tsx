import React, { useEffect, useState } from 'react';
import { DateRangePicker, DayPickerRangeController } from 'react-dates';
import moment, { Moment } from 'moment';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import axios from 'axios';

import styles from './Home.module.css';

const Home: React.FC = () => {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<'startDate' | 'endDate' | null>(null);
  const [dateRangeError, setDateRangeError] = useState<string>('');
  const [numberOfDays, setNumberOfDays] = useState<number | null>(null);
  const [minDate, setMinDate] = useState<Moment | null>(null);
  const [maxDate, setMaxDate] = useState<Moment | null>(null);

  useEffect(() => {
    const fetchInitialStartDate = async () => {
      try {
        const response = await axios.get('http://localhost:3001');
        const initialStartDate = moment(response.data.startDate, 'YYYY/MM/DD');
        setStartDate(initialStartDate);
        setMinDate(initialStartDate);
        setMaxDate(moment());
      } catch (error) {
        console.error('Error fetching initial start date:', error);
      }
    };

    fetchInitialStartDate();
  }, []);

  const handleDateRangeChange = (selectedRange: { startDate: Moment | null; endDate: Moment | null }) => {
    const { startDate, endDate } = selectedRange;
    if (startDate && endDate && startDate.isBefore(endDate)) {
      setStartDate(startDate);
      setEndDate(endDate);
      const days = endDate.diff(startDate, 'days') + 1;
      setDateRangeError('');
      setNumberOfDays(days);
    } else if (!startDate && !endDate) {
      setStartDate(null);
      setEndDate(null);
      setDateRangeError('');
      setNumberOfDays(null);
    } else {
      setDateRangeError('Invalid date range');
      setNumberOfDays(null);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Calculate Number of Days</h1>
      <div className={styles.dateRangePickerContainer}>
        <DateRangePicker
          startDate={startDate}
          startDateId="start_date"
          endDate={endDate}
          endDateId="end_date"
          onDatesChange={handleDateRangeChange}
          focusedInput={focusedInput}
          onFocusChange={(input) => setFocusedInput(input)}
          displayFormat="YYYY/MM/DD"
          small
          isOutsideRange={(day) => day.isBefore(minDate) || day.isAfter(maxDate)}
        />
      </div>
      {dateRangeError && <p className={styles.error}>{dateRangeError}</p>}
      {numberOfDays && (
        <p className={styles.numberOfDays}>{`Number of days: ${numberOfDays}`}</p>
      )}
    </div>
  );
};

export default Home;
