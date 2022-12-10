// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

LogNewActivity.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  total: PropTypes.number,
  activity: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
LogNewActivity.defaultProps = {
  total: 0,
};

export default function LogNewActivity({ title, total, icon, activity, color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        py: 2,
        px: 3,
        boxShadow: 2,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        width: {
          xs: 500, // theme.breakpoints.up('xs')
          sm: 500, // theme.breakpoints.up('sm')
          md: 500, // theme.breakpoints.up('md')
          lg: 500, // theme.breakpoints.up('lg')
          xl: 500, // theme.breakpoints.up('xl')
        },
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </StyledIcon>
      <Typography variant="h3">{activity}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
