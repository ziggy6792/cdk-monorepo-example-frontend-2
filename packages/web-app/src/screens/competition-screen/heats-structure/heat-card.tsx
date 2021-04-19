import React from 'react';
import { Card, Grid, makeStyles, Typography, useTheme } from '@material-ui/core';
import { useHistory } from 'react-router';
import LiveIndicator from './live-indicator';

interface StyleProps {
  cardWidth?: number;
  highlightColor?: string;
  cursor?: string;
}

export enum HeatCardStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  READY_OR_FINISHED = 'READY_OR_FINISHED',
}

const useStyles = makeStyles((theme) => ({
  container: { margin: 8 },
  heatCard: (props: StyleProps) => ({
    padding: theme.spacing(2,1),
    width: props.cardWidth,
    // height: 200,
    borderLeft: `3px solid ${props.highlightColor}`,
    background: `${props.highlightColor}1a`,
    cursor: props.cursor,
    opacity: props.cursor === 'default' && '0.2',
    '&:hover': {
      opacity: 1,
      boxShadow: theme.shadows[5],
    },
  }),
  heatCardTitle: {
    whiteSpace: 'nowrap',
  },
  contestants: {
    fontSize: '1rem',
    whiteSpace: 'nowrap',
    lineHeight: 1,
    padding: '16px 8px 0',
  }
}));

const statusColors = {
  [HeatCardStatus.NOT_STARTED]: '#34495e',
  [HeatCardStatus.IN_PROGRESS]: '#17a2b8',
  [HeatCardStatus.READY_OR_FINISHED]: '#ecf0f1',
};

const statusCursor = {
  [HeatCardStatus.NOT_STARTED]: 'default',
  [HeatCardStatus.IN_PROGRESS]: 'pointer',
  [HeatCardStatus.READY_OR_FINISHED]: 'pointer',
};

interface IHeatCardProps {
  title: React.ReactNode;
  onClick: () => void;
  content?: React.ReactNode;
  status?: HeatCardStatus;
  width?: number;
}

const HeatCard: React.FC<IHeatCardProps> = ({ title, content = '', status, width = 151, onClick }) => {
  const classes = useStyles({
    highlightColor: statusColors[status] || '#ffffffff',
    cursor: statusCursor[status] || 'default',
    cardWidth: width,
  });
  const theme = useTheme();

  return (
    <Card className={classes.heatCard} onClick={onClick}>
      <Grid container direction='row' justify='space-between' style={{ position: 'relative' }}>
        <Grid item>
          <Typography component='div' variant='h4' className={classes.heatCardTitle}>
            {title}
          </Typography>
        </Grid>
        {status === HeatCardStatus.IN_PROGRESS &&
          <Grid item style={{ position: 'absolute', right: 4, top: -4 }}>
            <LiveIndicator pulse />
          </Grid>
        }
      </Grid>
      <Typography
        variant='h6'
        className={classes.contestants}
      >
        {content}
      </Typography>
    </Card>
  );
};

export default HeatCard;
