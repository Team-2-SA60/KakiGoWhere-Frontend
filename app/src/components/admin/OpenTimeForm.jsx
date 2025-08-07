import { Option, Select } from '@material-tailwind/react';
import { useState } from 'react';

const OpenTimeForm = ({ time, setTime }) => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = [0, 15, 30, 45];

    return (
        <div>
            <div className="border p-4">
                <h3 className="text-lg font-semibold mb-2">Opening Time</h3>
                <div className="flex flex-wrap gap-4">
                    {/* Open Day */}
                    <div>
                        <Select
                            label="Open Day"
                            value={time.openDay}
                            onChange={(val) => setTime({ ...time, openDay: Number(val) })}
                            variant="outlined"
                        >
                            {daysOfWeek.map((day, index) => (
                                <Option key={day} value={index}>
                                    {day}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className='flex flex-wrap gap-4'>
                        {/* Open Hour */}
                        <div>
                            <Select
                                label="Open Hour"
                                value={time.openHour}
                                onChange={(val) => setTime({ ...time, openHour: Number(val) })}
                                variant="outlined"
                            >
                                {hours.map(hour => (
                                    <Option key={hour} value={hour}>{hour.toString().padStart(2, '0')}</Option>
                                ))}
                            </Select>
                        </div>

                        {/* Open Minute */}
                        <div>
                            <Select
                                label="Open Minute"
                                value={time.openMinute}
                                onChange={(val) => setTime({ ...time, openMinute: Number(val) })}
                                variant="outlined"
                            >
                                {minutes.map(minute => (
                                    <Option key={minute} value={minute}>{minute.toString().padStart(2, '0')}</Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border p-4">
                <h3 className="text-lg font-semibold mb-2">Closing Time</h3>
                <div className="flex flex-wrap gap-4">
                    {/* Close Day */}
                    <div>
                        <Select
                            label="Close Day"
                            value={time.closeDay}
                            onChange={(val) => setTime({ ...time, closeDay: Number(val) })}
                            variant="outlined"
                        >
                            {daysOfWeek.map((day, index) => (
                                <Option key={day} value={index}>
                                    {day}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className='flex flex-wrap gap-4'>
                        {/* Close Hour */}
                        <div>
                            <Select
                                label="Close Hour"
                                value={time.closeHour}
                                onChange={(val) => setTime({ ...time, closeHour: Number(val) })}
                                variant="outlined"
                            >
                                {hours.map(hour => (
                                    <Option key={hour} value={hour}>{hour.toString().padStart(2, '0')}</Option>
                                ))}
                            </Select>
                        </div>

                        {/* Close Minute */}
                        <div>
                            <Select
                                label="Close Minute"
                                value={time.closeMinute}
                                onChange={(val) => setTime({ ...time, closeMinute: Number(val) })}
                                variant="outlined"
                            >
                                {minutes.map(minute => (
                                    <Option key={minute} value={minute}>{minute.toString().padStart(2, '0')}</Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default OpenTimeForm;