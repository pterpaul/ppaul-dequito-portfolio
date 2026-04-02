
// Total Work Experience Calculation
  function calculateExperience() {
    const companies = document.querySelectorAll('.unified-list > ul > li');

    companies.forEach(company => {
      let totalMonths = 0;
      const dateSpans = company.querySelectorAll('.date-span');

      dateSpans.forEach(span => {
        const start = new Date(span.getAttribute('data-start'));
        const end = new Date(span.getAttribute('data-end'));

        // Calculate difference in months
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        totalMonths += months;
      });

      // Convert total months back to "Y yrs M mos"
      const years = Math.floor(totalMonths / 12);
      const remainingMonths = totalMonths % 12;

      let resultString = "";
      if (years > 0) resultString += `${years} yr${years > 1 ? 's' : ''} `;
      if (remainingMonths > 0) resultString += `${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;

      // Inject into the company header
      const display = company.querySelector('.total-company-exp');
      if (display) {
        display.innerText = `${resultString.trim()}`;
      }
    });
  }

  let activeSectionKey = 'about';
  let lastSectionState = null;
  let backButtonDelayTimer = null;
  let backButtonDelayReady = false;

  function clearBackButtonDelay() {
    if (backButtonDelayTimer) {
      clearTimeout(backButtonDelayTimer);
      backButtonDelayTimer = null;
    }
    backButtonDelayReady = false;
  }

  function scheduleBackButtonDelay(sectionKey) {
    clearBackButtonDelay();

    if (sectionKey === 'about') {
      updateFloatingBackButton();
      return;
    }

    backButtonDelayTimer = setTimeout(() => {
      backButtonDelayReady = true;
      backButtonDelayTimer = null;
      updateFloatingBackButton();
    }, 5000);
  }

  function updateFloatingBackButton() {
    const backBtn = document.getElementById('floatingBackBtn');
    const heroSection = document.getElementById('hero');
    if (!backBtn) return;

    const hasPassedHero = heroSection ? window.scrollY >= (heroSection.offsetHeight - 24) : true;
    const shouldShow = activeSectionKey !== 'about' && !!lastSectionState && hasPassedHero && backButtonDelayReady;
    backBtn.classList.toggle('hidden', !shouldShow);
    backBtn.classList.toggle('floating-back-btn-visible', shouldShow);
  }

  function showSection(sectionKey, options = {}) {
    const { preserveHistory = true, scrollMode = 'section', customScrollTop = null } = options;
    const heroSection = document.getElementById('hero');
    const sectionMap = {
      about: document.getElementById('about'),
      experience: document.getElementById('experienceSection'),
      projects: document.getElementById('projectsSection'),
      contact: document.getElementById('contactSection'),
    };

    if (preserveHistory && sectionKey !== activeSectionKey) {
      lastSectionState = {
        sectionKey: activeSectionKey,
        scrollTop: window.scrollY,
      };
    }

    Object.entries(sectionMap).forEach(([key, sectionEl]) => {
      if (!sectionEl) return;

      if (key === sectionKey) {
        sectionEl.classList.remove('hidden');
      } else {
        sectionEl.classList.add('hidden');
      }
    });

    document.querySelectorAll('.nav-btn[data-section]').forEach((btn) => {
      if (btn.dataset.section === sectionKey) {
        btn.classList.add('active', 'text-blue-500');
        btn.classList.remove('text-black');
      } else {
        btn.classList.remove('active', 'text-blue-500');
        btn.classList.add('text-black');
      }
    });

    activeSectionKey = sectionKey;
    scheduleBackButtonDelay(sectionKey);
    updateFloatingBackButton();

    const targetSection = sectionMap[sectionKey];
    if (targetSection || typeof customScrollTop === 'number') {
      requestAnimationFrame(() => {
        if (typeof customScrollTop === 'number') {
          window.scrollTo({
            top: Math.max(customScrollTop, 0),
            behavior: 'smooth',
          });
          return;
        }

        if (scrollMode === 'preserve') {
          return;
        }

        if (sectionKey === 'about' && heroSection) {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          return;
        }

        const stickyNav = document.getElementById('sticky-nav');
        const navOffset = stickyNav ? stickyNav.getBoundingClientRect().height + 12 : 12;
        const targetTop = window.scrollY + targetSection.getBoundingClientRect().top - navOffset;

        window.scrollTo({
          top: Math.max(targetTop, 0),
          behavior: 'smooth',
        });
      });
    }
  }

  function goBackToLastSection() {
    if (!lastSectionState) return;

    const targetState = { ...lastSectionState };
    lastSectionState = null;
    clearBackButtonDelay();
    showSection(targetState.sectionKey, {
      preserveHistory: false,
      customScrollTop: targetState.scrollTop,
    });
  }

  function scrollToProjectCaseStudy(projectId) {
    showSection('projects');

    requestAnimationFrame(() => {
      const projectCard = document.getElementById(projectId);
      if (!projectCard) return;

      const stickyNav = document.getElementById('sticky-nav');
      const navOffset = stickyNav ? stickyNav.getBoundingClientRect().height + 16 : 16;
      const targetTop = window.scrollY + projectCard.getBoundingClientRect().top - navOffset;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: 'smooth',
      });
    });
  }

  function initChatButtonAnimation() {
    const chatButton = document.getElementById('chatButton');
    if (!chatButton) return;

    let chatAnimationTimer = null;
    let chatCollapseTimer = null;

    const queueNextPulse = () => {
      if (chatAnimationTimer) clearTimeout(chatAnimationTimer);
      if (chatCollapseTimer) clearTimeout(chatCollapseTimer);

      const nextDelay = 10000 + Math.floor(Math.random() * 20000);

      chatAnimationTimer = setTimeout(() => {
        chatButton.classList.add('chat-trigger-expanded');

        chatCollapseTimer = setTimeout(() => {
          chatButton.classList.remove('chat-trigger-expanded');
          queueNextPulse();
        }, 1700);
      }, nextDelay);
    };

    chatButton.addEventListener('mouseenter', () => {
      if (chatAnimationTimer) clearTimeout(chatAnimationTimer);
      if (chatCollapseTimer) clearTimeout(chatCollapseTimer);
      chatButton.classList.add('chat-trigger-expanded');
    });

    chatButton.addEventListener('mouseleave', () => {
      chatButton.classList.remove('chat-trigger-expanded');
      queueNextPulse();
    });

    queueNextPulse();
  }

  function buildPortfolioKnowledgeBase() {
    return window.portfolioData || {
      profile: {
        name: 'PPaul Dequito',
        title: 'IT Specialist | Cybersecurity Analyst',
        location: 'Iloilo, Western Visayas, Philippines',
        summary: 'IT professional focused on dependable support and secure operations.',
      },
      chat: {
        greeting: 'Hi there! Feel free to ask me about my portfolio.',
        fallback: 'I can answer from this portfolio about experience, projects, skills, and contact details.',
      },
      experience: [],
      education: {},
      strengths: [],
      techStack: { operations: [], security: [], frontend: [], backend: [], mobile: [], ai: [] },
      certifications: [],
      projects: [],
      contact: {
        email: 'peterpaul.dequito@gmail.com',
        location: 'Iloilo, Western Visayas, Philippines',
        preference: 'Email-first communication',
        meetingOptions: [],
        focus: 'IT support and cybersecurity growth',
      },
    };
  }

  function normalizeChatText(value) {
    return (value || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function formatList(items) {
    return (items || []).filter(Boolean).join(', ');
  }

  function includesAny(q, terms) {
    return (terms || []).some((term) => q.includes(normalizeChatText(term)));
  }

  function splitQuestionIntoParts(question) {
    return (question || '')
      .split(/[?.!]+|,(?=\s)|\s+-\s+|(?:\s+and\s+(?=(?:how|what|who|where|when|why|can|do|did|is|are|tell|show)\b))/i)
      .map((part) => normalizeChatText(part))
      .filter(Boolean);
  }

  function sanitizeChatReply(text) {
    return (text || '')
      .replace(/â€™/g, "'")
      .replace(/â€œ/g, '"')
      .replace(/â€/g, '"')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function findProjectMatches(kb, normalizedQuestion) {
    return (kb.projects || []).filter((project) => {
      const aliases = [project.name, ...(project.aliases || [])]
        .map((item) => normalizeChatText(item))
        .filter(Boolean);
      return aliases.some((alias) => normalizedQuestion.includes(alias));
    });
  }

  function findChatIntentMatches(kb, normalizedQuestion) {
    const intents = kb.chat?.intents || {};
    return Object.entries(intents)
      .map(([id, intent]) => {
        const score = (intent.keywords || []).reduce((total, keyword) => (
          normalizedQuestion.includes(normalizeChatText(keyword)) ? total + 1 : total
        ), 0);

        return score > 0 ? {
          id,
          priority: intent.priority || 50,
          score,
          response: intent.response,
        } : null;
      })
      .filter(Boolean)
      .sort((a, b) => (b.priority - a.priority) || (b.score - a.score));
  }

  function collectCategoryResponses(kb, normalizedQuestion) {
    const responses = [];
    const pushResponse = (id, priority, text) => {
      if (text) responses.push({ id, priority, text });
    };

    if (includesAny(normalizedQuestion, kb.chat?.categories?.profile)) {
      pushResponse('profile', 70, `${kb.profile.name} is an ${kb.profile.title} based in ${kb.profile.location}. ${kb.profile.summary}`);
    }

    if (includesAny(normalizedQuestion, kb.chat?.categories?.experience) && kb.experience?.length >= 3) {
      pushResponse('experience', 68, `I am remote worker and cybersecurity analyst. My main experience includes ${kb.experience[0].company} as ${kb.experience[0].roles.join(' / ')}, plus ${kb.experience[1].company} and ${kb.experience[2].company}. Key work covers ${kb.experience[0].highlights.join(', ')}.`);
    }

    if (includesAny(normalizedQuestion, kb.chat?.categories?.education)) {
      pushResponse('education', 66, `${kb.profile.name} completed ${kb.education.degree} at ${kb.education.school} (${kb.education.period}).`);
    }

    if (includesAny(normalizedQuestion, kb.chat?.categories?.strengths)) {
      pushResponse('strengths', 64, `Core strengths include ${formatList(kb.strengths)}.`);
    }

    if (includesAny(normalizedQuestion, kb.chat?.categories?.techStack)) {
      pushResponse('techStack', 63, `Tech stack includes Operations: ${formatList(kb.techStack.operations)}. Security: ${formatList(kb.techStack.security)}. Frontend: ${formatList(kb.techStack.frontend)}. Backend: ${formatList(kb.techStack.backend)}. Mobile: ${formatList(kb.techStack.mobile)}. AI tools: ${formatList(kb.techStack.ai)}.`);
    }

    if (includesAny(normalizedQuestion, kb.chat?.categories?.projects)) {
      pushResponse('projects', 62, `Current portfolio projects include ${formatList((kb.projects || []).map((project) => project.name))}. Ask for a specific project name if you want a more focused answer.`);
    }

    if (includesAny(normalizedQuestion, kb.chat?.categories?.certifications)) {
      pushResponse('certifications', 61, `Current certifications include ${formatList(kb.certifications)}.`);
    }

    if (includesAny(normalizedQuestion, kb.chat?.categories?.contact)) {
      pushResponse('contact', 67, `The best way to reach me is ${kb.contact.preference.toLowerCase()} via ${kb.contact.email}. Meeting options currently include ${formatList(kb.contact.meetingOptions)}. Current focus: ${kb.contact.focus}.`);
    }

    if (includesAny(normalizedQuestion, kb.chat?.categories?.location)) {
      pushResponse('location', 69, `I am currently based in ${kb.profile.location}. If you would like, I can also share more about my work, projects, or availability.`);
    }

    return responses;
  }

  function combineDetectedResponses(detections, fallback) {
    const unique = [];
    const seen = new Set();

    detections
      .sort((a, b) => (b.priority - a.priority) || ((b.score || 0) - (a.score || 0)))
      .forEach((item) => {
        if (!item?.id || !item?.text || seen.has(item.id)) return;
        seen.add(item.id);
        unique.push(sanitizeChatReply(item.text));
      });

    if (!unique.length) {
      return sanitizeChatReply(fallback);
    }

    return unique.slice(0, 4).join(' ');
  }

  function answerPortfolioQuestion(question) {
    const kb = buildPortfolioKnowledgeBase();
    const q = normalizeChatText(question);
    const parts = splitQuestionIntoParts(question);

    if (!q) {
      return sanitizeChatReply(kb.chat?.emptyPrompt || 'Ask me about experience, projects, tech stack, certifications, education, or contact details.');
    }

    const detections = [];
    const analyzedParts = [q, ...parts.filter((part) => part !== q)];

    analyzedParts.forEach((part) => {
      findChatIntentMatches(kb, part).forEach((intent) => {
        detections.push({
          id: `intent:${intent.id}`,
          priority: intent.priority,
          score: intent.score,
          text: intent.response,
        });
      });

      findProjectMatches(kb, part).forEach((project) => {
        detections.push({
          id: `project:${project.name}`,
          priority: 75,
          score: 1,
          text: `${project.name} is ${project.summary} Key highlights include ${formatList(project.highlights)}. The main stack or workflow areas are ${formatList(project.stack)}.`,
        });
      });

      collectCategoryResponses(kb, part).forEach((response) => {
        detections.push({
          id: `category:${response.id}`,
          priority: response.priority,
          score: 1,
          text: response.text,
        });
      });
    });

    return combineDetectedResponses(
      detections,
      kb.chat?.fallback || 'I can answer from this portfolio about experience, projects, tech stack, certifications, education, strengths, and contact details. Try a more specific question.'
    );
  }

  function initPortfolioChat() {
    const chatButton = document.getElementById('chatButton');
    const chatWidget = document.getElementById('chatWidget');
    const closeButton = document.querySelector('.close-chat');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const chatSendButton = chatForm ? chatForm.querySelector('button[type="submit"]') : null;

    if (!chatButton || !chatWidget || !closeButton || !chatForm || !chatInput || !chatMessages) return;

    let isSubmitting = false;

    const appendMessage = (text, type = 'bot') => {
      const wrapper = document.createElement('div');
      wrapper.className = `chat-message ${type}`;

      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${type}`;
      bubble.textContent = text;

      wrapper.appendChild(bubble);
      chatMessages.appendChild(wrapper);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return wrapper;
    };

    const setChatPending = (pending) => {
      isSubmitting = pending;
      chatInput.disabled = pending;
      if (chatSendButton) {
        chatSendButton.disabled = pending;
        chatSendButton.textContent = pending ? '...' : 'Send';
      }
    };

    const openChat = () => {
      chatWidget.classList.remove('d-none');
      chatWidget.setAttribute('aria-hidden', 'false');

      if (!chatMessages.dataset.initialized) {
        appendMessage(buildPortfolioKnowledgeBase().chat?.greeting || 'Hi there! Feel free to ask me about my portfolio.', 'bot');
        chatMessages.dataset.initialized = 'true';
      }

      chatInput.focus();
    };

    const closeChat = () => {
      chatWidget.classList.add('d-none');
      chatWidget.setAttribute('aria-hidden', 'true');
    };

    chatButton.addEventListener('click', openChat);
    closeButton.addEventListener('click', closeChat);

    chatForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (isSubmitting) return;

      const userMessage = chatInput.value.trim();
      if (!userMessage) return;

      appendMessage(userMessage, 'user');
      chatInput.value = '';
      setChatPending(true);

      const typingMessage = appendMessage('Thinking...', 'bot');
      typingMessage.classList.add('chat-message-pending');

      window.setTimeout(() => {
          typingMessage.remove();
          appendMessage(answerPortfolioQuestion(userMessage), 'bot');
          setChatPending(false);
          chatInput.focus();
        }, 220);
    });
  }

   // Run the functions when the page loads
    window.onload = function() {
      calculateExperience();
      handleStickyNav();
      initProjectsCarousel();
      initReviewsCarousel();
      initGalleryCarousel();
      initModalHandlers();
      initChatButtonAnimation();
      initPortfolioChat();
      showSection('about', { preserveHistory: false });
    };

  // Section Navigation version 2

  function handleStickyNav() {
  const nav = document.getElementById('sticky-nav');
  const hero = document.getElementById('hero');
  
  if (!nav || !hero) return;

  window.addEventListener('scroll', function() {
    // Get the parent container's placement to ensure no gaps on the right
    const parentRect = nav.parentElement.getBoundingClientRect();

    if (window.scrollY >= hero.offsetHeight) {
      // 1. Keep the layout position exactly like the original
      nav.style.position = 'fixed';
      nav.style.top = '0px';
      nav.style.zIndex = '1000';
      
      // 2. Force the width and left to match the parent container perfectly
      nav.style.width = parentRect.width + 'px';
      nav.style.left = parentRect.left + 'px';
      
      // 3. Keep intended nav look: only mild translucent glass, not solid white.
      const isDark = document.documentElement.classList.contains('dark');
      nav.style.backgroundColor = isDark ? 'rgba(17, 24, 39, 0.75)' : 'rgba(255, 255, 255, 0.18)';
      nav.style.backdropFilter = 'blur(12px)';
      
      nav.classList.add('nav-active');
      nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      nav.style.transition = 'none'; // Removes the "swipe" or "OA" movement
    } else {
      // Reset everything to the original relative position
      nav.style.position = '';
      nav.style.top = '';
      nav.style.left = '';
      nav.style.width = '';
      nav.style.backgroundColor = '';
      nav.style.boxShadow = '';
      nav.classList.remove('nav-active');
    }

    updateFloatingBackButton();
  });
}

