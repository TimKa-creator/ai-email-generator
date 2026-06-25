import type { Locale } from "./locales";

const en = {
  common: {
    appName: "AI EmailGen",
    signIn: "Sign In",
    getStarted: "Get Started",
    goToDashboard: "Go to Dashboard",
    logOut: "Log Out",
    profile: "Profile",
    language: "Language",
    theme: "Toggle theme",
  },
  nav: {
    features: "Features",
    pricing: "Pricing",
  },
  hero: {
    badge: "Powered by Google Gemini",
    title: "Write Better Emails 10x Faster",
    subtitle:
      "Describe what you want to say, pick a tone, and let AI craft a clear, professional email in seconds.",
    ctaGuest: "Get Started",
    ctaAuthed: "Go to Dashboard",
    ctaSecondary: "View Pricing",
    mockTitle: "Compose",
    mockTopicLabel: "Topic",
    mockTopic: "Follow up with a client about last week's proposal.",
    mockToneLabel: "Tone",
    mockTone: "Friendly",
    mockButton: "Generate Email",
  },
  features: {
    heading: "Everything you need to sound great",
    subtitle: "Simple, fast and built around the way you actually write.",
    items: [
      {
        title: "AI Powered",
        description:
          "Google Gemini turns a rough idea into a polished, ready-to-send email in seconds.",
      },
      {
        title: "Perfect Tone",
        description:
          "Pick formal, friendly, persuasive and more — the message always sounds right.",
      },
      {
        title: "Lightning Fast",
        description:
          "No more staring at a blank page. Generate, tweak and copy your draft instantly.",
      },
    ],
  },
  how: {
    heading: "How it works",
    subtitle: "From idea to inbox in three simple steps.",
    steps: [
      {
        title: "Describe it",
        description: "Tell us what the email is about in a sentence or two.",
      },
      {
        title: "Set the vibe",
        description: "Choose the tone and how many words you need.",
      },
      {
        title: "Generate & copy",
        description: "Get a clean draft, edit it, then copy it to your inbox.",
      },
    ],
  },
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        question: "Is AI EmailGen free to use?",
        answer:
          "Yes. The Free plan includes a monthly word allowance at no cost. Upgrade to Pro when you need more.",
      },
      {
        question: "Which AI model powers the emails?",
        answer:
          "We use Google Gemini to generate natural, context-aware emails that sound like you.",
      },
      {
        question: "Can I control the tone and length?",
        answer:
          "Absolutely. Choose from ten tones and set the approximate number of words for each email.",
      },
      {
        question: "Can I write emails in other languages?",
        answer:
          "Yes. Switch the interface language and your emails are generated in that language too.",
      },
    ],
  },
  cta: {
    title: "Ready to write better emails?",
    subtitle: "Join now and send your first AI-written email in under a minute.",
    button: "Get Started for Free",
  },
  pricing: {
    heading: "Simple, transparent pricing",
    subtitle: "Start for free. Upgrade when you need more. Cancel anytime.",
    mostPopular: "Most popular",
    perMonth: "/mo",
    stripeSoon: "Stripe integration coming soon!",
    tiers: [
      {
        name: "Free",
        description: "For trying things out.",
        price: "$0",
        period: "/mo",
        features: [
          "2,000 words / month",
          "Up to 200 words per email",
          "All tones & languages",
          "Copy to clipboard",
        ],
        cta: "Get Started",
      },
      {
        name: "Pro",
        description: "For everyday writers.",
        price: "$9",
        period: "/mo",
        features: [
          "50,000 words / month",
          "200+ words per email",
          "Edit & refine drafts",
          "Priority generation",
        ],
        cta: "Upgrade to Pro",
      },
      {
        name: "Enterprise",
        description: "For teams at scale.",
        price: "Custom",
        period: "",
        features: [
          "Unlimited words",
          "Team workspaces",
          "SSO & advanced security",
          "Dedicated support",
        ],
        cta: "Contact Sales",
      },
    ],
  },
  auth: {
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••",
    signupPasswordPlaceholder: "At least 6 characters",
    login: {
      title: "Welcome back",
      subtitle: "Sign in to continue to your dashboard.",
      submit: "Sign In",
      submitting: "Signing in...",
      noAccount: "Don't have an account?",
      signUpLink: "Sign up",
      welcomeBack: "Welcome back!",
      failed: "Failed to sign in. Please try again.",
    },
    signup: {
      title: "Create an account",
      subtitle: "Start writing better emails in seconds.",
      submit: "Create Account",
      submitting: "Creating account...",
      haveAccount: "Already have an account?",
      signInLink: "Sign in",
      pwTooShort: "Password must be at least 6 characters long.",
      created: "Account created!",
      createdConfirm: "Account created! Check your email to confirm, then sign in.",
      failed: "Failed to create your account. Please try again.",
    },
  },
  dashboard: {
    title: "Dashboard",
    subtitle: "Describe your email, pick a tone and length, and let AI do the writing.",
    composeTitle: "Compose",
    composeDesc: "Tell us what you want to say.",
    topicLabel: "What is the email about?",
    topicPlaceholder:
      "e.g. Follow up with a client about the proposal we sent last week and ask for feedback by Friday.",
    toneLabel: "Tone",
    wordsLabel: "Approx. words",
    wordsUnit: "words",
    wordsCustom: "Custom",
    customPlaceholder: "e.g. 180",
    customInvalid: "Please enter a valid number of words.",
    proNote: "200+ words require Pro — upgrade",
    proError: "Emails over 200 words require a Pro plan. Upgrade to unlock.",
    actions: {
      shorter: "Make shorter",
      formal: "More formal",
      emoji: "Add emoji",
    },
    generate: "Generate Email",
    generating: "Generating...",
    resultTitle: "Generated Email",
    resultDesc: "Your AI-written draft appears here. You can edit it before copying.",
    empty: "No email generated yet.",
    copy: "Copy",
    copied: "Copied to clipboard!",
    copyFail: "Couldn't copy automatically. Please copy it manually.",
    ready: "Your email is ready!",
    errorTopic: "Please describe what the email should be about.",
    wordsThisMonth: "words this month",
    tones: {
      formal: "Formal",
      friendly: "Friendly",
      professional: "Professional",
      persuasive: "Persuasive",
      urgent: "Urgent",
      casual: "Casual",
      enthusiastic: "Enthusiastic",
      empathetic: "Empathetic",
      confident: "Confident",
      apologetic: "Apologetic",
    },
  },
  profile: {
    title: "Profile",
    accountTitle: "Your account",
    accountDesc: "Manage your AI EmailGen account.",
    emailLabel: "Email",
    signOut: "Sign Out",
    signingOut: "Signing out...",
    signedOut: "Signed out.",
    usageTitle: "Usage",
    wordsThisMonth: "words this month",
    resetsOn: "Resets on",
  },
  footer: {
    rights: "All rights reserved.",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
  },
};

