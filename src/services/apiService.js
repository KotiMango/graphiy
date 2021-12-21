import axios from 'axios';

const COUNTRIES = [
  'france',
  'spain',
  'israel',
  'south-africa',
  'japan',
];
function replaceRange(s, start, end, substitute) {
  return s.substring(0, start) + substitute + s.substring(end);
}

export const fetchDataSet = async (spanStr, setDataset) => {
  const dataArr = [];
  const cleanSpan = spanStr
    .split('&')
    .map((str) =>
      str.includes('from')
        ? replaceRange(str, 16, 29, '00:00:00Z')
        : replaceRange(str, 14, 27, '00:00:00Z')
    )
    .join('&');
  console.log(cleanSpan);

  for (const countryStr of COUNTRIES) {
    const res = await axios.get(
      `https://api.covid19api.com/live/country/${countryStr}/status/active?${cleanSpan}`
    );
    dataArr.push(res.data);
  }
  setDataset(dataArr);
};