// Projects Carousel (version improved with 3D / coverflow + cards)
function initProjectsCarousel() {
  if (typeof Swiper === 'undefined') {
    console.warn('Swiper not found: please include swiper-bundle.min.js before pfz.js.');
    return;
  }

  const projectSwiperEl = document.querySelector('.projectSwiper');
  if (!projectSwiperEl) return;

const swiper = new Swiper('.projectSwiper', {
  effect: 'slide',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 500,
  loop: true,
  slidesPerGroup: 1,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 3,
  },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    keyboard: {
      enabled: true,
    },
    mousewheel: {
      forceToAxis: true,
      invert: false,
    },
    breakpoints: {
      350: { slidesPerView: 1, spaceBetween: 10 },
      700: { slidesPerView: 1, spaceBetween: 10 },
      844: { slidesPerView: 1, spaceBetween: 10 },
      1124: { slidesPerView: 1, spaceBetween: 10 },
      1380: { slidesPerView: 1, spaceBetween: 10 },
    },
    on: {
      slideChangeTransitionEnd() {
        // ensure smooth centering
      },
    },
  });

  // Expose for debug or later update if needed
  window.projectSwiper = swiper;
}

function initReviewsCarousel() {
  if (typeof Swiper === 'undefined') {
    console.warn('Swiper not found: please include swiper-bundle.min.js before pfz.js.');
    return;
  }

  const reviewSwiperEl = document.querySelector('.reviewSwiper');
  if (!reviewSwiperEl) return;

  const swiper = new Swiper('.reviewSwiper', {
    effect: 'slide',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 16,
    speed: 500,
    loop: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.review-swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 3,
    },
    navigation: {
      prevEl: '.review-swiper-prev',
      nextEl: '.review-swiper-next',
    },
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      640: { slidesPerView: 1 },
      1024: { slidesPerView: 1 },
    },
  });

  window.reviewSwiper = swiper;
}

