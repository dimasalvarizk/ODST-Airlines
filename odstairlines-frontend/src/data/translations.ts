export type Language = 'ar' | 'en' | 'id';

export interface TranslationData {
  // Navigation
  nav: {
    home: string;
    about: string;
    services: string;
    booking: string;
    contact: string;
  };
  // Hero section
  hero: {
    label: string;
    headlinePre: string;
    headlineHighlight: string;
    headlinePost: string;
    headlineLine1End?: string;
    headlineLine2?: string;
    intro: string;
    actionExplore: string;
    actionNews: string;
  };
  // Introduction Section
  introSection: {
    label: string;
    title: string;
    titleLine1?: string;
    titleLine2?: string;
    description: string;
    descLine1?: string;
    descLine2?: string;
    quote: string;
  };
  // Key Features
  features: {
    label: string;
    title: string;
    subtitle: string;
    cards: {
      number: string;
      title: string;
      desc: string;
    }[];
  };
  // Hajj & Umrah
  pilgrimage: {
    label: string;
    title: string;
    titleLine1?: string;
    titleLine2?: string;
    description: string;
    badge: string;
  };
  // Countdown
  countdown: {
    label: string;
    title: string;
    description: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  // Booking info teaser
  bookingTeaser: {
    label: string;
    title: string;
    titleLine1?: string;
    titleLine2?: string;
    description: string;
    descLine1?: string;
    descLine2?: string;
    items: string[];
    action: string;
  };
  // Social
  social: {
    label: string;
    title: string;
    titleLine1?: string;
    titleLine2?: string;
    description: string;
  };
  // Partnership
  partnership: {
    label: string;
    title: string;
    titleLine1?: string;
    titleLine2?: string;
    description: string;
  };
  // Closing
  closing: {
    label: string;
    statement: string;
    statementLine1?: string;
    statementLine2?: string;
    statementLine3?: string;
    action: string;
  };
  // Footer
  footer: {
    aboutLine1?: string;
    aboutLine2?: string;
    aboutText: string;
    availability: string;
    contactTitle: string;
    journeyTitle: string;
    companyTitle: string;
    rights: string;
    companyLinks: { label: string; href: string }[];
    journeyLinks: { label: string; href: string }[];
    contactLinks: { label: string; href: string }[];
  };
  // Newsletter / Alert Modal
  modal: {
    badge: string;
    title: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    successTitle: string;
    successDesc: string;
    toastTitle: string;
    toastDesc: string;
  };
  // Dedicated Contact Page
  contactPage: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    division: string;
    company: string;
    phoneTitle: string;
    phone: string;
    phoneTel: string;
    emailTitle: string;
    email: string;
    addressTitle: string;
    address: string;
    formTitle: string;
    formSubtitle: string;
    formName: string;
    formNamePlaceholder: string;
    formEmail: string;
    formEmailPlaceholder: string;
    formPhone: string;
    formPhonePlaceholder: string;
    formSubject: string;
    formSubjectPlaceholder: string;
    formMessage: string;
    formMessagePlaceholder: string;
    formSubmit: string;
    formSubmitting: string;
    successTitle: string;
    successMessage: string;
    backToHome: string;
    // Map Section (Single Official Location)
    mapBadge: string;
    mapTitle: string;
    mapSubtitle: string;
    openInMaps: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationData> = {
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'عن أوديست',
      services: 'خدماتنا',
      booking: 'معلومات الحجز',
      contact: 'تواصل معنا',
    },
    hero: {
      label: 'قريباً في الأجواء',
      headlinePre: 'رحلة ',
      headlineHighlight: 'فاخرة ومريحة',
      headlinePost: ' بين إندونيسيا والمملكة العربية السعودية',
      headlineLine1End: ' بين إندونيسيا والمملكة',
      headlineLine2: 'العربية السعودية',
      intro: 'أوديست إيرلاينز إندو إندونيسيا — أحدث قطاعات الأعمال التابعة لمجموعة منازل المختارة الرائدة بالمملكة العربية السعودية، لإعادة تعريف السفر الجوي بمزيج مثالي من الفخامة والراحة والسهولة، ولا سيما لرحلات الحج والعمرة.',
      actionExplore: 'استكشف أسطولنا',
      actionNews: 'تابع أخبار الإطلاق',
    },
    introSection: {
      label: 'مرحباً بكم على متن رؤيتنا',
      title: 'إعادة تعريف السفر الجوي',
      titleLine1: 'إعادة تعريف',
      titleLine2: 'السفر الجوي',
      description: 'أوديست إيرلاينز إندو إندونيسيا، أحدث قطاعات الأعمال التابعة لمجموعة منازل المختارة الرائدة من المملكة العربية السعودية، على أهبة الاستعداد لإعادة تعريف السفر الجوي بمزيج مثالي من الفخامة والراحة والسهولة. وخاصة في تقديم خدمات رحلات الحج والعمرة. ومع استعدادنا للتحليق، ترقبوا تجربة طيران استثنائية لم يسبق لها مثيل.',
      descLine1: 'أوديست إيرلاينز إندو إندونيسيا، أحدث قطاعات الأعمال التابعة لمجموعة منازل المختارة الرائدة من المملكة العربية السعودية، على أهبة الاستعداد لإعادة تعريف السفر الجوي بمزيج مثالي من الفخامة والراحة والسهولة.',
      descLine2: 'وخاصة في تقديم خدمات رحلات الحج والعمرة. ومع استعدادنا للتحليق، ترقبوا تجربة طيران استثنائية لم يسبق لها مثيل.',
      quote: 'مزيج مثالي من الفخامة، الراحة، والسهولة في كل رحلة.',
    },
    features: {
      label: 'الميزات الرئيسية',
      title: 'أساس رحلة حديثة',
      subtitle: 'ثلاثة محاور رئيسية تشكّل تجربة الطيران الاستثنائية مع أوديست إيرلاينز إندو.',
      cards: [
        {
          number: '01',
          title: 'أسطول حديث',
          desc: 'تمتلك أوديست إيرلاينز إندو أسطول طائرات حديثاً صُمم لتحقيق أعلى درجات الكفاءة ورضا الركاب. استمتعوا بأحدث التقنيات والميزات المبتكرة على متن الطائرة.',
        },
        {
          number: '02',
          title: 'مسارات الطيران',
          desc: 'ترقبوا الإعلان عن مسارات جوية مدروسة بعناية لربط الوجهات الرئيسية، وخاصة لرحلات الحج والعمرة. تهدف أوديست إيرلاينز إندو إلى تقريب المسافات وربط العالم عبر ممرات جوية استراتيجية.',
        },
        {
          number: '03',
          title: 'الأسعار والباقات',
          desc: 'الفخامة الميسرة هي وعدنا لكم. اكتشفوا باقات وأسعاراً مصممة خصيصاً لتناسب تفضيلات ضيوفنا الكرام. قريباً – تذكرتكم نحو تجربة استثنائية لا مثيل لها.',
        },
      ],
    },
    pilgrimage: {
      label: 'رحلات ذات معنى',
      title: 'عناية خاصة برحلات الحج والعمرة',
      titleLine1: 'عناية خاصة برحلات',
      titleLine2: 'الحج والعمرة',
      description: 'نضع خدمة ضيوف الرحمن في صميم أولوياتنا، حيث نوفر تجربة طيران تجمع الفخامة والسكينة والراحة لتيسير أداء مناسك الحج والعمرة بأعلى درجات الطمأنينة.',
      badge: 'خدمة مخصصة لرحلات الحج والعمرة',
    },
    countdown: {
      label: 'العد التنازلي للإقلاع',
      title: 'العدّ التنازلي للإقلاع',
      description: 'مع تزايد الشغف والترقب، يستمر العد التنازلي نحو الرحلة الافتتاحية لأوديست إيرلاينز إندو. ابقوا على اتصال واستعدوا لبدء رحلة مليئة بالفخامة والراحة.',
      days: 'يوم',
      hours: 'ساعة',
      minutes: 'دقيقة',
      seconds: 'ثانية',
    },
    bookingTeaser: {
      label: 'معلومات الحجز',
      title: 'الحماس يتصاعد — احجزوا مقعدكم قريباً',
      titleLine1: 'الحماس يتصاعد —',
      titleLine2: 'احجزوا مقعدكم قريباً',
      description: 'الحماس يتصاعد باستمرار! كونوا من أوائل من يحجز مقعده عبر ترقب الإطلاق الرسمي. سيتم الإعلان عن التفاصيل الكاملة للمسارات، الجداول، وآلية الحجز خلال الأيام القليلة القادمة.',
      descLine1: 'الحماس يتصاعد باستمرار! كونوا من أوائل من يحجز مقعده عبر ترقب الإطلاق الرسمي.',
      descLine2: 'سيتم الإعلان عن تفاصيل المسارات والجداول وآلية الحجز خلال الأيام القادمة.',
      items: ['المسارات والوجهات الرئيسية', 'جدول الرحلات الافتتاحية', 'آلية وطرق الحجز'],
      action: 'تفاصيل الحجز قريباً',
    },
    social: {
      label: 'ابقوا بالقرب',
      title: 'حلّقوا معنا من الآن',
      titleLine1: 'حلّقوا معنا',
      titleLine2: 'من الآن',
      description: 'تابعوا قنوات التواصل الاجتماعي الرسمية لمعرفة آخر المستجدات والأسطول الجديد وأخبار التدشين.',
    },
    partnership: {
      label: 'شراكة استراتيجية موثوقة',
      title: 'شراكة مع مجموعة منازل المختارة',
      titleLine1: 'شراكة مع',
      titleLine2: 'مجموعة منازل المختارة',
      description: 'تتكامل أوديست إيرلاينز إندو مع قيم مجموعة منازل المختارة ومقرها المدينة المنورة بالمملكة العربية السعودية، والمعروفة بالتزامها بالتميز في خدمات السياحة والضيافة والسفر. معاً، نهدف لتقديم تجربة سفر شاملة ولا تضاهى.',
    },
    closing: {
      label: 'هدفنا يبدأ منكم',
      statement: 'من إندونيسيا نحو الأراضي المقدسة، رحلة تبدأ بالنية الخالصة وتصل بصدق الإخلاص.',
      statementLine1: 'من إندونيسيا نحو الأراضي المقدسة',
      statementLine2: 'رحلة تبدأ بالنية الخالصة و',
      statementLine3: 'تصل بصدق الإخلاص.',
      action: 'كن أول من يعلم',
    },
    footer: {
      aboutLine1: 'أوديست إيرلاينز إندو إندونيسيا — أحدث قطاعات الأعمال التابعة لمجموعة',
      aboutLine2: 'منازل المختارة لإعادة تعريف السفر الجوي لرحلات الحج والعمرة.',
      aboutText: 'أوديست إيرلاينز إندو إندونيسيا — أحدث قطاعات الأعمال التابعة لمجموعة منازل المختارة من المملكة العربية السعودية لإعادة تعريف السفر الجوي.',
      availability: 'تفاصيل التواصل والتشغيل ستُعلن قريباً.',
      companyTitle: 'أوديست',
      journeyTitle: 'الرحلة',
      contactTitle: 'تواصل',
      rights: '© ODST AIRLINES INDO INDONESIA — جميع الحقوق محفوظة.',
      companyLinks: [
        { label: 'عن أوديست', href: 'https://odst.id' },
        { label: 'رؤيتنا', href: 'about' },
        { label: 'الشراكة', href: 'partnership' },
      ],
      journeyLinks: [
        { label: 'خدماتنا', href: 'services' },
        { label: 'الحج والعمرة', href: 'hajj-umrah' },
        { label: 'معلومات الحجز', href: 'booking-info' },
      ],
      contactLinks: [
        { label: 'إنستغرام', href: 'https://www.instagram.com/odst.group/' },
        { label: 'إكس', href: 'https://x.com' },
        { label: 'فيسبوك', href: 'https://www.facebook.com/ODSTAirlines/' },
      ],
    },
    modal: {
      badge: 'تنبيهات الإطلاق',
      title: 'كونوا أول من يعرف موعد الإطلاق',
      description: 'سجّلوا بريدكم الإلكتروني للحصول على إشعار فوري عند فتح باب الحجوزات والأسعار التنافسية.',
      nameLabel: 'الاسم الكامل',
      namePlaceholder: 'الاسم الكريم',
      emailLabel: 'البريد الإلكتروني',
      emailPlaceholder: 'name@example.com',
      submit: 'إشعار عند الإطلاق',
      successTitle: 'أهلاً بكم في رحلتنا',
      successDesc: 'تم تسجيل بريدكم بنجاح. سنوافيكم بجدول الرحلات وتفاصيل الإطلاق قريباً.',
      toastTitle: 'تم التسجيل بنجاح',
      toastDesc: 'شكراً لكم، ستكونون أول من يعلم بجدول الإطلاق وحجوزات التذاكر.',
    },
    contactPage: {
      badge: 'Aviation & Charter',
      heroTitle: 'تواصل مع أوديست إيرلاينز إندو',
      heroSubtitle: 'نسعد باستقبال استفساراتكم حول خدمات الطيران والتشارتر وحجوزات الرحلات الجوية.',
      division: 'Aviation & Charter',
      company: 'ODST AIRLINES INDO',
      phoneTitle: 'الهاتف',
      phone: '+62 81111 202220',
      phoneTel: '+6281111202220',
      emailTitle: 'البريد الإلكتروني',
      email: 'info@odst.id',
      addressTitle: 'العنوان',
      address: 'Graha Al Badgel Jl. Hajjah Tutty Alawiyah No.7, RT.2/RW.5, Kalibata, Kec. Pancoran, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta, Indonesia 12740',
      formTitle: 'إرسال رسالة',
      formSubtitle: 'يرجى تعبئة النموذج أدناه وسنقوم بالرد عليكم بأقرب وقت.',
      formName: 'الاسم الكامل',
      formNamePlaceholder: 'الاسم الكريم',
      formEmail: 'البريد الإلكتروني',
      formEmailPlaceholder: 'name@example.com',
      formPhone: 'رقم الهاتف',
      formPhonePlaceholder: '+62 ...',
      formSubject: 'الموضوع',
      formSubjectPlaceholder: 'الموضوع أو نوع الاستفسار',
      formMessage: 'الرسالة',
      formMessagePlaceholder: 'اكتب رسالتك أو تفاصيل استفسارك هنا...',
      formSubmit: 'إرسال الرسالة',
      formSubmitting: 'جاري الإرسال...',
      successTitle: 'تم إرسال رسالتكم بنجاح',
      successMessage: 'شكراً لتواصلكم مع أوديست إيرلاينز إندو. سنقوم بالرد عليكم في أقرب وقت.',
      backToHome: 'العودة إلى الرئيسية',
      mapBadge: 'موقعنا على الخريطة',
      mapTitle: 'موقع المكتب',
      mapSubtitle: 'المقر الرئيسي لأوديست إيرلاينز إندو — غراها البادجل، جاكرتا الجنوبية',
      openInMaps: 'فتح في خرائط جوجل',
    },
  },

