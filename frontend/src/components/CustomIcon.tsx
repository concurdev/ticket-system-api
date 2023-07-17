import React from 'react';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface CustomIconProps {
  color: string;
}

const CustomIcon: React.FC<CustomIconProps> = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        left: '40px',
        zIndex: '1',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '33px',
          height: '33px',
          border: '1.3px solid #569DFD',
          borderRadius: '8px',
          boxSizing: 'border-box',
          margin: '2px',
        }}
      >
        <CalendarTodayOutlinedIcon style={{ fontSize: 'medium', color: 'black' }} />
        <div
          style={{
            position: 'absolute',
            bottom: '-2px',
            right: '4px',
            backgroundColor: 'white',
            clipPath: 'circle(8px at center)',
          }}
        >
          <AccessTimeIcon style={{ fontSize: 'small', color: 'black' }} />
        </div>
      </div>
      <span style={{ color: 'black', fontSize: '12px', fontWeight: 'bold', marginLeft: '5px' }}>
        Timeline
      </span>
    </div>
  );
};

export default CustomIcon;
