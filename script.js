// Robert Ruelas - TAM Portfolio Scripts

const navToggle = document.querySelector('#navToggle');
const navMenu = document.querySelector('#navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');
const year = document.querySelector('#year');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.querySelector('#contactForm');
const copyEmail = document.querySelector('#copyEmail');

year.textContent = new Date().getFullYear();

// Mobile navigation
navToggle.addEventListener('click', () => {
	const isOpen = navMenu.classList.toggle('open');
	navToggle.classList.toggle('active', isOpen);
	navToggle.setAttribute('aria-expanded', String(isOpen));
	document.body.classList.toggle('nav-open', isOpen);
});

navLinks.forEach((link) => {
	link.addEventListener('click', () => {
		navMenu.classList.remove('open');
		navToggle.classList.remove('active');
		navToggle.setAttribute('aria-expanded', 'false');
		document.body.classList.remove('nav-open');
	});
});

// Active section highlighting
const sections = document.querySelectorAll('section[id]');
const sectionObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;

			const activeLink = document.querySelector(
				`.nav-menu a[href="#${entry.target.id}"]`,
			);
			navLinks.forEach((link) => link.classList.remove('active'));

			if (activeLink) {
				activeLink.classList.add('active');
			}
		});
	},
	{ rootMargin: '-35% 0px -55% 0px', threshold: 0 },
);

sections.forEach((section) => sectionObserver.observe(section));

// Reveal animations
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add('visible');
			observer.unobserve(entry.target);
		});
	},
	{ threshold: 0.16 },
);

revealElements.forEach((element) => revealObserver.observe(element));

// Project filtering
filterButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const filter = button.dataset.filter;

		filterButtons.forEach((btn) => btn.classList.remove('active'));
		button.classList.add('active');

		projectCards.forEach((card) => {
			const categories = card.dataset.category.split(' ');
			const shouldShow = filter === 'all' || categories.includes(filter);
			card.classList.toggle('hidden', !shouldShow);
		});
	});
});

// Contact form submits to Formspree without redirecting
const formStatus = document.querySelector('#formStatus');
const submitBtn = document.querySelector('#submitBtn');

if (contactForm) {
	contactForm.addEventListener('submit', async (event) => {
		event.preventDefault();

		const formData = new FormData(contactForm);

		formStatus.textContent = 'Sending...';
		formStatus.className = 'form-status';
		submitBtn.disabled = true;
		submitBtn.textContent = 'Sending...';

		try {
			const response = await fetch(contactForm.action, {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json',
				},
			});

			if (response.ok) {
				contactForm.reset();
				formStatus.textContent = 'Thank you! Your message has been sent.';
				formStatus.classList.add('success');
			} else {
				formStatus.textContent =
					'Something went wrong. Please try again or email me directly.';
				formStatus.classList.add('error');
			}
		} catch (error) {
			formStatus.textContent =
				'There was a connection issue. Please try again or email me directly.';
			formStatus.classList.add('error');
		} finally {
			submitBtn.disabled = false;
			submitBtn.textContent = 'Send Message';
		}
	});
}

// English / Spanish language toggle
const languageToggle = document.querySelector('#languageToggle');

