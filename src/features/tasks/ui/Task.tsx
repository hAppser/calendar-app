import * as Styled from "./Task.styles";

export type TTask = { text: string };

const Task = ({ text }: TTask) => {
  return <Styled.TaskItem>{text}</Styled.TaskItem>;
};
export default Task;
