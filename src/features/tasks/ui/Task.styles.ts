import styled from "styled-components";

export const TaskList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const TaskInput = styled.input`
  width: 100%;
  margin: 4px 0;
  padding: 4px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const TaskButton = styled.button`
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  margin-top: 4px;

  &:hover {
    background-color: #40a9ff;
  }

  &:disabled {
    background-color: #d9d9d9;
    cursor: not-allowed;
  }
`;

export const TaskItem = styled.div`
  width: 90%;
  background: #f9f9f9;
  margin: 0 auto;
  padding: 5px;
  word-break: break-word;
`;