// Gallery Carousel - Microsoft Store Style Horizontal Scroll
function initGalleryCarousel() {
  if (typeof Swiper === 'undefined') {
    console.warn('Swiper not found: please include swiper-bundle.min.js before pfz.js.');
    return;
  }

  const gallerySwiperEl = document.querySelector('.gallerySwiper');
  if (!gallerySwiperEl) return;

  const swiper = new Swiper('.gallerySwiper', {
    effect: 'slide',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 1,
    spaceBetween: 14,
    speed: 850,
    loop: true,
    freeMode: false,
    slideToClickedSlide: true,
    autoplay: {
      delay: 2600,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: '.gallery-swiper-pagination',
      clickable: false,
    },
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      0: {
        spaceBetween: 10
      },
      640: { 
        slidesPerView: 'auto',
        spaceBetween: 12
      },
      1024: { 
        slidesPerView: 'auto',
        spaceBetween: 14
      },
    },
  });

  const paginationEl = document.querySelector('.gallery-swiper-pagination');
  const slotOffsets = [-2, -1, 0, 1, 2];
  let galleryPaginationDots = [];

  const updateGalleryPaginationWindow = () => {
    if (!paginationEl || !galleryPaginationDots.length) return;

    const totalSlides = swiper.slides.length - (swiper.loopedSlides * 2);
    if (totalSlides <= 0) return;

    const activeIndex = swiper.realIndex;

    galleryPaginationDots.forEach((button, index) => {
      const offset = slotOffsets[index];
      const targetIndex = (activeIndex + offset + totalSlides) % totalSlides;
      const stateClass = offset === 0
        ? 'is-active'
        : offset === -1 || offset === 1
          ? 'is-near'
          : 'is-far';

      button.className = `gallery-pagination-dot ${stateClass}`;
      button.setAttribute('data-gallery-target', String(targetIndex));
      button.setAttribute('aria-label', `Go to gallery slide ${targetIndex + 1}`);
    });
  };

  const initGalleryPaginationWindow = () => {
    if (!paginationEl) return;

    paginationEl.innerHTML = `
      <div class="gallery-pagination-window" aria-label="Gallery pagination">
        ${slotOffsets.map(() => `
          <button
            class="gallery-pagination-dot is-far"
            type="button"
          ></button>
        `).join('')}
      </div>
    `;

    galleryPaginationDots = Array.from(paginationEl.querySelectorAll('.gallery-pagination-dot'));

    galleryPaginationDots.forEach((button) => {
      button.addEventListener('click', () => {
        const targetIndex = Number(button.getAttribute('data-gallery-target'));
        if (Number.isNaN(targetIndex)) return;
        swiper.slideToLoop(targetIndex);
      });
    });

    updateGalleryPaginationWindow();
  };

  initGalleryPaginationWindow();
  swiper.on('slideChangeTransitionStart', updateGalleryPaginationWindow);

  window.gallerySwiper = swiper;
}

