import React, { useEffect, useState } from 'react';
import { SocketContext } from '../context';
import styled from 'styled-components';
import { Typography, Avatar, Box } from '@mui/material';

const TypingIndicator = ({ roomId }) => {
  const [typingUsers, setTypingUsers] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const handleTypingStart = (user) => {
      setTypingUsers(prev => [...prev.filter(u => u.id !== user.id), user]);
    };

    const handleTypingStop = (userId) => {
      setTypingUsers(prev => prev.filter(user => user.id !== userId));
    };

    socket.on('userTypingStart', handleTypingStart);
    socket.on('userTypingStop', handleTypingStop);

    return () => {
      socket.off('userTypingStart', handleTypingStart);
      socket.off('userTypingStop', handleTypingStop);
    };
  }, [roomId]);

  if (typingUsers.length === 0) return null;

  return (
    <IndicatorContainer>
      {typingUsers.slice(0, 3).map(user => (
        <Avatar 
          key={user.id} 
          src={user.avatar} 
          sx={{ width: 24, height: 24, mr: 1 }} 
        />
      ))}
      <Typography variant="caption" color="textSecondary">
        {typingUsers.length > 1 
          ? `${typingUsers[0].username} and ${typingUsers.length - 1} others are typing...`
          : `${typingUsers[0].username} is typing...`}
        <Dots>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </Dots>
      </Typography>
    </IndicatorContainer>
  );
};

const IndicatorContainer = styled(Box)`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: ${({ theme }) => theme.palette.grey[100]};
  border-radius: 18px;
  margin-left: 8px;
  margin-bottom: 4px;
  width: fit-content;
`;

const Dots = styled.span`
  span {
    opacity: 0;
    animation: dotPulse 1.5s infinite;
    
    &:nth-child(1) { animation-delay: 0s }
    &:nth-child(2) { animation-delay: 0.2s }
    &:nth-child(3) { animation-delay: 0.4s }
  }

  @keyframes dotPulse {
    0%, 100% { opacity: 0.1 }
    50% { opacity: 1 }
  }
`;

export default TypingIndicator;