export type Dictionary = typeof en;

const uk: Dictionary = {
  common: {
    appName: "AI EmailGen",
    signIn: "Увійти",
    getStarted: "Почати",
    goToDashboard: "До кабінету",
    logOut: "Вийти",
    profile: "Профіль",
    language: "Мова",
    theme: "Перемкнути тему",
  },
  nav: {
    features: "Можливості",
    pricing: "Ціни",
  },
  hero: {
    badge: "На основі Google Gemini",
    title: "Пишіть кращі листи в 10 разів швидше",
    subtitle:
      "Опишіть, що хочете сказати, оберіть тон — і ШІ створить чіткий професійний лист за лічені секунди.",
    ctaGuest: "Почати",
    ctaAuthed: "До кабінету",
    ctaSecondary: "Переглянути ціни",
    mockTitle: "Створення",
    mockTopicLabel: "Тема",
    mockTopic: "Нагадати клієнту про минулотижневу пропозицію.",
    mockToneLabel: "Тон",
    mockTone: "Дружній",
    mockButton: "Згенерувати лист",
  },
  features: {
    heading: "Усе, щоб звучати чудово",
    subtitle: "Просто, швидко та під ваш стиль письма.",
    items: [
      {
        title: "На базі ШІ",
        description:
          "Google Gemini перетворює чернетку ідеї на готовий до відправлення лист за секунди.",
      },
      {
        title: "Ідеальний тон",
        description:
          "Оберіть офіційний, дружній, переконливий та інші — лист завжди звучить доречно.",
      },
      {
        title: "Блискавично швидко",
        description:
          "Більше жодного порожнього аркуша. Згенеруйте, відредагуйте та скопіюйте миттєво.",
      },
    ],
  },
  how: {
    heading: "Як це працює",
    subtitle: "Від ідеї до скриньки за три прості кроки.",
    steps: [
      {
        title: "Опишіть",
        description: "Розкажіть, про що лист, у одному-двох реченнях.",
      },
      {
        title: "Задайте стиль",
        description: "Оберіть тон і потрібну кількість слів.",
      },
      {
        title: "Згенеруйте й скопіюйте",
        description: "Отримайте чернетку, відредагуйте та скопіюйте у скриньку.",
      },
    ],
  },
  faq: {
    heading: "Поширені запитання",
    items: [
      {
        question: "Чи безкоштовний AI EmailGen?",
        answer:
          "Так. Тариф Free має місячний ліміт слів безкоштовно. Перейдіть на Pro, коли потрібно більше.",
      },
      {
        question: "Яка модель ШІ генерує листи?",
        answer:
          "Ми використовуємо Google Gemini для природних листів, що враховують контекст.",
      },
      {
        question: "Чи можу я керувати тоном і довжиною?",
        answer:
          "Звісно. Оберіть один із десяти тонів і задайте приблизну кількість слів.",
      },
      {
        question: "Чи можна писати листи іншими мовами?",
        answer:
          "Так. Змініть мову інтерфейсу — і листи генеруються цією ж мовою.",
      },
    ],
  },
  cta: {
    title: "Готові писати кращі листи?",
    subtitle: "Приєднуйтесь і надішліть перший лист від ШІ менш ніж за хвилину.",
    button: "Почати безкоштовно",
  },
  pricing: {
    heading: "Прості та прозорі ціни",
    subtitle: "Почніть безкоштовно. Покращуйте за потреби. Скасуйте будь-коли.",
    mostPopular: "Найпопулярніший",
    perMonth: "/міс",
    stripeSoon: "Інтеграція Stripe незабаром!",
    tiers: [
      {
        name: "Free",
        description: "Щоб спробувати.",
        price: "$0",
        period: "/міс",
        features: [
          "2 000 слів / місяць",
          "До 200 слів на лист",
          "Усі тони та мови",
          "Копіювання в буфер",
        ],
        cta: "Почати",
      },
      {
        name: "Pro",
        description: "Для щоденного письма.",
        price: "$9",
        period: "/міс",
        features: [
          "50 000 слів / місяць",
          "200+ слів на лист",
          "Редагування чернеток",
          "Пріоритетна генерація",
        ],
        cta: "Перейти на Pro",
      },
      {
        name: "Enterprise",
        description: "Для команд великого масштабу.",
        price: "Інд.",
        period: "",
        features: [
          "Необмежено слів",
          "Командні простори",
          "SSO та розширена безпека",
          "Виділена підтримка",
        ],
        cta: "Звʼязатися з відділом продажів",
      },
    ],
  },
  auth: {
    emailLabel: "Ел. пошта",
    emailPlaceholder: "you@example.com",
    passwordLabel: "Пароль",
    passwordPlaceholder: "••••••••",
    signupPasswordPlaceholder: "Щонайменше 6 символів",
    login: {
      title: "З поверненням",
      subtitle: "Увійдіть, щоб продовжити роботу в кабінеті.",
      submit: "Увійти",
      submitting: "Вхід...",
      noAccount: "Немає акаунта?",
      signUpLink: "Зареєструватися",
      welcomeBack: "З поверненням!",
      failed: "Не вдалося увійти. Спробуйте ще раз.",
    },
    signup: {
      title: "Створити акаунт",
      subtitle: "Почніть писати кращі листи за секунди.",
      submit: "Створити акаунт",
      submitting: "Створення акаунта...",
      haveAccount: "Вже маєте акаунт?",
      signInLink: "Увійти",
      pwTooShort: "Пароль має містити щонайменше 6 символів.",
      created: "Акаунт створено!",
      createdConfirm: "Акаунт створено! Підтвердьте пошту, потім увійдіть.",
      failed: "Не вдалося створити акаунт. Спробуйте ще раз.",
    },
  },
  dashboard: {
    title: "Кабінет",
    subtitle: "Опишіть лист, оберіть тон і довжину — ШІ напише за вас.",
    composeTitle: "Створення",
    composeDesc: "Розкажіть, що хочете сказати.",
    topicLabel: "Про що лист?",
    topicPlaceholder:
      "напр. Нагадати клієнту про надіслану минулого тижня пропозицію та попросити відповідь до пʼятниці.",
    toneLabel: "Тон",
    wordsLabel: "Приблизно слів",
    wordsUnit: "слів",
    wordsCustom: "Власне",
    customPlaceholder: "напр. 180",
    customInvalid: "Введіть коректну кількість слів.",
    proNote: "200+ слів — потрібен Pro, оновіть",
    proError: "Листи понад 200 слів потребують плану Pro. Оновіть, щоб розблокувати.",
    actions: {
      shorter: "Коротше",
      formal: "Формальніше",
      emoji: "Додати емодзі",
    },
    generate: "Згенерувати лист",
    generating: "Генерація...",
    resultTitle: "Згенерований лист",
    resultDesc: "Тут зʼявиться чернетка від ШІ. Її можна редагувати перед копіюванням.",
    empty: "Лист ще не згенеровано.",
    copy: "Копіювати",
    copied: "Скопійовано в буфер!",
    copyFail: "Не вдалося скопіювати автоматично. Скопіюйте вручну.",
    ready: "Ваш лист готовий!",
    errorTopic: "Опишіть, про що має бути лист.",
    wordsThisMonth: "слів цього місяця",
    tones: {
      formal: "Офіційний",
      friendly: "Дружній",
      professional: "Професійний",
      persuasive: "Переконливий",
      urgent: "Терміновий",
      casual: "Невимушений",
      enthusiastic: "Захоплений",
      empathetic: "Емпатичний",
      confident: "Впевнений",
      apologetic: "Вибачливий",
    },
  },
  profile: {
    title: "Профіль",
    accountTitle: "Ваш акаунт",
    accountDesc: "Керуйте акаунтом AI EmailGen.",
    emailLabel: "Ел. пошта",
    signOut: "Вийти",
    signingOut: "Вихід...",
    signedOut: "Ви вийшли.",
    usageTitle: "Використання",
    wordsThisMonth: "слів цього місяця",
    resetsOn: "Оновлення",
  },
  footer: {
    rights: "Усі права захищено.",
    privacy: "Конфіденційність",
    terms: "Умови",
    contact: "Контакти",
  },
};

