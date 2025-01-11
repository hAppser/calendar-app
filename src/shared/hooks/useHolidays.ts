import { useEffect, useState, useMemo } from "react";
import { fetchWorldwideHolidays } from "../api/holidaysApi";

interface HolidayCache {
  [year: number]: Record<string, string>;
}

export const useHolidays = (year: number): Record<string, string> => {
  const [holidayCache, setHolidayCache] = useState<HolidayCache>({});

  useEffect(() => {
    const loadHolidays = async () => {
      if (!holidayCache[year]) {
        const data = await fetchWorldwideHolidays(year);
        setHolidayCache((prevCache) => ({
          ...prevCache,
          [year]: data,
        }));
      }
    };

    loadHolidays();
  }, [year, holidayCache]);

  const holidays = useMemo(
    () => holidayCache[year] || {},
    [year, holidayCache]
  );

  return holidays;
};
