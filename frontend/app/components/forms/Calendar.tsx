'use client';

import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import { ko } from 'date-fns/locale'; // ✅ 한국어 locale 불러오기

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DatePickerProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  bookedDates?: Date[];
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  bookedDates
}) => {
  return (
    <DateRange
      className='w-full border border-gray-400 rounded-xl mb-4'
      rangeColors={['#262626']}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction='vertical'
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={bookedDates}
      locale={ko} // ✅ 한국어 적용
    />
  );
};

export default DatePicker;
