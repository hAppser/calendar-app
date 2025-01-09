import { TTask } from "../useTasks";
import Task from "./Task";
import * as Styled from "./Task.styles";

type TTasks = { tasks: TTask[] };

const TaskList = ({ tasks }: TTasks) => {
  return (
    <Styled.TaskList>
      {tasks.length > 0 &&
        tasks?.map((task, index) => {
          return <Task key={index} text={task.text} />;
        })}
    </Styled.TaskList>
  );
};

export default TaskList;
