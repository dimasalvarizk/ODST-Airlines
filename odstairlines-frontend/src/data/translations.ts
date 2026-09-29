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
      label: 'شركة أودست إيرلاينز أندو',
      headlinePre: 'رحلة ',
      headlineHighlight: 'جديدة',
      headlinePost: ' بين إندونيسيا والمملكة العربية السعودية',
      headlineLine1End: ' بين إندونيسيا والمملكة',
      headlineLine2: 'العربية السعودية',
      intro: 'شركة أودست إيرلاينز إندو "إندونيسيا" — المشروع الأحدث لمجموعة منازل المختارة التجارية العريقة من المدينة المنورة بالمملكة العربية السعودية، لإعادة تعريف السفر الجوي بمزيج مثالي من الفخامة والراحة والسهولة مع التخصص في خدمات الحج والعمرة.',
      actionExplore: 'اكتشفوا خدماتنا للنقل الجوي',
      actionNews: 'تابعوا أخبار الإطلاق',
    },
    introSection: {
      label: 'مرحباً بكم على متن رؤيتنا',
      title: 'إعادة تعريف السفر الجوي بمزيج مثالي من الفخامة والراحة',
      titleLine1: 'إعادة تعريف السفر الجوي',
      titleLine2: 'بمزيج مثالي من الفخامة والراحة',
      description: 'شركة أودست إيرلاينز إندو "إندونيسيا" تمثل المشروع الأحدث لمجموعة منازل المختارة التجارية العريقة من المدينة المنورة بالمملكة العربية السعودية، حيث نسعى لإعادة تعريف السفر الجوي من خلال مزيج مثالي من الفخامة والراحة والسهولة مع التخصص في خدمات الحج والعمرة.',
      descLine1: 'شركة أودست إيرلاينز إندو "إندونيسيا" تمثل المشروع الأحدث لمجموعة منازل المختارة التجارية العريقة من المدينة المنورة بالمملكة العربية السعودية.',
      descLine2: 'حيث نسعى لإعادة تعريف السفر الجوي من خلال مزيج مثالي من الفخامة والراحة والسهولة مع التخصص في خدمات الحج والعمرة.',
      quote: 'بينما نستعد قريباً للإقلاع، توقعوا تجربة فريدة واستثنائية في مجال الطيران الجوي.',
    },
    features: {
      label: 'أبرز مميزاتنا',
      title: 'أساس تجربة طيران فريدة',
      subtitle: 'ثلاثة محاور رئيسية تشكّل ملامح تميز تجربة أوديست إيرلاينز القادمة.',
      cards: [
        {
          number: '01',
          title: 'أسطول جوي حديث',
          desc: 'تمتلك أوديست إيرلاينز إندونيسيا أسطولاً من الطائرات الحديثة المصممة لتحقيق الكفاءة وإرضاء المسافرين مع أحدث التقنيات والميزات المبتكرة على متن طائراتنا.',
        },
        {
          number: '02',
          title: 'وجهات متعددة',
          desc: 'سنعلن قريباً عن أفضل وجهاتنا المدروسة بعناية لربط الوجهات الرئيسية خاصة في مجال الحج والعمرة وتقريب العالم عبر مسارات جوية استراتيجية.',
        },
        {
          number: '03',
          title: 'باقات وأسعار مصممة بعناية',
          desc: 'الفخامة بأسعار معقولة هي وعدنا لعملائنا الكرام، مع استكشاف مجموعة متنوعة من العروض والباقات المصممة لتناسب مختلف مميزات السفر والدرجات والمزايا.',
        },
      ],
    },
    pilgrimage: {
      label: 'خدمات الحج والعمرة',
      title: 'التخصص في رعاية ضيوف الرحمن',
      titleLine1: 'التخصص والعناية الفائقة',
      titleLine2: 'برحلات الحج والعمرة',
      description: 'نضع خدمات الحج والعمرة في صميم اهتمامنا، لنقدم لضيوف الرحمن رحلة إيمانية مريحة وميسرة تليق بقدسية المقصد والمكان، بأعلى معايير الرعاية والاهتمام.',
      badge: 'عناية خاصة بضيوف الرحمن',
    },
    countdown: {
      label: 'قرب انطلاق التشغيل',
      title: 'العدّ التنازلي للإقلاع يبدأ هنا',
      description: 'ترقبوا الافتتاح الرسمي قريباً والتي نعدكم فيها بتجربة لا تضاهى لعملائنا في مجال السفر الجوي، تتوالى الأيام ونحن نستعد لانطلاق أولى رحلاتنا.',
      days: 'يوم',
      hours: 'ساعة',
      minutes: 'دقيقة',
      seconds: 'ثانية',
    },
    bookingTeaser: {
      label: 'الحصول على المعلومات',
      title: 'كونوا من أوائل الحاصلين على حجوزات السفر معنا',
      titleLine1: 'التشويق لا ينتهي — كونوا أول',
      titleLine2: 'من يحصل على حجوزات السفر معنا',
      description: 'كونوا قريبين وعلى تواصل معنا في حين يتزامن ذلك مع بدء العد التنازلي لإطلاق تفاصيل وجهاتنا وجداول رحلاتنا وآلياتنا المبتكرة للحجز بكل سلاسة وسهولة.',
      descLine1: 'كونوا من أوائل الحاصلين على حجوزات السفر معنا للرحلات الجوية التي سيتم الإعلان عنها قريباً.',
      descLine2: 'تفاصيل وجهاتنا وجداول رحلاتنا وآلياتنا المبتكرة للحجز سيتم إعلانها بكل سلاسة وسهولة.',
      items: ['آليات حجز مبتكرة وسلسة', 'جداول رحلات ووجهات مدروسة بعناية', 'باقات وأسعار مصممة بعناية'],
      action: 'كونوا أول من يعرف تفاصيل الحجز',
    },
    social: {
      label: 'أبقوا على تواصل',
      title: 'تابعوا أوديست إيرلاينز إندونيسيا',
      description: 'تابعوا أوديست إيرلاينز إندونيسيا على موقعنا الإلكتروني والمنصات الرقمية للحصول على أحدث المعلومات والعروض الحصرية ولمحة عما ينتظركم في الأجواء.',
    },
    partnership: {
      label: 'شراكة القيم مع المجموعة الأم',
      title: 'بالشراكة مع مجموعة منازل المختارة التجارية',
      titleLine1: 'شراكة القيم والتميز مع',
      titleLine2: 'مجموعة منازل المختارة التجارية',
      description: 'في أوديست إيرلاينز إندونيسيا نلتزم بالتوافق اللصيق مع قيم مجموعة منازل المختارة التجارية بالمدينة المنورة من المملكة العربية السعودية والمعروفة بالتزامها بالتميز في خدمات الضيافة والسفر، ونهدف سوياً إلى توفير تجربة سفر شاملة لا تضاهى ولا تُمحى من ذاكرة عملائنا. أوديست إيرلاينز ليست مجرد شركة طيران بل هي عزم لتقديم تجربة استثنائية في مجال السفر الجوي.',
    },
    closing: {
      label: 'وجهتنا تبدأ بكم',
      statement: 'استعدوا للارتقاء إلى آفاق جديدة مع أوديست إيرلاينز إندونيسيا — حيث كل رحلة جوية هي احتفال بالسفر السلس والفخامة والمغامرة الشيقة.',
      statementLine1: 'استعدوا للارتقاء إلى آفاق جديدة — حيث كل رحلة جوية',
      statementLine2: 'هي احتفال بالسفر السلس والفخامة والمغامرة الشيقة.',
      action: 'ترقبوا الانطلاقة القريبة بإذن الله',
    },
    footer: {
      aboutLine1: 'شركة أودست إيرلاينز إندو "إندونيسيا" — المشروع الأحدث لمجموعة',
      aboutLine2: 'منازل المختارة التجارية من المدينة المنورة بالمملكة العربية السعودية.',
      aboutText: 'شركة أودست إيرلاينز إندو "إندونيسيا" — المشروع الأحدث لمجموعة منازل المختارة التجارية من المدينة المنورة بالمملكة العربية السعودية.',
      availability: 'تفاصيل وجهاتنا وجداول رحلاتنا وآليات الحجز ستُعلن قريباً.',
      companyTitle: 'أوديست',
      journeyTitle: 'الرحلة',
      contactTitle: 'تواصل',
      rights: '© ODST AIRLINES INDONESIA — جميع الحقوق محفوظة.',
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
      title: 'كونوا أول من يعرف موعد الإطلاق والحجوزات',
      description: 'سجّلوا بريدكم الإلكتروني للحصول على إشعار فوري عند الإعلان عن جداول الرحلات والأسعار التنافسية وبدء الحجوزات.',
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
      label: 'ODST AIRLINES INDO',
      headlinePre: 'A ',
      headlineHighlight: 'New Journey',
      headlinePost: ' Between Indonesia and Saudi Arabia',
      headlineLine1End: ' Between Indonesia',
      headlineLine2: 'and Saudi Arabia',
      intro: 'ODST AIRLINES INDO "INDONESIA", the latest venture of the venerable Manazil Al Mukhtara Group from Saudi Arabia, is all set to redefine air travel with the perfect blend of luxury, comfort and convenience, with dedicated specialization in Hajj & Umrah services.',
      actionExplore: 'Discover Our Fleet',
      actionNews: 'Follow Launch News',
    },
    introSection: {
      label: 'Welcome Aboard Our Vision',
      title: 'Redefining Air Travel with Luxury, Comfort & Convenience',
      titleLine1: 'Redefining Air Travel with Luxury,',
      titleLine2: 'Comfort and Convenience',
      description: 'ODST AIRLINES INDO "INDONESIA", the latest venture of the venerable Manazil Al Mukhtara Group from Saudi Arabia, is all set to redefine air travel with the perfect blend of luxury, comfort and convenience. As we prepare to take to the air, expect an in-flight experience like never before.',
      descLine1: 'ODST AIRLINES INDO "INDONESIA", the latest venture of the venerable Manazil Al Mukhtara Group from Saudi Arabia, is all set to redefine air travel with the perfect blend of luxury, comfort and convenience.',
      descLine2: 'Specializing in Hajj and Umrah services, we bridge cultures and distances with extraordinary care from takeoff to arrival.',
      quote: 'As we prepare to take to the air, expect an in-flight experience like never before.',
    },
    features: {
      label: 'Key Features',
      title: 'Foundations of Modern Travel',
      subtitle: 'Three key pillars defining the forthcoming ODST flight experience.',
      cards: [
        {
          number: '01',
          title: 'Modern Fleet',
          desc: 'ODST AIRLINES INDO has a fleet of modern aircraft designed for efficiency and passenger satisfaction. Expect cutting-edge technology and innovative features on board.',
        },
        {
          number: '02',
          title: 'Connected Routes',
          desc: 'Stay tuned as we reveal our carefully planned routes that connect key destinations. ODST AIRLINES INDO aims to bridge gaps and bring the world closer through strategic airways.',
        },
        {
          number: '03',
          title: 'Rates and Packages',
          desc: 'Affordable luxury is our promise. Discover a variety of rates and packages tailored to suit a variety of travel preferences, classes, and privileges.',
        },
      ],
    },
    pilgrimage: {
      label: 'Hajj & Umrah Services',
      title: 'Dedicated Care for Sacred Journeys',
      titleLine1: 'Dedicated Care for',
      titleLine2: 'Hajj & Umrah Journeys',
      description: 'We understand that Hajj and Umrah begin with pure devotion long before takeoff. We tailor our operations to the sacred needs of pilgrims, ensuring seamless transit and heartfelt hospitality.',
      badge: 'Dedicated Pilgrimage Specialization',
    },
    countdown: {
      label: 'Opening Soon',
      title: 'Countdown to Takeoff',
      description: 'As anticipation builds, the countdown clock continues to tick, ticking off the days until ODST AIRLINES INDO makes its maiden flight. Stay connected and get ready to embark on a journey of luxury and comfort.',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Mins',
      seconds: 'Secs',
    },
    bookingTeaser: {
      label: 'Ordering Information',
      title: 'The excitement just keeps building! Be one of the first to get your seat.',
      titleLine1: 'The excitement just keeps building!',
      titleLine2: 'Be one of the first to get your seat.',
      description: 'Be one of the first to get your seat by waiting for our official launch. Details regarding routes, schedules and how to book will be announced in the coming days.',
      descLine1: 'The excitement just keeps building! Be one of the first to get your seat by waiting for our official launch.',
      descLine2: 'Details regarding routes, schedules and how to book will be announced in the coming days.',
      items: ['Seamless Digital Booking', 'Strategic Routes & Flight Schedules', 'Affordable Luxury Rates & Packages'],
      action: 'Register for Priority Access',
    },
    social: {
      label: 'Connect With Us',
      title: 'Follow ODST AIRLINES INDO',
      description: 'Follow ODST AIRLINES INDO on our social media platforms to get the latest information, exclusive offers and a sneak peek at what awaits you in the skies.',
    },
    partnership: {
      label: 'Partnership with Manazil Al Mukhtara Group',
      title: 'A Legacy of Excellence in Hospitality and Travel',
      titleLine1: 'Partnership with',
      titleLine2: 'Manazil Al Mukhtara Group',
      description: 'ODST AIRLINES INDO aligns with the values of Manazil Al Mukhtara Group from Madinah, Saudi Arabia, which is known for its commitment to excellence in hospitality and travel services. Together, we aim to provide a comprehensive and unmatched travel experience. ODST AIRLINES INDO is not just an airline, it is a promise of extraordinary travel.',
    },
    closing: {
      label: 'Our Journey Begins With You',
      statement: 'Get ready to soar to new heights with ODST AIRLINES INDO — where every flight is a celebration of seamless travel, luxury and adventure. Stay Tuned.',
      statementLine1: 'Get ready to soar to new heights with ODST AIRLINES INDO — where every flight',
      statementLine2: 'is a celebration of seamless travel, luxury and adventure. Stay Tuned.',
      action: 'Be the First to Know',
    },
    footer: {
      aboutLine1: 'ODST AIRLINES INDO "INDONESIA", the latest venture of the venerable',
      aboutLine2: 'Manazil Al Mukhtara Group from Madinah, Saudi Arabia.',
      aboutText: 'ODST AIRLINES INDO "INDONESIA", the latest venture of the venerable Manazil Al Mukhtara Group from Saudi Arabia.',
      availability: 'Routes, flight schedules, and booking mechanisms will be announced soon.',
      companyTitle: 'ODST',
      journeyTitle: 'Journey',
      contactTitle: 'Connect',
      rights: '© ODST AIRLINES INDONESIA — All Rights Reserved.',
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
      label: 'ODST AIRLINES INDO',
      headlinePre: 'Perjalanan ',
      headlineHighlight: 'Baru',
      headlinePost: ' Antara Indonesia dan Arab Saudi',
      headlineLine1End: ' Antara Indonesia',
      headlineLine2: 'dan Arab Saudi',
      intro: 'ODST AIRLINES INDO "INDONESIA" — Proyek terbaru dari Manazil Al Mukhtara Group yang terkemuka dari Madinah, Arab Saudi, siap mendefinisikan ulang perjalanan udara dengan perpaduan sempurna antara kemewahan, kenyamanan, serta spesialisasi layanan Haji & Umrah.',
      actionExplore: 'Jelajahi Armada Kami',
      actionNews: 'Ikuti Kabar Peluncuran',
    },
    introSection: {
      label: 'Selamat Datang di Visi Kami',
      title: 'Mendefinisikan Ulang Perjalanan Udara dengan Kemewahan & Kenyamanan',
      titleLine1: 'Mendefinisikan Ulang Perjalanan Udara',
      titleLine2: 'dengan Kemewahan dan Kenyamanan',
      description: 'ODST AIRLINES INDO "INDONESIA", proyek terbaru dari Manazil Al Mukhtara Group yang terkemuka dari Arab Saudi, siap mendefinisikan ulang penerbangan dengan perpaduan kemewahan, kenyamanan, dan kemudahan. Menjelang lepas landas, nantikan pengalaman penerbangan yang belum pernah ada sebelumnya.',
      descLine1: 'ODST AIRLINES INDO "INDONESIA" merupakan proyek terbaru dari Manazil Al Mukhtara Group yang terkemuka dari Arab Saudi.',
      descLine2: 'Kami siap mendefinisikan ulang perjalanan udara dengan perpaduan kemewahan, kenyamanan, dan spesialisasi layanan ibadah Haji & Umrah.',
      quote: 'Menjelang lepas landas, nantikan pengalaman penerbangan istimewa yang belum pernah ada sebelumnya.',
    },
    features: {
      label: 'Keunggulan Utama',
      title: 'Pondasi Pengalaman Penerbangan Modern',
      subtitle: 'Tiga pilar utama yang membentuk keunggulan pengalaman terbang bersama ODST.',
      cards: [
        {
          number: '01',
          title: 'Armada Modern',
          desc: 'ODST AIRLINES INDO memiliki armada pesawat modern yang dirancang untuk efisiensi tinggi dan kepuasan penumpang, dengan teknologi mutakhir di setiap penerbangan.',
        },
        {
          number: '02',
          title: 'Rute Terhubung',
          desc: 'Nantikan rute-rute strategis yang menghubungkan destinasi utama, khususnya penerbangan Haji dan Umrah antara Indonesia dan Arab Saudi.',
        },
        {
          number: '03',
          title: 'Tarif & Paket Khusus',
          desc: 'Kemewahan terjangkau adalah komitmen kami. Temukan ragam pilihan tarif dan paket yang dirancang sesuai berbagai preferensi dan kelas perjalanan Anda.',
        },
      ],
    },
    pilgrimage: {
      label: 'Layanan Haji & Umrah',
      title: 'Spesialisasi Pelayanan Jamaah Ibadah',
      titleLine1: 'Spesialisasi dan Dedikasi bagi',
      titleLine2: 'Perjalanan Haji & Umrah',
      description: 'Kami menempatkan kenyamanan jamaah Haji dan Umrah sebagai prioritas utama, memastikan setiap fase perjalanan spiritual berlangsung khusyuk, tenang, dan bermartabat dengan pelayanan hangat penuh dedikasi.',
      badge: 'Spesialisasi Khusus Jamaah Haji & Umrah',
    },
    countdown: {
      label: 'Segera Beroperasi',
      title: 'Hitung Mundur Lepas Landas',
      description: 'Nantikan peresmian operasional resmi dengan standar kemewahan dan kenyamanan terbaik. Hitung mundur terus berjalan menuju penerbangan perdana ODST AIRLINES INDO.',
      days: 'Hari',
      hours: 'Jam',
      minutes: 'Menit',
      seconds: 'Detik',
    },
    bookingTeaser: {
      label: 'Informasi Pemesanan',
      title: 'Antusiasme Semakin Dekat! Dapatkan Kursi Pertama Anda.',
      titleLine1: 'Antusiasme Semakin Dekat!',
      titleLine2: 'Jadilah yang Pertama Mendapatkan Kursi',
      description: 'Jadilah salah satu yang pertama mengamankan kursi Anda. Jadwal rute, waktu penerbangan, dan mekanisme pemesanan yang mudah akan diumumkan dalam beberapa hari ke depan.',
      descLine1: 'Antusiasme kian terasa! Jadilah yang pertama mengamankan kursi Anda menjelang peluncuran resmi.',
      descLine2: 'Detail rute, jadwal penerbangan, dan mekanisme pemesanan digital yang mudah akan segera kami umumkan.',
      items: ['Mekanisme Reservasi Praktis & Cepat', 'Rute Strategis & Jadwal Penerbangan', 'Tarif & Paket Kemewahan Terjangkau'],
      action: 'Dapatkan Info Pemesanan Segera',
    },
    social: {
      label: 'Tetap Terhubung',
      title: 'Ikuti ODST AIRLINES INDO',
      description: 'Ikuti ODST AIRLINES INDO di platform media sosial resmi kami untuk mendapatkan informasi terkini, penawaran eksklusif, dan kabar peluncuran.',
    },
    partnership: {
      label: 'Kemitraan dengan Manazil Al Mukhtara Group',
      title: 'Warisan Keunggulan dalam Layanan Perhotelan & Wisata',
      titleLine1: 'Kemitraan Erat dengan',
      titleLine2: 'Manazil Al Mukhtara Group',
      description: 'ODST AIRLINES INDO selaras dengan nilai-nilai Manazil Al Mukhtara Group dari Madinah, Arab Saudi yang dikenal atas keunggulan layanan keramahan dan perjalanan. Bersama-sama, kami berkomitmen memberikan pengalaman perjalanan yang komprehensif dan tak tertandingi. ODST AIRLINES INDO bukan sekadar maskapai, melainkan sebuah janji perjalanan yang luar biasa.',
    },
    closing: {
      label: 'Perjalanan Dimulai Bersama Anda',
      statement: 'Bersiaplah untuk terbang menuju cakrawala baru bersama ODST AIRLINES INDO — di mana setiap penerbangan adalah perayaan atas perjalanan yang mulus, mewah, dan berkesan. Nantikan peluncuran kami.',
      statementLine1: 'Bersiaplah untuk terbang menuju cakrawala baru bersama ODST AIRLINES INDO —',
      statementLine2: 'di mana setiap penerbangan adalah perayaan atas perjalanan mulus, mewah, dan berkesan.',
      action: 'Nantikan Peluncuran Segera',
    },
    footer: {
      aboutLine1: 'ODST AIRLINES INDO "INDONESIA" — Proyek terbaru dari',
      aboutLine2: 'Manazil Al Mukhtara Group dari Madinah, Kerajaan Arab Saudi.',
      aboutText: 'ODST AIRLINES INDO "INDONESIA" — Proyek terbaru dari Manazil Al Mukhtara Group dari Madinah, Kerajaan Arab Saudi.',
      availability: 'Detail rute, jadwal operasional, dan mekanisme pemesanan akan segera diumumkan.',
      companyTitle: 'ODST',
      journeyTitle: 'Perjalanan',
      contactTitle: 'Kontak',
      rights: '© ODST AIRLINES INDONESIA — Hak Cipta Dilindungi.',
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
      toastDesc: 'Terima kasih, Anda akan menjadi yang pertama mendapatkan kabar peluncuran tiket ODST Airlines.',
    },
  },
};
