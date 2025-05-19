const Bubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  margin: 8px 0;
  background: ${({ isCurrentUser, theme }) => 
    isCurrentUser ? theme.colors.primary : theme.colors.bubble};
  align-self: ${({ isCurrentUser }) => 
    isCurrentUser ? 'flex-end' : 'flex-start'};
  color: ${({ isCurrentUser }) => 
    isCurrentUser ? 'white' : 'inherit'};
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
`;