import { Button } from "../../../../shared/ui/Button";
import { Controls } from "../Calendar.styles";

interface ViewSwitcherProps {
  view: "month" | "week";
  setView: (view: "month" | "week") => void;
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ setView }) => (
  <Controls side="end">
    <Button onClick={() => setView("month")}>Month</Button>
    <Button onClick={() => setView("week")}>Week</Button>
  </Controls>
);