  en: {
    nav: {
      home: 'Home',
      about: 'About ODST',
      services: 'Services',
      booking: 'Booking Info',
      contact: 'Contact Us',
    },
    hero: {
      label: 'Coming Soon to the Skies',
      headlinePre: 'A ',
      headlineHighlight: 'Luxurious & Comfortable',
      headlinePost: ' Journey Between Indonesia and Saudi Arabia',
      headlineLine1End: ' Between Indonesia',
      headlineLine2: 'and Saudi Arabia',
      intro: 'ODST AIRLINES INDO INDONESIA, the latest business venture from the renowned Manazil Al Mukhtara Group of Saudi Arabia, is set to redefine air travel with a perfect blend of luxury, comfort, and convenience, dedicated especially to Hajj and Umrah flight services.',
      actionExplore: 'Explore Our Fleet',
      actionNews: 'Follow Launch Updates',
    },
    introSection: {
      label: 'Welcome Aboard Our Vision',
      title: 'Redefining Air Travel',
      titleLine1: 'Redefining',
      titleLine2: 'Air Travel',
      description: 'ODST AIRLINES INDO INDONESIA, the latest business venture from the renowned Manazil Al Mukhtara Group of Saudi Arabia, is set to redefine air travel with a perfect blend of luxury, comfort, and convenience. Especially in delivering Hajj and Umrah flight services. As we prepare to take to the skies, look forward to an unprecedented aviation experience.',
      descLine1: 'ODST AIRLINES INDO INDONESIA, the latest business venture from the renowned Manazil Al Mukhtara Group of Saudi Arabia, is set to redefine air travel with a perfect blend of luxury, comfort, and convenience.',
      descLine2: 'Especially in delivering Hajj and Umrah flight services. As we prepare to take to the skies, look forward to an unprecedented aviation experience.',
      quote: 'A perfect blend of luxury, comfort, and convenience on every flight.',
    },
    features: {
      label: 'Key Features',
      title: 'Foundations of Modern Aviation',
      subtitle: 'Three core pillars defining the extraordinary flight experience with ODST AIRLINES INDO.',
      cards: [
        {
          number: '01',
          title: 'Modern Fleet',
          desc: 'ODST AIRLINES INDO boasts a modern aircraft fleet engineered for efficiency and passenger satisfaction. Experience cutting-edge technology and innovative onboard features.',
        },
        {
          number: '02',
          title: 'Flight Routes',
          desc: 'Look forward to the announcement of carefully planned routes connecting major destinations, particularly for Hajj and Umrah journeys. ODST AIRLINES INDO aims to bridge distances and bring the world closer through strategic air corridors.',
        },
        {
          number: '03',
          title: 'Fares and Packages',
          desc: 'Affordable luxury is our promise. Discover a diverse selection of fares and packages tailored specifically to our passengers’ travel preferences. Opening soon – your ticket to an unparalleled journey.',
        },
      ],
    },
    pilgrimage: {
      label: 'Meaningful Journeys',
      title: 'Dedicated Hajj & Umrah Aviation Care',
      titleLine1: 'Dedicated Care for',
      titleLine2: 'Hajj & Umrah',
      description: 'ODST AIRLINES INDO places pilgrims at the heart of our service, delivering an exceptional flight experience that combines luxury, tranquility, and ease to ensure your spiritual pilgrimage is sacred and seamless.',
      badge: 'Dedicated Hajj & Umrah Flight Service',
    },
    countdown: {
      label: 'Takeoff Countdown',
      title: 'Countdown to Takeoff',
      description: 'As excitement grows, the countdown continues toward the inaugural flight of ODST AIRLINES INDO. Stay connected and prepare to embark on a journey of luxury and comfort.',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Mins',
      seconds: 'Secs',
    },
    bookingTeaser: {
      label: 'Booking Information',
      title: 'Anticipation is Building — Secure Your Seat Soon',
      titleLine1: 'Anticipation is Building —',
      titleLine2: 'Secure Your Seat Soon',
      description: 'Anticipation is building! Be among the first to secure your seat as we prepare for our official launch. Details regarding routes, schedules, and booking instructions will be announced in the coming days.',
      descLine1: 'Anticipation is building! Be among the first to secure your seat as we prepare for our official launch.',
      descLine2: 'Details regarding routes, schedules, and booking instructions will be announced in the coming days.',
      items: ['Major Routes & Destinations', 'Inaugural Flight Schedules', 'Reservation & Booking Guide'],
      action: 'Booking Details Coming Soon',
    },
    social: {
      label: 'Stay Connected',
      title: 'Soar With Us From Today',
      titleLine1: 'Soar With Us',
      titleLine2: 'From Today',
      description: 'Follow our official social media channels to get the latest updates, fleet news, and launch announcements.',
    },
    partnership: {
      label: 'Strategic Partnership',
      title: 'In Partnership with Manazil Al Mukhtara Group',
      titleLine1: 'In Partnership with',
      titleLine2: 'Manazil Al Mukhtara Group',
      description: 'ODST AIRLINES INDO aligns itself with the values of Manazil Al Mukhtara Group based in Madinah Al-Munawwarah, Saudi Arabia, renowned for its commitment to excellence in tourism and travel services. Together, we aim to provide a comprehensive and unmatched travel experience.',
    },
    closing: {
      label: 'Our Purpose Begins with You',
      statement: 'From Indonesia to the Holy Land, a journey that begins with intention and arrives with sincerity.',
      statementLine1: 'From Indonesia to the Holy Land',
      statementLine2: 'A journey that begins with intention and',
      statementLine3: 'arrives with sincerity.',
      action: 'Be the First to Know',
    },
    footer: {
      aboutLine1: 'ODST AIRLINES INDO INDONESIA: The latest business venture from',
      aboutLine2: 'Manazil Al Mukhtara Group redefining Hajj and Umrah air travel.',
      aboutText: 'ODST AIRLINES INDO INDONESIA — The latest business venture from Saudi Arabia’s renowned Manazil Al Mukhtara Group redefining modern air travel.',
      availability: 'Contact and flight operation schedules will be announced soon.',
      companyTitle: 'ODST',
      journeyTitle: 'Journey',
      contactTitle: 'Connect',
      rights: '© ODST AIRLINES INDO INDONESIA — All Rights Reserved.',
      companyLinks: [
        { label: 'About ODST', href: 'https://odst.id' },
        { label: 'Our Vision', href: 'about' },
        { label: 'Partnership', href: 'partnership' },
      ],
      journeyLinks: [
        { label: 'Services', href: 'services' },
        { label: 'Hajj & Umrah', href: 'hajj-umrah' },
        { label: 'Booking Info', href: 'booking-info' },
      ],
      contactLinks: [
        { label: 'Instagram', href: 'https://www.instagram.com/odst.group/' },
        { label: 'X', href: 'https://x.com' },
        { label: 'Facebook', href: 'https://www.facebook.com/ODSTAirlines/' },
      ],
    },
    modal: {
      badge: 'Launch Alerts',
      title: 'Be the First to Know When We Take Off',
      description: 'Register your email to receive instant updates when booking opens, fares are announced, and inaugural flights are scheduled.',
      nameLabel: 'Full Name',
      namePlaceholder: 'Your Name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'name@example.com',
      submit: 'Notify Me at Launch',
      successTitle: 'Welcome Aboard!',
      successDesc: 'Your email has been registered successfully. We will notify you as soon as flight schedules are released.',
      toastTitle: 'Successfully Registered',
      toastDesc: 'Thank you! You will be among the first to receive launch announcements and booking access.',
    },
    contactPage: {
      badge: 'Aviation & Charter',
      heroTitle: 'Contact ODST AIRLINES INDO',
      heroSubtitle: 'Get in touch with us for aviation, charter services, and flight booking inquiries.',
      division: 'Aviation & Charter',
      company: 'ODST AIRLINES INDO',
      phoneTitle: 'Phone',
      phone: '+62 81111 202220',
      phoneTel: '+6281111202220',
      emailTitle: 'Email',
      email: 'info@odst.id',
      addressTitle: 'Address',
      address: 'Graha Al Badgel Jl. Hajjah Tutty Alawiyah No.7, RT.2/RW.5, Kalibata, Kec. Pancoran, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta, Indonesia 12740',
      formTitle: 'Send a Message',
      formSubtitle: 'Please fill out the form below and our team will get back to you promptly.',
      formName: 'Full Name',
      formNamePlaceholder: 'Your full name',
      formEmail: 'Email Address',
      formEmailPlaceholder: 'name@example.com',
      formPhone: 'Phone Number',
      formPhonePlaceholder: '+62 ...',
      formSubject: 'Subject',
      formSubjectPlaceholder: 'Inquiry subject or flight request',
      formMessage: 'Message',
      formMessagePlaceholder: 'Write your message or inquiry here...',
      formSubmit: 'Send Message',
      formSubmitting: 'Sending...',
      successTitle: 'Message Sent Successfully',
      successMessage: 'Thank you for contacting ODST AIRLINES INDO. We will respond to you shortly.',
      backToHome: 'Back to Home',
      mapBadge: 'OUR LOCATION ON THE MAP',
      mapTitle: 'Office Location',
      mapSubtitle: 'ODST AIRLINES INDO Head Office — Graha Al Badgel, South Jakarta',
      openInMaps: 'Open in Google Maps',
    },
  },

  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang ODST',
      services: 'Layanan Kami',
      booking: 'Info Pemesanan',
      contact: 'Hubungi Kami',
    },
    hero: {
      label: 'Segera di Angkasa',
      headlinePre: 'Perjalanan ',
      headlineHighlight: 'Mewah & Nyaman',
      headlinePost: ' Antara Indonesia dan Arab Saudi',
      headlineLine1End: ' Antara Indonesia',
      headlineLine2: 'dan Arab Saudi',
      intro: 'ODST AIRLINES INDO INDONESIA, lini usaha terbaru dari Manazil Al Mukhtara Group yang terkemuka dari Arab Saudi, siap mendefinisikan ulang perjalanan udara dengan perpaduan sempurna antara kemewahan, kenyamanan, dan kemudahan. Khususnya dalam memberikan layanan penerbangan Haji dan Umrah.',
      actionExplore: 'Jelajahi Armada Kami',
      actionNews: 'Ikuti Kabar Peluncuran',
    },
    introSection: {
      label: 'Selamat Datang di Visi Kami',
      title: 'Mendefinisikan Ulang Perjalanan Udara',
      titleLine1: 'Mendefinisikan Ulang',
      titleLine2: 'Perjalanan Udara',
      description: 'ODST AIRLINES INDO INDONESIA, lini usaha terbaru dari Manazil Al Mukhtara Group yang terkemuka dari Arab Saudi, siap mendefinisikan ulang perjalanan udara dengan perpaduan sempurna antara kemewahan, kenyamanan, dan kemudahan. Khususnya dalam memberikan layanan penerbangan Haji dan Umrah. Seiring persiapan kami untuk mengudara, nantikan pengalaman penerbangan yang belum pernah ada sebelumnya.',
      descLine1: 'ODST AIRLINES INDO INDONESIA, lini usaha terbaru dari Manazil Al Mukhtara Group yang terkemuka dari Arab Saudi, siap mendefinisikan ulang perjalanan udara dengan perpaduan sempurna antara kemewahan, kenyamanan, dan kemudahan. Khususnya dalam memberikan layanan penerbangan Haji dan Umrah.',
      descLine2: 'Seiring persiapan kami untuk mengudara, nantikan pengalaman penerbangan yang belum pernah ada sebelumnya.',
      quote: 'Perpaduan sempurna antara kemewahan, kenyamanan, dan kemudahan di setiap penerbangan.',
    },
    features: {
      label: 'Fitur Utama',
      title: 'Pondasi Penerbangan Modern',
      subtitle: 'Tiga pilar utama yang membentuk pengalaman terbang bersama ODST AIRLINES INDO.',
      cards: [
        {
          number: '01',
          title: 'Armada Modern',
          desc: 'ODST AIRLINES INDO memiliki armada pesawat modern yang dirancang untuk efisiensi dan kepuasan penumpang. Nikmati teknologi mutakhir dan fitur-fitur inovatif di dalam pesawat.',
        },
        {
          number: '02',
          title: 'Rute Penerbangan',
          desc: 'Nantikan pengumuman rute-rute yang telah direncanakan secara matang untuk menghubungkan destinasi-destinasi utama, khususnya untuk perjalanan Haji dan Umrah. ODST AIRLINES INDO bertujuan untuk menjembatani jarak dan mendekatkan dunia melalui jalur udara yang strategis.',
        },
        {
          number: '03',
          title: 'Tarif dan Paket',
          desc: 'Kemewahan terjangkau adalah janji kami. Temukan berbagai pilihan tarif dan paket yang dirancang khusus sesuai dengan preferensi perjalanan para pelanggan kami. Segera dibuka – tiket Anda menuju pengalaman luar biasa yang tak tertandingi.',
        },
      ],
    },
    pilgrimage: {
      label: 'Perjalanan Penuh Makna',
      title: 'Layanan Istimewa Haji & Umrah',
      titleLine1: 'Layanan Istimewa',
      titleLine2: 'Haji & Umrah',
      description: 'ODST AIRLINES INDO memberikan perhatian khusus dalam layanan penerbangan Haji dan Umrah. Kami memadukan kemewahan, kenyamanan, dan kemudahan untuk memastikan perjalanan ibadah para tamu Allah berlangsung dengan khusyuk dan lancar.',
      badge: 'Dedikasi Khusus Penerbangan Haji & Umrah',
    },
    countdown: {
      label: 'Hitung Mundur Lepas Landas',
      title: 'Hitung Mundur Lepas Landas',
      description: 'Seiring meningkatnya antusiasme, hitung mundur terus berjalan menuju penerbangan perdana ODST AIRLINES INDO. Tetap terhubung dan bersiaplah untuk memulai perjalanan penuh kemewahan dan kenyamanan.',
      days: 'Hari',
      hours: 'Jam',
      minutes: 'Menit',
      seconds: 'Detik',
    },
    bookingTeaser: {
      label: 'Informasi Pemesanan',
      title: 'Antusiasme Terus Meningkat — Dapatkan Kursi Anda Segera',
      titleLine1: 'Antusiasme Terus Meningkat —',
      titleLine2: 'Dapatkan Kursi Anda Segera',
      description: 'Antusiasme terus meningkat! Jadilah salah satu yang pertama untuk mendapatkan kursi Anda dengan menantikan peluncuran resmi kami. Detail mengenai rute, jadwal, dan cara pemesanan akan diumumkan dalam beberapa hari ke depan.',
      descLine1: 'Antusiasme terus meningkat! Jadilah salah satu yang pertama untuk mendapatkan kursi Anda dengan menantikan peluncuran resmi kami.',
      descLine2: 'Detail mengenai rute, jadwal, dan cara pemesanan akan diumumkan dalam beberapa hari ke depan.',
      items: ['Rute & Destinasi Utama', 'Jadwal Penerbangan Perdana', 'Mekanisme & Cara Pemesanan'],
      action: 'Detail Pemesanan Segera Hadir',
    },
    social: {
      label: 'Tetap Terhubung',
      title: 'Terbang Bersama Kami Mulai Sekarang',
      titleLine1: 'Terbang Bersama Kami Mulai',
      titleLine2: 'Sekarang',
      description: 'Ikuti kanal media sosial resmi kami untuk mendapatkan informasi terkini, armada baru, dan kabar peluncuran.',
    },
    partnership: {
      label: 'Kemitraan Strategis Terpercaya',
      title: 'Kemitraan dengan Manazil Al Mukhtara Group',
      titleLine1: 'Kemitraan dengan',
      titleLine2: 'Manazil Al Mukhtara Group',
      description: 'ODST AIRLINES INDO menyelaraskan diri dengan nilai-nilai Manazil Al Mukhtara Group yang berbasis di Madinah Al-Munawwarah, Arab Saudi, yang dikenal atas komitmennya terhadap keunggulan dalam layanan kepariwisataan dan perjalanan. Bersama-sama, kami bertujuan untuk menyediakan pengalaman perjalanan yang komprehensif dan tak tertandingi.',
    },
    closing: {
      label: 'Tujuan Kami Dimulai dari Anda',
      statement: 'Dari Indonesia menuju Tanah Suci, perjalanan yang dimulai dengan niat dan tiba dengan ketulusan.',
      statementLine1: 'Dari Indonesia menuju Tanah Suci',
      statementLine2: 'Perjalanan yang dimulai dengan niat dan',
      statementLine3: 'tiba dengan ketulusan.',
      action: 'Jadilah yang Pertama Mengetahui',
    },
    footer: {
      aboutLine1: 'ODST AIRLINES INDO INDONESIA — Lini usaha terbaru dari Manazil Al Mukhtara Group',
      aboutLine2: 'yang siap mendefinisikan ulang perjalanan udara Haji dan Umrah.',
      aboutText: 'ODST AIRLINES INDO INDONESIA — Lini usaha terbaru dari Manazil Al Mukhtara Group yang terkemuka dari Arab Saudi, siap mendefinisikan ulang perjalanan udara.',
      availability: 'Informasi kontak dan jadwal operasional lengkap akan diumumkan segera.',
      companyTitle: 'ODST',
      journeyTitle: 'Perjalanan',
      contactTitle: 'Kontak',
      rights: '© ODST AIRLINES INDO INDONESIA — Hak Cipta Dilindungi.',
      companyLinks: [
        { label: 'Tentang ODST', href: 'https://odst.id' },
        { label: 'Visi Kami', href: 'about' },
        { label: 'Kemitraan', href: 'partnership' },
      ],
      journeyLinks: [
        { label: 'Layanan Kami', href: 'services' },
        { label: 'Haji & Umrah', href: 'hajj-umrah' },
        { label: 'Info Pemesanan', href: 'booking-info' },
      ],
      contactLinks: [
        { label: 'Instagram', href: 'https://www.instagram.com/odst.group/' },
        { label: 'X', href: 'https://x.com' },
        { label: 'Facebook', href: 'https://www.facebook.com/ODSTAirlines/' },
      ],
    },
    modal: {
      badge: 'Notifikasi Peluncuran',
      title: 'Jadilah yang Pertama Mengetahui',
      description: 'Daftarkan email Anda untuk menerima informasi resmi pembukaan rute, jadwal penerbangan, dan pemesanan tiket perdana.',
      nameLabel: 'Nama Lengkap',
      namePlaceholder: 'Nama Anda',
      emailLabel: 'Alamat Email',
      emailPlaceholder: 'name@example.com',
      submit: 'Dapatkan Info Peluncuran',
      successTitle: 'Terima Kasih!',
      successDesc: 'Email Anda telah berhasil didaftarkan. Kami akan mengabari Anda segera saat jadwal penerbangan resmi dirilis.',
      toastTitle: 'Berhasil Mendaftar',
      toastDesc: 'Terima kasih, Anda akan menjadi yang pertama mendapatkan kabar peluncuran tiket ODST AIRLINES INDO.',
    },
    contactPage: {
      badge: 'Aviation & Charter',
      heroTitle: 'Hubungi ODST AIRLINES INDO',
      heroSubtitle: 'Hubungi kami untuk informasi layanan penerbangan, carter pesawat, dan pertanyaan lainnya.',
      division: 'Aviation & Charter',
      company: 'ODST AIRLINES INDO',
      phoneTitle: 'Telepon',
      phone: '+62 81111 202220',
      phoneTel: '+6281111202220',
      emailTitle: 'Email',
      email: 'info@odst.id',
      addressTitle: 'Alamat',
      address: 'Graha Al Badgel Jl. Hajjah Tutty Alawiyah No.7, RT.2/RW.5, Kalibata, Kec. Pancoran, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta, Indonesia 12740',
      formTitle: 'Kirim Pesan',
      formSubtitle: 'Silakan isi formulir di bawah ini dan tim kami akan segera menghubungi Anda.',
      formName: 'Nama Lengkap',
      formNamePlaceholder: 'Nama lengkap Anda',
      formEmail: 'Alamat Email',
      formEmailPlaceholder: 'name@example.com',
      formPhone: 'Nomor Telepon',
      formPhonePlaceholder: '+62 ...',
      formSubject: 'Subjek',
      formSubjectPlaceholder: 'Subjek pesan atau layanan yang diinginkan',
      formMessage: 'Pesan',
      formMessagePlaceholder: 'Tuliskan pesan atau pertanyaan Anda di sini...',
      formSubmit: 'Kirim Pesan',
      formSubmitting: 'Mengirimkan...',
      successTitle: 'Pesan Berhasil Terkirim',
      successMessage: 'Terima kasih telah menghubungi ODST AIRLINES INDO. Tim kami akan segera merespons Anda.',
      backToHome: 'Kembali ke Beranda',
      mapBadge: 'LOKASI KAMI DI PETA',
      mapTitle: 'Lokasi Kantor',
      mapSubtitle: 'Kantor Pusat ODST AIRLINES INDO — Graha Al Badgel, Jakarta Selatan',
      openInMaps: 'Buka di Google Maps',
    },
  },
};