const ru: Dictionary = {
  common: {
    appName: "AI EmailGen",
    signIn: "Войти",
    getStarted: "Начать",
    goToDashboard: "В кабинет",
    logOut: "Выйти",
    profile: "Профиль",
    language: "Язык",
    theme: "Переключить тему",
  },
  nav: {
    features: "Возможности",
    pricing: "Цены",
  },
  hero: {
    badge: "На базе Google Gemini",
    title: "Пишите письма лучше и в 10 раз быстрее",
    subtitle:
      "Опишите, что хотите сказать, выберите тон — и ИИ создаст чёткое профессиональное письмо за секунды.",
    ctaGuest: "Начать",
    ctaAuthed: "В кабинет",
    ctaSecondary: "Смотреть цены",
    mockTitle: "Создание",
    mockTopicLabel: "Тема",
    mockTopic: "Напомнить клиенту о прошлонедельном предложении.",
    mockToneLabel: "Тон",
    mockTone: "Дружелюбный",
    mockButton: "Сгенерировать письмо",
  },
  features: {
    heading: "Всё, чтобы звучать отлично",
    subtitle: "Просто, быстро и под ваш стиль письма.",
    items: [
      {
        title: "На базе ИИ",
        description:
          "Google Gemini превращает черновую идею в готовое к отправке письмо за секунды.",
      },
      {
        title: "Идеальный тон",
        description:
          "Выберите официальный, дружелюбный, убедительный и другие — письмо всегда звучит уместно.",
      },
      {
        title: "Молниеносно",
        description:
          "Больше никакого чистого листа. Генерируйте, правьте и копируйте мгновенно.",
      },
    ],
  },
  how: {
    heading: "Как это работает",
    subtitle: "От идеи до почты за три простых шага.",
    steps: [
      {
        title: "Опишите",
        description: "Расскажите, о чём письмо, в одном-двух предложениях.",
      },
      {
        title: "Задайте стиль",
        description: "Выберите тон и нужное количество слов.",
      },
      {
        title: "Сгенерируйте и скопируйте",
        description: "Получите черновик, отредактируйте и скопируйте в почту.",
      },
    ],
  },
  faq: {
    heading: "Частые вопросы",
    items: [
      {
        question: "AI EmailGen бесплатный?",
        answer:
          "Да. Тариф Free включает месячный лимит слов бесплатно. Перейдите на Pro, когда нужно больше.",
      },
      {
        question: "Какая модель ИИ генерирует письма?",
        answer:
          "Мы используем Google Gemini для естественных писем, учитывающих контекст.",
      },
      {
        question: "Могу ли я управлять тоном и длиной?",
        answer:
          "Конечно. Выберите один из десяти тонов и задайте примерное количество слов.",
      },
      {
        question: "Можно ли писать письма на других языках?",
        answer:
          "Да. Смените язык интерфейса — и письма генерируются на этом же языке.",
      },
    ],
  },
  cta: {
    title: "Готовы писать письма лучше?",
    subtitle: "Присоединяйтесь и отправьте первое письмо от ИИ меньше чем за минуту.",
    button: "Начать бесплатно",
  },
  pricing: {
    heading: "Простые и прозрачные цены",
    subtitle: "Начните бесплатно. Повышайте по мере необходимости. Отмена в любой момент.",
    mostPopular: "Популярный",
    perMonth: "/мес",
    stripeSoon: "Интеграция Stripe скоро!",
    tiers: [
      {
        name: "Free",
        description: "Чтобы попробовать.",
        price: "$0",
        period: "/мес",
        features: [
          "2 000 слов / месяц",
          "До 200 слов на письмо",
          "Все тоны и языки",
          "Копирование в буфер",
        ],
        cta: "Начать",
      },
      {
        name: "Pro",
        description: "Для ежедневного письма.",
        price: "$9",
        period: "/мес",
        features: [
          "50 000 слов / месяц",
          "200+ слов на письмо",
          "Редактирование черновиков",
          "Приоритетная генерация",
        ],
        cta: "Перейти на Pro",
      },
      {
        name: "Enterprise",
        description: "Для команд любого масштаба.",
        price: "Инд.",
        period: "",
        features: [
          "Безлимит слов",
          "Командные пространства",
          "SSO и расширенная безопасность",
          "Выделенная поддержка",
        ],
        cta: "Связаться с продажами",
      },
    ],
  },
  auth: {
    emailLabel: "Эл. почта",
    emailPlaceholder: "you@example.com",
    passwordLabel: "Пароль",
    passwordPlaceholder: "••••••••",
    signupPasswordPlaceholder: "Не менее 6 символов",
    login: {
      title: "С возвращением",
      subtitle: "Войдите, чтобы продолжить работу в кабинете.",
      submit: "Войти",
      submitting: "Вход...",
      noAccount: "Нет аккаунта?",
      signUpLink: "Зарегистрироваться",
      welcomeBack: "С возвращением!",
      failed: "Не удалось войти. Попробуйте ещё раз.",
    },
    signup: {
      title: "Создать аккаунт",
      subtitle: "Начните писать письма лучше за секунды.",
      submit: "Создать аккаунт",
      submitting: "Создание аккаунта...",
      haveAccount: "Уже есть аккаунт?",
      signInLink: "Войти",
      pwTooShort: "Пароль должен содержать не менее 6 символов.",
      created: "Аккаунт создан!",
      createdConfirm: "Аккаунт создан! Подтвердите почту, затем войдите.",
      failed: "Не удалось создать аккаунт. Попробуйте ещё раз.",
    },
  },
  dashboard: {
    title: "Кабинет",
    subtitle: "Опишите письмо, выберите тон и длину — ИИ напишет за вас.",
    composeTitle: "Создание",
    composeDesc: "Расскажите, что хотите сказать.",
    topicLabel: "О чём письмо?",
    topicPlaceholder:
      "напр. Напомнить клиенту об отправленном на прошлой неделе предложении и попросить ответ до пятницы.",
    toneLabel: "Тон",
    wordsLabel: "Примерно слов",
    wordsUnit: "слов",
    wordsCustom: "Своё",
    customPlaceholder: "напр. 180",
    customInvalid: "Введите корректное количество слов.",
    proNote: "200+ слов — нужен Pro, оформить",
    proError: "Письма свыше 200 слов требуют плана Pro. Оформите, чтобы разблокировать.",
    actions: {
      shorter: "Короче",
      formal: "Формальнее",
      emoji: "Добавить эмодзи",
    },
    generate: "Сгенерировать письмо",
    generating: "Генерация...",
    resultTitle: "Сгенерированное письмо",
    resultDesc: "Здесь появится черновик от ИИ. Его можно отредактировать перед копированием.",
    empty: "Письмо ещё не сгенерировано.",
    copy: "Копировать",
    copied: "Скопировано в буфер!",
    copyFail: "Не удалось скопировать автоматически. Скопируйте вручную.",
    ready: "Ваше письмо готово!",
    errorTopic: "Опишите, о чём должно быть письмо.",
    wordsThisMonth: "слов в этом месяце",
    tones: {
      formal: "Официальный",
      friendly: "Дружелюбный",
      professional: "Профессиональный",
      persuasive: "Убедительный",
      urgent: "Срочный",
      casual: "Непринуждённый",
      enthusiastic: "Воодушевлённый",
      empathetic: "Эмпатичный",
      confident: "Уверенный",
      apologetic: "Извиняющийся",
    },
  },
  profile: {
    title: "Профиль",
    accountTitle: "Ваш аккаунт",
    accountDesc: "Управляйте аккаунтом AI EmailGen.",
    emailLabel: "Эл. почта",
    signOut: "Выйти",
    signingOut: "Выход...",
    signedOut: "Вы вышли.",
    usageTitle: "Использование",
    wordsThisMonth: "слов в этом месяце",
    resetsOn: "Сброс",
  },
  footer: {
    rights: "Все права защищены.",
    privacy: "Конфиденциальность",
    terms: "Условия",
    contact: "Контакты",
  },
};

