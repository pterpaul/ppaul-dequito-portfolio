window.portfolioData = {
  profile: {
    name: 'PPaul Dequito',
    title: 'IT Specialist | Cybersecurity Analyst',
    location: 'Iloilo, Western Visayas, Philippines',
    publicLocation: 'Philippines',
    activeWork: 'Currently, I work remotely with a focus on cybersecurity operations, IT administration, systems support, endpoint protection, and secure infrastructure.',
    currentExperienceSummary:
      'I am currently working remotely, focused on cybersecurity operations, IT administration, systems support, and secure infrastructure.',
    summary:
      'IT professional focused on dependable support, secure operations, systems administration, infrastructure workflows, and practical business-ready solutions.',
  },
  chat: {
    greeting:
      'Hi there! Thanks for visiting my website. Feel free to ask me about my experience, projects, skills, certifications, or contact details.',
    fallback:
      'I can answer from this portfolio about experience, projects, tech stack, certifications, education, strengths, and contact details. Try a more specific question.',
    emptyPrompt:
      'Ask me about my experience, projects, tech stack, certifications, education, strengths, or contact details.',
    categories: {
      profile: ['name', 'fullname', 'who are you', 'who is', 'introduce yourself', 'profile', 'about you'],
      experience: ['experience', 'work', 'job', 'company', 'employment', 'career'],
      education: ['education', 'school', 'university', 'degree', 'graduate', 'college'],
      strengths: ['strength', 'strengths', 'skills', 'core strength', 'capabilities'],
      techStack: ['tech stack', 'tools', 'technology', 'frontend', 'backend', 'database', 'mobile', 'ai tool', 'git', 'github'],
      projects: ['project', 'projects', 'case study', 'portfolio project', 'system build', 'deployment', 'mts', 'inventory', 'edr', 'delivery', 'rescue'],
      certifications: ['certificate', 'certification', 'certified', 'training', 'trainings'],
      contact: ['contact', 'email', 'hire', 'reach', 'call', 'meeting', 'zoom', 'teams', 'google meet', 'availability'],
      location: ['where do you live', 'where are you from', 'location', 'reside', 'residing', 'your place', 'where are you living', 'where do you reside', 'where do you stay', 'where are you based', 'where is your location'],
      activeWork: ['active work', 'current work', 'current experience', 'what is your active work', 'what is your current work', 'what is your current experience', 'what do you do now', 'what are you doing now', 'current role', 'current job', 'present work', 'present experience', 'latest experience', 'what is your work now'],
    },
    intents: {
      greetings: {
        keywords: ['good morning', 'morning', 'good day', 'good evening', 'evening', 'good afternoon', 'afternoon', 'hello', 'hi', 'greetings', 'hey'],
        response: 'Hello! It’s great to connect with you. Feel free to ask me about my experience, projects, skills, or contact details.',
      },
      thanks: {
        keywords: ['thank you', 'thanks', 'salamat', 'thankyou', 'tnx', 'thx', 'ty'],
        response: 'You’re welcome. If you’d like, you can also ask about my projects, experience, certifications, or availability.',
      },
      farewell: {
        keywords: ['bye', 'goodbye', 'see you later', 'see you', 'talk later', 'farewell'],
        response: 'Thank you for visiting my portfolio. Feel free to reach out anytime if you’d like to connect or ask more about my work.',
      },
      wellbeing: {
        keywords: ['how are you', 'how are you doing', 'how are you today', 'how is it going', 'how is everything', 'how are things'],
        response: 'I’m doing well, thank you. I’m here to help you explore my portfolio and answer questions about my work.',
      },
      humor: {
        keywords: ['haha', 'hahaha', 'whahaha', 'lol', 'lmao', 'rofl', 'funny', 'hilarious', 'thats funny', 'that is funny', 'you are funny'],
        response: 'Glad that gave you a smile. If you’d like, ask me about my projects, experience, certifications, or tech stack.',
      },
      confidence: {
        keywords: ['how confident are you', 'how sure are you', 'how do you feel about your skills', 'how do you feel about your experience'],
        response: 'I’m confident in my hands-on experience and always committed to continuous learning, especially in IT operations and cybersecurity.',
      },
      portfolioOwnership: {
        keywords: ['did you code', 'did you build this', 'did you create this', 'is this your work', 'is this your portfolio', 'is this your website'],
        response: 'Yes, this portfolio represents my work, experience, projects, and the way I present my professional background.',
      },
      privacyAge: {
        keywords: ['how old are you', 'age'],
        response: 'I prefer to keep personal details like age private, but I’m happy to share more about my experience, projects, and skills.',
      },
      privacyRelationship: {
        keywords: ['relationship status', 'girlfriend', 'partner', 'are you in a relationship', 'married', 'wife', 'dating'],
        response: 'I prefer to keep my personal life private. I’m happy to help with professional questions about my portfolio.',
      },
      romanticBoundary: {
        keywords: ['can you date me', 'i like you', 'do you like me', 'will you go out with me', 'love you', 'marry you', 'be my boyfriend', 'be my partner'],
        response: 'I appreciate the sentiment, but I’d like to keep this conversation professional and focused on my portfolio and work.',
      },
      inappropriate: {
        keywords: ['fuck', 'shit', 'damn', 'hell', 'bitch', 'bullshit', 'bobo', 'gago', 'dipota', 'linti', 'crap', 'liar', 'stop lying', 'you are lying', 'mango ka', 'hangag', 'kawatan', 'magnanakaw', 'kalinti mo', 'linti ka', 'buang', 'yawa', 'animal ka', 'ulol', 'tanga', 'tarantado', 'bogok'],
        response: 'Please use respectful language. I’m here to help with professional questions about my experience, projects, and skills.',
      },
    },
  },
  experience: [
    {
      company: 'Confidential Company',
      publicCompany: 'Confidential Company',
      roles: ['Remote IT and Cybersecurity Specialist'],
      highlights: [
        'remote cybersecurity operations',
        'IT administration and systems support',
        'endpoint monitoring and protection support',
      ],
    },
    {
      company: 'SYL Hermanos',
      roles: ['IT Specialist', 'IT Assistant'],
      highlights: [
        'Level 0-3 IT support',
        'Office 365, SharePoint, SAP ERP, storage, and shared drive administration',
        'Firewall, endpoint protection, monitoring, and multi-branch support',
      ],
    },
    {
      company: 'E2E Process & Experts',
      roles: ['IT Intern'],
      highlights: ['Technical support exposure', 'documentation', 'software development environment exposure'],
    },
    {
      company: 'Nokia Solutions and Networks',
      publicCompany: 'Confidential Company',
      roles: ['Warehouse Man'],
      highlights: ['warehouse operations', 'audit support', 'data entry', 'inventory coordination'],
    },
  ],
  education: {
    degree: 'Bachelor of Science in Information Technology',
    school: 'Iloilo Science and Technology University',
    period: '2016 - 2020',
  },
  strengths: [
    'IT Support L0-L3',
    'Systems Administration',
    'Network Administration',
    'Firewall Administration',
    'Cybersecurity Analysis',
    'Incident Response',
  ],
  techStack: {
    operations: ['Windows', 'Active Directory', 'Endpoint Protection', 'SQL Server Management', 'Git', 'GitHub'],
    security: ['Fortinet Fortigate', 'Sophos', 'Zabbix', 'Wazuh', 'SolarWinds', 'Microsoft 365 Defender'],
    frontend: ['HTML5', 'CSS', 'Tailwind CSS', 'Bootstrap', 'JavaScript', 'React'],
    backend: ['MySQL', 'PHP', 'Python', 'Java', 'Node.js'],
    mobile: ['Flutter', 'Dart', 'Android', 'iOS'],
    ai: ['ChatGPT', 'Gemini', 'Microsoft Copilot', 'Claude'],
  },
  certifications: [
    'Sophos Endpoint: Fundamentals',
    'Fortinet Fortigate: Fundamentals',
    'Microsoft 365 Certified: Fundamentals',
    'Microsoft Certified: Azure Fundamentals',
    'Security Awareness Training',
    'Office 365 Fundamentals',
  ],
  projects: [
    {
      name: 'LGU Municipality Transparency',
      aliases: ['mts', 'municipality transparency system', 'lgu system', 'transparency system'],
      summary: 'A structured public information platform for announcements and municipality content designed to highlight impact without revealing internal implementation.',
      highlights: ['structured publishing', 'announcement visibility', 'role-aware access'],
      stack: ['PHP', 'MySQL', 'Bootstrap', 'CMS'],
    },
    {
      name: 'Inventory Management System',
      aliases: ['inventory system', 'inventory management'],
      summary: 'A business inventory platform for stock visibility, branch tracking, procurement flow, and operations monitoring.',
      highlights: ['stock monitoring', 'branch visibility', 'procurement queue', 'branch reports'],
      stack: ['Web Dashboard', 'Inventory Tracking', 'Operations'],
    },
    {
      name: 'Advance Endpoint Defense',
      aliases: ['edr', 'endpoint defense', 'endpoint security'],
      summary: 'A security-focused build centered on endpoint visibility, response support, and stronger protection posture without exposing operational controls.',
      highlights: ['threat visibility', 'response support', 'protection oversight'],
      stack: ['Sophos', 'EDR', 'Threat Monitoring', 'Security Ops'],
    },
    {
      name: 'Company Website (Customize)',
      aliases: ['company website', 'profile website', 'customizable website', 'company portfolio', 'landing page'],
      summary: 'Customizable website build for business presentation and content management with a cleaner public-facing brand experience.',
      highlights: ['responsive interface', 'editable content', 'brand presentation'],
      stack: ['HTML', 'CSS', 'JavaScript', 'Responsive UI'],
    },
    {
      name: 'PFZ Dash Z - Combined Delivery and Route Workflow',
      aliases: ['pfz delivery', 'pfz dashz', 'pfz dash z', 'booking app', 'route app', 'logistics system', 'delivery system'],
      summary: 'A combined operations workflow connecting booking, assignment, and delivery tracking into a single public-safe showcase of logistics coordination.',
      highlights: ['booking coordination', 'delivery tracking', 'operations visibility'],
      stack: ['JavaScript', 'Mobile Workflow', 'Logs', 'Operations'],
    },
    {
      name: 'PFZ Route Z - SFA Booking App',
      aliases: ['pfz route z', 'pfz routez', 'booking app', 'route app', 'booking system'],
      summary: 'A booking and field-activity workflow support app built for sales-force operations.',
      highlights: ['booking workflow', 'field coordination', 'sales activity support'],
      stack: ['Booking', 'Operations', 'Mobile Workflow'],
    },
    {
      name: 'PFZ Shipz - Delivery App',
      aliases: ['pfz shipz', 'delivery app', 'logistics app', 'delivery system'],
      summary: 'A delivery-focused application supporting tracking and operational coordination.',
      highlights: ['delivery tracking', 'operational coordination', 'route flow'],
      stack: ['Mobile App', 'Logs', 'Operations'],
    },
    {
      name: 'Police and Rescue SMS/CMS',
      aliases: ['police system', 'rescue system', 'dispatch system', 'sms cms', 'emergency response system'],
      summary: 'A response coordination concept focused on incident visibility, dispatch support, and field communication while avoiding disclosure of operational response details.',
      highlights: ['incident intake support', 'field update capture', 'dispatch tracking visibility'],
      stack: ['Mobile App', 'Web App', 'Geotagging', 'Dispatch'],
    },
    {
      name: 'Registrar Inventory Management',
      aliases: ['registrar system', 'registrar inventory', 'registrar management system'],
      summary:
        'A registrar-facing platform focused on controlled academic access, faster records support, and institutional workflow efficiency without exposing internal rules.',
      highlights: [
        'controlled records visibility',
        'faster encoding support',
        'confidential access handling',
      ],
      stack: ['PHP', 'MySQL', 'AI Dashboards', 'Admin Workflow'],
    },
    {
      name: 'Thesis/Research Archiving Management',
      aliases: ['thesis system', 'thesis inventory', 'thesis archive'],
      summary:
        'A digital archive concept for thesis storage and retrieval designed to reduce paper-heavy workflows and improve search accessibility through a cleaner academic system.',
      highlights: ['digital thesis archiving', 'lower printing dependency', 'search-focused retrieval experience'],
      stack: ['Archive System', 'AI Search', 'Document Workflow', 'Web App'],
    },
  ],
  contact: {
    email: 'peterpaul.dequito@gmail.com',
    location: 'Iloilo, Western Visayas, Philippines',
    preference: 'Email-first communication',
    meetingOptions: ['Google Meet', 'Zoom', 'Microsoft Teams'],
    focus: 'IT support, systems administration, infrastructure operations, cybersecurity growth, and collaboration opportunities',
  },
};