const translations = {
	en: {
		navAbout: 'About',
		navValue: 'TAM Value',
		navExperience: 'Experience',
		navProjects: 'Projects',
		navSkills: 'Skills',
		navContact: 'Contact',

		heroEyebrow:
			'Starbucks Partner • Technical Support • Software Engineering Candidate',
		heroTitle:
			'Starbucks partner and former Apple Genius building toward software engineering roles that improve reliable technology experiences for partners, customers, and technical teams.',
		heroText:
			'I help customers translate technical problems into clear next steps, partner with internal teams to resolve escalations, and document solutions that improve the customer experience.',
		heroPrimaryBtn: 'View TAM-Relevant Work',
		heroSecondaryBtn: 'Contact Me',

		heroCardSubtitle:
			'Technical Support • Customer Success • Ecommerce • Web Development',

		metricOneNumber: '6+ years',
		metricOneText: 'Apple technical support and repair experience',

		metricTwoNumber: '17+ years',
		metricTwoText: 'Customer service, leadership, and operations experience',

		metricThreeNumber: '8+ projects',
		metricThreeText: 'Web, ecommerce, and app portfolio examples',

		aboutEyebrow: 'About',
		aboutTitle:
			'Built for the bridge between customers, support, product, and engineering.',
		aboutParagraphOne:
			'I’m a bilingual technical support and customer experience professional with a background in Apple hardware/software troubleshooting, repair workflows, team leadership, web development, ecommerce, and behavioral psychology.',
		aboutParagraphTwo:
			'My strongest value is the ability to listen carefully, clarify complex issues, identify root causes, communicate status with empathy, and turn repeated problems into documented, repeatable solutions.',
		aboutParagraphThree:
			'I bring hands-on technical depth from Apple Genius work, operational leadership from Starbucks management, and a growing portfolio of web and ecommerce projects that show I can understand both the customer experience and the technical system behind it.',

		contactEyebrow: 'Contact',
		contactTitle:
			'Let’s connect about Technical Account Manager opportunities.',
		contactText:
			'I’m especially interested in roles where I can combine customer success, technical troubleshooting, ecommerce, documentation, and cross-functional collaboration.',
		contactName: 'Name',
		contactEmail: 'Email',
		contactMessage: 'Message',
		contactButton: 'Send Message',
		contactNote: 'You can also email me directly:',

		valueEyebrow: 'TAM Value',
		valueTitle: 'How I would support technical accounts',
		valueText:
			'A Technical Account Manager needs more than technical skill. The role requires proactive communication, customer advocacy, clean documentation, and strong internal partnership.',

		valueCardOneTitle: 'Technical Discovery',
		valueCardOneText:
			'Ask targeted questions, map customer workflows, identify dependencies, and document environments before issues become blockers.',
		valueCardTwoTitle: 'Escalation Ownership',
		valueCardTwoText:
			'Gather clear reproduction steps, prioritize business impact, communicate status, and partner with support, product, and engineering until resolution.',
		valueCardThreeTitle: 'Customer Enablement',
		valueCardThreeText:
			'Translate technical guidance into customer-friendly training, best practices, runbooks, and post-resolution documentation.',
		valueCardFourTitle: 'Business Impact',
		valueCardFourText:
			'Connect technical decisions to customer goals such as uptime, conversion, adoption, operational efficiency, and long-term account health.',

		experienceEyebrow: 'Experience',
		experienceTitle: 'Relevant experience for a Technical Account Manager role',

		appleTitle: 'Genius — Apple',
		appleSummary:
			'Delivered technical support, diagnostics, repairs, customer education, and cross-functional issue resolution across Apple products and services.',
		appleBulletOne:
			'Diagnosed hardware, software, account, and ecosystem issues while communicating clear next steps to customers.',
		appleBulletTwo:
			'Documented customer issues accurately to support repair decisions, trend analysis, and internal follow-up.',
		appleBulletThree:
			'Partnered with teammates and leadership to resolve complex cases, improve workflows, and mentor newer team members.',
		appleBulletFour:
			'Maintained confidentiality, data care, and high customer trust during sensitive technical interactions.',

		starbucksTitle: 'Manager — Starbucks',
		starbucksSummary:
			'Led daily operations, customer connection, team coaching, scheduling, inventory, cash handling, and service recovery in a high-volume environment.',
		starbucksBulletOne:
			'Coached partners on customer experience, operational standards, and performance expectations.',
		starbucksBulletTwo:
			'Balanced customer needs, staffing, inventory, and business priorities while maintaining service quality.',
		starbucksBulletThree:
			'Resolved customer concerns with empathy, accountability, and practical next steps.',
		starbucksBulletFour:
			'Volunteered with Starbucks at the RGV Food Bank, supporting community service and team engagement.',

		behaviorTitle: 'Behavior Therapist — The Shape of Behavior',
		behaviorSummary:
			'Applied behavioral analysis, data collection, family communication, and intervention planning in a highly detail-oriented care environment.',
		behaviorBulletOne:
			'Used structured observation and data collection to support individualized treatment plans.',
		behaviorBulletTwo:
			'Communicated progress and behavior trends with caregivers and cross-functional therapy teams.',
		behaviorBulletThree:
			'Built patience, active listening, and root-cause thinking that directly support customer-facing technical roles.',

		projectsEyebrow: 'Projects',
		projectsTitle:
			'Portfolio projects aligned with technical account management',
		projectsText:
			'These projects show web development, ecommerce thinking, customer journey design, platform setup, and technical documentation.',
		filterAll: 'All',
		filterEcommerce: 'Ecommerce',
		filterWeb: 'Web',
		filterApp: 'App',
		filterBusiness: 'Business',

		coffeeTag: 'SwiftUI • Firebase • Product Thinking',
		coffeeTitle: 'Coffee Passport App',
		coffeeText:
			'A prototype app for logging, filtering, and tracking Starbucks coffees with authentication and real-time data support.',
		coffeeBulletOne: 'User registration and login',
		coffeeBulletTwo: 'Coffee tracking and filtering',
		coffeeBulletThree: 'Firebase Authentication and database integration',

		leonTag: 'BigCommerce • Ecommerce • UX',
		leonTitle: 'Leon & Leon Stud Earrings',
		leonText:
			'A modern ecommerce site with product presentation, cart experience, inventory considerations, and responsive storefront design.',
		leonBulletOne: 'BigCommerce implementation experience',
		leonBulletTwo: 'Customer shopping flow and product detail structure',
		leonBulletThree: 'Responsive design for desktop and mobile',

		utrTag: 'Service Website • Booking • Support',
		utrTitle: 'Unified Tech Repair',
		utrText:
			'A professional service website for Apple repair, troubleshooting, and technology support services.',
		utrBulletOne: 'Clear service categories and support path',
		utrBulletTwo: 'Online booking flow',
		utrBulletThree: 'Customer-facing technical service copy',

		andVenusTag: 'HTML • CSS • JavaScript',
		andVenusTitle: 'And Venus',
		andVenusText:
			'A responsive band website with a full-screen landing page, media presentation, gallery content, and contact experience.',
		andVenusBulletOne: 'Responsive design and visual branding',
		andVenusBulletTwo: 'Content structure for audience engagement',
		andVenusBulletThree: 'Contact and promotional flow',

		blackLotusTag: 'Client Website • Booking • Payments',
		blackLotusTitle: 'Black Lotus Tattoo Studio',
		blackLotusText:
			'A client-facing website concept for studio services, artist presentation, booking, and secure deposit payment flow.',
		blackLotusBulletOne: 'Service presentation and appointment path',
		blackLotusBulletTwo: 'Portfolio gallery structure',
		blackLotusBulletThree: 'Mobile-first user experience',

		passwordTag: 'JavaScript • Utility • UX',
		passwordTitle: 'Password Generator',
		passwordText:
			'A small JavaScript utility focused on user inputs, generated outputs, and basic interaction logic.',
		passwordBulletOne: 'Form handling and conditional logic',
		passwordBulletTwo: 'Simple interface design',
		passwordBulletThree: 'Practical JavaScript functionality',

		viewGithub: 'View GitHub',
		viewSite: 'View Site',
		viewProject: 'View Project',

		skillsEyebrow: 'Skills',
		skillsTitle: 'Technical, customer-facing, and operational strengths',
		technicalSupportTitle: 'Technical Support',
		technicalSupportOne: 'Hardware and software troubleshooting',
		technicalSupportTwo: 'macOS, iOS, iPadOS, and Apple ecosystem support',
		technicalSupportThree:
			'Diagnostics, repair workflows, and issue documentation',
		technicalSupportFour: 'Customer education and technical translation',

		customerSuccessTitle: 'Customer Success / TAM',
		customerSuccessOne: 'Account health mindset',
		customerSuccessTwo: 'Escalation management',
		customerSuccessThree: 'Customer advocacy',
		customerSuccessFour: 'Best-practice guidance and runbook documentation',

		webEcommerceTitle: 'Web / Ecommerce',
		webEcommerceOne: 'HTML, CSS, JavaScript, Sass',
		webEcommerceTwo: 'Bootstrap and responsive design',
		webEcommerceThree: 'BigCommerce storefront familiarity',
		webEcommerceFour: 'UX, cart flows, service pages, and contact forms',

		leadershipTitle: 'Leadership',
		leadershipOne: 'Team coaching and mentorship',
		leadershipTwo: 'Training and development',
		leadershipThree: 'Operational planning and scheduling',
		leadershipFour: 'Service recovery and customer communication',

		educationEyebrow: 'Education',
		educationTitle: 'B.A. Psychology',
		educationSchool: 'University of Texas-Pan American • Minor in English',
		educationText:
			'Psychology and English strengthen my ability to understand customer behavior, communicate clearly, identify patterns, and write useful documentation.',

		namePlaceholder: 'Your name',
		emailPlaceholder: 'you@example.com',
		messagePlaceholder: 'Tell me about the role or opportunity...',
	},

	es: {
		navAbout: 'Sobre mí',
		navValue: 'Valor TAM',
		navExperience: 'Experiencia',
		navProjects: 'Proyectos',
		navSkills: 'Habilidades',
		navContact: 'Contacto',

		heroEyebrow:
			'Partner de Starbucks • Soporte Técnico • Candidato de Ingeniería de Software',
		heroTitle:
			'Partner de Starbucks y ex Apple Genius en crecimiento hacia roles de ingeniería de software que mejoran experiencias tecnológicas confiables para partners, clientes y equipos técnicos.',
		heroText:
			'Ayudo a los clientes a convertir problemas técnicos en próximos pasos claros, colaborar con equipos internos para resolver escalaciones y documentar soluciones que mejoran la experiencia del cliente.',
		heroPrimaryBtn: 'Ver trabajo relevante para TAM',
		heroSecondaryBtn: 'Contáctame',

		heroCardSubtitle:
			'Soporte Técnico • Éxito del Cliente • Ecommerce • Desarrollo Web',

		metricOneNumber: '6+ años',
		metricOneText: 'Experiencia en soporte técnico y reparación Apple',

		metricTwoNumber: '17+ años',
		metricTwoText:
			'Experiencia en servicio al cliente, liderazgo y operaciones',

		metricThreeNumber: '8+ proyectos',
		metricThreeText: 'Ejemplos de portafolio web, ecommerce y apps',

		aboutEyebrow: 'Sobre mí',
		aboutTitle:
			'Preparado para conectar clientes, soporte, producto e ingeniería.',
		aboutParagraphOne:
			'Soy un profesional bilingüe de soporte técnico y experiencia del cliente con experiencia en solución de problemas de hardware y software Apple, procesos de reparación, liderazgo de equipos, desarrollo web, ecommerce y psicología del comportamiento.',
		aboutParagraphTwo:
			'Mi mayor valor es la capacidad de escuchar con atención, aclarar problemas complejos, identificar causas raíz, comunicar avances con empatía y convertir problemas repetidos en soluciones documentadas y repetibles.',
		aboutParagraphThree:
			'Aporto profundidad técnica práctica por mi experiencia como Apple Genius, liderazgo operativo por mi trayectoria en Starbucks y un portafolio en crecimiento de proyectos web y ecommerce que demuestran que entiendo tanto la experiencia del cliente como el sistema técnico detrás de ella.',

		contactEyebrow: 'Contacto',
		contactTitle:
			'Conectemos sobre oportunidades de Technical Account Manager.',
		contactText:
			'Estoy especialmente interesado en roles donde pueda combinar éxito del cliente, solución de problemas técnicos, ecommerce, documentación y colaboración con equipos multifuncionales.',
		contactName: 'Nombre',
		contactEmail: 'Correo electrónico',
		contactMessage: 'Mensaje',
		contactButton: 'Enviar mensaje',
		contactNote: 'También puedes enviarme un correo directamente:',

		valueEyebrow: 'Valor TAM',
		valueTitle: 'Cómo apoyaría cuentas técnicas',
		valueText:
			'Un Technical Account Manager necesita más que habilidad técnica. El rol requiere comunicación proactiva, defensa del cliente, documentación clara y una fuerte colaboración interna.',

		valueCardOneTitle: 'Descubrimiento Técnico',
		valueCardOneText:
			'Hacer preguntas estratégicas, entender los flujos de trabajo del cliente, identificar dependencias y documentar entornos antes de que los problemas se conviertan en bloqueos.',
		valueCardTwoTitle: 'Manejo de Escalaciones',
		valueCardTwoText:
			'Reunir pasos claros para reproducir problemas, priorizar el impacto del negocio, comunicar avances y colaborar con soporte, producto e ingeniería hasta llegar a una resolución.',
		valueCardThreeTitle: 'Capacitación del Cliente',
		valueCardThreeText:
			'Traducir la orientación técnica en capacitación clara, mejores prácticas, guías de uso y documentación posterior a la resolución.',
		valueCardFourTitle: 'Impacto en el Negocio',
		valueCardFourText:
			'Conectar decisiones técnicas con objetivos del cliente como disponibilidad, conversión, adopción, eficiencia operativa y salud de la cuenta a largo plazo.',

		experienceEyebrow: 'Experiencia',
		experienceTitle:
			'Experiencia relevante para un rol de Technical Account Manager',

		appleTitle: 'Genius — Apple',
		appleSummary:
			'Brindé soporte técnico, diagnósticos, reparaciones, educación al cliente y resolución de problemas en colaboración con equipos internos para productos y servicios de Apple.',
		appleBulletOne:
			'Diagnostiqué problemas de hardware, software, cuentas y ecosistema mientras comunicaba próximos pasos claros a los clientes.',
		appleBulletTwo:
			'Documenté problemas de clientes con precisión para apoyar decisiones de reparación, análisis de tendencias y seguimiento interno.',
		appleBulletThree:
			'Colaboré con compañeros y líderes para resolver casos complejos, mejorar procesos y apoyar a nuevos miembros del equipo.',
		appleBulletFour:
			'Mantuve confidencialidad, cuidado de datos y alta confianza del cliente durante interacciones técnicas sensibles.',

		starbucksTitle: 'Gerente — Starbucks',
		starbucksSummary:
			'Lideré operaciones diarias, conexión con clientes, capacitación de equipo, horarios, inventario, manejo de efectivo y recuperación de servicio en un entorno de alto volumen.',
		starbucksBulletOne:
			'Capacité a partners en experiencia del cliente, estándares operativos y expectativas de desempeño.',
		starbucksBulletTwo:
			'Equilibré necesidades del cliente, personal, inventario y prioridades del negocio mientras mantenía calidad de servicio.',
		starbucksBulletThree:
			'Resolví inquietudes de clientes con empatía, responsabilidad y próximos pasos prácticos.',
		starbucksBulletFour:
			'Participé como voluntario con Starbucks en el RGV Food Bank, apoyando servicio comunitario y participación del equipo.',

		behaviorTitle: 'Terapeuta Conductual — The Shape of Behavior',
		behaviorSummary:
			'Apliqué análisis conductual, recopilación de datos, comunicación con familias y planificación de intervenciones en un entorno altamente detallado.',
		behaviorBulletOne:
			'Utilicé observación estructurada y recopilación de datos para apoyar planes de tratamiento individualizados.',
		behaviorBulletTwo:
			'Comuniqué avances y tendencias conductuales con cuidadores y equipos terapéuticos multifuncionales.',
		behaviorBulletThree:
			'Desarrollé paciencia, escucha activa y pensamiento de causa raíz que apoyan directamente roles técnicos orientados al cliente.',

		projectsEyebrow: 'Proyectos',
		projectsTitle: 'Proyectos alineados con Technical Account Management',
		projectsText:
			'Estos proyectos muestran desarrollo web, pensamiento ecommerce, diseño del recorrido del cliente, configuración de plataformas y documentación técnica.',
		filterAll: 'Todos',
		filterEcommerce: 'Ecommerce',
		filterWeb: 'Web',
		filterApp: 'App',
		filterBusiness: 'Negocio',

		coffeeTag: 'SwiftUI • Firebase • Pensamiento de Producto',
		coffeeTitle: 'Coffee Passport App',
		coffeeText:
			'Una app prototipo para registrar, filtrar y dar seguimiento a cafés de Starbucks con autenticación y soporte de datos en tiempo real.',
		coffeeBulletOne: 'Registro e inicio de sesión de usuarios',
		coffeeBulletTwo: 'Seguimiento y filtrado de cafés',
		coffeeBulletThree:
			'Integración con Firebase Authentication y base de datos',

		leonTag: 'BigCommerce • Ecommerce • UX',
		leonTitle: 'Leon & Leon Stud Earrings',
		leonText:
			'Un sitio ecommerce moderno con presentación de productos, experiencia de carrito, consideraciones de inventario y diseño responsivo.',
		leonBulletOne: 'Experiencia con implementación en BigCommerce',
		leonBulletTwo:
			'Flujo de compra del cliente y estructura de detalles del producto',
		leonBulletThree: 'Diseño responsivo para escritorio y móvil',

		utrTag: 'Sitio de Servicios • Reservas • Soporte',
		utrTitle: 'Unified Tech Repair',
		utrText:
			'Un sitio profesional de servicios para reparación Apple, solución de problemas y soporte tecnológico.',
		utrBulletOne: 'Categorías de servicio claras y ruta de soporte',
		utrBulletTwo: 'Flujo de reserva en línea',
		utrBulletThree: 'Texto técnico de servicio orientado al cliente',

		andVenusTag: 'HTML • CSS • JavaScript',
		andVenusTitle: 'And Venus',
		andVenusText:
			'Un sitio responsivo para una banda con página principal de pantalla completa, presentación multimedia, galería y experiencia de contacto.',
		andVenusBulletOne: 'Diseño responsivo e identidad visual',
		andVenusBulletTwo:
			'Estructura de contenido para interacción con la audiencia',
		andVenusBulletThree: 'Flujo de contacto y promoción',

		blackLotusTag: 'Sitio para Cliente • Reservas • Pagos',
		blackLotusTitle: 'Black Lotus Tattoo Studio',
		blackLotusText:
			'Un concepto de sitio orientado al cliente para servicios de estudio, presentación de artistas, reservas y flujo seguro de depósitos.',
		blackLotusBulletOne: 'Presentación de servicios y ruta de citas',
		blackLotusBulletTwo: 'Estructura de galería de portafolio',
		blackLotusBulletThree: 'Experiencia móvil primero',

		passwordTag: 'JavaScript • Utilidad • UX',
		passwordTitle: 'Generador de Contraseñas',
		passwordText:
			'Una pequeña utilidad de JavaScript enfocada en entradas de usuario, resultados generados y lógica básica de interacción.',
		passwordBulletOne: 'Manejo de formularios y lógica condicional',
		passwordBulletTwo: 'Diseño de interfaz simple',
		passwordBulletThree: 'Funcionalidad práctica con JavaScript',

		viewGithub: 'Ver GitHub',
		viewSite: 'Ver sitio',
		viewProject: 'Ver proyecto',

		skillsEyebrow: 'Habilidades',
		skillsTitle: 'Fortalezas técnicas, de atención al cliente y operativas',
		technicalSupportTitle: 'Soporte Técnico',
		technicalSupportOne: 'Solución de problemas de hardware y software',
		technicalSupportTwo: 'Soporte para macOS, iOS, iPadOS y ecosistema Apple',
		technicalSupportThree:
			'Diagnósticos, procesos de reparación y documentación de problemas',
		technicalSupportFour: 'Educación al cliente y traducción técnica',

		customerSuccessTitle: 'Éxito del Cliente / TAM',
		customerSuccessOne: 'Mentalidad de salud de cuenta',
		customerSuccessTwo: 'Manejo de escalaciones',
		customerSuccessThree: 'Defensa del cliente',
		customerSuccessFour:
			'Guía de mejores prácticas y documentación de procesos',

		webEcommerceTitle: 'Web / Ecommerce',
		webEcommerceOne: 'HTML, CSS, JavaScript, Sass',
		webEcommerceTwo: 'Bootstrap y diseño responsivo',
		webEcommerceThree: 'Familiaridad con storefronts de BigCommerce',
		webEcommerceFour:
			'UX, flujos de carrito, páginas de servicio y formularios de contacto',

		leadershipTitle: 'Liderazgo',
		leadershipOne: 'Coaching y mentoría de equipos',
		leadershipTwo: 'Capacitación y desarrollo',
		leadershipThree: 'Planificación operativa y horarios',
		leadershipFour: 'Recuperación de servicio y comunicación con clientes',

		educationEyebrow: 'Educación',
		educationTitle: 'Licenciatura en Psicología',
		educationSchool:
			'University of Texas-Pan American • Concentración menor en Inglés',
		educationText:
			'La psicología y el inglés fortalecen mi capacidad para entender el comportamiento del cliente, comunicarme con claridad, identificar patrones y escribir documentación útil.',

		namePlaceholder: 'Tu nombre',
		emailPlaceholder: 'tu@ejemplo.com',
		messagePlaceholder: 'Cuéntame sobre el rol o la oportunidad...',
	},
};

function setLanguage(language) {
	const selectedTranslations = translations[language];

	document.querySelectorAll('[data-i18n]').forEach((element) => {
		const key = element.getAttribute('data-i18n');

		if (selectedTranslations[key]) {
			element.textContent = selectedTranslations[key];
		}
	});

	document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
		const key = element.getAttribute('data-i18n-placeholder');

		if (selectedTranslations[key]) {
			element.setAttribute('placeholder', selectedTranslations[key]);
		}
	});

	document.documentElement.lang = language;
	localStorage.setItem('preferredLanguage', language);

	if (languageToggle) {
		languageToggle.textContent = language === 'en' ? 'Español' : 'English';
	}
}

if (languageToggle) {
	const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
	setLanguage(savedLanguage);

	languageToggle.addEventListener('click', () => {
		const currentLanguage = localStorage.getItem('preferredLanguage') || 'en';
		const newLanguage = currentLanguage === 'en' ? 'es' : 'en';
		setLanguage(newLanguage);
	});
}
