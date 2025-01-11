import axios from "axios";

const API_BASE = "https://date.nager.at/api/v3";
const YEAR = new Date().getFullYear();

interface Country {
  countryCode: string;
  name: string;
}

interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties?: string[];
  launchYear?: number;
  type: string;
}

type HolidayCounts = Record<string, Record<string, number>>;

export const fetchAvailableCountries = async (): Promise<Country[]> => {
  const response = await axios.get<Country[]>(`${API_BASE}/AvailableCountries`);
  return response.data;
};

export const fetchHolidays = async (): Promise<Record<string, string>> => {
  const response = await axios.get<Holiday[]>(
    `${API_BASE}/NextPublicHolidaysWorldwide`
  );
  const holidays = response.data;
  return holidays.reduce((acc: Record<string, string>, holiday: Holiday) => {
    acc[holiday.date] = holiday.name;
    return acc;
  }, {});
};

export const fetchHolidaysForCountry = async (
  year: number,
  countryCode: string
): Promise<Record<string, string>> => {
  const response = await axios.get<Holiday[]>(
    `${API_BASE}/PublicHolidays/${year}/${countryCode}`
  );
  const holidays = response.data;

  return holidays.reduce((acc: Record<string, string>, holiday: Holiday) => {
    acc[holiday.date] = holiday.name;
    return acc;
  }, {});
};

export const fetchWorldwideHolidays = async (
  year: number = 2025
): Promise<Record<string, string>> => {
  const countries = await fetchAvailableCountries();

  const holidayCounts: HolidayCounts = {};

  const holidayPromises = countries.map(async (country) => {
    const response = await axios.get<Holiday[]>(
      `${API_BASE}/PublicHolidays/${year}/${country.countryCode}`
    );
    const holidays = response.data;
    holidays.forEach((holiday) => {
      if (!holidayCounts[holiday.date]) {
        holidayCounts[holiday.date] = {};
      }

      if (!holidayCounts[holiday.date][holiday.name]) {
        holidayCounts[holiday.date][holiday.name] = 0;
      }

      holidayCounts[holiday.date][holiday.name]++;
    });
  });

  await Promise.all(holidayPromises);

  const mostPopularHolidays: Record<string, string> = {};

  Object.entries(holidayCounts).forEach(([date, holidays]) => {
    const [mostPopular] = Object.entries(holidays).sort((a, b) => b[1] - a[1]);

    mostPopularHolidays[date] = mostPopular ? mostPopular[0] : "";
  });

  const startDate = new Date(`${YEAR}-01-01`);
  const endDate = new Date(`${YEAR}-12-31`);

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const dateString = date.toISOString().split("T")[0];
    if (!mostPopularHolidays[dateString]) {
      mostPopularHolidays[dateString] = "";
    }
  }

  return mostPopularHolidays;
};