window.portfolioData.chat = {
  greeting:
    'Hi there! Thanks for visiting my website. Feel free to ask me about my experience, projects, skills, certifications, or contact details.',
  fallback:
    'I can answer from this portfolio about experience, projects, tech stack, certifications, education, strengths, and contact details. Try a more specific question.',
  emptyPrompt:
    'Ask me about my experience, projects, tech stack, certifications, education, strengths, or contact details.',
  categories: {
    profile: ['name', 'fullname', 'who are you', 'who is', 'introduce yourself', 'profile', 'about you'],
    experience: ['experience', 'work', 'job', 'company', 'employment', 'career', 'syl', 'nokia', 'e2e'],
    education: ['education', 'school', 'university', 'degree', 'graduate', 'college'],
    strengths: ['strength', 'strengths', 'skills', 'core strength', 'capabilities'],
    techStack: ['tech stack', 'tools', 'technology', 'frontend', 'backend', 'database', 'mobile', 'ai tool', 'git', 'github'],
    projects: ['project', 'projects', 'case study', 'portfolio project', 'system build', 'deployment', 'mts', 'inventory', 'edr', 'delivery', 'rescue'],
    certifications: ['certificate', 'certification', 'certifications', 'certified', 'training', 'trainings'],
    contact: ['contact', 'email', 'hire', 'reach', 'call', 'meeting', 'zoom', 'teams', 'google meet', 'availability'],
    location: ['where do you live', 'where are you from', 'location', 'reside', 'residing', 'your place', 'where are you living', 'where do you reside', 'where do you stay', 'where are you based', 'where is your location'],
    activeWork: ['active work', 'current work', 'current experience', 'what is your active work', 'what is your current work', 'what is your current experience', 'what do you do now', 'what are you doing now', 'current role', 'current job', 'present work', 'present experience', 'latest experience', 'what is your work now'],
  },
  leadCapture: {
    title: 'Oops! Need more?',
    description: 'Hi guest! Please indicate your name here, this is for monitoring purposes only.',
    firstNameLabel: 'Firstname',
    lastNameLabel: 'Lastname',
    emailLabel: 'Email',
    buttonLabel: 'Submit',
    invalidMessage: 'Please provide exact firstname, lastname, and email. Thank you.',
    successMessage: 'Thank you. Your details were noted.',
    webhookUrl: 'https://script.google.com/macros/s/AKfycbyg8w-jdqmhweOpY2GgE-Mtibx0hrACnvqGvwykBWpZwI3K4pcQy06MT3Q0IUSBf-kt/exec',
    // webhookUrl: https://script.google.com/macros/s/AKfycbyg8w-jdqmhweOpY2GgE-Mtibx0hrACnvqGvwykBWpZwI3K4pcQy06MT3Q0IUSBf-kt/exec
    webhookPendingMessage: 'Google Sheets webhook is not connected yet. Saved locally for now.',
  },
  intents: {
    privacyLocation: {
      priority: 110,
      keywords: ['where do you live', 'where are you living', 'where do you reside', 'where do you stay', 'where is your house', 'where is your home', 'where are you located', 'where are you based', 'living now'],
      response: 'For privacy and safety, I only share my public location. I am based in the Philippines. I am happy to answer more about my work, projects, and availability.',
    },
    activeWork: {
      priority: 97,
      keywords: ['active work', 'current work', 'current experience', 'what is your active work', 'what is your current work', 'what is your current experience', 'what do you do now', 'what are you doing now', 'current role', 'current job', 'present work', 'present experience', 'latest experience', 'remote worker', 'are you working remotely'],
      response: 'I currently work remotely, focused on cybersecurity operations, IT administration, systems support, and secure infrastructure.',
    },
    inappropriate: {
      priority: 120,
      keywords: ['fuck', 'shit', 'damn', 'hell', 'bitch', 'bullshit', 'bobo', 'gago', 'dipota', 'linti', 'crap', 'liar', 
        'stop lying', 'you are lying', 'mango ka', 'hangag', 'kawatan', 'magnanakaw', 'kalinti mo', 'linti ka', 'buang', 
        'yawa', 'animal ka', 'pota', 'yudipota', 'ulol', 'tanga', 'tarantado', 'bogok'],
      response: 'Please use respectful language. I am here to help with professional questions about my experience, projects, and skills.',
    },
    greetings: {
      priority: 100,
      keywords: ['good morning', 'morning', 'good day', 'good evening', 'evening', 'good afternoon', 'afternoon', 'hello', 'hi', 'greetings', 'hey'],
      response: 'Hello! It is great to connect with you.',
    },
    positiveReaction: {
      priority: 40,
      keywords: ['wow', 'nice', 'cool', 'awesome', 'amazing', 'great', 'astig', 'galing', 'solid', 'impressive', 'beautiful', 'ang ganda', 'ang galing'],
      response: 'Thanks, I really appreciate that. If you want, you can ask me more about my work, projects, skills, or experience.',
    },
    romanticBoundary: {
      priority: 99,
      keywords: ['can you date me', 'i like you', 'do you like me', 'will you go out with me', 'love you', 'marry you', 'be my boyfriend', 'be my partner'],
      response: 'I appreciate the sentiment, but I would like to keep this conversation professional and focused on my portfolio and work.',
    },
    privacyAge: {
      priority: 98,
      keywords: ['how old are you', 'age'],
      response: 'I prefer to keep personal details like age private, but I am happy to share more about my experience, projects, and skills.',
    },
    privacyRelationship: {
      priority: 98,
      keywords: ['relationship status', 'girlfriend', 'partner', 'are you in a relationship', 'married', 'wife', 'dating'],
      response: 'I prefer to keep my personal life private. I am happy to help with professional questions about my portfolio.',
    },
    wellbeing: {
      priority: 95,
      keywords: ['how are you', 'how are you doing', 'how are you today', 'how is it going', 'how is everything', 'how are things'],
      response: 'I am doing well, thank you. I am here to help you explore my portfolio and answer questions about my work.',
    },
    confidence: {
      priority: 85,
      keywords: ['how confident are you', 'how sure are you', 'how do you feel about your skills', 'how do you feel about your experience'],
      response: 'I am confident in my hands-on experience and always committed to continuous learning, especially in IT operations and cybersecurity.',
    },
    portfolioOwnership: {
      priority: 80,
      keywords: ['did you code', 'did you build this', 'did you create this', 'is this your work', 'is this your portfolio', 'is this your website'],
      response: 'Yes, this portfolio represents my work, experience, projects, and the way I present my professional background.',
    },
    thanks: {
      priority: 35,
      keywords: ['thank you', 'thanks', 'salamat', 'thankyou', 'tnx', 'thx', 'ty'],
      response: 'You are welcome. If you would like, you can also ask about my projects, experience, certifications, or availability.',
    },
    humor: {
      priority: 30,
      keywords: ['haha', 'hahaha', 'whahaha', 'lol', 'lmao', 'rofl', 'funny', 'hilarious', 'thats funny', 'that is funny', 'you are funny'],
      response: 'Glad that gave you a smile. If you would like, ask me about my projects, experience, certifications, or tech stack.',
    },
    farewell: {
      priority: 20,
      keywords: ['bye', 'goodbye', 'see you later', 'see you', 'talk later', 'farewell'],
      response: 'Thank you for visiting my portfolio. Feel free to reach out anytime if you would like to connect or ask more about my work.',
    },
  },
};
