import styled from "styled-components";

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 1rem;
`;

export const Weekday = styled.div`
  text-align: center;
  font-weight: bold;
  color: #555;
`;

export const Flex = styled.div<{ side?: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ side }) => (side ? side : "normal")};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-top: 1px solid #ccc;
  padding-top: 0.5rem;
`;

export const Controls = styled.div<{ side?: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ side }) => (side ? side : "normal")};
  gap: 0.5rem;
`;

export const Day = styled.div<{ isEmpty: boolean; isInactive: boolean }>`
  position: relative;
  height: 150px;
  background: ${({ isEmpty }) => (isEmpty ? "transparent" : "#efefef")};
  border: ${({ isEmpty }) => (isEmpty ? "none" : "1px solid #ddd")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: ${({ isEmpty }) => (isEmpty ? "default" : "pointer")};
  border-radius: 4px;

  opacity: ${({ isInactive }) => (isInactive ? 0.5 : 1)};
`;

export const DayNumber = styled.div`
  position: absolute;
  top: 1px;
  left: 1px;
  padding: 2px;
`;

export const SearchBar = styled.div`
  margin-bottom: 16px;
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
`;
