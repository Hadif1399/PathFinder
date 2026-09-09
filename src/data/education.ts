export interface University {
  name: string;
  location: 'Malaysia' | 'Overseas';
  country?: string;
  program: string;
  duration: string;
  annualFee: string;
  totalCost: string;
  ranking?: string;
  notes?: string;
}

export interface PreUniversity {
  name: string;
  type: 'Foundation' | 'A-Levels' | 'STPM' | 'Matriculation' | 'Diploma' | 'IB';
  duration: string;
  cost: string;
  institutions: string[];
  notes?: string;
}

export const commonPreUniversity: PreUniversity[] = [
  { name: 'Foundation in Science/Computing', type: 'Foundation', duration: '1 year', cost: 'RM 12,000 - RM 28,000', institutions: ['UM', 'USM', 'UTM', 'Taylor\'s', 'Sunway', 'APU', 'Monash Malaysia'], notes: 'Direct pathway to degree at same university' },
  { name: 'A-Levels (Cambridge/Edexcel)', type: 'A-Levels', duration: '1.5-2 years', cost: 'RM 18,000 - RM 38,000', institutions: ['Taylor\'s', 'Sunway', 'HELP', 'Kolej MARA Banting'], notes: 'Gold standard for international recognition' },
  { name: 'STPM (Malaysian Higher Certificate)', type: 'STPM', duration: '1.5-2.5 years', cost: 'RM 500 - RM 3,000', institutions: ['Government secondary schools', 'Private colleges'], notes: 'Most affordable, equivalent to A-Levels' },
  { name: 'Matriculation Programme', type: 'Matriculation', duration: '1 year', cost: 'RM 1,500 - RM 5,000', institutions: ['Kolej Matrikulasi (MOE)'], notes: 'Heavily subsidized by government' },
  { name: 'Diploma Programs', type: 'Diploma', duration: '2-2.5 years', cost: 'RM 15,000 - RM 45,000', institutions: ['UiTM', 'Politeknik', 'APU', 'INTI'], notes: 'Can enter degree Year 2 upon completion' },
  { name: 'International Baccalaureate (IB)', type: 'IB', duration: '2 years', cost: 'RM 40,000 - RM 60,000', institutions: ['International schools'], notes: 'Internationally recognized, holistic approach' },
];

export const universitiesMalaysia = {
  publicTop: [
    { name: 'Universiti Malaya (UM)', location: 'Malaysia' as const, program: 'Various STEM & IT programs', duration: '3-4 years', annualFee: 'RM 3,000 - RM 8,000', totalCost: 'RM 9,000 - RM 32,000', ranking: 'QS World Ranking #65', notes: 'Top public university' },
    { name: 'Universiti Sains Malaysia (USM)', location: 'Malaysia' as const, program: 'Various STEM & IT programs', duration: '3-4 years', annualFee: 'RM 3,000 - RM 7,500', totalCost: 'RM 9,000 - RM 30,000', ranking: 'QS World Ranking #137', notes: 'APEX university, strong research' },
    { name: 'Universiti Teknologi Malaysia (UTM)', location: 'Malaysia' as const, program: 'Engineering & Technology', duration: '3-4 years', annualFee: 'RM 3,500 - RM 8,000', totalCost: 'RM 10,500 - RM 32,000', ranking: 'QS World Ranking #188', notes: 'Excellent for engineering' },
  ],
  privateTop: [
    { name: 'Asia Pacific University (APU)', location: 'Malaysia' as const, program: 'IT, Computing, Engineering', duration: '3 years', annualFee: 'RM 32,000 - RM 48,000', totalCost: 'RM 96,000 - RM 144,000', ranking: 'Top Private IT University', notes: 'Industry partnerships, dual degree options' },
    { name: 'Multimedia University (MMU)', location: 'Malaysia' as const, program: 'IT, Engineering, Multimedia', duration: '3-4 years', annualFee: 'RM 28,000 - RM 42,000', totalCost: 'RM 84,000 - RM 168,000', ranking: 'Top Private IT University', notes: 'Located in Cyberjaya' },
    { name: 'Taylor\'s University', location: 'Malaysia' as const, program: 'Various programs', duration: '3-4 years', annualFee: 'RM 38,000 - RM 55,000', totalCost: 'RM 114,000 - RM 220,000', ranking: 'Top Private University', notes: 'Excellent facilities' },
  ],
  specialized: [],
};

export const universitiesOverseas = {
  singapore: [
    { name: 'National University of Singapore (NUS)', location: 'Overseas' as const, country: 'Singapore', program: 'Various STEM & IT programs', duration: '4 years', annualFee: 'SGD 28,000 - SGD 42,000', totalCost: 'SGD 112,000 - SGD 168,000 (RM 336,000 - RM 504,000)', ranking: 'QS World Ranking #8', notes: 'Top university in Asia' },
  ],
  australia: [
    { name: 'University of Melbourne', location: 'Overseas' as const, country: 'Australia', program: 'Various STEM programs', duration: '3-4 years', annualFee: 'AUD 38,000 - AUD 52,000', totalCost: 'AUD 114,000 - AUD 208,000 (RM 308,000 - RM 562,000)', ranking: 'QS World Ranking #14', notes: 'Excellent research' },
  ],
  uk: [
    { name: 'University of Manchester', location: 'Overseas' as const, country: 'United Kingdom', program: 'Various STEM programs', duration: '3 years', annualFee: 'GBP 23,000 - GBP 32,000', totalCost: 'GBP 69,000 - GBP 96,000 (RM 345,000 - RM 480,000)', ranking: 'QS World Ranking #32', notes: 'Strong industry links' },
  ],
  usa: [
    { name: 'Massachusetts Institute of Technology (MIT)', location: 'Overseas' as const, country: 'United States', program: 'Engineering, Computer Science', duration: '4 years', annualFee: 'USD 55,000 - USD 60,000', totalCost: 'USD 220,000 - USD 240,000 (RM 990,000 - RM 1,080,000)', ranking: 'QS World Ranking #1', notes: 'Top university globally' },
  ],
  japan: [
    { name: 'University of Tokyo', location: 'Overseas' as const, country: 'Japan', program: 'Various STEM programs', duration: '4 years', annualFee: 'JPY 535,800', totalCost: 'JPY 2,143,200 (RM 60,000 - RM 70,000)', ranking: 'QS World Ranking #28', notes: 'MEXT scholarship available' },
  ],
  southKorea: [
    { name: 'KAIST', location: 'Overseas' as const, country: 'South Korea', program: 'Engineering, Computer Science', duration: '4 years', annualFee: 'KRW 4,000,000 - KRW 6,000,000', totalCost: 'KRW 16,000,000 - KRW 24,000,000 (RM 50,000 - RM 75,000)', ranking: 'QS World Ranking #41', notes: 'GKS scholarship available' },
  ],
  germany: [
    { name: 'Technical University of Munich (TUM)', location: 'Overseas' as const, country: 'Germany', program: 'Engineering, Computer Science', duration: '3 years', annualFee: '€500 - €1,500', totalCost: '€10,000 - €12,000 living costs per year', ranking: 'QS World Ranking #37', notes: 'Low tuition fees' },
  ],
};
