export interface Scholarship {
  name: string;
  provider: string;
  coverage: 'Full' | 'Partial' | 'Tuition';
  location: 'Malaysia' | 'Overseas';
  level: 'Foundation' | 'Diploma' | 'Degree' | 'Master' | 'PhD';
  description?: string;
}

export interface Career {
  id: string;
  title: string;
  titleMalay: string;
  category: 'STEM' | 'IT' | 'Healthcare' | 'Business' | 'Creative' | 'Education';
  icon: string;
  color: string;
  description: string;
  spmRequirements: { subject: string; grade: string }[];
  personalityTraits: string[];
  hollandCode: string;
  mbtiTypes: string[];
  pathways: { type: string; duration: string; institutions: string[] }[];
  workEnvironment: string;
  dayInLife: string[];
  salaryRange: string;
  demandLevel: 'High' | 'Very High' | 'Critical';
  npcName: string;
  npcEmoji: string;
  scholarships: Scholarship[];
}

// Scholarship definitions
const jpaScholarship: Scholarship = { name: 'JPA Scholarship', provider: 'Jabatan Perkhidmatan Awam', coverage: 'Full', location: 'Malaysia', level: 'Degree', description: 'Full sponsorship for top SPM achievers' };
const maraScholarship: Scholarship = { name: 'MARA Young Talent Programme', provider: 'MARA', coverage: 'Full', location: 'Malaysia', level: 'Degree', description: 'For Bumiputera students with excellent SPM results' };
const khazanahScholarship: Scholarship = { name: 'Khazanah Global Scholarship', provider: 'Khazanah Nasional', coverage: 'Full', location: 'Overseas', level: 'Degree', description: 'Prestigious scholarship for top global universities' };
const petronasScholarship: Scholarship = { name: 'Petronas Education Sponsorship', provider: 'Petronas', coverage: 'Full', location: 'Malaysia', level: 'Degree', description: 'Full sponsorship with employment bond' };
const simeDarbyScholarship: Scholarship = { name: 'Yayasan Sime Darby Scholarship', provider: 'Yayasan Sime Darby', coverage: 'Full', location: 'Overseas', level: 'Degree', description: 'For outstanding STEM and business students' };
const ytlScholarship: Scholarship = { name: 'YTL Foundation Scholarship', provider: 'YTL Foundation', coverage: 'Full', location: 'Overseas', level: 'Degree', description: 'For engineering and IT students at top UK universities' };
const uemScholarship: Scholarship = { name: 'Yayasan UEM Scholarship', provider: 'Yayasan UEM', coverage: 'Full', location: 'Malaysia', level: 'Degree', description: 'For engineering and technology students' };
const tmScholarship: Scholarship = { name: 'Telekom Malaysia Scholarship', provider: 'TM Foundation', coverage: 'Full', location: 'Malaysia', level: 'Degree', description: 'For ICT and engineering students' };
const maxisScholarship: Scholarship = { name: 'Maxis Scholarship', provider: 'Maxis Foundation', coverage: 'Full', location: 'Malaysia', level: 'Degree', description: 'For ICT and telecommunications students' };
const bnmScholarship: Scholarship = { name: 'Bank Negara Malaysia Kijang Scholarship', provider: 'Bank Negara Malaysia', coverage: 'Full', location: 'Overseas', level: 'Degree', description: 'For top students in economics and related fields' };
const maybankScholarship: Scholarship = { name: 'Maybank Foundation Scholarship', provider: 'Maybank Foundation', coverage: 'Full', location: 'Malaysia', level: 'Degree', description: 'For underprivileged students' };
const cimbScholarship: Scholarship = { name: 'CIMB ASEAN Scholarship', provider: 'CIMB Group', coverage: 'Full', location: 'Overseas', level: 'Degree', description: 'For studies in top ASEAN universities' };
const tenagaScholarship: Scholarship = { name: 'Tenaga Nasional Scholarship', provider: 'Tenaga Nasional Berhad', coverage: 'Full', location: 'Malaysia', level: 'Degree', description: 'For electrical and mechanical engineering' };
const gamudaScholarship: Scholarship = { name: 'Gamuda Scholarship', provider: 'Gamuda Berhad', coverage: 'Full', location: 'Overseas', level: 'Degree', description: 'For engineering students with bond' };
const pnbScholarship: Scholarship = { name: 'PNB Scholarship', provider: 'Permodalan Nasional Berhad', coverage: 'Full', location: 'Overseas', level: 'Degree', description: 'For Bumiputera students at top global universities' };
const YayasanKhazanahWatan: Scholarship = { name: 'Khazanah Watan Scholarship', provider: 'Khazanah Nasional', coverage: 'Full', location: 'Malaysia', level: 'Degree', description: 'Full scholarship at top local universities' };
const cheveningScholarship: Scholarship = { name: 'Chevening Scholarship', provider: 'UK Government', coverage: 'Full', location: 'Overseas', level: 'Master', description: 'Fully funded Master\'s at UK universities' };
const fulbrightScholarship: Scholarship = { name: 'Fulbright Scholarship', provider: 'US Government', coverage: 'Full', location: 'Overseas', level: 'Master', description: 'Fully funded Master\'s/PhD at US universities' };
const mextScholarship: Scholarship = { name: 'MEXT Scholarship', provider: 'Japanese Government', coverage: 'Full', location: 'Overseas', level: 'Degree', description: 'Full scholarship for studies in Japan' };
const gksScholarship: Scholarship = { name: 'Global Korea Scholarship', provider: 'Korean Government', coverage: 'Full', location: 'Overseas', level: 'Degree', description: 'Full scholarship for studies in South Korea' };
const australiaAwards: Scholarship = { name: 'Australia Awards Scholarship', provider: 'Australian Government', coverage: 'Full', location: 'Overseas', level: 'Master', description: 'Fully funded Master\'s at Australian universities' };
const daadScholarship: Scholarship = { name: 'DAAD Scholarship', provider: 'German Government', coverage: 'Full', location: 'Overseas', level: 'Master', description: 'For postgraduate studies in Germany' };
const stanfordScholarship: Scholarship = { name: 'Stanford Knight-Hennessy Scholars', provider: 'Stanford University', coverage: 'Full', location: 'Overseas', level: 'Master', description: 'Full graduate scholarship at Stanford' };
const oxfordScholarship: Scholarship = { name: 'Oxford Clarendon Scholarship', provider: 'University of Oxford', coverage: 'Full', location: 'Overseas', level: 'PhD', description: 'Full funding for graduate studies at Oxford' };
const mitScholarship: Scholarship = { name: 'MIT Media Lab Scholarship', provider: 'MIT', coverage: 'Partial', location: 'Overseas', level: 'PhD', description: 'Research scholarship at MIT' };

