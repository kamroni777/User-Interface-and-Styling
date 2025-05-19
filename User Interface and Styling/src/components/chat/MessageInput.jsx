
const InputContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background};
  border-top: 1px solid rgba(0,0,0,0.1);

  textarea {
    flex: 1;
    border-radius: 20px;
    padding: 12px 16px;
    border: none;
    resize: none;
    max-height: 120px;
  }
`;