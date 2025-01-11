import { Button } from "../../../../shared/ui/Button";
import { getStartOfWeek } from "../../lib/dateUtils";
import { Controls, Flex } from "../Calendar.styles";

interface DateNavigatorProps {
  view: "month" | "week";
  currentDate: Date;
  changeMonth: (increment: number) => void;
  changeWeek: (increment: number) => void;
}

export const DateNavigator: React.FC<DateNavigatorProps> = ({
  view,
  currentDate,
  changeMonth,
  changeWeek,
}) => (
  <Flex side="center">
    {view === "month" ? (
      <Controls>
        <Button onClick={() => changeMonth(-1)}>Prev Month</Button>
        <span>
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <Button onClick={() => changeMonth(1)}>Next Month</Button>
      </Controls>
    ) : (
      <Controls>
        <Button onClick={() => changeWeek(-1)}>Prev Week</Button>
        <span>Week of {getStartOfWeek(currentDate).toLocaleDateString()}</span>
        <Button onClick={() => changeWeek(1)}>Next Week</Button>
      </Controls>
    )}
  </Flex>
);