export const careers: Career[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    titleMalay: 'Jurutera Perisian',
    category: 'IT',
    icon: '💻',
    color: '#00d4ff',
    description: 'Build the digital future by designing, developing, and maintaining software applications.',
    spmRequirements: [
      { subject: 'Mathematics', grade: 'Credit (A-C)' },
      { subject: 'Additional Mathematics', grade: 'Credit (A-C)' },
      { subject: 'Physics', grade: 'Credit (A-C)' },
      { subject: 'English', grade: 'Credit (A-C)' },
      { subject: 'Computer Science', grade: 'Credit (A-C)' },
    ],
    personalityTraits: ['Analytical', 'Problem-solver', 'Detail-oriented', 'Logical thinker', 'Creative'],
    hollandCode: 'Investigative + Conventional',
    mbtiTypes: ['INTJ', 'INTP', 'ISTJ', 'ENTJ'],
    pathways: [
      { type: 'Foundation in Computing/IT', duration: '1 year', institutions: ['UM', 'USM', 'UTM', 'Taylor\'s', 'Sunway'] },
      { type: 'Diploma in IT/Software Engineering', duration: '2.5 years', institutions: ['UiTM', 'Politeknik', 'APU'] },
      { type: 'Bachelor in Computer Science', duration: '3-4 years', institutions: ['UM', 'USM', 'UTM', 'APU', 'MMU'] },
    ],
    workEnvironment: 'Modern offices with flexible work arrangements. Many tech companies offer remote work.',
    dayInLife: ['9:00 AM - Daily standup', '10:00 AM - Code review', '1:00 PM - Feature development', '3:00 PM - Pair programming', '5:00 PM - Testing'],
    salaryRange: 'RM 3,500 - RM 15,000+ / month',
    demandLevel: 'Critical',
    npcName: 'Captain Code',
    npcEmoji: '🤖',
    scholarships: [tmScholarship, maxisScholarship, jpaScholarship, maraScholarship, khazanahScholarship, simeDarbyScholarship, ytlScholarship, uemScholarship, petronasScholarship, YayasanKhazanahWatan, gksScholarship, mextScholarship, stanfordScholarship],
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    titleMalay: 'Saintis Data',
    category: 'IT',
    icon: '📊',
    color: '#a855f7',
    description: 'Transform raw data into actionable insights using machine learning and statistics.',
    spmRequirements: [
      { subject: 'Mathematics', grade: 'Distinction (A/A+)' },
      { subject: 'Additional Mathematics', grade: 'Credit (A-C)' },
      { subject: 'Physics', grade: 'Credit (A-C)' },
      { subject: 'English', grade: 'Credit (A-C)' },
    ],
    personalityTraits: ['Curious', 'Analytical', 'Patient', 'Statistical mind', 'Storyteller'],
    hollandCode: 'Investigative + Realistic',
    mbtiTypes: ['INTJ', 'INTP', 'INFJ', 'ENTP'],
    pathways: [
      { type: 'Foundation in Science/Computing', duration: '1 year', institutions: ['UM', 'USM', 'Monash Malaysia'] },
      { type: 'Bachelor in Data Science/Statistics', duration: '3-4 years', institutions: ['UM', 'USM', 'UTAR', 'APU'] },
      { type: 'Master in Data Science', duration: '1-2 years', institutions: ['UM', 'APU', 'Sunway'] },
    ],
    workEnvironment: 'Data-driven environments in banks, tech companies, and government agencies.',
    dayInLife: ['9:00 AM - Review data pipelines', '10:00 AM - Data analysis', '1:00 PM - Model training', '3:00 PM - Present findings', '5:00 PM - Research papers'],
    salaryRange: 'RM 4,000 - RM 18,000+ / month',
    demandLevel: 'Very High',
    npcName: 'Professor Patterns',
    npcEmoji: '🔬',
    scholarships: [jpaScholarship, bnmScholarship, khazanahScholarship, simeDarbyScholarship, petronasScholarship, maraScholarship, pnbScholarship, YayasanKhazanahWatan, cimbScholarship, cheveningScholarship, fulbrightScholarship, stanfordScholarship, oxfordScholarship],
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    titleMalay: 'Penganalisis Keselamatan Siber',
    category: 'IT',
    icon: '🛡️',
    color: '#22d3ee',
    description: 'Protect organizations from cyber threats by monitoring networks and analyzing vulnerabilities.',
    spmRequirements: [
      { subject: 'Mathematics', grade: 'Credit (A-C)' },
      { subject: 'Additional Mathematics', grade: 'Credit (A-C)' },
      { subject: 'Physics', grade: 'Credit (A-C)' },
      { subject: 'ICT/Computer Science', grade: 'Credit (A-C)' },
      { subject: 'English', grade: 'Credit (A-C)' },
    ],
    personalityTraits: ['Vigilant', 'Analytical', 'Ethical', 'Quick thinker', 'Persistent'],
    hollandCode: 'Investigative + Conventional',
    mbtiTypes: ['INTJ', 'ISTJ', 'INTP', 'ENTJ'],
    pathways: [
      { type: 'Diploma in Cybersecurity', duration: '2.5 years', institutions: ['UiTM', 'CyberSecurity Malaysia', 'APU'] },
      { type: 'Bachelor in Cybersecurity', duration: '3-4 years', institutions: ['APU', 'MMU', 'UTM', 'UTAR'] },
      { type: 'Professional Certifications', duration: 'Ongoing', institutions: ['CEH', 'CISSP', 'CompTIA Security+'] },
    ],
    workEnvironment: 'Security Operations Centers, government agencies, banks.',
    dayInLife: ['8:00 AM - Review alerts', '9:00 AM - Threat briefing', '11:00 AM - Vulnerability scanning', '1:00 PM - Incident response', '3:00 PM - Policy review'],
    salaryRange: 'RM 4,000 - RM 20,000+ / month',
    demandLevel: 'Critical',
    npcName: 'Agent Shield',
    npcEmoji: '🕵️',
    scholarships: [jpaScholarship, tmScholarship, maxisScholarship, maraScholarship, petronasScholarship, uemScholarship, YayasanKhazanahWatan, khazanahScholarship, simeDarbyScholarship, mextScholarship, gksScholarship, daadScholarship],
  },
  {
    id: 'ai-engineer',
    title: 'AI/Machine Learning Engineer',
    titleMalay: 'Jurutera AI/Pembelajaran Mesin',
    category: 'IT',
    icon: '🧠',
    color: '#f472b6',
    description: 'Design and build artificial intelligence systems that can learn and make decisions.',
    spmRequirements: [
      { subject: 'Mathematics', grade: 'Distinction (A/A+)' },
      { subject: 'Additional Mathematics', grade: 'Distinction (A/A+)' },
      { subject: 'Physics', grade: 'Credit (A-C)' },
      { subject: 'English', grade: 'Credit (A-C)' },
    ],
    personalityTraits: ['Innovative', 'Mathematical', 'Research-oriented', 'Patient', 'Visionary'],
    hollandCode: 'Investigative + Artistic',
    mbtiTypes: ['INTJ', 'INTP', 'ENTP', 'INFJ'],
    pathways: [
      { type: 'Foundation in Science/Engineering', duration: '1 year', institutions: ['UM', 'USM', 'UTM', 'Monash'] },
      { type: 'Bachelor in AI/Computer Science', duration: '3-4 years', institutions: ['UM', 'USM', 'APU', 'MMU'] },
      { type: 'Master/PhD in AI', duration: '2-4 years', institutions: ['UM', 'USM', 'Monash', 'NTU Singapore'] },
    ],
    workEnvironment: 'Research labs, tech companies, and startups.',
    dayInLife: ['9:00 AM - Review model results', '10:00 AM - Read research papers', '12:00 PM - Design architecture', '2:00 PM - Train models', '4:00 PM - Collaborate with team'],
    salaryRange: 'RM 5,000 - RM 25,000+ / month',
    demandLevel: 'Critical',
    npcName: 'Dr. Neural',
    npcEmoji: '🤯',
    scholarships: [jpaScholarship, khazanahScholarship, simeDarbyScholarship, petronasScholarship, bnmScholarship, pnbScholarship, maraScholarship, ytlScholarship, YayasanKhazanahWatan, stanfordScholarship, oxfordScholarship, mitScholarship, cheveningScholarship, fulbrightScholarship, mextScholarship],
  },
  {
    id: 'doctor',
    title: 'Medical Doctor',
    titleMalay: 'Doktor Perubatan',
    category: 'Healthcare',
    icon: '👨‍⚕️',
    color: '#34d399',
    description: 'Diagnose, treat, and prevent diseases to improve patient health.',
    spmRequirements: [
      { subject: 'Biology', grade: 'Distinction (A/A+)' },
      { subject: 'Chemistry', grade: 'Distinction (A/A+)' },
      { subject: 'Physics', grade: 'Credit (A-C)' },
      { subject: 'Mathematics', grade: 'Credit (A-C)' },
      { subject: 'English', grade: 'Credit (A-C)' },
    ],
    personalityTraits: ['Compassionate', 'Resilient', 'Detail-oriented', 'Communicator', 'Lifelong learner'],
    hollandCode: 'Social + Investigative',
    mbtiTypes: ['INFJ', 'ISFJ', 'ENFJ', 'INTJ'],
    pathways: [
      { type: 'Foundation in Science', duration: '1 year', institutions: ['UM', 'USM', 'UKM', 'IMU'] },
      { type: 'MBBS/MD Programme', duration: '5 years', institutions: ['UM', 'USM', 'UKM', 'IMU', 'MAHSA'] },
      { type: 'Housemanship + Specialization', duration: '2+4 years', institutions: ['MOH Hospitals'] },
    ],
    workEnvironment: 'Hospitals, clinics, and healthcare facilities.',
    dayInLife: ['7:00 AM - Ward round', '9:00 AM - Outpatient clinic', '12:00 PM - Case discussions', '2:00 PM - Procedures', '4:00 PM - Documentation'],
    salaryRange: 'RM 4,500 - RM 30,000+ / month',
    demandLevel: 'Critical',
    npcName: 'Dr. Healing',
    npcEmoji: '💊',
    scholarships: [jpaScholarship, maraScholarship, khazanahScholarship, simeDarbyScholarship, petronasScholarship, bnmScholarship, maybankScholarship, pnbScholarship, cheveningScholarship, fulbrightScholarship, mextScholarship],
  },
  {
    id: 'accountant',
    title: 'Accountant',
    titleMalay: 'Akauntan',
    category: 'Business',
    icon: '📊',
    color: '#10b981',
    description: 'Manage financial records, prepare tax returns, and provide financial advice.',
    spmRequirements: [
      { subject: 'Mathematics', grade: 'Credit (A-C)' },
      { subject: 'English', grade: 'Credit (A-C)' },
      { subject: 'Commerce/Accounts', grade: 'Credit (A-C)' },
    ],
    personalityTraits: ['Detail-oriented', 'Analytical', 'Organized', 'Ethical', 'Numerical'],
    hollandCode: 'Conventional + Investigative',
    mbtiTypes: ['ISTJ', 'ESTJ', 'INTJ', 'ISFJ'],
    pathways: [
      { type: 'Foundation in Accounting/Business', duration: '1 year', institutions: ['UM', 'UiTM', 'TAR UMT'] },
      { type: 'Bachelor in Accounting', duration: '3 years', institutions: ['UM', 'UiTM', 'TAR UMT', 'Sunway'] },
      { type: 'Professional Certification (ACCA/CTIM)', duration: '2-3 years', institutions: ['ACCA', 'CTIM', 'ICAEW'] },
    ],
    workEnvironment: 'Corporate offices, accounting firms, or government agencies.',
    dayInLife: ['9:00 AM - Review financial statements', '11:00 AM - Client meetings', '2:00 PM - Prepare tax returns', '4:00 PM - Audit work', '5:30 PM - Financial reporting'],
    salaryRange: 'RM 3,000 - RM 12,000 / month',
    demandLevel: 'High',
    npcName: 'Professor Numbers',
    npcEmoji: '💼',
    scholarships: [jpaScholarship, maraScholarship, khazanahScholarship, bnmScholarship, maybankScholarship, cimbScholarship, YayasanKhazanahWatan],
  },
  {
    id: 'architect',
    title: 'Architect',
    titleMalay: 'Arkitek',
    category: 'STEM',
    icon: '🏛️',
    color: '#f59e0b',
    description: 'Design buildings and structures, create architectural plans, and oversee construction projects.',
    spmRequirements: [
      { subject: 'Mathematics', grade: 'Credit (A-C)' },
      { subject: 'Physics', grade: 'Credit (A-C)' },
      { subject: 'Art/Design', grade: 'Credit (A-C)' },
      { subject: 'English', grade: 'Credit (A-C)' },
    ],
    personalityTraits: ['Creative', 'Technical', 'Detail-oriented', 'Visual thinker', 'Problem-solver'],
    hollandCode: 'Artistic + Investigative',
    mbtiTypes: ['INTJ', 'ENTP', 'INFP', 'INTP'],
    pathways: [
      { type: 'Foundation in Architecture/Design', duration: '1 year', institutions: ['UM', 'UiTM', 'Taylor\'s'] },
      { type: 'Bachelor of Architecture', duration: '3 years', institutions: ['UM', 'UiTM', 'Taylor\'s', 'Sunway'] },
      { type: 'Master of Architecture', duration: '2 years', institutions: ['UM', 'UiTM', 'Overseas'] },
    ],
    workEnvironment: 'Architecture firms, design studios, or own practice.',
    dayInLife: ['9:00 AM - Design work', '11:00 AM - Client meetings', '2:00 PM - Site visits', '4:00 PM - Technical drawings', '6:00 PM - Project coordination'],
    salaryRange: 'RM 3,500 - RM 18,000 / month',
    demandLevel: 'High',
    npcName: 'Blueprint Master',
    npcEmoji: '📐',
    scholarships: [jpaScholarship, gamudaScholarship, uemScholarship, ytlScholarship, khazanahScholarship, cheveningScholarship],
  },
  {
    id: 'teacher',
    title: 'Teacher',
    titleMalay: 'Guru',
    category: 'Education',
    icon: '👨‍🏫',
    color: '#f59e0b',
    description: 'Educate students in primary or secondary schools, develop lesson plans, and inspire learners.',
    spmRequirements: [
      { subject: 'Relevant subjects', grade: 'Credit (A-C)' },
      { subject: 'Bahasa Malaysia', grade: 'Credit (A-C)' },
      { subject: 'English', grade: 'Credit (A-C)' },
    ],
    personalityTraits: ['Patient', 'Communicator', 'Inspirational', 'Organized', 'Empathetic'],
    hollandCode: 'Social',
    mbtiTypes: ['ESFJ', 'ENFJ', 'ISFJ', 'INFJ'],
    pathways: [
      { type: 'Diploma in Education', duration: '2.5 years', institutions: ['IPGM (Institut Perguruan)'] },
      { type: 'Bachelor in Education', duration: '4 years', institutions: ['IPGM', 'UM', 'USM', 'UKM'] },
      { type: 'Postgraduate Diploma in Education', duration: '1-1.5 years', institutions: ['UM', 'USM', 'UKM'] },
    ],
    workEnvironment: 'Primary and secondary schools. Structured schedule with holidays.',
    dayInLife: ['7:30 AM - Morning assembly', '8:00 AM - Teaching classes', '12:00 PM - Lunch & supervision', '1:00 PM - Continue teaching', '3:00 PM - Marking & lesson prep'],
    salaryRange: 'RM 2,500 - RM 8,000 / month',
    demandLevel: 'Critical',
    npcName: 'Mentor Maya',
    npcEmoji: '📖',
    scholarships: [jpaScholarship, maraScholarship, YayasanKhazanahWatan, maybankScholarship],
  },
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    titleMalay: 'Pereka Grafik',
    category: 'Creative',
    icon: '🎨',
    color: '#ec4899',
    description: 'Create visual concepts, design layouts, and develop branding materials using digital tools.',
    spmRequirements: [
      { subject: 'Art/Design', grade: 'Credit (A-C)' },
      { subject: 'English', grade: 'Credit (A-C)' },
      { subject: 'Bahasa Malaysia', grade: 'Pass (D-E)' },
    ],
    personalityTraits: ['Creative', 'Visual thinker', 'Detail-oriented', 'Tech-savvy', 'Adaptable'],
    hollandCode: 'Artistic',
    mbtiTypes: ['INFP', 'ISFP', 'ENFP', 'INTP'],
    pathways: [
      { type: 'Diploma in Graphic Design', duration: '2.5 years', institutions: ['UiTM', 'Limkokwing', 'The One Academy'] },
      { type: 'Bachelor in Graphic Design', duration: '3 years', institutions: ['UiTM', 'Limkokwing', 'Taylor\'s'] },
      { type: 'Portfolio Development', duration: 'Ongoing', institutions: ['Adobe Certified', 'Industry projects'] },
    ],
    workEnvironment: 'Design studios, advertising agencies, or freelance.',
    dayInLife: ['9:00 AM - Design briefs', '11:00 AM - Concept development', '2:00 PM - Digital design work', '4:00 PM - Client revisions', '5:30 PM - Portfolio update'],
    salaryRange: 'RM 2,500 - RM 10,000 / month',
    demandLevel: 'High',
    npcName: 'Pixel Artist',
    npcEmoji: '✏️',
    scholarships: [maraScholarship, YayasanKhazanahWatan, maybankScholarship, mextScholarship],
  },
  {
    id: 'entrepreneur',
    title: 'Entrepreneur',
    titleMalay: 'Usahawan',
    category: 'Business',
    icon: '🚀',
    color: '#f97316',
    description: 'Start and run businesses, identify market opportunities, and create innovative solutions.',
    spmRequirements: [
      { subject: 'Mathematics', grade: 'Credit (A-C)' },
      { subject: 'English', grade: 'Credit (A-C)' },
      { subject: 'Commerce/Business', grade: 'Credit (A-C)' },
    ],
    personalityTraits: ['Innovative', 'Risk-taker', 'Resilient', 'Leadership', 'Visionary'],
    hollandCode: 'Enterprising',
    mbtiTypes: ['ENTJ', 'ENTP', 'ESTP', 'INTJ'],
    pathways: [
      { type: 'Foundation in Business', duration: '1 year', institutions: ['UM', 'Sunway', 'Taylor\'s'] },
      { type: 'Bachelor in Business/Entrepreneurship', duration: '3 years', institutions: ['UM', 'Sunway', 'Taylor\'s', 'UiTM'] },
      { type: 'MBA (recommended)', duration: '1-2 years', institutions: ['UM', 'INSEAD', 'Overseas'] },
    ],
    workEnvironment: 'Dynamic and flexible. May work from co-working spaces or own business premises.',
    dayInLife: ['8:00 AM - Strategic planning', '10:00 AM - Team meetings', '1:00 PM - Client pitches', '3:00 PM - Product development', '5:00 PM - Financial review'],
    salaryRange: 'RM 3,000 - RM 50,000+ / month',
    demandLevel: 'Very High',
    npcName: 'Startup Steve',
    npcEmoji: '💡',
    scholarships: [jpaScholarship, khazanahScholarship, simeDarbyScholarship, cimbScholarship, YayasanKhazanahWatan],
  },
];