// Modal Handlers
function initModalHandlers() {
  const modal = document.getElementById('viewAllModal');
  const modalContainer = modal ? modal.querySelector('.modal-container-minimal') : null;
  const closeBtn = document.getElementById('closeModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  const viewAllBtns = document.querySelectorAll('.pfz-btn-view[data-modal-section]');
  const techStackInlineBtn = document.querySelector('.pfz-btn-view1[data-inline-expand="tech-stack"]');
  const techStackInlineItems = document.querySelectorAll('[data-techstack-extra]');
  const techStackInlineShell = document.querySelector('[data-techstack-shell]');
  const certificationsInlineBtn = document.querySelector('.pfz-btn-view1[data-inline-expand="certifications"]');
  const certificationsInlineGroup = document.querySelector('[data-certifications-extra]');
  let activeModalCharts = [];
  let modalReviewSwiper = null;
  let modalCloseTimer = null;

  if (!modal || !modalContainer || !modalTitle || !modalContent) return;

  const modalSections = {
    strengths: {
      title: 'Core Strengths',
      subtitle: 'Capability dashboard across support, infrastructure, security, and collaboration.',
      metrics: [
        {
          label: 'IT Support L0 - L3',
          value: 90,
          detail: 'Handles day-to-day incidents, troubleshooting, and escalations across frontline to advanced support layers.',
          subLabel: 'Support Workflow Depth',
          subValue: 90,
          subDetail: 'Strong triage, user issue handling, remote assistance, and follow-through until resolution.',
        },
        {
          label: 'Network Administration',
          value: 84,
          detail: 'Maintains connectivity, device health, and business network stability for operational continuity.',
          subLabel: 'Infrastructure Reliability',
          subValue: 86,
          subDetail: 'Covers practical troubleshooting, monitoring, and stable day-to-day systems administration.',
        },
        {
          label: 'Cybersecurity Analysis',
          value: 82,
          detail: 'Applies a protection-first mindset in system hardening, review, and risk awareness activities.',
          subLabel: 'Risk & Response Readiness',
          subValue: 85,
          subDetail: 'Supports vulnerability awareness, incident response actions, and secure operating practices.',
        },
        {
          label: 'Teamwork / Collaboration',
          value: 91,
          detail: 'Works smoothly across teams while mentoring, communicating clearly, and supporting business users.',
          subLabel: 'Mentorship & Communication',
          subValue: 89,
          subDetail: 'Brings calm coordination, practical guidance, and dependable support across stakeholders.',
        },
      ]
    },
    experience: {
      title: 'Experience',
      subtitle: 'Overall professional history across anytype of roles, and business-facing technical service.',
      companies: [
        {
          company: 'SYL Hermanos',
          iconClass: 'fas fa-building',
          iconColorClass: 'text-blue-600',
          employmentType: 'Full-time',
          industry: 'Retail & Distribution / Manufacturing',
          roles: [
            {
              title: 'IT Specialist',
              start: '2023-10',
              end: '2026-04',
            },
            {
              title: 'IT Assistant',
              start: '2022-11',
              end: '2023-10',
            },
          ],
          details: [
            'Delivered Level 0-3 IT support and helpdesk coverage across end users, business applications, endpoints, and multi-branch operational issues.',
            'Administered IT systems, storage environments, shared drives, workstation assets, and business-critical services supporting daily operations.',
            'Handled endpoint protection, firewall administration, network monitoring, server observation, and threat-aware troubleshooting across a multi-vendor environment.',
            'Supported SAP ERP, Sales Force Automation, Office 365, SharePoint, cloud services, email platforms, and database-related operational tasks.',
            'Coordinated vendors, ISPs, and service providers while guiding internal IT teammates, mentoring users, and improving routine workflows.',
          ],
          competencies: [
            'IT Support L0-L3',
            'IT Systems Administration',
            'Storage Management',
            'Remote Support',
            'Network Administration',
            'Firewall Administration',
            'Active Directory',
            'Endpoint Protection',
            'Network & Server Monitoring',
            'SAP ERP Support',
            'Office 365 Administration',
            'SharePoint Administration',
            'Cloud Services Administration',
            'Email Administration',
            'Database Administration',
            'Backup & Disaster Recovery',
            'IT Policies & Compliance',
            'Cybersecurity Operations',
            'Vendor & ISP Coordination',
            'IT Team Guidance',
            'IT Project Support',
            'IT Asset Management',
            'Workflow Optimization',
            'Daily IT Operations',
          ],
          accomplishments: [
            'Supported 150+ users across multiple branches while keeping daily IT operations stable and uninterrupted.',
            'Managed 50+ network devices, including Fortinet and Sophos environments, with 99% uptime.',
            'Administered Office 365, SharePoint, Synology NAS, and SAP ERP to improve collaboration and workflow efficiency.',
            'Implemented backup and disaster recovery procedures, standardized license tracking, and reinforced IT policies.',
            'Monitored networks and endpoints to reduce cybersecurity risks and strengthen operational stability.',
            'Guided IT teams, provided mentoring, and optimized workflows across multiple branches.',
            'Performed daily IT operations and routine technical task assignments consistently.',
          ],
        },
        {
          company: 'E2E Process & Experts',
          iconClass: 'fas fa-building',
          iconColorClass: 'text-gray-500',
          employmentType: 'Full-time',
          industry: 'Software Development',
          roles: [
            {
              title: 'IT Intern',
              start: '2020-01',
              end: '2020-05',
            },
          ],
          details: [
            'Assisted in day-to-day technical tasks while gaining practical experience in structured IT and software support environments.',
            'Supported foundational troubleshooting, documentation, and coordination tasks that strengthened hands-on technical discipline.',
          ],
          competencies: [
            'Technical Support',
            'Documentation',
            'Basic Software Development Exposure',
            'Process Familiarity',
            'Team Collaboration',
          ],
        },
        {
          company: 'Nokia Solutions and Networks',
          blurCompany: true,
          iconClass: 'fas fa-building',
          iconColorClass: 'text-amber-600',
          employmentType: 'Contractual / Project',
          industry: 'Warehouse Operations',
          roles: [
            {
              title: 'Warehouse Man',
              start: '2021-10',
              end: '2022-04',
            },
          ],
          details: [
            'Performed warehouseman duties while supporting administrative work, audit tasks, data entry encoding, and warehouse in-charge responsibilities.',
            'Assisted with audit-related work, record checking, and data entry support.',
            'Contributed to organized inventory handling and basic operational documentation.',
          ],
          competencies: [
            'Warehouse Operations',
            'Audit Support',
            'Data Entry',
            'Inventory Coordination',
            'Process Support',
          ],
        },
      ]
    },
    education: {
      title: 'Education',
      subtitle: 'Academic foundation in information technology, supported by continuous learning and practical upskilling.',
      schools: [
        {
          degree: 'Bachelor of Science in Information Technology',
          school: 'Iloilo Science and Technology University',
          period: '2016 - 2020',
          summary: [
            'Built a formal foundation in information technology covering software, systems, networking, and practical technical problem-solving.',
            'Developed academic and hands-on exposure thru I.T. basics and fundamentals.',
          ],
          awards: [
            'Top 1000 Influential Student Achievers',
            'ISAT U Youth Skills Web Development - Champion, 1st Place (2019)',
            'ISAT U Youth Skills Programming - Champion, 1st Place (2019)',
            'BPI Resilient Youth Hackathon - Champion, 2nd Place (2019)',
            'ISAT U Youth Skills Programming - Champion, 2nd Place (2018)',
          ],
          trainings: [
            'Academic training in information systems, software fundamentals, and technical support practices.',
            'Practical exposure to collaborative project work, documentation, and technology-based problem solving.',
          ],
        },
      ]
    },
    'tech-stack': {
      title: 'Tech Stack',
      subtitle: 'Expanded toolkit across IT operations, cybersecurity, frontend, backend, and databases.',
      groups: [
        {
          title: 'I.T Operations',
          items: [
            'Windows',
            'Active Directory',
            'Endpoint Protection',
            'Inhouse Networking',
            'SQL Server Management',
            'Cloud Computing & Services',
            'Basic Scripting',
            'Git',
            'GitHub',
            'IT Automation',
            'System & Network Monitoring',
          ],
        },
        {
          title: 'Cybersecurity',
          items: [
            'Fortinet Fortigate',
            'Sophos',
            'Zabbix',
            'Active Directory',
            'Wazuh (SIEM)',
            'SolarWinds',
            'Microsoft 365 Defender',
          ],
        },
        {
          title: 'Frontend',
          items: [
            'HTML5',
            'CSS',
            'Tailwind CSS',
            'Bootstrap',
            'JavaScript',
            'React',
          ],
        },
        {
          title: 'Backend',
          items: [
            'MySQL',
            'PHP',
            'Python',
            'Java',
            'JavaScript',
            'Node.js',
          ],
        },
        {
          title: 'Databases',
          items: [
            'SQL Server Management',
            'MongoDB',
            'PhpMyAdmin',
          ],
        },
        {
          title: 'Mobile Development',
          items: [
            'Flutter',
            'Dart',
            'Android',
            'iOS',
          ],
        },
        {
          title: 'AI Tools',
          items: [
            'ChatGPT',
            'Gemini',
            'Microsoft Copilot',
            'Claude',
          ],
        },
      ]
    },
    projects: {
      title: 'Projects',
      subtitle: 'Selected builds across transparency systems, inventory workflows, security operations, web presence, and logistics tracking.',
      items: [
        {
          id: 'project-lgu-mts',
          title: 'LGU Municipality Transparency System (MTS)',
          category: 'GovTech Platform',
          icon: 'fa-solid fa-landmark',
          summary: 'A publishing and transparency system for municipality offices and barangays with structured posting, announcements, and local content management. With enhanced AI integration through a centralized social media: Facebook page and LGU website.',
          impact: 'Multi-level publishing and announcement management',
          metric: '30 modules',
          metricLabel: 'Publishing and admin views',
          status: 'Production-ready prototype',
          role: 'Full-stack Developer',
          platform: 'Web CMS',
          delivery: 'Admin + Barangay Portals',
          features: ['Barangay posting flow', 'Emergency bulletin cards', 'Role-based approvals'],
          stack: ['PHP', 'MySQL', 'Bootstrap', 'CMS'],
          preview: 'transparency',
        },
        {
          id: 'project-inventory-system',
          title: 'Inventory Management System',
          category: 'Operations Dashboard',
          icon: 'fa-solid fa-boxes-stacked',
          summary: 'A stock, procurement, and asset workflow platform built for clearer monitoring, branch-level control, and faster reporting.',
          impact: 'Real-time stock monitoring and procurement visibility',
          metric: 'Live stocks',
          metricLabel: 'Procurement and inventory tracking',
          status: 'Internal business system',
          role: 'System Developer',
          platform: 'Web Dashboard',
          delivery: 'Inventory + Procurement',
          features: ['Stock movement panels', 'Procurement queue', 'Branch report exports'],
          stack: ['PHP', 'MySQL', 'Dashboard', 'Reports'],
          preview: 'inventory',
        },
        {
          id: 'project-edr',
          title: 'Advanced Endpoint Defense (EDR)',
          category: 'Security Operations',
          icon: 'fa-solid fa-shield-halved',
          summary: 'An endpoint defense rollout focused on threat visibility, device isolation, and stronger workstation protection across operations.',
          impact: 'Threat isolation and stronger endpoint posture',
          metric: '24/7 watch',
          metricLabel: 'Alerting and containment posture',
          status: 'Security rollout',
          role: 'IT Operations / Security Support',
          platform: 'Endpoint Defense',
          delivery: 'Policy + Monitoring',
          features: ['Threat telemetry', 'Isolation controls', 'Protection policy views'],
          stack: ['Sophos', 'EDR', 'Threat Monitoring', 'Security Ops'],
          preview: 'security',
        },
        {
          id: 'project-company-profile',
          title: 'Company Customizable Profile Website',
          category: 'Frontend Experience',
          icon: 'fa-solid fa-window-maximize',
          summary: 'A flexible company web presence with editable sections, responsive layouts, and a cleaner business-facing presentation layer.',
          impact: 'Flexible branding and maintainable web presence',
          metric: 'UI-ready',
          metricLabel: 'Modular content blocks',
          status: 'Client-facing website',
          role: 'Frontend Developer',
          platform: 'Responsive Web',
          delivery: 'Brand + Landing Pages',
          features: ['Editable landing sections', 'Responsive page flow', 'Brand-driven layout system'],
          stack: ['React', 'Tailwind CSS', 'Bootstrap', 'Responsive UI'],
          preview: 'website',
        },
        {
          id: 'project-pfz-logistics',
          title: 'PFZ Delivery & Logistics Management System',
          category: 'Logistics Platform',
          icon: 'fa-solid fa-truck-fast',
          summary: 'A delivery operations system that combines booking, assignment, geotagging, and traceability into one workflow view.',
          impact: 'Delivery transparency and activity tracking',
          metric: 'Route logs',
          metricLabel: 'Booking to delivery visibility',
          status: 'Operations platform',
          role: 'System Developer',
          platform: 'Logistics Dashboard',
          delivery: 'Booking + Geotagging',
          features: ['Booking coordination', 'Driver activity logs', 'Geotagged delivery flow'],
          stack: ['JavaScript', 'Geotagging', 'Logs', 'Operations'],
          preview: 'logistics',
        },
        {
          id: 'project-registrar-inventory',
          title: 'Registrar Inventory Management System',
          category: 'Academic Operations',
          icon: 'fa-solid fa-user-graduate',
          summary: 'A registrar-focused system with AI dashboards, student grade transparency with account limitations, faster encoder workflows, sister-module access, and confidentiality controls for restricted files.',
          impact: 'Academic transparency with controlled access and faster registrar operations',
          metric: 'Registrar-ready',
          metricLabel: 'Student records and admin workflows',
          status: 'Academic admin system',
          role: 'System Developer',
          platform: 'Web Dashboard',
          delivery: 'Registrar + Sister Modules',
          features: ['Grade transparency with user limitations', 'Fast-paced registrar encoding', 'Confidential file authorization controls'],
          stack: ['PHP', 'MySQL', 'AI Dashboards', 'Admin Workflow'],
          preview: 'registrar',
        },
        {
          id: 'project-thesis-inventory',
          title: 'Thesis Inventory System',
          category: 'Research Archive',
          icon: 'fa-solid fa-book-open-reader',
          summary: 'A thesis archiving platform designed to reduce hardbound printing costs, support electronic defense-ready copies, and improve retrieval through AI dashboards and search filtering.',
          impact: 'Lower document cost and easier academic archive access',
          metric: 'Paperless flow',
          metricLabel: 'Defense-ready digital document archive',
          status: 'Academic archive platform',
          role: 'System Developer',
          platform: 'Web System',
          delivery: 'Archive + Search + Access',
          features: ['Thesis project archiving', 'Reduced printing and defense copy costs', 'AI dashboards with search filtering'],
          stack: ['Archive System', 'AI Search', 'Document Workflow', 'Web App'],
          preview: 'website',
        },
        {
          id: 'project-police-rescue',
          title: 'Police and Rescue Services Management System',
          category: 'Emergency Response System',
          icon: 'fa-solid fa-tower-broadcast',
          summary: 'A response coordination system for incident intake, dispatch visibility, media capture, and real-time rescue support workflows.',
          impact: 'Faster incident visibility and coordinated response handling',
          metric: 'Dispatch ready',
          metricLabel: 'Mobile and web response views',
          status: 'Field-response concept build',
          role: 'Full-stack / Mobile App Developer',
          platform: 'Web + Mobile',
          delivery: 'Dispatch + Incident Intake',
          features: ['Incident intake board', 'Camera evidence support', 'Rescue dispatch tracking'],
          stack: ['Mobile App', 'Web App', 'Geotagging', 'Dispatch'],
          preview: 'response',
        },
      ]
    },
    certifications: {
      title: 'Certifications',
      subtitle: 'Content for this section is being designed separately.',
      items: []
    },
    reviews: {
      title: 'Reviews and Recommendations',
      subtitle: 'Feedback highlighting reliability, technical depth, mentorship, and team collaboration.',
      items: [
        {
          meta: 'Andreo Dalawwangbayan | IT Manager',
          title: 'Trusted and Adaptable',
          description: '"Great service and support. Trustworthy and adaptable. Highly recommended!"',
          reviewerType: 'Work Colleague',
          sentiment: 100,
          reviewDate: '2026-03-26'
        },
        {
          meta: 'Jahleel Arizala | Senior Media Buyer',
          title: 'Professional and Proactive',
          description: '"Peter Paul consistently demonstrates a positive attitude and strong work ethic. He is proactive, reliable, and shows initiative in completing tasks."',
          reviewerType: 'Friend',
          sentiment: 100,
          reviewDate: '2026-03-26'
        },
        {
          meta: 'Pearl Carmelo | Accountant',
          title: 'Strong Mentor and Teammate',
          description: '"Peter is a nice friend, work colleague and great mentor. He allowing me to grow in my career and gain valuable experience and basic knowledge regarding in IT basics."',
          reviewerType: 'Work Colleague',
          sentiment: 100,
          reviewDate: '2026-03-27'
        },
        {
          meta: 'Kim Jade Baroa | IT Supervisor',
          title: 'Strong Mentor and Teammate',
          description: '"Peter is a great teammate and mentor. He showed us his expertise and amazing knowledge."',
          reviewerType: 'Work Colleague',
          sentiment: 100,
          reviewDate: '2026-03-27'
        },
        {
          meta: 'Jason Bernard Ongsuco | Social Media Marketing | Video Editor',
          title: 'Proactive and Adaptable',
          description: '"Highly recommended!"',
          reviewerType: 'Instructor',
          sentiment: 100,
          reviewDate: '2026-03-29'
        }
      ]
    }
  };

  function renderModalItems(items) {
    return items.map((item) => {
      const description = item.description
        ? `<p class="modal-item-description">${item.description}</p>`
        : '';
      const list = Array.isArray(item.list) && item.list.length
        ? `<ul class="modal-item-list">${item.list.map((entry) => `<li>${entry}</li>`).join('')}</ul>`
        : '';

      return `
        <article class="modal-item-full modal-item-full-card">
          ${item.meta ? `<div class="modal-folder-tab">${item.meta}</div>` : ''}
          <div class="modal-folder-body">
            <h4 class="modal-item-title">${item.title}</h4>
            ${description}
            ${list}
          </div>
        </article>
      `;
    }).join('');
  }

  function destroyModalCharts() {
    activeModalCharts.forEach((chartInstance) => chartInstance.destroy());
    activeModalCharts = [];
  }

  function destroyModalReviewSwiper() {
    if (modalReviewSwiper) {
      modalReviewSwiper.destroy(true, true);
      modalReviewSwiper = null;
    }
  }

  function collectReviewModalData() {
    const reviewCards = document.querySelectorAll('.reviewSwiper .swiper-slide:not(.swiper-slide-duplicate) .review-card');

    return Array.from(reviewCards).map((card) => {
      const author = card.querySelector('.font-size-12b')?.textContent?.trim() || 'Reviewer';
      const role = card.querySelector('.font-size-12.text-gray-500')?.textContent?.trim() || '';
      const reviewParagraphs = Array.from(card.querySelectorAll('p.font-size-10:not([data-review-suggestions-improvements])'))
        .map((paragraph) => paragraph.textContent.trim())
        .filter(Boolean);
      const suggestion = card.querySelector('[data-review-suggestions-improvements]')?.textContent?.trim() || '';
      const image = card.querySelector('img')?.getAttribute('src') || 'assets/img/reviewer1.jpg';
      const reviewDateValue = card.querySelector('.reviewed-date')?.textContent?.trim()
        || card.querySelector('[data-review-date]')?.getAttribute('data-review-date')
        || '';

      return {
        author,
        role,
        image,
        reviewParagraphs,
        suggestion,
        reviewDate: parseReviewDateValue(reviewDateValue),
      };
    });
  }

  function parseReviewDateValue(value) {
    const rawValue = (value || '').trim();
    if (!rawValue) return null;

    const isoMatch = rawValue.match(/\b(\d{4}-\d{2}-\d{2})\b/);
    if (isoMatch) {
      return isoMatch[1];
    }

    const jsDateMatch = rawValue.match(/new\s+date\s*\(\s*([^)]+?)\s*\)/i);
    const dateInput = jsDateMatch ? jsDateMatch[1].replace(/["']/g, '').trim() : rawValue.replace(/["']/g, '').trim();
    const parsedDate = new Date(dateInput);

    if (Number.isNaN(parsedDate.getTime())) {
      return null;
    }

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function detectReviewerTypes(review) {
    const combinedText = normalizeChatText([
      review.author,
      review.role,
      ...(review.reviewParagraphs || []),
      review.suggestion || '',
    ].join(' '));

    const detected = new Set();

    const workSignals = [
      'work colleague', 'colleague', 'manager', 'supervisor', 'consultant', 'accountant',
      'at syl hermanos', 'it consultant', 'it supervisor', 'it manager', 'teammate', 'mentor', 
      'it specialist', 'it assistant', 'co-worker', 'coworker', 'boss', 'employer', 'employee',
      'syl hermanos', 'e2e process & experts', 'nokia solutions and networks', 'syl',
      'team work', 'team player', 'work together', 'collaborate', 'collaboration', 'project', 'support', 
      'help', 'guide', 'train', 'train me', 'training', 'mentoring', 'mentor me', 'work with', 'worked with', 
      'working with', 'work alongside', 'work alongside me', 'work alongside us', 'work alongside them', 'work alongside you',
    ];
    const friendSignals = ['friend', 'classmate', 'loyal', 'in your corner', 'partner', 'relationship', 
      'personal', 'off work', 'outside of work', 'hang out', 'social', 'buddy', 'pal', 'mate'
    ];
    const instructorSignals = ['instructor', 'mentor during college', 'college days as his instructor'];
    const othersSignals = [
      'entrepreneur', 'guest', 'client', 'brand', 'customer', 'school mate', 'classmate', 'fellow student', 'academic advisor', 
      'professor', 'teacher', 'coach', 'trainer', 'mentor', 'peer', 'colleague from school', 'collaborator', 'partner in projects', 
      'worked with me in projects', 'worked with us in projects', 'worked with them in projects', 'worked with you in projects',
    ];

    if (includesAny(combinedText, workSignals)) detected.add('Work Colleague');
    if (includesAny(combinedText, friendSignals)) detected.add('Friend');
    if (includesAny(combinedText, instructorSignals)) detected.add('Instructor');
    if (includesAny(combinedText, othersSignals)) detected.add('Others');

    if (!detected.size) {
      detected.add('Others');
    }

    return Array.from(detected);
  }

  function scoreReviewText(text, type = 'general') {
    const normalized = normalizeChatText(text);
    if (!normalized) return 0;

    const strongPositive = [
      'highly recommended', 'trustworthy', 'professional', 'reliable', 'dependable',
      'adaptable', 'dedicated', 'great', 'strong work ethic', 'positive attitude',
      'excellent', 'exceptional', 'valuable asset', 'powerhouse', 'scalable', 'maintainable',
      'helpful', 'supportive', 'approachable', 'patient', 'presenting', 'share', 'explain',
      'responsibility', 'discipline', 'team player', 'creative', 'loyal', 'genuine', 'efficient', 
      'technical', 'knowledge', 'leadership', 'communication',
    ];
    const moderatePositive = [
      'initiative', 'mentor', 'autonomy', 'creative', 'patient', 'loyal', 'genuine', 'efficient',
      'technical', 'knowledge', 'leadership', 'communication', 'collaboration',
      'continue', 'confidence', 'challenging', 'encourage', 'minimal improvement',
    ];
    const growthTerms = [
      'room for growth', 'opportunity to improve', 'needs improvement',
      'improve communication', 'improve technical skills', 'improve teamwork', 'improve collaboration',
      'continue to enhance', 'continue to build', 'more vocal', 'more confidence',
      'take more lead', 'stepping into that senior level ownership', 'management role',
       'further development',
    ];
    const cautionTerms = [
      'take a break', 'more lead', 'ownership',
    ];
    const negativeTerms = ['weak', 'poor', 'bad', 'problem', 'issue', 'unreliable'];

    let score = type === 'suggestion' ? 90 : 94;
    strongPositive.forEach((term) => {
      if (normalized.includes(term)) score += 2.6;
    });
    moderatePositive.forEach((term) => {
      if (normalized.includes(term)) score += 1.25;
    });
    growthTerms.forEach((term) => {
      if (normalized.includes(term)) score -= type === 'suggestion' ? 0.45 : 1.15;
    });
    cautionTerms.forEach((term) => {
      if (normalized.includes(term)) score -= type === 'suggestion' ? 0.4 : 0.9;
    });
    negativeTerms.forEach((term) => {
      if (normalized.includes(term)) score -= type === 'suggestion' ? 1.5 : 2.8;
    });

    return Math.max(88, Math.min(100, Number(score.toFixed(2))));
  }

  function scorePerformanceBucket(text, bucket) {
    const normalized = normalizeChatText(text);
    if (!normalized) return null;

    const positiveMatches = (bucket.positive || []).reduce((count, term) => (
      normalized.includes(normalizeChatText(term)) ? count + 1 : count
    ), 0);
    const growthMatches = (bucket.growth || []).reduce((count, term) => (
      normalized.includes(normalizeChatText(term)) ? count + 1 : count
    ), 0);

    if (!positiveMatches && !growthMatches) {
      return null;
    }

    const sourceWeight = bucket.source === 'suggestion' ? 0.96 : 1;
    const baseScore = bucket.source === 'suggestion' ? 91 : 94;
    const rawScore = (baseScore + (positiveMatches * 1.8) - (growthMatches * 1.1)) * sourceWeight;

    return Number(Math.max(88, Math.min(99, rawScore)).toFixed(2));
  }

  function buildReviewAnalytics(reviewSlides) {
    const typeCounts = {
      'Work Colleague': 0,
      Friend: 0,
      Instructor: 0,
      Others: 0,
    };

    const reviewScores = reviewSlides.map((review) => {
      const paragraphScores = (review.reviewParagraphs || []).map((paragraph) => scoreReviewText(paragraph));
      const suggestionScore = review.suggestion ? scoreReviewText(review.suggestion, 'suggestion') : null;
      const allScores = suggestionScore !== null ? [...paragraphScores, suggestionScore] : paragraphScores;
      const overallScore = allScores.length
        ? Number((allScores.reduce((sum, value) => sum + value, 0) / allScores.length).toFixed(2))
        : 0;

      detectReviewerTypes(review).forEach((type) => {
        if (typeCounts[type] !== undefined) {
          typeCounts[type] += 1;
        }
      });

      return {
        ...review,
        paragraphScores,
        suggestionScore,
        overallScore,
      };
    });

    const avgPositive = reviewScores.length
      ? Number(Math.max(95, (
        reviewScores.reduce((sum, review) => sum + review.overallScore, 0) / reviewScores.length
      )).toFixed(2))
      : 95;
    const avgNegative = Math.max(0, Number((100 - avgPositive).toFixed(2)));

    const performanceBuckets = {
      'Communication Skills': {
        positive: ['communication', 'approachable', 'supportive', 'patient', 'presenting', 'share', 'explain', 'transparent communication', 'vocal'],
        growth: ['improve communication', 'enhance communication', 'more vocal', 'confidence', 'challenging situations'],
      },
      'Technical Skills / Knowledge': {
        positive: ['technical', 'architecture', 'code', 'systems', 'infrastructure', 'expertise', 'knowledge', 'scalable', 'maintainable', 'troubleshooting'],
        growth: ['improve technical skills', 'continue to learn', 'continue to build', 'growth'],
      },
      'Work Attitude / Professionalism': {
        positive: ['professional', 'reliable', 'dedicated', 'discipline', 'work ethic', 'initiative', 'responsibility', 'adaptable', 'positive attitude', 'dependable'],
        growth: ['needs improvement', 'minimal improvement', 'management role'],
      },
      'Teamwork / Collaboration': {
        positive: ['team', 'mentor', 'helpful', 'support', 'collaboration', 'colleague', 'leadership', 'easy to work with', 'works well with others'],
        growth: ['improve teamwork', 'improve collaboration', 'take more lead', 'ownership'],
      },
    };

    const performanceAverages = Object.entries(performanceBuckets).map(([label, bucket]) => {
      const bucketScores = [];

      reviewScores.forEach((review) => {
        (review.reviewParagraphs || []).forEach((paragraph) => {
          const score = scorePerformanceBucket(paragraph, { ...bucket, source: 'paragraph' });
          if (score !== null) bucketScores.push(score);
        });

        if (review.suggestion) {
          const suggestionScore = scorePerformanceBucket(review.suggestion, { ...bucket, source: 'suggestion' });
          if (suggestionScore !== null) bucketScores.push(suggestionScore);
        }
      });

      if (!bucketScores.length) {
        return Number(Math.max(92, Math.min(98, avgPositive)).toFixed(2));
      }

      const bucketAverage = bucketScores.reduce((sum, value) => sum + value, 0) / bucketScores.length;
      const balancedScore = (bucketAverage * 0.58) + (avgPositive * 0.42);

      return Number(Math.max(91, Math.min(99, balancedScore)).toFixed(2));
    });

    return {
      typeCounts,
      reviewScores,
      avgPositive,
      avgNegative,
      performanceLabels: Object.keys(performanceBuckets),
      performanceAverages,
    };
  }

  function renderReviewsDashboard(section) {
    const reviewSlides = collectReviewModalData();

    return `
      <section class="reviews-dashboard">
        <div class="dashboard-grid">
          <article class="dashboard-card">
            <h4 class="dashboard-card-title">Reviewer Type</h4>
            <div class="dashboard-chart-wrap">
              <canvas id="reviewsPieChart" aria-label="Reviewer type chart"></canvas>
            </div>
          </article>

          <article class="dashboard-card">
            <h4 class="dashboard-card-title">Feedback Sentiment</h4>
            <div class="dashboard-chart-wrap">
              <canvas id="reviewsSentimentChart" aria-label="Feedback sentiment chart"></canvas>
            </div>
          </article>

          <article class="dashboard-card dashboard-card-wide">
            <h4 class="dashboard-card-title">Overall Performance</h4>
            <div class="dashboard-chart-wrap dashboard-chart-wrap-wide">
              <canvas id="reviewsPerformanceChart" aria-label="Overall performance chart"></canvas>
            </div>
            <p class="dashboard-scale-note">
              Percentage-based score derived from review paragraphs, supporting details, and suggestions.
            </p>
          </article>

          <article class="dashboard-card dashboard-card-wide">
            <h4 class="dashboard-card-title">Review Activity Monitoring</h4>
            <div class="dashboard-chart-wrap dashboard-chart-wrap-wide">
              <canvas id="reviewsTimelineChart" aria-label="Review timeline chart"></canvas>
            </div>
          </article>
        </div>

        <section class="modal-reviews-carousel">
          <div class="swiper modalReviewSwiper">
            <div class="swiper-wrapper">
              ${reviewSlides.map((review) => `
                <div class="swiper-slide">
                  <article class="review-card p-4 sm:p-5 w-full">
                    <div class="flex items-center gap-3 pb-2">
                      <img src="${review.image}" style="width: 40px; height: 40px;" class="w-[40px] h-[40px] rounded-full mr-1 review-avatar-confidential" alt="${review.author}">
                      <div>
                        <p class="font-size-12b mb-0">${review.author}</p>
                        <p class="font-size-12 text-gray-500 mb-0">${review.role}</p>
                      </div>
                    </div>
                    ${review.reviewParagraphs.map((paragraph) => `
                      <p class="font-size-10 text-gray-300 mb-0 inline-flex items-center">${paragraph}</p>
                    `).join('')}
                    <p
                      class="review-extra-note mt-2 font-size-10 text-gray-300 mb-0 inline-flex items-center"
                      ${review.suggestion ? '' : 'hidden'}
                      aria-label="Suggestion & Improvements"
                    >
                      <strong>Suggestion & Improvements:</strong> ${review.suggestion}
                    </p>
                  </article>
                </div>
              `).join('')}
            </div>
            <div class="swiper-pagination modal-review-pagination"></div>
            <div class="swiper-button-prev modal-review-prev"></div>
            <div class="swiper-button-next modal-review-next"></div>
          </div>
        </section>
      </section>
    `;
  }

  function renderStrengthsDashboard(section) {
    const metrics = section.metrics || [];

    return `
      <section class="strengths-dashboard">
        <div class="dashboard-grid">
          <article class="dashboard-card dashboard-card-wide">
            <h4 class="dashboard-card-title">Core Strengths Overview</h4>
            <div class="dashboard-chart-wrap dashboard-chart-wrap-wide">
              <canvas id="strengthsOverviewChart" aria-label="Core strengths overview chart"></canvas>
            </div>
          </article>

          <article class="dashboard-card mb-2">
            <h4 class="dashboard-card-title">Capability Balance</h4>
            <div class="dashboard-chart-wrap">
              <canvas id="strengthsRadarChart" aria-label="Capability balance chart"></canvas>
            </div>
          </article>

          <article class="dashboard-card mb-2">
            <h4 class="dashboard-card-title">Average Strength Score</h4>
            <div class="strengths-kpi-wrap">
              <p class="strengths-kpi-value">${metrics.length ? Math.round(metrics.reduce((total, metric) => total + metric.value, 0) / metrics.length) : 0}%</p>
              <p class="strengths-kpi-copy">Balanced profile across operational support, infrastructure stability, security mindset, and collaboration.</p>
            </div>
          </article>
        </div>

        <div class="strengths-metric-grid">
          ${metrics.map((metric) => `
            <article class="strengths-metric-card">
              <div class="strengths-metric-head">
                <div>
                  <p class="strengths-metric-label">${metric.label}</p>
                  <p class="strengths-metric-detail">${metric.detail}</p>
                </div>
                <span class="strengths-metric-value">${metric.value}%</span>
              </div>
              <div class="strengths-meter" aria-hidden="true">
                <span style="width: ${metric.value}%;"></span>
              </div>
              <div class="strengths-submetric">
                <div class="strengths-submetric-row">
                  <span class="strengths-submetric-label">${metric.subLabel}</span>
                  <strong class="strengths-submetric-value">${metric.subValue}%</strong>
                </div>
                <div class="strengths-meter strengths-meter-subtle" aria-hidden="true">
                  <span style="width: ${metric.subValue}%;"></span>
                </div>
                <p class="strengths-submetric-detail">${metric.subDetail}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function formatMonthRange(start, end) {
    const [startYear, startMonth] = start.split('-').map(Number);
    const [endYear, endMonth] = end.split('-').map(Number);
    return `${String(startMonth).padStart(2, '0')}.${startYear} - ${String(endMonth).padStart(2, '0')}.${endYear}`;
  }

  function formatDurationFromRoles(roles) {
    const totalMonths = (roles || []).reduce((sum, role) => {
      const [startYear, startMonth] = role.start.split('-').map(Number);
      const [endYear, endMonth] = role.end.split('-').map(Number);
      return sum + ((endYear - startYear) * 12 + (endMonth - startMonth));
    }, 0);

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    let label = '';

    if (years > 0) label += `${years} yr${years > 1 ? 's' : ''} `;
    if (months > 0) label += `${months} mo${months > 1 ? 's' : ''}`;

    return label.trim() || 'Less than 1 mo';
  }

  function renderExperienceContent(section) {
    const companies = section.companies || [];

    return `
      <section class="experience-modal-grid">
        ${companies.map((company) => `
          <article class="experience-modal-card">
            <div class="experience-modal-head">
              <div class="experience-company">
                <i class="${company.iconClass} ${company.iconColorClass}"></i>
                <div>
                  <h4 class="experience-company-name ${company.blurCompany ? 'experience-company-name-blur' : ''}">${company.company}</h4>
                  <p class="experience-company-industry">${company.industry}</p>
                </div>
              </div>
              <span class="experience-total-duration">${company.employmentType || 'Full-time'} - ${formatDurationFromRoles(company.roles)}</span>
            </div>

            <div class="experience-role-list">
              ${(company.roles || []).map((role) => `
                <div class="experience-role-row">
                  <span class="experience-role-title">${role.title}</span>
                  <span class="experience-role-date">${formatMonthRange(role.start, role.end)}</span>
                </div>
              `).join('')}
            </div>

            <div class="experience-detail-block">
              <h5 class="experience-block-title">Key Contributions</h5>
              <ul class="experience-detail-list">
                ${(company.details || []).map((detail) => `<li>${detail}</li>`).join('')}
              </ul>
            </div>

            <div class="experience-detail-block">
              <h5 class="experience-block-title">Core Competencies</h5>
              <div class="experience-competency-list">
                ${(company.competencies || []).map((competency) => `
                  <span class="experience-competency-chip">${competency}</span>
                `).join('')}
              </div>
            </div>

            ${Array.isArray(company.accomplishments) && company.accomplishments.length ? `
              <div class="experience-detail-block">
                <h5 class="experience-block-title">Accomplishments</h5>
                <ul class="experience-detail-list">
                  ${company.accomplishments.map((item) => `<li>${item}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </article>
        `).join('')}
      </section>
    `;
  }

  function renderEducationModal(section) {
    const schools = section.schools || [];

    return `
      <section class="education-modal-grid">
        ${schools.map((school) => `
          <article class="education-modal-card">
            <div class="education-modal-head">
              <div>
                <h4 class="education-degree-name">${school.degree}</h4>
                <p class="education-school-name">
                  <i class="fas fa-graduation-cap"></i>
                  <span>${school.school}</span>
                </p>
              </div>
              <span class="education-period">${school.period}</span>
            </div>

            <div class="education-detail-block">
              <h5 class="education-block-title">Summary</h5>
              <ul class="education-detail-list">
                ${(school.summary || []).map((item) => `<li>${item}</li>`).join('')}
              </ul>
            </div>

            <div class="education-detail-block">
              <h5 class="education-block-title">Awards</h5>
              <ul class="education-detail-list">
                ${(school.awards || []).map((item) => `<li>${item}</li>`).join('')}
              </ul>
            </div>

            <div class="education-detail-block">
              <h5 class="education-block-title">Trainings</h5>
              <ul class="education-detail-list">
                ${(school.trainings || []).map((item) => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </article>
        `).join('')}
      </section>
    `;
  }

  function renderTechStackModal(section) {
    const groups = section.groups || [];

    return `
      <section class="techstack-modal-grid">
        ${groups.map((group, index) => `
          <article class="techstack-modal-card" style="animation-delay: ${index * 80}ms;">
            <h4 class="techstack-group-title">${group.title}</h4>
            <div class="techstack-list">
              ${(group.items || []).map((item) => `
                <div class="techstack-list-item">
                  <i class="fas fa-angle-right techstack-list-icon" aria-hidden="true"></i>
                  <span>${item}</span>
                </div>
              `).join('')}
            </div>
          </article>
        `).join('')}
      </section>
    `;
  }

  function renderProjectPreview(project) {
    const previewMap = {
      transparency: `
        <div class="project-preview-shell">
          <div class="project-preview-top">
            <span></span><span></span><span></span>
          </div>
          <div class="project-preview-banner">
            <strong>Municipal Bulletin</strong>
            <small>14 Active Posts</small>
          </div>
          <div class="project-preview-kpis">
            <span><strong>15</strong><small>Barangays</small></span>
            <span><strong>03</strong><small>Approval Queues</small></span>
            <span><strong>99%</strong><small>Publish Rate</small></span>
          </div>
          <div class="project-preview-grid">
            <div class="project-preview-panel project-preview-panel-wide">
              <img src="assets/img/img_municipal/municipal.jpg" alt="main_posted" style="width: 100%; height: 210px;" class="w-[100] h-[100] rounded-md project-preview-image">
            </div>
            <div class="project-preview">
              <img src="assets/img/img_municipal/municipal1.jpg" alt="main_posted" style="width: 100%; height: 100px;" class="w-[100] h-[100] rounded-md project-preview-image">
            </div>
            <div class="project-preview">
              <img src="assets/img/img_municipal/municpal2.jpg" alt="main_posted" style="width: 100%; height: 100px;" class="w-[100] h-[100] rounded-md project-preview-image">
            </div>
          </div>
        </div>
      `,
      inventory: `
        <div class="project-preview-shell">
          <div class="project-preview-banner">
            <strong>Inventory Pulse</strong>
            <small>Realtime Stock View</small>
          </div>
          <div class="project-preview-kpis">
            <span><strong>248</strong><small>Active SKUs</small></span>
            <span><strong>07</strong><small>Branch Views</small></span>
            <span><strong>19</strong><small>Pending POs</small></span>
          </div>
          <div class="project-preview-inventory-label">
            <strong>Stock by Branch</strong>
            <small>North, Main, South, West</small>
          </div>
          <div class="project-preview-bars">
            <span style="height: 55%;"></span>
            <span style="height: 80%;"></span>
            <span style="height: 68%;"></span>
            <span style="height: 92%;"></span>
          </div>
          <div class="project-preview-inventory-stats">
            <span><strong>12</strong><small>Low Stock</small></span>
            <span><strong>34</strong><small>Received</small></span>
            <span><strong>21</strong><small>Issued</small></span>
          </div>
        </div>
      `,
      registrar: `
        <div class="project-preview-shell">
          <div class="project-preview-banner">
            <strong>Registrar Console</strong>
            <small>Academic + Inventory View</small>
          </div>
          <div class="project-preview-kpis">
            <span><strong>AI</strong><small>Dashboards</small></span>
            <span><strong>Fast</strong><small>Encoding</small></span>
            <span><strong>Secure</strong><small>Access</small></span>
          </div>
          <div class="project-preview-registrar-card">
            <div class="project-preview-registrar-head">
              <strong>Student Record View</strong>
              <small>Authorized access only</small>
            </div>
            <div class="project-preview-registrar-body">
              <span></span><span></span><span></span>
            </div>
          </div>
          <div class="project-preview-registrar-tags">
            <span>Grades</span>
            <span>Blurred Files</span>
            <span>Sister Module</span>
          </div>
          <div class="project-preview-registrar-stats">
            <span><strong>1</strong><small>User View</small></span>
            <span><strong>AI</strong><small>Insights</small></span>
            <span><strong>Sync</strong><small>Modules</small></span>
          </div>
        </div>
      `,
      security: `
        <div class="project-preview-shell">
          <div class="project-preview-banner">
            <strong>Threat Status</strong>
            <small>Protected Endpoints</small>
          </div>
          <div class="project-preview-kpis">
            <span><strong>56</strong><small>Devices</small></span>
            <span><strong>04</strong><small>Open Alerts</small></span>
            <span><strong>1.2m</strong><small>Avg Response</small></span>
          </div>
          <div class="project-preview-ring">
            <div class="project-preview-ring-value">
              <strong>96.5%</strong>
              <small>Protected</small>
            </div>
          </div>
          <div class="project-preview-security-grid">
            <div class="project-preview-security-alert">
              <div class="project-preview-security-alert-icon">
                <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
              </div>
              <div class="project-preview-security-alert-copy">
                <strong>04 Alerts</strong>
                <small>Devices under watch</small>
              </div>
            </div>
            <div class="project-preview-security-linechart">
              <div class="project-preview-security-linechart-svg" aria-hidden="true">
                <span class="project-preview-security-point project-preview-security-point-1"></span>
                <span class="project-preview-security-point project-preview-security-point-2"></span>
                <span class="project-preview-security-point project-preview-security-point-3"></span>
                <svg viewBox="0 0 120 52" preserveAspectRatio="none">
                  <polyline points="8,34 48,18 78,26 112,10"></polyline>
                </svg>
              </div>
              <div class="project-preview-security-dates">
                <span>Mar 12</span>
                <span>Mar 18</span>
                <span>Mar 26</span>
              </div>
            </div>
          </div>
        </div>
      `,
      website: `
        <div class="project-preview-shell">
          <div class="project-preview-banner">
            <strong>Brand Home</strong>
            <small>Modular UI Sections</small>
          </div>
          <div class="project-preview-kpis">
            <span><strong>08</strong><small>Page Blocks</small></span>
            <span><strong>03</strong><small>Theme Modes</small></span>
            <span><strong>100%</strong><small>Responsive</small></span>
          </div>
          <div class="project-preview-window">
            <div class="project-preview-window-top"></div>
            <div class="project-preview-window-body">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      `,
      logistics: `
        <div class="project-preview-shell">
          <div class="project-preview-banner">
            <strong>Route Board</strong>
            <small>Assigned Deliveries</small>
          </div>
          <div class="project-preview-kpis">
            <span><strong>36</strong><small>Trips</small></span>
            <span><strong>11</strong><small>Active Loads</small></span>
            <span><strong>92%</strong><small>Traceability</small></span>
          </div>
          <div class="project-preview-mapline"></div>
          <div class="project-preview-stats">
            <span></span><span></span><span></span>
          </div>
        </div>
      `,
      response: `
        <div class="project-preview-shell">
          <div class="project-preview-banner">
            <strong>Dispatch Center</strong>
            <small>Incident Queue</small>
          </div>
          <div class="project-preview-kpis">
            <span><strong>09</strong><small>Open Cases</small></span>
            <span><strong>05</strong><small>Units Live</small></span>
            <span><strong>2.4m</strong><small>ETA</small></span>
          </div>
          <div class="project-preview-response">
            <div class="project-preview-response-map"></div>
            <div class="project-preview-response-feed">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      `,
    };

    return previewMap[project.preview] || previewMap.inventory;
  }

  function renderProjectsContent(section) {
    const projects = section.items || [];

    return `
      <section class="projects-showcase-grid">
        ${projects.map((project) => `
          <article class="projects-showcase-card" id="${project.id || ''}">
            <div class="projects-showcase-copy">
              <div>
                <div class="projects-showcase-kicker">
                  <span class="projects-showcase-badge">
                    <i class="${project.icon || 'fa-solid fa-layer-group'}" aria-hidden="true"></i>
                    ${project.category || 'System Build'}
                  </span>
                  <span class="projects-showcase-metric">${project.metric || ''}</span>
                </div>
                <h3 class="projects-showcase-title">${project.title}</h3>
                <p class="projects-showcase-summary">${project.summary}</p>
              </div>

              <div class="projects-showcase-meta">
                <p class="projects-showcase-impact">${project.impact}</p>
                <p class="projects-showcase-metric-label">${project.metricLabel || ''}</p>
                <div class="projects-showcase-detail-grid">
                  <div class="projects-showcase-detail-card">
                    <span class="projects-showcase-detail-label">Status</span>
                    <strong>${project.status || 'Portfolio Build'}</strong>
                  </div>
                  <div class="projects-showcase-detail-card">
                    <span class="projects-showcase-detail-label">Role</span>
                    <strong>${project.role || 'Developer'}</strong>
                  </div>
                  <div class="projects-showcase-detail-card">
                    <span class="projects-showcase-detail-label">Platform</span>
                    <strong>${project.platform || 'Web App'}</strong>
                  </div>
                  <div class="projects-showcase-detail-card">
                    <span class="projects-showcase-detail-label">Delivery</span>
                    <strong>${project.delivery || 'End-to-end'}</strong>
                  </div>
                </div>
                <div class="projects-showcase-feature-list">
                  ${(project.features || []).map((feature) => `
                    <span class="projects-showcase-feature">
                      <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
                      ${feature}
                    </span>
                  `).join('')}
                </div>
                <div class="projects-showcase-tags">
                  ${(project.stack || []).map((tag) => `<span class="projects-showcase-tag">${tag}</span>`).join('')}
                </div>
              </div>
            </div>

            <div class="projects-showcase-visual">
              ${renderProjectPreview(project)}
            </div>
          </article>
        `).join('')}
      </section>
    `;
  }

  function initModalReviewSwiper() {
    if (typeof Swiper === 'undefined') return;

    destroyModalReviewSwiper();

    const swiperEl = document.querySelector('.modalReviewSwiper');
    if (!swiperEl) return;

    modalReviewSwiper = new Swiper('.modalReviewSwiper', {
      slidesPerView: 1,
      spaceBetween: 12,
      speed: 900,
      loop: true,
      grabCursor: true,
      autoHeight: true,
      observer: true,
      observeParents: true,
      updateOnWindowResize: true,
      autoplay: {
        delay: 15000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.modal-review-pagination',
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 3,
      },
      navigation: {
        prevEl: '.modal-review-prev',
        nextEl: '.modal-review-next',
      },
    });
  }

  function initReviewsDashboardCharts(items) {
    if (typeof Chart === 'undefined') return;

    destroyModalCharts();
    const reviewSlides = collectReviewModalData();
    const analytics = buildReviewAnalytics(reviewSlides);
    const {
      typeCounts,
      avgPositive,
      avgNegative,
      performanceLabels,
      performanceAverages,
    } = analytics;

    const timelineMap = new Map();
    reviewSlides.forEach((item) => {
      if (!item.reviewDate) return;
      const date = new Date(item.reviewDate);
      if (Number.isNaN(date.getTime())) return;
      timelineMap.set(item.reviewDate, (timelineMap.get(item.reviewDate) || 0) + 1);
    });

    const sortedTimelineEntries = Array.from(timelineMap.entries())
      .sort((a, b) => new Date(a[0]) - new Date(b[0]));

    const timelineLabels = sortedTimelineEntries.map(([dateValue]) => {
      const date = new Date(dateValue);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    const timelineValues = sortedTimelineEntries.map(([, count]) => count);

    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#101828',
          },
        },
      },
    };

    const pieEl = document.getElementById('reviewsPieChart');
    const sentimentEl = document.getElementById('reviewsSentimentChart');
    const performanceEl = document.getElementById('reviewsPerformanceChart');
    const timelineEl = document.getElementById('reviewsTimelineChart');

    if (pieEl) {
      activeModalCharts.push(new Chart(pieEl, {
        type: 'pie',
        data: {
          labels: Object.keys(typeCounts),
          datasets: [{
            data: Object.values(typeCounts),
            backgroundColor: ['#0d75fd', '#7fb3ff', '#b3d1ff', '#d9e8ff'],
            borderColor: 'rgba(255,255,255,0.85)',
            borderWidth: 2,
          }],
        },
        options: commonOptions,
      }));
    }

    if (sentimentEl) {
      activeModalCharts.push(new Chart(sentimentEl, {
        type: 'bar',
        data: {
          labels: ['Positive', 'Negative'],
          datasets: [{
            data: [avgPositive, avgNegative],
            backgroundColor: ['rgba(13, 117, 253, 0.78)', 'rgba(148, 163, 184, 0.55)'],
            borderRadius: 10,
          }],
        },
        options: {
          ...commonOptions,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: (value) => `${value}%`,
                color: getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#667085',
              },
              grid: {
                color: 'rgba(148, 163, 184, 0.16)',
              },
            },
            x: {
              ticks: {
                color: getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#667085',
              },
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: { display: false },
          },
        },
      }));
    }

    if (performanceEl) {
      activeModalCharts.push(new Chart(performanceEl, {
        type: 'bar',
        data: {
          labels: performanceLabels,
          datasets: [{
            data: performanceAverages,
            backgroundColor: [
              'rgba(13, 117, 253, 0.85)',
              'rgba(64, 145, 255, 0.82)',
              'rgba(97, 165, 255, 0.78)',
              'rgba(136, 193, 255, 0.82)',
            ],
            borderRadius: 10,
            borderSkipped: false,
          }],
        },
        options: {
          ...commonOptions,
          indexAxis: 'y',
          scales: {
            y: {
              ticks: {
                color: getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#667085',
              },
              grid: {
                display: false,
              },
            },
            x: {
              beginAtZero: true,
              min: 0,
              max: 100,
              ticks: {
                callback: (value) => `${value}%`,
                color: getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#667085',
              },
              grid: {
                color: 'rgba(148, 163, 184, 0.16)',
              },
            },
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => ` Avg Score: ${context.parsed.x}%`,
              },
            },
          },
        },
      }));
    }

    if (timelineEl) {
      activeModalCharts.push(new Chart(timelineEl, {
        type: 'line',
        data: {
          labels: timelineLabels,
          datasets: [{
            data: timelineValues,
            borderColor: '#0d75fd',
            backgroundColor: 'rgba(13, 117, 253, 0.16)',
            fill: true,
            tension: 0.35,
            pointRadius: 4,
            pointHoverRadius: 5,
          }],
        },
        options: {
          ...commonOptions,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
                color: getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#667085',
              },
              grid: {
                color: 'rgba(148, 163, 184, 0.16)',
              },
            },
            x: {
              ticks: {
                color: getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#667085',
              },
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: { display: false },
          },
        },
      }));
    }
  }

  function initStrengthsDashboardCharts(section) {
    if (typeof Chart === 'undefined') return;

    destroyModalCharts();

    const metrics = section.metrics || [];
    const labels = metrics.map((metric) => metric.label);
    const values = metrics.map((metric) => metric.value);
    const muted = getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#667085';
    const text = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#101828';

    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: text,
          },
        },
      },
    };

    const overviewEl = document.getElementById('strengthsOverviewChart');
    const radarEl = document.getElementById('strengthsRadarChart');

    if (overviewEl) {
      activeModalCharts.push(new Chart(overviewEl, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            data: values,
            backgroundColor: [
              'rgba(13, 117, 253, 0.88)',
              'rgba(49, 135, 255, 0.84)',
              'rgba(90, 165, 255, 0.8)',
              'rgba(125, 195, 255, 0.82)',
            ],
            borderRadius: 12,
            borderSkipped: false,
          }],
        },
        options: {
          ...commonOptions,
          indexAxis: 'y',
          scales: {
            y: {
              ticks: {
                color: muted,
              },
              grid: {
                display: false,
              },
            },
            x: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: (value) => `${value}%`,
                color: muted,
              },
              grid: {
                color: 'rgba(148, 163, 184, 0.16)',
              },
            },
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => ` Score: ${context.parsed.x}%`,
              },
            },
          },
        },
      }));
    }

    if (radarEl) {
      activeModalCharts.push(new Chart(radarEl, {
        type: 'radar',
        data: {
          labels,
          datasets: [{
            label: 'Strength Profile',
            data: values,
            borderColor: 'rgba(13, 117, 253, 0.95)',
            backgroundColor: 'rgba(13, 117, 253, 0.16)',
            pointBackgroundColor: '#0d75fd',
            pointBorderColor: '#ffffff',
            pointRadius: 3,
            borderWidth: 2,
          }],
        },
        options: {
          ...commonOptions,
          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: 100,
              angleLines: {
                color: 'rgba(148, 163, 184, 0.18)',
              },
              grid: {
                color: 'rgba(148, 163, 184, 0.18)',
              },
              pointLabels: {
                color: muted,
                font: {
                  size: 11,
                },
              },
              ticks: {
                backdropColor: 'transparent',
                color: muted,
                callback: (value) => `${value}%`,
              },
            },
          },
          plugins: {
            legend: { display: false },
          },
        },
      }));
    }
  }

  function populateExpandedSections() {
    const experienceDetails = document.getElementById('experienceDetails');
    const projectsDetails = document.getElementById('projectsDetails');

    if (experienceDetails) {
      experienceDetails.innerHTML = renderExperienceContent(modalSections.experience);
    }

    if (projectsDetails) {
      projectsDetails.innerHTML = renderProjectsContent(modalSections.projects);
    }
  }

  function openModal(sectionKey) {
    const section = modalSections[sectionKey];
    if (!section) return;

    if (modalCloseTimer) {
      clearTimeout(modalCloseTimer);
      modalCloseTimer = null;
    }

    modalTitle.textContent = section.title;
    modalContent.innerHTML = sectionKey === 'reviews'
      ? renderReviewsDashboard(section)
      : sectionKey === 'strengths'
        ? renderStrengthsDashboard(section)
        : sectionKey === 'experience'
          ? renderExperienceContent(section)
          : sectionKey === 'education'
            ? renderEducationModal(section)
            : sectionKey === 'tech-stack'
              ? renderTechStackModal(section)
        : renderModalItems(section.items || []);

    modal.classList.remove('hidden', 'modal-closing');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      modal.classList.add('modal-visible');
    });

    if (sectionKey === 'reviews') {
      requestAnimationFrame(() => {
        initReviewsDashboardCharts(section.items || []);
        initModalReviewSwiper();

        requestAnimationFrame(() => {
          if (modalReviewSwiper) {
            modalReviewSwiper.update();
            modalReviewSwiper.slideTo(0, 0);
          }
        });
      });
    } else if (sectionKey === 'strengths') {
      destroyModalReviewSwiper();
      requestAnimationFrame(() => {
        initStrengthsDashboardCharts(section);
      });
    } else if (sectionKey === 'experience') {
      destroyModalCharts();
      destroyModalReviewSwiper();
    } else if (sectionKey === 'education') {
      destroyModalCharts();
      destroyModalReviewSwiper();
    } else if (sectionKey === 'tech-stack') {
      destroyModalCharts();
      destroyModalReviewSwiper();
    } else {
      destroyModalCharts();
      destroyModalReviewSwiper();
    }
  }

  function closeModal() {
    if (modal.classList.contains('hidden')) return;

    destroyModalCharts();
    destroyModalReviewSwiper();
    modal.classList.remove('modal-visible');
    modal.classList.add('modal-closing');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';

    if (modalCloseTimer) {
      clearTimeout(modalCloseTimer);
    }

    modalCloseTimer = setTimeout(() => {
      modal.classList.add('hidden');
      modal.classList.remove('modal-closing');
      modalCloseTimer = null;
    }, 620);
  }

  function toggleTechStackInline() {
    if (!techStackInlineItems.length || !techStackInlineBtn) return;

    const isExpanded = Array.from(techStackInlineItems).some((item) =>
      item.classList.contains('techstack-expand-visible') && !item.hidden
    );

    if (isExpanded) {
      if (techStackInlineShell) {
        techStackInlineShell.classList.remove('techstack-shell-expanded');
      }

      techStackInlineItems.forEach((item) => {
        item.style.transitionDelay = '0ms';
        item.classList.remove('techstack-expand-visible');

        setTimeout(() => {
          item.hidden = true;
        }, 260);
      });

      techStackInlineBtn.setAttribute('aria-expanded', 'false');
      techStackInlineBtn.innerHTML = '<i class="fas fa-eye"></i>&nbsp;View All';
      return;
    }

    if (techStackInlineShell) {
      techStackInlineShell.classList.add('techstack-shell-expanded');
    }

    techStackInlineItems.forEach((item, index) => {
      item.hidden = false;
      item.classList.remove('techstack-expand-visible');
      item.style.transitionDelay = `${index * 90}ms`;

      requestAnimationFrame(() => {
        item.classList.add('techstack-expand-visible');
      });
    });

    techStackInlineBtn.setAttribute('aria-expanded', 'true');
    techStackInlineBtn.innerHTML = '<i class="fas fa-minus"></i>&nbsp;Show Less';
  }

  function toggleCertificationsInline() {
    if (!certificationsInlineGroup || !certificationsInlineBtn) return;

    const isExpanded = certificationsInlineGroup.classList.contains('certifications-expand-visible');

    if (isExpanded) {
      certificationsInlineGroup.classList.remove('certifications-expand-visible');
      certificationsInlineBtn.setAttribute('aria-expanded', 'false');
      certificationsInlineBtn.innerHTML = '<i class="fas fa-eye"></i>&nbsp;View All';
      return;
    }

    requestAnimationFrame(() => {
      certificationsInlineGroup.classList.add('certifications-expand-visible');
    });

    certificationsInlineBtn.setAttribute('aria-expanded', 'true');
    certificationsInlineBtn.innerHTML = '<i class="fas fa-minus"></i>&nbsp;Show Less';
  }

  viewAllBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const sectionKey = btn.dataset.modalSection;
      openModal(sectionKey);
    });
  });

  if (techStackInlineBtn) {
    techStackInlineBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleTechStackInline();
    });
  }

  if (certificationsInlineBtn) {
    certificationsInlineBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleCertificationsInline();
    });
  }

  populateExpandedSections();

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}
