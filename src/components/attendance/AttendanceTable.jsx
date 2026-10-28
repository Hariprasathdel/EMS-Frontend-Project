import React from 'react';
import { formatTimeTo12Hour } from '../../utils/timeFormatters.js';

const AttendanceTable = ({ data }) => {
  return (
    <table className="table custom-attendance-table">
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {/* Automatically formats "09:30:00" to "9:30AM" */}
            <td>{formatTimeTo12Hour(row.punchIn)}</td>
            <td>{formatTimeTo12Hour(row.breakOut)}</td>
            <td>{formatTimeTo12Hour(row.breakIn)}</td>
            <td>{formatTimeTo12Hour(row.punchOut)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default AttendanceTable;