const de: Dictionary = {
  common: {
    appName: "AI EmailGen",
    signIn: "Anmelden",
    getStarted: "Loslegen",
    goToDashboard: "Zum Dashboard",
    logOut: "Abmelden",
    profile: "Profil",
    language: "Sprache",
    theme: "Thema wechseln",
  },
  nav: {
    features: "Funktionen",
    pricing: "Preise",
  },
  hero: {
    badge: "Angetrieben von Google Gemini",
    title: "Schreibe bessere E-Mails 10x schneller",
    subtitle:
      "Beschreibe, was du sagen willst, wähle einen Ton – und die KI verfasst in Sekunden eine klare, professionelle E-Mail.",
    ctaGuest: "Loslegen",
    ctaAuthed: "Zum Dashboard",
    ctaSecondary: "Preise ansehen",
    mockTitle: "Verfassen",
    mockTopicLabel: "Thema",
    mockTopic: "Bei einem Kunden zum Angebot der letzten Woche nachfassen.",
    mockToneLabel: "Ton",
    mockTone: "Freundlich",
    mockButton: "E-Mail erstellen",
  },
  features: {
    heading: "Alles, um großartig zu klingen",
    subtitle: "Einfach, schnell und auf deinen Schreibstil zugeschnitten.",
    items: [
      {
        title: "KI-gestützt",
        description:
          "Google Gemini macht aus einer groben Idee in Sekunden eine versandfertige E-Mail.",
      },
      {
        title: "Perfekter Ton",
        description:
          "Wähle formell, freundlich, überzeugend und mehr – die Nachricht klingt immer passend.",
      },
      {
        title: "Blitzschnell",
        description:
          "Schluss mit dem leeren Blatt. Erstellen, anpassen und sofort kopieren.",
      },
    ],
  },
  how: {
    heading: "So funktioniert's",
    subtitle: "Von der Idee zum Postfach in drei einfachen Schritten.",
    steps: [
      {
        title: "Beschreiben",
        description: "Sag uns in ein, zwei Sätzen, worum es geht.",
      },
      {
        title: "Stil festlegen",
        description: "Wähle den Ton und die gewünschte Wortanzahl.",
      },
      {
        title: "Erstellen & kopieren",
        description: "Entwurf erhalten, bearbeiten und ins Postfach kopieren.",
      },
    ],
  },
  faq: {
    heading: "Häufige Fragen",
    items: [
      {
        question: "Ist AI EmailGen kostenlos?",
        answer:
          "Ja. Der Free-Plan enthält ein monatliches Wortkontingent kostenlos. Wechsle zu Pro, wenn du mehr brauchst.",
      },
      {
        question: "Welches KI-Modell erstellt die E-Mails?",
        answer:
          "Wir nutzen Google Gemini für natürliche, kontextbezogene E-Mails, die nach dir klingen.",
      },
      {
        question: "Kann ich Ton und Länge steuern?",
        answer:
          "Absolut. Wähle aus zehn Tönen und lege die ungefähre Wortanzahl pro E-Mail fest.",
      },
      {
        question: "Kann ich E-Mails in anderen Sprachen schreiben?",
        answer:
          "Ja. Wechsle die Oberflächensprache und deine E-Mails werden ebenfalls in dieser Sprache erstellt.",
      },
    ],
  },
  cta: {
    title: "Bereit für bessere E-Mails?",
    subtitle: "Jetzt registrieren und deine erste KI-E-Mail in unter einer Minute senden.",
    button: "Kostenlos loslegen",
  },
  pricing: {
    heading: "Einfache, transparente Preise",
    subtitle: "Kostenlos starten. Bei Bedarf upgraden. Jederzeit kündbar.",
    mostPopular: "Am beliebtesten",
    perMonth: "/Mon.",
    stripeSoon: "Stripe-Integration kommt bald!",
    tiers: [
      {
        name: "Free",
        description: "Zum Ausprobieren.",
        price: "0 $",
        period: "/Mon.",
        features: [
          "2.000 Wörter / Monat",
          "Bis zu 200 Wörter pro E-Mail",
          "Alle Töne & Sprachen",
          "In die Zwischenablage kopieren",
        ],
        cta: "Loslegen",
      },
      {
        name: "Pro",
        description: "Für tägliches Schreiben.",
        price: "9 $",
        period: "/Mon.",
        features: [
          "50.000 Wörter / Monat",
          "200+ Wörter pro E-Mail",
          "Entwürfe bearbeiten",
          "Bevorzugte Erstellung",
        ],
        cta: "Auf Pro upgraden",
      },
      {
        name: "Enterprise",
        description: "Für Teams im großen Maßstab.",
        price: "Individuell",
        period: "",
        features: [
          "Unbegrenzte Wörter",
          "Team-Arbeitsbereiche",
          "SSO & erweiterte Sicherheit",
          "Dedizierter Support",
        ],
        cta: "Vertrieb kontaktieren",
      },
    ],
  },
  auth: {
    emailLabel: "E-Mail",
    emailPlaceholder: "you@example.com",
    passwordLabel: "Passwort",
    passwordPlaceholder: "••••••••",
    signupPasswordPlaceholder: "Mindestens 6 Zeichen",
    login: {
      title: "Willkommen zurück",
      subtitle: "Melde dich an, um zu deinem Dashboard zu gelangen.",
      submit: "Anmelden",
      submitting: "Anmeldung...",
      noAccount: "Noch kein Konto?",
      signUpLink: "Registrieren",
      welcomeBack: "Willkommen zurück!",
      failed: "Anmeldung fehlgeschlagen. Bitte versuche es erneut.",
    },
    signup: {
      title: "Konto erstellen",
      subtitle: "Beginne in Sekunden, bessere E-Mails zu schreiben.",
      submit: "Konto erstellen",
      submitting: "Konto wird erstellt...",
      haveAccount: "Bereits ein Konto?",
      signInLink: "Anmelden",
      pwTooShort: "Das Passwort muss mindestens 6 Zeichen lang sein.",
      created: "Konto erstellt!",
      createdConfirm: "Konto erstellt! Bestätige deine E-Mail und melde dich dann an.",
      failed: "Konto konnte nicht erstellt werden. Bitte versuche es erneut.",
    },
  },
  dashboard: {
    title: "Dashboard",
    subtitle: "Beschreibe deine E-Mail, wähle Ton und Länge – die KI übernimmt das Schreiben.",
    composeTitle: "Verfassen",
    composeDesc: "Sag uns, was du sagen möchtest.",
    topicLabel: "Worum geht es in der E-Mail?",
    topicPlaceholder:
      "z. B. Bei einem Kunden zum letzte Woche gesendeten Angebot nachfassen und um Rückmeldung bis Freitag bitten.",
    toneLabel: "Ton",
    wordsLabel: "Ungefähr Wörter",
    wordsUnit: "Wörter",
    wordsCustom: "Eigene",
    customPlaceholder: "z. B. 180",
    customInvalid: "Bitte gib eine gültige Wortanzahl ein.",
    proNote: "200+ Wörter erfordern Pro — upgraden",
    proError: "E-Mails über 200 Wörter erfordern einen Pro-Plan. Upgrade zum Freischalten.",
    actions: {
      shorter: "Kürzer",
      formal: "Formeller",
      emoji: "Emojis hinzufügen",
    },
    generate: "E-Mail erstellen",
    generating: "Wird erstellt...",
    resultTitle: "Erstellte E-Mail",
    resultDesc: "Hier erscheint dein KI-Entwurf. Du kannst ihn vor dem Kopieren bearbeiten.",
    empty: "Noch keine E-Mail erstellt.",
    copy: "Kopieren",
    copied: "In die Zwischenablage kopiert!",
    copyFail: "Automatisches Kopieren fehlgeschlagen. Bitte manuell kopieren.",
    ready: "Deine E-Mail ist fertig!",
    errorTopic: "Bitte beschreibe, worum es in der E-Mail gehen soll.",
    wordsThisMonth: "Wörter diesen Monat",
    tones: {
      formal: "Formell",
      friendly: "Freundlich",
      professional: "Professionell",
      persuasive: "Überzeugend",
      urgent: "Dringend",
      casual: "Locker",
      enthusiastic: "Begeistert",
      empathetic: "Einfühlsam",
      confident: "Selbstbewusst",
      apologetic: "Entschuldigend",
    },
  },
  profile: {
    title: "Profil",
    accountTitle: "Dein Konto",
    accountDesc: "Verwalte dein AI-EmailGen-Konto.",
    emailLabel: "E-Mail",
    signOut: "Abmelden",
    signingOut: "Abmeldung...",
    signedOut: "Abgemeldet.",
    usageTitle: "Nutzung",
    wordsThisMonth: "Wörter diesen Monat",
    resetsOn: "Zurücksetzung am",
  },
  footer: {
    rights: "Alle Rechte vorbehalten.",
    privacy: "Datenschutz",
    terms: "Bedingungen",
    contact: "Kontakt",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, uk, ru, de };
