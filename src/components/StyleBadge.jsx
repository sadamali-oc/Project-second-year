// import { useTheme } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/system';

const StyledBadge = styled(Badge)(({ theme, color }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: color || '#44b700',
    color: color || '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '150%',
      height: '150%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

function StyleBadge(props) {
//   const theme = useTheme();
  return <StyledBadge {...props} />;
}

export default StyleBadge;
