import axios from "axios";

const API_BASE = "https://date.nager.at/api/v3/NextPublicHolidaysWorldwide";

export const fetchHolidays = async (): Promise<Record<string, string>> => {
  const response = await axios.get(`${API_BASE}`);
  const holidays = response.data;

  return holidays.reduce(
    (
      acc: Record<string, string>,
      holiday: { date: string; localName: string }
    ) => {
      acc[holiday.date] = holiday.localName;
      return acc;
    },
    {}
  );
};
