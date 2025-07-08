export const fitnessHistory = [
  { date: 'Jul 23', chest: 40, waist: 32, hip: 38 },
  { date: 'Aug 23', chest: 40.2, waist: 32.1, hip: 38.1 },
  { date: 'Sep 23', chest: 40.5, waist: 32.3, hip: 38.2 },
  { date: 'Oct 23', chest: 40.3, waist: 32.5, hip: 38.5 },
  { date: 'Nov 23', chest: 40.8, waist: 32.4, hip: 38.7 },
  { date: 'Dec 23', chest: 41, waist: 33, hip: 39 },
  { date: 'Jan 24', chest: 41.2, waist: 32.8, hip: 39.1 },
  { date: 'Feb 24', chest: 41.5, waist: 32.9, hip: 39.3 },
  { date: 'Mar 24', chest: 41.3, waist: 33.1, hip: 39.2 },
  { date: 'Apr 24', chest: 41.6, waist: 33.0, hip: 39.5 },
  { date: 'May 24', chest: 41.8, waist: 33.2, hip: 39.6 },
  { date: 'Jun 24', chest: 42, waist: 33.5, hip: 39.8 },
];

export type FitnessEntry = (typeof fitnessHistory)[0];
