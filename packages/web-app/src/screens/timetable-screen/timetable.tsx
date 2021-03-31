/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import _ from 'lodash';
import { Grid, Typography, useTheme } from '@material-ui/core';
import { startOfDay, parseISO } from 'date-fns';
import DateFormatter from 'src/utils/format/date-formatter';
import { TimetableScheduleItem } from 'src/gql/common/types';
import TimetableEntry from './timetable-entry';
import TimetableRow from './timetable-row';

export interface TimetableProps {
    scheduleItems: TimetableScheduleItem[];
}

interface DayPartitionProps {
    day: Date;
}

const DayPartition: React.FC<DayPartitionProps> = ({ day }) => (
    <Grid container spacing={1}>
        <Grid item xs={4}>
            {DateFormatter.toShortDate(day)}
        </Grid>
        <Grid item xs={8}>
            {DateFormatter.toDay(day)}
        </Grid>
    </Grid>
);

const Timetable: React.FC<TimetableProps> = ({ scheduleItems }) => {
    const groupedItems = _.groupBy(scheduleItems, (scheduleItem) =>
        scheduleItem.startTime ? startOfDay(scheduleItem.startTime).toISOString() : new Date(0).toISOString()
    );

    const scheduleDays = Object.keys(groupedItems).map((key) => ({
        day: key === new Date(0).toISOString() ? null : parseISO(key),
        scheduleItems: groupedItems[key] as TimetableScheduleItem[],
    }));

    const theme = useTheme();

    return (
        <>
            <Grid container direction='column' justify='center' alignItems='center'>
                <Grid item style={{ marginBottom: theme.spacing(2) }}>
                    <Typography>Timetable</Typography>
                </Grid>
            </Grid>
            <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                {scheduleDays.map(({ day, scheduleItems }) => (
                    <Grid item key={day?.toISOString() || 'null'} style={{ width: '500px' }}>
                        {day && <DayPartition day={day} />}
                        {scheduleItems.map((scheduleItem) => (
                            <TimetableRow scheduleItem={scheduleItem} key={scheduleItem.schedulableId} />
                        ))}
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Timetable;
