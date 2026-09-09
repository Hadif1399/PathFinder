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
  category: 'STEM' | 'IT' | 'Healthcare' | 'Business' | 'Creative';
  icon: string;
  color: string;
  description: string;
  spmRequirements: {
    subject: string;
    grade: string;
  }[];
  personalityTraits: string[];
  hollandCode: string;
  mbtiTypes: string[];
  pathways: {
    type: string;
    duration: string;
    institutions: string[];
  }[];
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
const YayasanTerengganu: Scholarship = { name: 'Yayasan Terengganu Scholarship', provider: 'Yayasan Terengganu', coverage: 'Full', location: 'Overseas', level: 'Degree', description: 'For Terengganu students at top universities' };
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
    id: 'biotechnologist',
    title: 'Biotechnologist',
    titleMalay: 'Ahli Bioteknologi',
    category: 'STEM',
    icon: '🧬',
    color: '#22d3ee',
    description: 'Apply biological processes to develop products in healthcare, agriculture, and sustainability.',
    spmRequirements: [
      { subject: 'Biology', grade: 'Credit (A-C)' },
      { subject: 'Chemistry', grade: 'Credit (A-C)' },
      { subject: 'Mathematics', grade: 'Credit (A-C)' },
      { subject: 'Physics', grade: 'Credit (A-C)' },
      { subject: 'English', grade: 'Credit (A-C)' },
    ],
    personalityTraits: ['Scientific', 'Detail-oriented', 'Patient', 'Ethical', 'Innovative'],
    hollandCode: 'Investigative + Realistic',
    mbtiTypes: ['INTJ', 'INFJ', 'ISTJ', 'INTP'],
    pathways: [
      { type: 'Foundation in Science', duration: '1 year', institutions: ['UM', 'USM', 'UKM'] },
      { type: 'Bachelor in Biotechnology', duration: '3-4 years', institutions: ['UM', 'USM', 'UTM', 'IMU'] },
      { type: 'Master in Biotech', duration: '2 years', institutions: ['UM', 'USM', 'Monash'] },
    ],
    workEnvironment: 'Laboratories, research institutions, pharmaceutical companies.',
    dayInLife: ['8:00 AM - Lab prep', '9:00 AM - Cell culture', '11:00 AM - DNA extraction', '1:00 PM - PCR analysis', '3:00 PM - Data analysis'],
    salaryRange: 'RM 3,000 - RM 12,000 / month',
    demandLevel: 'High',
    npcName: 'Dr. Gene',
    npcEmoji: '🔬',
    scholarships: [jpaScholarship, maraScholarship, petronasScholarship, simeDarbyScholarship, khazanahScholarship, YayasanKhazanahWatan, maybankScholarship, uemScholarship, australiaAwards, daadScholarship, mextScholarship, gksScholarship, oxfordScholarship],
  },
  {
    id: 'renewable-energy',
    title: 'Renewable Energy Engineer',
    titleMalay: 'Jurutera Tenaga Boleh Diperbaharui',
    category: 'STEM',
    icon: '☀️',
    color: '#fbbf24',
    description: 'Design sustainable energy solutions including solar, wind, and hydroelectric power.',
    spmRequirements: [
      { subject: 'Physics', grade: 'Credit (A-C)' },
      { subject: 'Mathematics', grade: 'Credit (A-C)' },
      { subject: 'Additional Mathematics', grade: 'Credit (A-C)' },
      { subject: 'Chemistry', grade: 'Pass (D-E)' },
      { subject: 'English', grade: 'Credit (A-C)' },
    ],
    personalityTraits: ['Environmentally conscious', 'Engineering mindset', 'Problem-solver', 'Team player', 'Practical'],
    hollandCode: 'Realistic + Investigative',
    mbtiTypes: ['ISTJ', 'ESTJ', 'INTJ', 'ENTJ'],
    pathways: [
      { type: 'Diploma in Electrical/Renewable Energy', duration: '2.5 years', institutions: ['UiTM', 'Politeknik', 'GreenTech Malaysia'] },
      { type: 'Bachelor in Electrical/Mechanical Engineering', duration: '4 years', institutions: ['UM', 'UTM', 'USM', 'UTP'] },
      { type: 'Professional Engineer Certification', duration: '3+ years', institutions: ['Board of Engineers Malaysia'] },
    ],
    workEnvironment: 'Mix of office design work and field visits to solar farms and installations.',
    dayInLife: ['8:00 AM - Review energy data', '10:00 AM - Site visit', '12:00 PM - Design meeting', '2:00 PM - Performance analysis', '4:00 PM - Environmental assessment'],
    salaryRange: 'RM 3,500 - RM 14,000 / month',
    demandLevel: 'Very High',
    npcName: 'Captain Solar',
    npcEmoji: '⚡',
    scholarships: [tenagaScholarship, petronasScholarship, jpaScholarship, maraScholarship, gamudaScholarship, uemScholarship, simeDarbyScholarship, khazanahScholarship, YayasanKhazanahWatan, ytlScholarship, australiaAwards, daadScholarship, cheveningScholarship],
  },
  {
    id: 'robotics-engineer',
    title: 'Robotics Engineer',
    titleMalay: 'Jurutera Robotik',
    category: 'STEM',
    icon: '🤖',
    color: '#fb923c',
    description: 'Design, build, and program robots for manufacturing, healthcare, and exploration.',
    spmRequirements: [
      { subject: 'Mathematics', grade: 'Credit (A-C)' },
      { subject: 'Additional Mathematics', grade: 'Credit (A-C)' },
      { subject: 'Physics', grade: 'Credit (A-C)' },
      { subject: 'English', grade: 'Credit (A-C)' },
    ],
    personalityTraits: ['Creative engineer', 'Hands-on', 'Systematic', 'Innovative', 'Persistent'],
    hollandCode: 'Realistic + Investigative',
    mbtiTypes: ['INTJ', 'ISTP', 'ENTJ', 'INTP'],
    pathways: [
      { type: 'Foundation in Engineering', duration: '1 year', institutions: ['UM', 'UTM', 'USM'] },
      { type: 'Bachelor in Mechatronics/Robotics', duration: '4 years', institutions: ['UTM', 'USM', 'UTP', 'APU'] },
      { type: 'Master in Robotics', duration: '2 years', institutions: ['UM', 'UTM', 'NTU Singapore'] },
    ],
    workEnvironment: 'Manufacturing plants, research labs, and tech companies.',
    dayInLife: ['8:30 AM - Review simulations', '10:00 AM - CAD design', '12:00 PM - Sensor testing', '2:00 PM - Programming', '4:00 PM - Physical testing'],
    salaryRange: 'RM 4,000 - RM 16,000 / month',
    demandLevel: 'High',
    npcName: 'Mecha Max',
    npcEmoji: '🦾',
    scholarships: [jpaScholarship, petronasScholarship, gamudaScholarship, uemScholarship, tenagaScholarship, maraScholarship, simeDarbyScholarship, khazanahScholarship, ytlScholarship, YayasanKhazanahWatan, YayasanTerengganu, mextScholarship, gksScholarship, daadScholarship, stanfordScholarship],
  },
  {
    id: 'cloud-architect',
    title: 'Cloud Solutions Architect',
    titleMalay: 'Arkitek Penyelesaian Awan',
    category: 'IT',
    icon: '☁️',
    color: '#818cf8',
    description: 'Design and manage cloud infrastructure for organizations.',
    spmRequirements: [
      { subject: 'Mathematics', grade: 'Credit (A-C)' },
      { subject: 'Additional Mathematics', grade: 'Credit (A-C)' },
      { subject: 'Physics', grade: 'Credit (A-C)' },
      { subject: 'ICT/Computer Science', grade: 'Credit (A-C)' },
      { subject: 'English', grade: 'Credit (A-C)' },
    ],
    personalityTraits: ['Strategic thinker', 'Big-picture oriented', 'Communicator', 'Technical depth', 'Business acumen'],
    hollandCode: 'Investigative + Enterprising',
    mbtiTypes: ['ENTJ', 'INTJ', 'ENTP', 'ESTJ'],
    pathways: [
      { type: 'Bachelor in Computer Science/IT', duration: '3-4 years', institutions: ['UM', 'USM', 'APU', 'MMU'] },
      { type: 'Cloud Certifications', duration: '6-12 months', institutions: ['AWS', 'Azure', 'GCP'] },
      { type: 'Industry Experience', duration: '3-5 years', institutions: ['Cloud Partners'] },
    ],
    workEnvironment: 'Corporate offices or remote. Heavy collaboration with teams.',
    dayInLife: ['9:00 AM - Review metrics', '10:00 AM - Architecture design', '12:00 PM - Client meeting', '2:00 PM - Infrastructure development', '4:00 PM - Cost optimization'],
    salaryRange: 'RM 8,000 - RM 30,000+ / month',
    demandLevel: 'Very High',
    npcName: 'Cloud Commander',
    npcEmoji: '🌩️',
    scholarships: [jpaScholarship, tmScholarship, maxisScholarship, petronasScholarship, maraScholarship, khazanahScholarship, simeDarbyScholarship, YayasanKhazanahWatan, pnbScholarship, cimbScholarship, ytlScholarship, cheveningScholarship, mextScholarship, gksScholarship],
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
    scholarships: [jpaScholarship, maraScholarship, khazanahScholarship, simeDarbyScholarship, petronasScholarship, bnmScholarship, maybankScholarship, pnbScholarship, YayasanTerengganu, YayasanKhazanahWatan, cimbScholarship, australiaAwards, cheveningScholarship, fulbrightScholarship, mextScholarship],
  },
  {
    id: 'game-developer',
    title: 'Game Developer',
    titleMalay: 'Pembangun Permainan',
    category: 'IT',
    icon: '🎮',
    color: '#f472b6',
    description: 'Create interactive entertainment experiences using programming, art, and storytelling.',
    spmRequirements: [
      { subject: 'Mathematics', grade: 'Credit (A-C)' },
      { subject: 'Additional Mathematics', grade: 'Pass (D-E)' },
      { subject: 'Physics', grade: 'Pass (D-E)' },
      { subject: 'English', grade: 'Credit (A-C)' },
      { subject: 'ICT/Computer Science', grade: 'Credit (A-C)' },
    ],
    personalityTraits: ['Creative', 'Passionate gamer', 'Team player', 'Visual thinker', 'Persistent'],
    hollandCode: 'Artistic + Investigative',
    mbtiTypes: ['INFP', 'INTP', 'ENFP', 'ISTP'],
    pathways: [
      { type: 'Diploma in Game Development', duration: '2.5 years', institutions: ['APU', 'Limkokwing', 'UiTM'] },
      { type: 'Bachelor in Game Development/CS', duration: '3-4 years', institutions: ['APU', 'MMU', 'UTAR', 'USM'] },
      { type: 'Portfolio & Industry Experience', duration: 'Ongoing', institutions: ['Unity', 'Unreal Engine', 'Game Jams'] },
    ],
    workEnvironment: 'Creative studios with gaming setups and collaborative spaces.',
    dayInLife: ['10:00 AM - Sprint planning', '11:00 AM - Gameplay programming', '2:00 PM - Bug fixing', '4:00 PM - Playtesting', '5:00 PM - Asset integration'],
    salaryRange: 'RM 3,000 - RM 15,000 / month',
    demandLevel: 'High',
    npcName: 'Pixel Pete',
    npcEmoji: '🕹️',
    scholarships: [jpaScholarship, maraScholarship, tmScholarship, maxisScholarship, YayasanKhazanahWatan, maybankScholarship, khazanahScholarship, simeDarbyScholarship, ytlScholarship, gksScholarship, mextScholarship, daadScholarship, stanfordScholarship],
  },
];
