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

export const universitiesMalaysia = {
  publicTop: [
    {
      name: 'Universiti Malaya (UM)',
      location: 'Malaysia' as const,
      program: 'Various STEM & IT programs',
      duration: '3-4 years',
      annualFee: 'RM 3,000 - RM 8,000',
      totalCost: 'RM 9,000 - RM 32,000',
      ranking: 'QS World Ranking #65',
      notes: 'Top public university, highly competitive, excellent research facilities',
    },
    {
      name: 'Universiti Sains Malaysia (USM)',
      location: 'Malaysia' as const,
      program: 'Various STEM & IT programs',
      duration: '3-4 years',
      annualFee: 'RM 3,000 - RM 7,500',
      totalCost: 'RM 9,000 - RM 30,000',
      ranking: 'QS World Ranking #137',
      notes: 'APEX university status, strong research focus, located in Penang',
    },
    {
      name: 'Universiti Teknologi Malaysia (UTM)',
      location: 'Malaysia' as const,
      program: 'Engineering & Technology programs',
      duration: '3-4 years',
      annualFee: 'RM 3,500 - RM 8,000',
      totalCost: 'RM 10,500 - RM 32,000',
      ranking: 'QS World Ranking #188',
      notes: 'Excellent for engineering and technology, strong industry links',
    },
  ],
  privateTop: [
    {
      name: 'Asia Pacific University (APU)',
      location: 'Malaysia' as const,
      program: 'IT, Computing, Engineering programs',
      duration: '3 years',
      annualFee: 'RM 32,000 - RM 48,000',
      totalCost: 'RM 96,000 - RM 144,000',
      ranking: 'Top Private IT University',
      notes: 'Industry partnerships, dual degree options with UK universities',
    },
    {
      name: 'Multimedia University (MMU)',
      location: 'Malaysia' as const,
      program: 'IT, Engineering, Multimedia programs',
      duration: '3-4 years',
      annualFee: 'RM 28,000 - RM 42,000',
      totalCost: 'RM 84,000 - RM 168,000',
      ranking: 'Top Private IT University',
      notes: 'Located in Cyberjaya, strong tech industry connections',
    },
    {
      name: 'Taylor\'s University',
      location: 'Malaysia' as const,
      program: 'Various programs',
      duration: '3-4 years',
      annualFee: 'RM 38,000 - RM 55,000',
      totalCost: 'RM 114,000 - RM 220,000',
      ranking: 'Top Private University',
      notes: 'Excellent facilities, international exposure, strong graduate employment',
    },
  ],
};

export const universitiesOverseas = {
  singapore: [
    {
      name: 'National University of Singapore (NUS)',
      location: 'Overseas' as const,
      country: 'Singapore',
      program: 'Various STEM & IT programs',
      duration: '4 years',
      annualFee: 'SGD 28,000 - SGD 42,000',
      totalCost: 'SGD 112,000 - SGD 168,000 (RM 336,000 - RM 504,000)',
      ranking: 'QS World Ranking #8',
      notes: 'Top university in Asia, highly competitive, excellent scholarships available',
    },
  ],
  australia: [
    {
      name: 'University of Melbourne',
      location: 'Overseas' as const,
      country: 'Australia',
      program: 'Various STEM programs',
      duration: '3-4 years',
      annualFee: 'AUD 38,000 - AUD 52,000',
      totalCost: 'AUD 114,000 - AUD 208,000 (RM 308,000 - RM 562,000)',
      ranking: 'QS World Ranking #14',
      notes: 'Excellent research, good post-study work visa (2-4 years)',
    },
  ],
  uk: [
    {
      name: 'University of Manchester',
      location: 'Overseas' as const,
      country: 'United Kingdom',
      program: 'Various STEM programs',
      duration: '3 years',
      annualFee: 'GBP 23,000 - GBP 32,000',
      totalCost: 'GBP 69,000 - GBP 96,000 (RM 345,000 - RM 480,000)',
      ranking: 'QS World Ranking #32',
      notes: 'Strong industry links, good graduate employment rates',
    },
  ],
  usa: [
    {
      name: 'Massachusetts Institute of Technology (MIT)',
      location: 'Overseas' as const,
      country: 'United States',
      program: 'Engineering, Computer Science',
      duration: '4 years',
      annualFee: 'USD 55,000 - USD 60,000',
      totalCost: 'USD 220,000 - USD 240,000 (RM 990,000 - RM 1,080,000)',
      ranking: 'QS World Ranking #1',
      notes: 'Top university globally, need-based financial aid available',
    },
  ],
  japan: [
    {
      name: 'University of Tokyo',
      location: 'Overseas' as const,
      country: 'Japan',
      program: 'Various STEM programs',
      duration: '4 years',
      annualFee: 'JPY 535,800',
      totalCost: 'JPY 2,143,200 (RM 60,000 - RM 70,000)',
      ranking: 'QS World Ranking #28',
      notes: 'Top university in Japan, MEXT scholarship covers full costs',
    },
  ],
  southKorea: [
    {
      name: 'KAIST',
      location: 'Overseas' as const,
      country: 'South Korea',
      program: 'Engineering, Computer Science',
      duration: '4 years',
      annualFee: 'KRW 4,000,000 - KRW 6,000,000',
      totalCost: 'KRW 16,000,000 - KRW 24,000,000 (RM 50,000 - RM 75,000)',
      ranking: 'QS World Ranking #41',
      notes: 'Top science & tech university, GKS scholarship available',
    },
  ],
  germany: [
    {
      name: 'Technical University of Munich (TUM)',
      location: 'Overseas' as const,
      country: 'Germany',
      program: 'Engineering, Computer Science',
      duration: '3 years',
      annualFee: '€500 - €1,500',
      totalCost: '€10,000 - €12,000 living costs per year',
      ranking: 'QS World Ranking #37',
      notes: 'Low tuition fees, strong engineering focus, DAAD scholarships available',
    },
  ],
};

export const commonPreUniversity = [
  {
    name: 'Foundation in Science/Computing',
    type: 'Foundation',
    duration: '1 year',
    cost: 'RM 12,000 - RM 28,000',
    institutions: ['UM', 'USM', 'UTM', 'Taylor\'s', 'Sunway', 'APU'],
    notes: 'Direct pathway to degree at same university',
  },
  {
    name: 'A-Levels',
    type: 'A-Levels',
    duration: '1.5-2 years',
    cost: 'RM 18,000 - RM 38,000',
    institutions: ['Taylor\'s', 'Sunway', 'HELP', 'Kolej MARA Banting'],
    notes: 'Gold standard for international recognition',
  },
  {
    name: 'STPM',
    type: 'STPM',
    duration: '1.5-2.5 years',
    cost: 'RM 500 - RM 3,000',
    institutions: ['Government schools', 'Private colleges'],
    notes: 'Most affordable, equivalent to A-Levels',
  },
];
