(function () {
  'use strict';

  /* ── Translations ─────────────────────────────────────────────────────────── */
  var T = {
    de: {
      headerSubtitle: 'Entwickelt von M. Mendelson',
      navFeatured: 'Empfohlen',
      navDataFields: 'Datenfelder',
      navWatchFaces: 'Zifferblätter',
      navContact: 'Kontakt',
      navTracker: 'Live-Tracker',
      navRun: 'Lauf-Aggregator',
      searchPlaceholder: 'Apps suchen…',
      featuredDesc: 'Frische Auswahl und Publikumslieblinge — aktuell aus Live-Statistiken.',
      dataFieldsDesc: 'Leistungstools für Tempo, Vorhersage und Live-Tracking.',
      watchFacesDesc: 'Kreative Zifferblätter mit markanten visuellen Konzepten.',
      trackerWebDesc: 'Verfolge Athleten mit Garmin LiveTrack in Echtzeit: Live-Route, Metriken und dein Standort auf der Karte. Ein Klick, und Google Maps führt dich zum Athleten.',
      trackerWebBtn: 'Tracker öffnen →',
      runWebDesc: 'Finde deine nächsten Läufe an einem Ort.',
      runWebBtn: 'Aggregator öffnen →',
      contactTitle: 'Kontakt',
      contactText: 'Fragen, Feedback oder Funktionsideen? Ich freue mich, von Ihnen zu hören.',
      contactBtn: 'E-Mail senden',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'KOSTENLOS TESTEN',
      moreVersions: 'Weitere Versionen ▾',
      liteVersion: 'Lite-Version',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Meilen-Version',
      payAlt: 'Kostenlos testen & alternative Zahlungsmethoden unten',
      carouselPrev: 'Vorherige empfohlene App',
      carouselNext: 'Nächste empfohlene App',
      seeDetails: 'Details ansehen',
      slideOf: 'Folie {n} von {total} anzeigen',
      viewApp: '{title} anzeigen',
      langLabel: 'Sprache',
      appDesc: {
        'Live Predictor Premium': 'Erweiterte Echtzeit-Vorhersagen mit flexiblen Konfigurationen.',
        'Live Time Predictor': 'Live-Zeit-Vorhersagen für benutzerdefinierte Distanzen.',
        'Pacer Data Field': 'Echtzeit-Tempoführung, um genau im Zielbereich zu bleiben.',
        'Split Pacer Pro': 'Ziellinie plus Zwischenzeiten: Live-erforderliches Tempo, ETA, Vorsprung/Rückstand und Abschnittfortschritt.',
        'Live Pace Speed Calculator': 'Erforderliches Tempo oder Geschwindigkeit für benutzerdefinierte Ziele.',
        'Tracker Data Field': 'Teilen Sie Ihre Aktivität live mit einer einzigartigen Tracker-ID.',
        'Route Silhouette': 'Zeigt Ihre neueste GPS-basierte Strava-Aktivität auf Ihrer Uhr.',
        'Premium Route Silhouette': 'Premium-Watchface: Ihre neueste Strava-Route mit Komplikationen und mehreren Hintergründen.',
        'Time Across The Galaxy': 'Kosmisch inspiriertes Zifferblatt, inspiriert von einer weit entfernten Galaxie.',
        'Solve for X': 'Lösen Sie ein Rätsel, um die Uhrzeit zu enthüllen.',
        'Football Matches': 'Die Spiele deines Vereins auf dem Zifferblatt: Live-Ergebnis, Spielminute und nächste Partie.',
        'Dynamic Hours': 'Ein analoges Zifferblatt im 24-Stunden-Format – 1 Uhr nachts und 13 Uhr sehen nie gleich aus.',
        'Volty': 'Ein animiertes Zifferblatt mit Volty, einer kleinen Batterie, die mit dir trainiert. Ihre Laune zeigt, wie viel Akku deine Uhr noch hat.'
      },
      momentumTags: {
        trending: '🔥 Trend Diese Woche',
        popular: '🏆 Beliebt und Weit Verbreitet',
        consistent: '💪 Aktiv Genutzt',
        discovered: '📈 Neu Entdeckt'
      },
      tooltips: {
        trending: {
          title: '🔥 Trend Diese Woche',
          message: 'Viele Athleten haben diese App zuletzt gewählt und sie zu einer der aktivsten Auswahlen dieser Woche gemacht.',
          note: 'Basierend auf aktuellen wöchentlichen Installationen.'
        },
        popular: {
          title: '🏆 Beliebt und Weit Verbreitet',
          message: 'Diese App hat ein großes langfristiges Publikum und starke wöchentliche Nutzung unter Athleten.',
          note: 'Spiegelt sowohl Gesamtinstallationen als auch aktive Athleten wider.'
        },
        consistent: {
          title: '💪 Aktiv Genutzt',
          message: 'Eine solide Gruppe von Athleten nutzt diese App diese Woche.',
          note: 'Basierend auf aktiven Nutzern der letzten 7 Tage.'
        },
        discovered: {
          title: '📈 Neu Entdeckt',
          message: 'Gewinnt in den letzten 7 Tagen neue Installationen.',
          note: 'Basierend auf aktuellen Installationen.'
        }
      },
      metrics: {
        totalDownloads: 'Gesamte Downloads:',
        installs7d: 'Installationen (7 Tage):',
        activeUsers: 'Aktive Nutzer (7 Tage):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — kostenlos testen' },
        new:      { badge: { emoji: '✨', word: 'Neu',    class: 'fresh'     }, headline: '✨ Neu gestartet' },
        installs: { badge: { emoji: '🔥', word: 'Im Trend',         class: 'trending'  }, headline: '🔥 Beliebt Diese Woche' },
        total:    { badge: { emoji: '🏆', word: 'Beliebt',          class: 'popular'   }, headline: '🏆 Aller-Zeiten-Favorit' },
        users:    { badge: { emoji: '💪', word: 'Regelmäßig',       class: 'consistent'}, headline: '💪 Athleten nutzen es weiterhin' },
        spotlight:{ badge: { emoji: '⭐', word: 'Im Rampenlicht',   class: 'trending'  }, headline: '⭐ Starke wöchentliche Installationen' },
        topDataField: { badge: { emoji: '📊', word: 'Favorit', class: 'popular' }, headline: '📊 Lieblings-Datenfeld' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Favorit', class: 'popular' }, headline: '⌚ Lieblings-Watchface' }
      }
    },

    en: {
      headerSubtitle: 'Developed by M. Mendelson',
      navFeatured: 'Featured',
      navDataFields: 'Data Fields',
      navWatchFaces: 'Watch Faces',
      navContact: 'Contact',
      navTracker: 'Live Tracker',
      navRun: 'Run Aggregator',
      searchPlaceholder: 'Search apps…',
      featuredDesc: 'Fresh picks and crowd favorites — updated from live stats.',
      dataFieldsDesc: 'Performance tools for pacing, prediction and live tracking.',
      watchFacesDesc: 'Creative watch faces with distinctive visual concepts.',
      trackerWebDesc: 'Follow athletes with Garmin LiveTrack in real time: live route, metrics, and your location on the map. One tap, and Google Maps guides you to where the athlete is.',
      trackerWebBtn: 'Open Tracker →',
      runWebDesc: 'Find your next races in one place.',
      runWebBtn: 'Open Aggregator →',
      contactTitle: 'Contact',
      contactText: "Questions, feedback or feature ideas? I'd be glad to hear from you.",
      contactBtn: 'Send email',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'FREE TRIAL',
      moreVersions: 'More versions ▾',
      liteVersion: 'Lite version',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Miles version',
      payAlt: 'Free trial & alternative payment methods below',
      carouselPrev: 'Previous featured app',
      carouselNext: 'Next featured app',
      seeDetails: 'See details',
      slideOf: 'Show slide {n} of {total}',
      viewApp: 'View {title}',
      langLabel: 'Language',
      appDesc: {
        'Live Predictor Premium': 'Advanced real-time predictions with flexible configurations.',
        'Live Time Predictor': 'Live time predictions for custom distances.',
        'Pacer Data Field': 'Real-time pacing guidance to stay exactly on target.',
        'Split Pacer Pro': 'Finish line plus intermediate splits: live required pace, ETA, ahead/behind, and segment progress.',
        'Live Pace Speed Calculator': 'Required pace or speed for custom goals.',
        'Tracker Data Field': 'Share your activity live with a unique tracker ID.',
        'Route Silhouette': 'Shows your latest GPS-based Strava activity on your watch.',
        'Premium Route Silhouette': 'Premium watch face: your latest Strava route with complications and multiple backgrounds.',
        'Time Across The Galaxy': 'Cosmic-themed watch face inspired by a galaxy far away.',
        'Solve for X': 'Solve a puzzle to reveal the time.',
        'Football Matches': 'Your club’s matches on the watch face: live score, match clock and the next fixture.',
        'Dynamic Hours': 'An analog watch face that shows time in 24-hour format, so 1 AM and 1 PM never look the same.',
        'Volty': 'An animated watch face starring Volty, a little battery that trains with you. Its mood shows how much charge your watch has left.'
      },
      momentumTags: {
        trending: '🔥 Trending This Week',
        popular: '🏆 Popular and Widely Used',
        consistent: '💪 Actively Used',
        discovered: '📈 Newly Discovered'
      },
      tooltips: {
        trending: {
          title: '🔥 Trending This Week',
          message: 'Many athletes have chosen this app recently, making it one of the most active picks this week.',
          note: 'Based on fresh weekly installs.'
        },
        popular: {
          title: '🏆 Popular and Widely Used',
          message: 'This app has a large long-term audience and strong weekly usage among athletes.',
          note: 'Reflects both total installs and active athletes.'
        },
        consistent: {
          title: '💪 Actively Used',
          message: 'A solid group of athletes is using this app this week.',
          note: 'Based on active users over the last 7 days.'
        },
        discovered: {
          title: '📈 Newly Discovered',
          message: 'Picking up new installs over the last 7 days.',
          note: 'Based on recent installs.'
        }
      },
      metrics: {
        totalDownloads: 'Total Downloads:',
        installs7d: 'Installs (7 days):',
        activeUsers: 'Active Users (7 days):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — free trial' },
        new:      { badge: { emoji: '✨', word: 'New', class: 'fresh'     }, headline: '✨ Newly launched' },
        installs: { badge: { emoji: '🔥', word: 'Trending',       class: 'trending'  }, headline: '🔥 Popular This Week' },
        total:    { badge: { emoji: '🏆', word: 'Popular',        class: 'popular'   }, headline: '🏆 All-Time Favorite' },
        users:    { badge: { emoji: '💪', word: 'Consistent',     class: 'consistent'}, headline: '💪 Athletes keep using it' },
        spotlight:{ badge: { emoji: '⭐', word: 'Featured',       class: 'trending'  }, headline: '⭐ Strong weekly installs' },
        topDataField: { badge: { emoji: '📊', word: 'Favorite', class: 'popular' }, headline: '📊 Favorite Data Field' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Favorite', class: 'popular' }, headline: '⌚ Favorite Watch Face' }
      }
    },

    es: {
      headerSubtitle: 'Desarrollado por M. Mendelson',
      navFeatured: 'Destacados',
      navDataFields: 'Campos de datos',
      navWatchFaces: 'Esferas',
      navContact: 'Contacto',
      navTracker: 'Rastreador en Vivo',
      navRun: 'Agregador de Carreras',
      searchPlaceholder: 'Buscar apps…',
      featuredDesc: 'Selecciones frescas y favoritos de la comunidad — actualizados con estadísticas en vivo.',
      dataFieldsDesc: 'Herramientas de rendimiento para ritmo, predicción y seguimiento en vivo.',
      watchFacesDesc: 'Esferas creativas con conceptos visuales distintivos.',
      trackerWebDesc: 'Sigue atletas con Garmin LiveTrack en tiempo real: ruta en vivo, métricas y tu ubicación en el mapa. Con un clic, Google Maps te guía hasta donde está el atleta.',
      trackerWebBtn: 'Abrir Rastreador →',
      runWebDesc: 'Encuentra tus próximas carreras en un solo lugar.',
      runWebBtn: 'Abrir Agregador →',
      contactTitle: 'Contacto',
      contactText: '¿Preguntas, comentarios o ideas de funciones? Me encantaría escucharte.',
      contactBtn: 'Enviar correo',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'PRUEBA GRATIS',
      moreVersions: 'Más versiones ▾',
      liteVersion: 'Versión Lite',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Versión millas',
      payAlt: 'Prueba gratis y métodos de pago alternativos abajo',
      carouselPrev: 'App destacada anterior',
      carouselNext: 'Siguiente app destacada',
      seeDetails: 'Ver detalles',
      slideOf: 'Mostrar diapositiva {n} de {total}',
      viewApp: 'Ver {title}',
      langLabel: 'Idioma',
      appDesc: {
        'Live Predictor Premium': 'Predicciones avanzadas en tiempo real con configuraciones flexibles.',
        'Live Time Predictor': 'Predicciones de tiempo en vivo para distancias personalizadas.',
        'Pacer Data Field': 'Guía de ritmo en tiempo real para mantenerte exactamente en el objetivo.',
        'Split Pacer Pro': 'Meta más parciales intermedias: ritmo requerido en vivo, ETA, adelante/atrás y progreso del segmento.',
        'Live Pace Speed Calculator': 'Ritmo o velocidad requerida para objetivos personalizados.',
        'Tracker Data Field': 'Comparte tu actividad en vivo con un ID de seguimiento único.',
        'Route Silhouette': 'Muestra tu última actividad de Strava basada en GPS en tu reloj.',
        'Premium Route Silhouette': 'Esfera premium: tu última ruta de Strava con complicaciones y múltiples fondos.',
        'Time Across The Galaxy': 'Esfera con temática cósmica inspirada en una galaxia lejana.',
        'Solve for X': 'Resuelve un rompecabezas para revelar la hora.',
        'Football Matches': 'Los partidos de tu equipo en la esfera: marcador en vivo, minuto y próximo partido.',
        'Dynamic Hours': 'Una esfera analógica que muestra la hora en formato de 24 horas, para que la 1 AM y la 1 PM nunca se vean iguales.',
        'Volty': 'Una esfera animada protagonizada por Volty, una pequeña batería que entrena contigo. Su estado de ánimo muestra cuánta carga le queda a tu reloj.'
      },
      momentumTags: {
        trending: '🔥 Tendencia Esta Semana',
        popular: '🏆 Popular y Ampliamente Usada',
        consistent: '💪 Usada Activamente',
        discovered: '📈 Recién Descubierta'
      },
      tooltips: {
        trending: {
          title: '🔥 Tendencia Esta Semana',
          message: 'Muchos atletas han elegido esta app recientemente, convirtiéndola en una de las más activas esta semana.',
          note: 'Basado en instalaciones semanales recientes.'
        },
        popular: {
          title: '🏆 Popular y Ampliamente Usada',
          message: 'Esta app tiene una gran audiencia a largo plazo y un fuerte uso semanal entre atletas.',
          note: 'Refleja tanto las instalaciones totales como los atletas activos.'
        },
        consistent: {
          title: '💪 Usada Activamente',
          message: 'Un grupo sólido de atletas está usando esta app esta semana.',
          note: 'Basado en usuarios activos de los últimos 7 días.'
        },
        discovered: {
          title: '📈 Recién Descubierta',
          message: 'Ganando nuevas instalaciones en los últimos 7 días.',
          note: 'Basado en instalaciones recientes.'
        }
      },
      metrics: {
        totalDownloads: 'Descargas totales:',
        installs7d: 'Instalaciones (7 días):',
        activeUsers: 'Usuarios activos (7 días):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — prueba gratis' },
        new:      { badge: { emoji: '✨', word: 'Lanzamiento', class: 'fresh'     }, headline: '✨ Nuevo lanzamiento' },
        installs: { badge: { emoji: '🔥', word: 'Tendencia',         class: 'trending'  }, headline: '🔥 Popular Esta Semana' },
        total:    { badge: { emoji: '🏆', word: 'Popular',           class: 'popular'   }, headline: '🏆 Favorito de Todos los Tiempos' },
        users:    { badge: { emoji: '💪', word: 'Constante',         class: 'consistent'}, headline: '💪 Los atletas siguen usándola' },
        spotlight:{ badge: { emoji: '⭐', word: 'Destacado',         class: 'trending'  }, headline: '⭐ Muchas instalaciones semanales' },
        topDataField: { badge: { emoji: '📊', word: 'Favorito', class: 'popular' }, headline: '📊 Campo de Datos Favorito' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Favorita', class: 'popular' }, headline: '⌚ Esfera Favorita' }
      }
    },

    fr: {
      headerSubtitle: 'Développé par M. Mendelson',
      navFeatured: 'À la une',
      navDataFields: 'Champs de données',
      navWatchFaces: 'Cadrans',
      navContact: 'Contact',
      navTracker: 'Suivi en Direct',
      navRun: 'Agrégateur de Course',
      searchPlaceholder: 'Rechercher des apps…',
      featuredDesc: 'Sélections fraîches et favoris — mis à jour avec des statistiques en direct.',
      dataFieldsDesc: 'Outils de performance pour le rythme, la prédiction et le suivi en direct.',
      watchFacesDesc: 'Cadrans créatifs aux concepts visuels distinctifs.',
      trackerWebDesc: 'Suivez des athlètes avec Garmin LiveTrack en temps réel : parcours en direct, métriques et votre position sur la carte. En un clic, Google Maps vous guide jusqu\'à l\'athlète.',
      trackerWebBtn: 'Ouvrir le Traceur →',
      runWebDesc: 'Trouvez vos prochaines courses en un seul endroit.',
      runWebBtn: "Ouvrir l'Agrégateur →",
      contactTitle: 'Contact',
      contactText: 'Questions, retours ou idées de fonctionnalités ? Je serais ravi de vous entendre.',
      contactBtn: 'Envoyer un e-mail',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'ESSAI GRATUIT',
      moreVersions: 'Plus de versions ▾',
      liteVersion: 'Version Lite',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Version Miles',
      payAlt: 'Essai gratuit et autres moyens de paiement ci-dessous',
      carouselPrev: 'App en vedette précédente',
      carouselNext: 'Prochaine app en vedette',
      seeDetails: 'Voir les détails',
      slideOf: 'Afficher la diapositive {n} sur {total}',
      viewApp: 'Voir {title}',
      langLabel: 'Langue',
      appDesc: {
        'Live Predictor Premium': 'Prédictions avancées en temps réel avec des configurations flexibles.',
        'Live Time Predictor': 'Prédictions de temps en direct pour des distances personnalisées.',
        'Pacer Data Field': 'Guidage du rythme en temps réel pour rester exactement dans les objectifs.',
        'Split Pacer Pro': "Ligne d'arrivée plus splits intermédiaires : allure requise en direct, ETA, avance/retard et progression du segment.",
        'Live Pace Speed Calculator': 'Allure ou vitesse requise pour des objectifs personnalisés.',
        'Tracker Data Field': 'Partagez votre activité en direct avec un identifiant de suivi unique.',
        'Route Silhouette': 'Affiche votre dernière activité Strava basée sur GPS sur votre montre.',
        'Premium Route Silhouette': 'Cadran premium : votre dernier parcours Strava avec complications et plusieurs arrière-plans.',
        'Time Across The Galaxy': "Cadran à thème cosmique inspiré d'une galaxie lointaine.",
        'Solve for X': "Résolvez un puzzle pour révéler l'heure.",
        'Football Matches': 'Les matchs de ton club sur le cadran : score en direct, minute et prochain match.',
        'Dynamic Hours': 'Un cadran analogique qui affiche l’heure au format 24 heures : 1 h et 13 h ne se ressemblent jamais.',
        'Volty': 'Un cadran animé avec Volty, une petite batterie qui s’entraîne avec vous. Son humeur indique la charge restante de votre montre.'
      },
      momentumTags: {
        trending: '🔥 Tendance Cette Semaine',
        popular: '🏆 Populaire et Largement Utilisée',
        consistent: '💪 Activement Utilisée',
        discovered: '📈 Nouvellement Découverte'
      },
      tooltips: {
        trending: {
          title: '🔥 Tendance Cette Semaine',
          message: "De nombreux athlètes ont choisi cette app récemment, en faisant l'un des choix les plus actifs cette semaine.",
          note: 'Basé sur les nouvelles installations hebdomadaires.'
        },
        popular: {
          title: '🏆 Populaire et Largement Utilisée',
          message: 'Cette app a un large public à long terme et une forte utilisation hebdomadaire parmi les athlètes.',
          note: 'Reflète à la fois les installations totales et les athlètes actifs.'
        },
        consistent: {
          title: '💪 Activement Utilisée',
          message: "Un groupe solide d'athlètes utilise cette app cette semaine.",
          note: 'Basé sur les utilisateurs actifs des 7 derniers jours.'
        },
        discovered: {
          title: '📈 Nouvellement Découverte',
          message: 'Gagne de nouvelles installations au cours des 7 derniers jours.',
          note: 'Basé sur les installations récentes.'
        }
      },
      metrics: {
        totalDownloads: 'Téléchargements totaux :',
        installs7d: 'Installations (7 jours) :',
        activeUsers: 'Utilisateurs actifs (7 jours) :'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — essai gratuit' },
        new:      { badge: { emoji: '✨', word: 'Lancement',  class: 'fresh'     }, headline: '✨ Nouveau lancement' },
        installs: { badge: { emoji: '🔥', word: 'Tendance',           class: 'trending'  }, headline: '🔥 Populaire Cette Semaine' },
        total:    { badge: { emoji: '🏆', word: 'Populaire',          class: 'popular'   }, headline: '🏆 Favori de Tous les Temps' },
        users:    { badge: { emoji: '💪', word: 'Régulier',           class: 'consistent'}, headline: "💪 Les athlètes continuent de l'utiliser" },
        spotlight:{ badge: { emoji: '⭐', word: 'En vedette',         class: 'trending'  }, headline: '⭐ Installations hebdomadaires élevées' },
        topDataField: { badge: { emoji: '📊', word: 'Favori', class: 'popular' }, headline: '📊 Champ de Données Favori' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Favori', class: 'popular' }, headline: '⌚ Cadran Favori' }
      }
    },

    pt: {
      headerSubtitle: 'Desenvolvido por M. Mendelson',
      navFeatured: 'Destaques',
      navDataFields: 'Campos de Dados',
      navWatchFaces: 'Mostrador',
      navContact: 'Contato',
      navTracker: 'Rastreador ao Vivo',
      navRun: 'Agregador de Corridas',
      searchPlaceholder: 'Buscar apps…',
      featuredDesc: 'Seleções recentes e favoritos da comunidade — atualizados com dados em tempo real.',
      dataFieldsDesc: 'Ferramentas de desempenho para ritmo, previsão e rastreamento ao vivo.',
      watchFacesDesc: 'Mostradores criativos com conceitos visuais distintos.',
      trackerWebDesc: 'Acompanhe atletas com Garmin LiveTrack em tempo real: rota ao vivo, métricas e sua localização no mapa. Com um clique, o Google Maps te guia até onde o atleta está.',
      trackerWebBtn: 'Abrir Rastreador →',
      runWebDesc: 'Encontre suas próximas corridas em um só lugar.',
      runWebBtn: 'Abrir Agregador →',
      contactTitle: 'Contato',
      contactText: 'Perguntas, feedback ou ideias de funcionalidades? Ficaria feliz em ouvir você.',
      contactBtn: 'Enviar email',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'TESTE GRÁTIS',
      moreVersions: 'Mais versões ▾',
      liteVersion: 'Versão Lite',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Versão em milhas',
      payAlt: 'Teste gratuito & formas de pagamento alternativas abaixo',
      carouselPrev: 'App em destaque anterior',
      carouselNext: 'Próximo app em destaque',
      seeDetails: 'Ver detalhes',
      slideOf: 'Mostrar slide {n} de {total}',
      viewApp: 'Ver {title}',
      langLabel: 'Idioma',
      appDesc: {
        'Live Predictor Premium': 'Previsões avançadas em tempo real com configurações flexíveis.',
        'Live Time Predictor': 'Previsões de tempo ao vivo para distâncias personalizadas.',
        'Pacer Data Field': 'Orientação de ritmo em tempo real para manter-se exatamente no objetivo.',
        'Split Pacer Pro': 'Linha de chegada mais parciais intermediárias: ritmo necessário ao vivo, ETA, à frente/atrás e progresso do segmento.',
        'Live Pace Speed Calculator': 'Ritmo ou velocidade necessária para objetivos personalizados.',
        'Tracker Data Field': 'Compartilhe sua atividade ao vivo com um ID de rastreamento único.',
        'Route Silhouette': 'Exibe sua última atividade do Strava baseada em GPS no seu relógio.',
        'Premium Route Silhouette': 'Mostrador premium: sua última rota do Strava com complicações e múltiplos fundos.',
        'Time Across The Galaxy': 'Mostrador com tema cósmico inspirado em uma galáxia distante.',
        'Solve for X': 'Resolva um puzzle para revelar a hora.',
        'Football Matches': 'Os jogos do seu time no mostrador: placar ao vivo, minuto e o próximo jogo.',
        'Dynamic Hours': 'Um mostrador analógico que exibe a hora no formato 24 horas, para que 1h e 13h nunca pareçam iguais.',
        'Volty': 'Um mostrador animado estrelado pelo Volty, uma pequena bateria que treina com você. O humor dele mostra quanta carga ainda resta no seu relógio.'
      },
      momentumTags: {
        trending: '🔥 Em Alta Esta Semana',
        popular: '🏆 Popular e Amplamente Usado',
        consistent: '💪 Usado Ativamente',
        discovered: '📈 Recém-Descoberto'
      },
      tooltips: {
        trending: {
          title: '🔥 Em Alta Esta Semana',
          message: 'Muitos atletas escolheram este app recentemente, tornando-o um dos mais ativos esta semana.',
          note: 'Com base em instalações semanais recentes.'
        },
        popular: {
          title: '🏆 Popular e Amplamente Usado',
          message: 'Este app tem um grande público de longo prazo e forte uso semanal entre atletas.',
          note: 'Reflete tanto as instalações totais quanto atletas ativos.'
        },
        consistent: {
          title: '💪 Usado Ativamente',
          message: 'Um grupo sólido de atletas está usando este app esta semana.',
          note: 'Com base em usuários ativos dos últimos 7 dias.'
        },
        discovered: {
          title: '📈 Recém-Descoberto',
          message: 'Ganhando novas instalações nos últimos 7 dias.',
          note: 'Com base em instalações recentes.'
        }
      },
      metrics: {
        totalDownloads: 'Downloads totais:',
        installs7d: 'Instalações (7 dias):',
        activeUsers: 'Usuários ativos (7 dias):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — teste grátis' },
        new:      { badge: { emoji: '✨', word: 'Lançamento', class: 'fresh'     }, headline: '✨ Novo lançamento' },
        installs: { badge: { emoji: '🔥', word: 'Em alta',         class: 'trending'  }, headline: '🔥 Popular Esta Semana' },
        total:    { badge: { emoji: '🏆', word: 'Popular',         class: 'popular'   }, headline: '🏆 Favorito de Todos os Tempos' },
        users:    { badge: { emoji: '💪', word: 'Consistente',     class: 'consistent'}, headline: '💪 Atletas continuam usando' },
        spotlight:{ badge: { emoji: '⭐', word: 'Destaque',        class: 'trending'  }, headline: '⭐ Muitas instalações semanais' },
        topDataField: { badge: { emoji: '📊', word: 'Favorito', class: 'popular' }, headline: '📊 Campo de Dados Favorito' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Favorito', class: 'popular' }, headline: '⌚ Mostrador Favorito' }
      }
    },
    it: {
      headerSubtitle: 'Sviluppato da M. Mendelson',
      navFeatured: 'In evidenza',
      navDataFields: 'Campi dati',
      navWatchFaces: 'Quadranti',
      navContact: 'Contatti',
      navTracker: 'Tracker live',
      navRun: 'Aggregatore gare',
      searchPlaceholder: 'Cerca app…',
      featuredDesc: 'Novità e preferiti della community — da statistiche aggiornate.',
      dataFieldsDesc: 'Strumenti per ritmo, previsioni e tracciamento in tempo reale.',
      watchFacesDesc: 'Quadranti originali con un carattere visivo distintivo.',
      trackerWebDesc: 'Segui gli atleti con Garmin LiveTrack in tempo reale: percorso, metriche e la tua posizione sulla mappa. Un tocco e Google Maps ti porta dove si trova l’atleta.',
      trackerWebBtn: 'Apri il tracker →',
      runWebDesc: 'Le tue prossime gare in un unico posto.',
      runWebBtn: 'Apri l’aggregatore →',
      contactTitle: 'Contatti',
      contactText: 'Domande, opinioni o idee? Mi fa piacere sentirti.',
      contactBtn: 'Invia una email',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'PROVA GRATUITA',
      moreVersions: 'Altre versioni ▾',
      liteVersion: 'Versione Lite',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Versione in miglia',
      payAlt: 'Prova gratuita e metodi di pagamento alternativi qui sotto',
      carouselPrev: 'App precedente',
      carouselNext: 'App successiva',
      seeDetails: 'Vedi i dettagli',
      slideOf: 'Mostra la slide {n} di {total}',
      viewApp: 'Apri {title}',
      langLabel: 'Lingua',
      appDesc: {
        'Live Predictor Premium': 'Previsioni avanzate in tempo reale, con configurazioni flessibili.',
        'Live Time Predictor': 'Previsioni di tempo dal vivo per distanze personalizzate.',
        'Pacer Data Field': 'Indicazioni di ritmo in tempo reale per restare sull’obiettivo.',
        'Split Pacer Pro': 'Traguardo e parziali: ritmo necessario, ETA, vantaggio/ritardo e avanzamento del segmento.',
        'Live Pace Speed Calculator': 'Il ritmo o la velocità necessari per il tuo obiettivo.',
        'Tracker Data Field': 'Condividi la tua attività dal vivo con un ID univoco.',
        'Route Silhouette': 'Mostra sull’orologio il tuo ultimo percorso GPS di Strava.',
        'Premium Route Silhouette': 'Quadrante premium: il tuo ultimo percorso Strava con complicazioni e più sfondi.',
        'Time Across The Galaxy': 'Quadrante a tema cosmico, ispirato a una galassia lontana.',
        'Solve for X': 'Risolvi un enigma per scoprire l’ora.',
        'Football Matches': 'Le partite della tua squadra sul quadrante: risultato in diretta, minuto e prossimo incontro.',
        'Dynamic Hours': 'Un quadrante analogico che mostra l’ora in formato 24 ore, così l’1 di notte e le 13 non sembrano mai uguali.',
        'Volty': 'Un quadrante animato con Volty, una piccola batteria che si allena con te. Il suo umore mostra quanta carica resta al tuo orologio.'
      },
      momentumTags: {
        trending: '🔥 Di tendenza questa settimana',
        popular: '🏆 Popolare e molto usata',
        consistent: '💪 Usata attivamente',
        discovered: '📈 Scoperta di recente'
      },
      tooltips: {
        trending: {
          title: '🔥 Di tendenza questa settimana',
          message: 'Molti atleti hanno scelto questa app di recente: una delle più attive della settimana.',
          note: 'In base alle installazioni della settimana.'
        },
        popular: {
          title: '🏆 Popolare e molto usata',
          message: 'Questa app ha un pubblico ampio e un uso settimanale solido.',
          note: 'Considera installazioni totali e atleti attivi.'
        },
        consistent: {
          title: '💪 Usata attivamente',
          message: 'Un gruppo solido di atleti la sta usando questa settimana.',
          note: 'In base agli utenti attivi degli ultimi 7 giorni.'
        },
        discovered: {
          title: '📈 Scoperta di recente',
          message: 'Sta guadagnando installazioni negli ultimi 7 giorni.',
          note: 'In base alle installazioni recenti.'
        }
      },
      metrics: {
        totalDownloads: 'Download totali:',
        installs7d: 'Installazioni (7 giorni):',
        activeUsers: 'Utenti attivi (7 giorni):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — prova gratuita' },
        new:      { badge: { emoji: '✨', word: 'Novità', class: 'fresh'     }, headline: '✨ Appena pubblicata' },
        installs: { badge: { emoji: '🔥', word: 'Di tendenza',    class: 'trending'  }, headline: '🔥 Popolare questa settimana' },
        total:    { badge: { emoji: '🏆', word: 'Popolare',       class: 'popular'   }, headline: '🏆 Preferita di sempre' },
        users:    { badge: { emoji: '💪', word: 'Costante',       class: 'consistent'}, headline: '💪 Gli atleti continuano a usarla' },
        spotlight:{ badge: { emoji: '⭐', word: 'In evidenza',    class: 'trending'  }, headline: '⭐ Molte installazioni settimanali' },
        topDataField: { badge: { emoji: '📊', word: 'Preferito', class: 'popular' }, headline: '📊 Campo dati preferito' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Preferito', class: 'popular' }, headline: '⌚ Quadrante preferito' }
      }
    },

    ru: {
      headerSubtitle: 'Разработано M. Mendelson',
      navFeatured: 'Избранное',
      navDataFields: 'Поля данных',
      navWatchFaces: 'Циферблаты',
      navContact: 'Контакты',
      navTracker: 'Живой трекер',
      navRun: 'Агрегатор забегов',
      searchPlaceholder: 'Поиск приложений…',
      featuredDesc: 'Новинки и выбор сообщества — по актуальной статистике.',
      dataFieldsDesc: 'Инструменты для темпа, прогноза и слежения в реальном времени.',
      watchFacesDesc: 'Оригинальные циферблаты с ярким визуальным характером.',
      trackerWebDesc: 'Следите за спортсменами через Garmin LiveTrack в реальном времени: маршрут, показатели и ваше положение на карте. Одно нажатие — и Google Maps ведёт вас к спортсмену.',
      trackerWebBtn: 'Открыть трекер →',
      runWebDesc: 'Все ближайшие забеги в одном месте.',
      runWebBtn: 'Открыть агрегатор →',
      contactTitle: 'Контакты',
      contactText: 'Вопросы, отзывы или идеи? Буду рад услышать.',
      contactBtn: 'Написать письмо',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'БЕСПЛАТНЫЙ ПЕРИОД',
      moreVersions: 'Другие версии ▾',
      liteVersion: 'Версия Lite',
      mirrorB: 'Зеркало B',
      mirrorC: 'Зеркало C',
      milesVersion: 'Версия в милях',
      payAlt: 'Бесплатный период и другие способы оплаты ниже',
      carouselPrev: 'Предыдущее приложение',
      carouselNext: 'Следующее приложение',
      seeDetails: 'Подробнее',
      slideOf: 'Показать слайд {n} из {total}',
      viewApp: 'Открыть {title}',
      langLabel: 'Язык',
      appDesc: {
        'Live Predictor Premium': 'Продвинутые прогнозы в реальном времени с гибкой настройкой.',
        'Live Time Predictor': 'Прогноз времени для произвольных дистанций.',
        'Pacer Data Field': 'Подсказки по темпу, чтобы точно держать цель.',
        'Split Pacer Pro': 'Финиш и промежуточные отсечки: нужный темп, ETA, отставание и прогресс отрезка.',
        'Live Pace Speed Calculator': 'Нужный темп или скорость для вашей цели.',
        'Tracker Data Field': 'Делитесь тренировкой вживую по уникальному ID.',
        'Route Silhouette': 'Показывает ваш последний GPS-маршрут из Strava на часах.',
        'Premium Route Silhouette': 'Премиум-циферблат: последний маршрут Strava, дополнительные показатели и несколько фонов.',
        'Time Across The Galaxy': 'Космический циферблат, вдохновлённый далёкой галактикой.',
        'Solve for X': 'Решите задачу, чтобы узнать время.',
        'Football Matches': 'Матчи вашей команды на циферблате: счёт в реальном времени, минута и следующая игра.',
        'Dynamic Hours': 'Аналоговый циферблат в 24-часовом формате: час ночи и час дня никогда не выглядят одинаково.',
        'Volty': 'Анимированный циферблат с Volty — маленькой батарейкой, которая тренируется вместе с вами. Её настроение показывает, сколько заряда осталось в часах.'
      },
      momentumTags: {
        trending: '🔥 В тренде на этой неделе',
        popular: '🏆 Популярно и широко используется',
        consistent: '💪 Активно используется',
        discovered: '📈 Набирает популярность'
      },
      tooltips: {
        trending: {
          title: '🔥 В тренде на этой неделе',
          message: 'Многие спортсмены выбрали это приложение недавно — один из самых активных выборов недели.',
          note: 'По установкам за неделю.'
        },
        popular: {
          title: '🏆 Популярно и широко используется',
          message: 'У приложения большая аудитория и высокая недельная активность.',
          note: 'С учётом всех установок и активных спортсменов.'
        },
        consistent: {
          title: '💪 Активно используется',
          message: 'На этой неделе приложением пользуется устойчивая группа спортсменов.',
          note: 'По активным пользователям за 7 дней.'
        },
        discovered: {
          title: '📈 Набирает популярность',
          message: 'Новые установки за последние 7 дней.',
          note: 'По недавним установкам.'
        }
      },
      metrics: {
        totalDownloads: 'Всего загрузок:',
        installs7d: 'Установки (7 дней):',
        activeUsers: 'Активные пользователи (7 дней):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Премиум', class: 'premium'   }, headline: '💎 Премиум — бесплатный период' },
        new:      { badge: { emoji: '✨', word: 'Новинка', class: 'fresh'     }, headline: '✨ Новый релиз' },
        installs: { badge: { emoji: '🔥', word: 'В тренде',       class: 'trending'  }, headline: '🔥 Популярно на этой неделе' },
        total:    { badge: { emoji: '🏆', word: 'Популярное',     class: 'popular'   }, headline: '🏆 Фаворит всех времён' },
        users:    { badge: { emoji: '💪', word: 'Стабильное',     class: 'consistent'}, headline: '💪 Спортсмены продолжают пользоваться' },
        spotlight:{ badge: { emoji: '⭐', word: 'Избранное',      class: 'trending'  }, headline: '⭐ Много установок за неделю' },
        topDataField: { badge: { emoji: '📊', word: 'Фаворит', class: 'popular' }, headline: '📊 Любимое поле данных' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Фаворит', class: 'popular' }, headline: '⌚ Любимый циферблат' }
      }
    },

    nl: {
      headerSubtitle: 'Ontwikkeld door M. Mendelson',
      navFeatured: 'Uitgelicht',
      navDataFields: 'Gegevensvelden',
      navWatchFaces: 'Wijzerplaten',
      navContact: 'Contact',
      navTracker: 'Live Tracker',
      navRun: 'Hardloopkalender',
      searchPlaceholder: 'Apps zoeken…',
      featuredDesc: 'Nieuwe keuzes en publieksfavorieten — bijgewerkt met live statistieken.',
      dataFieldsDesc: 'Prestatietools voor tempo, voorspelling en live tracking.',
      watchFacesDesc: 'Creatieve wijzerplaten met uitgesproken visuele concepten.',
      trackerWebDesc: 'Volg atleten live met Garmin LiveTrack: live route, statistieken en jouw locatie op de kaart. Eén tik en Google Maps leidt je naar de atleet.',
      trackerWebBtn: 'Tracker openen →',
      runWebDesc: 'Vind je volgende wedstrijden op één plek.',
      runWebBtn: 'Kalender openen →',
      contactTitle: 'Contact',
      contactText: 'Vragen, feedback of ideeën voor functies? Ik hoor graag van je.',
      contactBtn: 'E-mail sturen',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'GRATIS PROBEREN',
      moreVersions: 'Meer versies ▾',
      liteVersion: 'Lite-versie',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Mijlenversie',
      payAlt: 'Gratis proberen en andere betaalmethoden hieronder',
      carouselPrev: 'Vorige uitgelichte app',
      carouselNext: 'Volgende uitgelichte app',
      seeDetails: 'Details bekijken',
      slideOf: 'Dia {n} van {total} tonen',
      viewApp: '{title} bekijken',
      langLabel: 'Taal',
      appDesc: {
        'Live Predictor Premium': 'Geavanceerde realtime voorspellingen met flexibele instellingen.',
        'Live Time Predictor': 'Live tijdvoorspellingen voor zelfgekozen afstanden.',
        'Pacer Data Field': 'Realtime tempobegeleiding om precies op schema te blijven.',
        'Split Pacer Pro': 'Finish plus tussentijden: live benodigd tempo, verwachte aankomst, voor/achter en voortgang per segment.',
        'Live Pace Speed Calculator': 'Benodigd tempo of snelheid voor je eigen doelen.',
        'Tracker Data Field': 'Deel je activiteit live met een unieke tracker-ID.',
        'Route Silhouette': 'Toont je laatste GPS-activiteit van Strava op je horloge.',
        'Premium Route Silhouette': 'Premium wijzerplaat: je laatste Strava-route met complicaties en meerdere achtergronden.',
        'Time Across The Galaxy': 'Kosmische wijzerplaat, geïnspireerd door een sterrenstelsel ver, ver weg.',
        'Solve for X': 'Los een puzzel op om de tijd te onthullen.',
        'Football Matches': 'De wedstrijden van je club op de wijzerplaat: live stand, speelminuut en de volgende wedstrijd.',
        'Dynamic Hours': 'Een analoge wijzerplaat die de tijd in 24-uursnotatie toont, zodat 1 uur ’s nachts en 13 uur er nooit hetzelfde uitzien.',
        'Volty': 'Een geanimeerde wijzerplaat met Volty, een kleine batterij die met je meetraint. Zijn humeur laat zien hoeveel lading je horloge nog heeft.'
      },
      momentumTags: {
        trending: '🔥 Trending deze week',
        popular: '🏆 Populair en veel gebruikt',
        consistent: '💪 Actief gebruikt',
        discovered: '📈 Net ontdekt'
      },
      tooltips: {
        trending: {
          title: '🔥 Trending deze week',
          message: 'Veel atleten hebben deze app onlangs gekozen, waardoor hij deze week een van de meest actieve keuzes is.',
          note: 'Gebaseerd op recente wekelijkse installaties.'
        },
        popular: {
          title: '🏆 Populair en veel gebruikt',
          message: 'Deze app heeft een groot vast publiek en wordt wekelijks veel gebruikt door atleten.',
          note: 'Weerspiegelt zowel het totaal aantal installaties als actieve atleten.'
        },
        consistent: {
          title: '💪 Actief gebruikt',
          message: 'Een flinke groep atleten gebruikt deze app deze week.',
          note: 'Gebaseerd op actieve gebruikers in de afgelopen 7 dagen.'
        },
        discovered: {
          title: '📈 Net ontdekt',
          message: 'Krijgt nieuwe installaties in de afgelopen 7 dagen.',
          note: 'Gebaseerd op recente installaties.'
        }
      },
      metrics: {
        totalDownloads: 'Totaal aantal downloads:',
        installs7d: 'Installaties (7 dagen):',
        activeUsers: 'Actieve gebruikers (7 dagen):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — gratis proberen' },
        new:      { badge: { emoji: '✨', word: 'Nieuw', class: 'fresh'     }, headline: '✨ Net verschenen' },
        installs: { badge: { emoji: '🔥', word: 'Trending', class: 'trending'  }, headline: '🔥 Populair deze week' },
        total:    { badge: { emoji: '🏆', word: 'Populair', class: 'popular'   }, headline: '🏆 Favoriet aller tijden' },
        users:    { badge: { emoji: '💪', word: 'Constant', class: 'consistent'}, headline: '💪 Atleten blijven hem gebruiken' },
        spotlight:{ badge: { emoji: '⭐', word: 'Uitgelicht', class: 'trending'  }, headline: '⭐ Veel installaties per week' },
        topDataField: { badge: { emoji: '📊', word: 'Favoriet', class: 'popular' }, headline: '📊 Favoriet gegevensveld' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Favoriet', class: 'popular' }, headline: '⌚ Favoriete wijzerplaat' }
      }
    },

    'pt-pt': {
      headerSubtitle: 'Desenvolvido por M. Mendelson',
      navFeatured: 'Destaques',
      navDataFields: 'Campos de Dados',
      navWatchFaces: 'Mostradores',
      navContact: 'Contacto',
      navTracker: 'Seguimento ao Vivo',
      navRun: 'Calendário de Corridas',
      searchPlaceholder: 'Pesquisar apps…',
      featuredDesc: 'Escolhas recentes e favoritos da comunidade — atualizados com estatísticas em tempo real.',
      dataFieldsDesc: 'Ferramentas de desempenho para ritmo, previsão e seguimento ao vivo.',
      watchFacesDesc: 'Mostradores criativos com conceitos visuais distintos.',
      trackerWebDesc: 'Acompanhe atletas com o Garmin LiveTrack em tempo real: percurso ao vivo, métricas e a sua localização no mapa. Com um toque, o Google Maps leva-o até ao atleta.',
      trackerWebBtn: 'Abrir Seguimento →',
      runWebDesc: 'Encontre as suas próximas corridas num só lugar.',
      runWebBtn: 'Abrir Calendário →',
      contactTitle: 'Contacto',
      contactText: 'Perguntas, sugestões ou ideias de funcionalidades? Terei todo o gosto em ouvi-lo.',
      contactBtn: 'Enviar email',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'TESTE GRÁTIS',
      moreVersions: 'Mais versões ▾',
      liteVersion: 'Versão Lite',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Versão em milhas',
      payAlt: 'Teste gratuito e formas de pagamento alternativas abaixo',
      carouselPrev: 'App em destaque anterior',
      carouselNext: 'App em destaque seguinte',
      seeDetails: 'Ver detalhes',
      slideOf: 'Mostrar diapositivo {n} de {total}',
      viewApp: 'Ver {title}',
      langLabel: 'Idioma',
      appDesc: {
        'Live Predictor Premium': 'Previsões avançadas em tempo real com configurações flexíveis.',
        'Live Time Predictor': 'Previsões de tempo ao vivo para distâncias personalizadas.',
        'Pacer Data Field': 'Orientação de ritmo em tempo real para se manter exatamente no objetivo.',
        'Split Pacer Pro': 'Meta mais parciais intermédias: ritmo necessário ao vivo, hora prevista de chegada, avanço/atraso e progresso do segmento.',
        'Live Pace Speed Calculator': 'Ritmo ou velocidade necessários para objetivos personalizados.',
        'Tracker Data Field': 'Partilhe a sua atividade ao vivo com um ID de seguimento único.',
        'Route Silhouette': 'Mostra no relógio a sua última atividade do Strava com GPS.',
        'Premium Route Silhouette': 'Mostrador premium: o seu último percurso do Strava com complicações e vários fundos.',
        'Time Across The Galaxy': 'Mostrador de tema cósmico inspirado numa galáxia muito, muito distante.',
        'Solve for X': 'Resolva um enigma para revelar as horas.',
        'Football Matches': 'Os jogos do seu clube no mostrador: resultado ao vivo, minuto de jogo e o próximo jogo.',
        'Dynamic Hours': 'Um mostrador analógico que mostra as horas no formato de 24 horas, para que a 1h e as 13h nunca pareçam iguais.',
        'Volty': 'Um mostrador animado protagonizado pelo Volty, uma pequena bateria que treina consigo. O humor dele mostra quanta carga ainda resta no relógio.'
      },
      momentumTags: {
        trending: '🔥 Em Destaque Esta Semana',
        popular: '🏆 Popular e Muito Utilizado',
        consistent: '💪 Utilizado Ativamente',
        discovered: '📈 Descoberto Recentemente'
      },
      tooltips: {
        trending: {
          title: '🔥 Em Destaque Esta Semana',
          message: 'Muitos atletas escolheram esta app recentemente, o que a torna uma das escolhas mais ativas desta semana.',
          note: 'Com base em instalações semanais recentes.'
        },
        popular: {
          title: '🏆 Popular e Muito Utilizado',
          message: 'Esta app tem um grande público de longa data e uma forte utilização semanal entre atletas.',
          note: 'Reflete tanto as instalações totais como os atletas ativos.'
        },
        consistent: {
          title: '💪 Utilizado Ativamente',
          message: 'Um grupo sólido de atletas está a utilizar esta app esta semana.',
          note: 'Com base nos utilizadores ativos dos últimos 7 dias.'
        },
        discovered: {
          title: '📈 Descoberto Recentemente',
          message: 'A ganhar novas instalações nos últimos 7 dias.',
          note: 'Com base em instalações recentes.'
        }
      },
      metrics: {
        totalDownloads: 'Transferências totais:',
        installs7d: 'Instalações (7 dias):',
        activeUsers: 'Utilizadores ativos (7 dias):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — teste grátis' },
        new:      { badge: { emoji: '✨', word: 'Novidade', class: 'fresh'     }, headline: '✨ Acabado de lançar' },
        installs: { badge: { emoji: '🔥', word: 'Em alta', class: 'trending'  }, headline: '🔥 Popular Esta Semana' },
        total:    { badge: { emoji: '🏆', word: 'Popular', class: 'popular'   }, headline: '🏆 Favorito de Sempre' },
        users:    { badge: { emoji: '💪', word: 'Consistente', class: 'consistent'}, headline: '💪 Os atletas continuam a usá-la' },
        spotlight:{ badge: { emoji: '⭐', word: 'Destaque', class: 'trending'  }, headline: '⭐ Muitas instalações semanais' },
        topDataField: { badge: { emoji: '📊', word: 'Favorito', class: 'popular' }, headline: '📊 Campo de Dados Favorito' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Favorito', class: 'popular' }, headline: '⌚ Mostrador Favorito' }
      }
    },

    pl: {
      headerSubtitle: 'Autor: M. Mendelson',
      navFeatured: 'Polecane',
      navDataFields: 'Pola danych',
      navWatchFaces: 'Tarcze zegarka',
      navContact: 'Kontakt',
      navTracker: 'Śledzenie na żywo',
      navRun: 'Kalendarz biegów',
      searchPlaceholder: 'Szukaj aplikacji…',
      featuredDesc: 'Nowości i ulubieńcy społeczności — aktualizowane na podstawie bieżących statystyk.',
      dataFieldsDesc: 'Narzędzia do tempa, prognoz i śledzenia na żywo.',
      watchFacesDesc: 'Kreatywne tarcze zegarka o wyrazistych koncepcjach wizualnych.',
      trackerWebDesc: 'Śledź sportowców w czasie rzeczywistym z Garmin LiveTrack: trasa na żywo, statystyki i Twoja pozycja na mapie. Jedno dotknięcie, a Mapy Google poprowadzą Cię do sportowca.',
      trackerWebBtn: 'Otwórz tracker →',
      runWebDesc: 'Znajdź swoje kolejne biegi w jednym miejscu.',
      runWebBtn: 'Otwórz kalendarz →',
      contactTitle: 'Kontakt',
      contactText: 'Pytania, opinie lub pomysły na funkcje? Chętnie się z Tobą skontaktuję.',
      contactBtn: 'Wyślij e-mail',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'WYPRÓBUJ ZA DARMO',
      moreVersions: 'Więcej wersji ▾',
      liteVersion: 'Wersja Lite',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Wersja w milach',
      payAlt: 'Darmowy okres próbny i inne metody płatności poniżej',
      carouselPrev: 'Poprzednia polecana aplikacja',
      carouselNext: 'Następna polecana aplikacja',
      seeDetails: 'Zobacz szczegóły',
      slideOf: 'Pokaż slajd {n} z {total}',
      viewApp: 'Zobacz {title}',
      langLabel: 'Język',
      appDesc: {
        'Live Predictor Premium': 'Zaawansowane prognozy w czasie rzeczywistym z elastyczną konfiguracją.',
        'Live Time Predictor': 'Prognoza czasu na żywo dla własnych dystansów.',
        'Pacer Data Field': 'Wskazówki tempa w czasie rzeczywistym, by trzymać się dokładnie celu.',
        'Split Pacer Pro': 'Meta i międzyczasy: wymagane tempo na żywo, przewidywany czas dotarcia, przewaga/strata i postęp odcinka.',
        'Live Pace Speed Calculator': 'Wymagane tempo lub prędkość dla własnych celów.',
        'Tracker Data Field': 'Udostępniaj swoją aktywność na żywo z unikalnym identyfikatorem.',
        'Route Silhouette': 'Pokazuje na zegarku Twoją ostatnią aktywność GPS ze Stravy.',
        'Premium Route Silhouette': 'Tarcza premium: Twoja ostatnia trasa ze Stravy z komplikacjami i wieloma tłami.',
        'Time Across The Galaxy': 'Kosmiczna tarcza inspirowana odległą galaktyką.',
        'Solve for X': 'Rozwiąż zagadkę, aby odkryć godzinę.',
        'Football Matches': 'Mecze Twojego klubu na tarczy: wynik na żywo, minuta meczu i najbliższe spotkanie.',
        'Dynamic Hours': 'Analogowa tarcza w formacie 24-godzinnym — 1:00 w nocy i 13:00 nigdy nie wyglądają tak samo.',
        'Volty': 'Animowana tarcza z Voltym, małą baterią, która trenuje razem z Tobą. Jego nastrój pokazuje, ile energii zostało w zegarku.'
      },
      momentumTags: {
        trending: '🔥 Popularne w tym tygodniu',
        popular: '🏆 Popularne i powszechnie używane',
        consistent: '💪 Aktywnie używane',
        discovered: '📈 Nowo odkryte'
      },
      tooltips: {
        trending: {
          title: '🔥 Popularne w tym tygodniu',
          message: 'Wielu sportowców wybrało ostatnio tę aplikację — to jeden z najaktywniejszych wyborów tego tygodnia.',
          note: 'Na podstawie świeżych tygodniowych instalacji.'
        },
        popular: {
          title: '🏆 Popularne i powszechnie używane',
          message: 'Ta aplikacja ma dużą, stałą grupę odbiorców i jest intensywnie używana co tydzień.',
          note: 'Uwzględnia łączną liczbę instalacji i aktywnych sportowców.'
        },
        consistent: {
          title: '💪 Aktywnie używane',
          message: 'Spora grupa sportowców korzysta z tej aplikacji w tym tygodniu.',
          note: 'Na podstawie aktywnych użytkowników z ostatnich 7 dni.'
        },
        discovered: {
          title: '📈 Nowo odkryte',
          message: 'Zyskuje nowe instalacje w ciągu ostatnich 7 dni.',
          note: 'Na podstawie ostatnich instalacji.'
        }
      },
      metrics: {
        totalDownloads: 'Łącznie pobrań:',
        installs7d: 'Instalacje (7 dni):',
        activeUsers: 'Aktywni użytkownicy (7 dni):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — darmowy okres próbny' },
        new:      { badge: { emoji: '✨', word: 'Nowość', class: 'fresh'     }, headline: '✨ Świeża premiera' },
        installs: { badge: { emoji: '🔥', word: 'Na czasie', class: 'trending'  }, headline: '🔥 Popularne w tym tygodniu' },
        total:    { badge: { emoji: '🏆', word: 'Popularne', class: 'popular'   }, headline: '🏆 Ulubieniec wszech czasów' },
        users:    { badge: { emoji: '💪', word: 'Stałe', class: 'consistent'}, headline: '💪 Sportowcy wciąż z niej korzystają' },
        spotlight:{ badge: { emoji: '⭐', word: 'Polecane', class: 'trending'  }, headline: '⭐ Dużo instalacji w tygodniu' },
        topDataField: { badge: { emoji: '📊', word: 'Ulubione', class: 'popular' }, headline: '📊 Ulubione pole danych' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Ulubione', class: 'popular' }, headline: '⌚ Ulubiona tarcza' }
      }
    },

    cs: {
      headerSubtitle: 'Vyvíjí M. Mendelson',
      navFeatured: 'Doporučené',
      navDataFields: 'Datová pole',
      navWatchFaces: 'Ciferníky',
      navContact: 'Kontakt',
      navTracker: 'Živé sledování',
      navRun: 'Kalendář běhů',
      searchPlaceholder: 'Hledat aplikace…',
      featuredDesc: 'Čerstvé tipy a oblíbené aplikace — aktualizované podle živých statistik.',
      dataFieldsDesc: 'Nástroje pro tempo, předpovědi a živé sledování.',
      watchFacesDesc: 'Kreativní ciferníky s výrazným vizuálním pojetím.',
      trackerWebDesc: 'Sledujte sportovce v reálném čase přes Garmin LiveTrack: živá trasa, metriky a vaše poloha na mapě. Jedním klepnutím vás Mapy Google navedou ke sportovci.',
      trackerWebBtn: 'Otevřít sledování →',
      runWebDesc: 'Najděte své další závody na jednom místě.',
      runWebBtn: 'Otevřít kalendář →',
      contactTitle: 'Kontakt',
      contactText: 'Dotazy, zpětná vazba nebo nápady na funkce? Rád se ozvu.',
      contactBtn: 'Poslat e-mail',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'ZKUŠEBNÍ VERZE ZDARMA',
      moreVersions: 'Další verze ▾',
      liteVersion: 'Verze Lite',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Verze v mílích',
      payAlt: 'Zkušební verze zdarma a další způsoby platby níže',
      carouselPrev: 'Předchozí doporučená aplikace',
      carouselNext: 'Další doporučená aplikace',
      seeDetails: 'Zobrazit podrobnosti',
      slideOf: 'Zobrazit snímek {n} z {total}',
      viewApp: 'Zobrazit {title}',
      langLabel: 'Jazyk',
      appDesc: {
        'Live Predictor Premium': 'Pokročilé předpovědi v reálném čase s flexibilním nastavením.',
        'Live Time Predictor': 'Živá předpověď času pro vlastní vzdálenosti.',
        'Pacer Data Field': 'Navádění tempa v reálném čase, abyste drželi přesně cíl.',
        'Split Pacer Pro': 'Cíl i mezičasy: potřebné tempo naživo, odhadovaný čas doběhu, náskok/ztráta a postup úsekem.',
        'Live Pace Speed Calculator': 'Potřebné tempo nebo rychlost pro vlastní cíle.',
        'Tracker Data Field': 'Sdílejte svou aktivitu naživo s jedinečným ID sledování.',
        'Route Silhouette': 'Zobrazí na hodinkách vaši poslední GPS aktivitu ze Stravy.',
        'Premium Route Silhouette': 'Prémiový ciferník: vaše poslední trasa ze Stravy s komplikacemi a více pozadími.',
        'Time Across The Galaxy': 'Kosmický ciferník inspirovaný předalekou galaxií.',
        'Solve for X': 'Vyřešte hádanku a odhalte čas.',
        'Football Matches': 'Zápasy vašeho klubu na ciferníku: živé skóre, minuta zápasu a další utkání.',
        'Dynamic Hours': 'Analogový ciferník s časem ve 24hodinovém formátu — 1 hodina v noci a 13 hodin nikdy nevypadají stejně.',
        'Volty': 'Animovaný ciferník s Voltym, malou baterkou, která trénuje s vámi. Jeho nálada ukazuje, kolik energie vašim hodinkám zbývá.'
      },
      momentumTags: {
        trending: '🔥 Tento týden v kurzu',
        popular: '🏆 Oblíbené a hojně používané',
        consistent: '💪 Aktivně používané',
        discovered: '📈 Nově objevené'
      },
      tooltips: {
        trending: {
          title: '🔥 Tento týden v kurzu',
          message: 'Mnoho sportovců si tuto aplikaci nedávno vybralo, takže patří k nejaktivnějším volbám tohoto týdne.',
          note: 'Podle čerstvých týdenních instalací.'
        },
        popular: {
          title: '🏆 Oblíbené a hojně používané',
          message: 'Tato aplikace má velkou dlouhodobou základnu a silné týdenní využití mezi sportovci.',
          note: 'Zohledňuje celkové instalace i aktivní sportovce.'
        },
        consistent: {
          title: '💪 Aktivně používané',
          message: 'Tento týden aplikaci používá solidní skupina sportovců.',
          note: 'Podle aktivních uživatelů za posledních 7 dní.'
        },
        discovered: {
          title: '📈 Nově objevené',
          message: 'Získává nové instalace za posledních 7 dní.',
          note: 'Podle nedávných instalací.'
        }
      },
      metrics: {
        totalDownloads: 'Celkem stažení:',
        installs7d: 'Instalace (7 dní):',
        activeUsers: 'Aktivní uživatelé (7 dní):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — zkušební verze zdarma' },
        new:      { badge: { emoji: '✨', word: 'Novinka', class: 'fresh'     }, headline: '✨ Právě vydáno' },
        installs: { badge: { emoji: '🔥', word: 'V kurzu', class: 'trending'  }, headline: '🔥 Oblíbené tento týden' },
        total:    { badge: { emoji: '🏆', word: 'Oblíbené', class: 'popular'   }, headline: '🏆 Oblíbenec všech dob' },
        users:    { badge: { emoji: '💪', word: 'Stálice', class: 'consistent'}, headline: '💪 Sportovci ji stále používají' },
        spotlight:{ badge: { emoji: '⭐', word: 'Doporučené', class: 'trending'  }, headline: '⭐ Hodně instalací za týden' },
        topDataField: { badge: { emoji: '📊', word: 'Oblíbené', class: 'popular' }, headline: '📊 Oblíbené datové pole' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Oblíbený', class: 'popular' }, headline: '⌚ Oblíbený ciferník' }
      }
    },

    sk: {
      headerSubtitle: 'Vyvíja M. Mendelson',
      navFeatured: 'Odporúčané',
      navDataFields: 'Dátové polia',
      navWatchFaces: 'Ciferníky',
      navContact: 'Kontakt',
      navTracker: 'Živé sledovanie',
      navRun: 'Kalendár behov',
      searchPlaceholder: 'Hľadať aplikácie…',
      featuredDesc: 'Čerstvé tipy a obľúbené aplikácie — aktualizované podľa živých štatistík.',
      dataFieldsDesc: 'Nástroje na tempo, predpovede a živé sledovanie.',
      watchFacesDesc: 'Kreatívne ciferníky s výrazným vizuálnym poňatím.',
      trackerWebDesc: 'Sledujte športovcov v reálnom čase cez Garmin LiveTrack: živá trasa, metriky a vaša poloha na mape. Jedným ťuknutím vás Mapy Google navedú k športovcovi.',
      trackerWebBtn: 'Otvoriť sledovanie →',
      runWebDesc: 'Nájdite svoje ďalšie preteky na jednom mieste.',
      runWebBtn: 'Otvoriť kalendár →',
      contactTitle: 'Kontakt',
      contactText: 'Otázky, spätná väzba alebo nápady na funkcie? Rád sa vám ozvem.',
      contactBtn: 'Poslať e-mail',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'SKÚŠOBNÁ VERZIA ZDARMA',
      moreVersions: 'Ďalšie verzie ▾',
      liteVersion: 'Verzia Lite',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Verzia v míľach',
      payAlt: 'Skúšobná verzia zdarma a ďalšie spôsoby platby nižšie',
      carouselPrev: 'Predchádzajúca odporúčaná aplikácia',
      carouselNext: 'Ďalšia odporúčaná aplikácia',
      seeDetails: 'Zobraziť podrobnosti',
      slideOf: 'Zobraziť snímku {n} z {total}',
      viewApp: 'Zobraziť {title}',
      langLabel: 'Jazyk',
      appDesc: {
        'Live Predictor Premium': 'Pokročilé predpovede v reálnom čase s flexibilným nastavením.',
        'Live Time Predictor': 'Živá predpoveď času pre vlastné vzdialenosti.',
        'Pacer Data Field': 'Navádzanie tempa v reálnom čase, aby ste držali presne cieľ.',
        'Split Pacer Pro': 'Cieľ aj medzičasy: potrebné tempo naživo, odhadovaný čas dobehu, náskok/strata a postup úsekom.',
        'Live Pace Speed Calculator': 'Potrebné tempo alebo rýchlosť pre vlastné ciele.',
        'Tracker Data Field': 'Zdieľajte svoju aktivitu naživo s jedinečným ID sledovania.',
        'Route Silhouette': 'Zobrazí na hodinkách vašu poslednú GPS aktivitu zo Stravy.',
        'Premium Route Silhouette': 'Prémiový ciferník: vaša posledná trasa zo Stravy s komplikáciami a viacerými pozadiami.',
        'Time Across The Galaxy': 'Kozmický ciferník inšpirovaný ďalekou galaxiou.',
        'Solve for X': 'Vyriešte hádanku a odhaľte čas.',
        'Football Matches': 'Zápasy vášho klubu na ciferníku: živé skóre, minúta zápasu a ďalší zápas.',
        'Dynamic Hours': 'Analógový ciferník s časom v 24-hodinovom formáte — 1 hodina v noci a 13 hodín nikdy nevyzerajú rovnako.',
        'Volty': 'Animovaný ciferník s Voltym, malou batériou, ktorá trénuje s vami. Jeho nálada ukazuje, koľko energie hodinkám zostáva.'
      },
      momentumTags: {
        trending: '🔥 Tento týždeň v kurze',
        popular: '🏆 Obľúbené a hojne používané',
        consistent: '💪 Aktívne používané',
        discovered: '📈 Novoobjavené'
      },
      tooltips: {
        trending: {
          title: '🔥 Tento týždeň v kurze',
          message: 'Mnoho športovcov si túto aplikáciu nedávno vybralo, takže patrí k najaktívnejším voľbám tohto týždňa.',
          note: 'Podľa čerstvých týždenných inštalácií.'
        },
        popular: {
          title: '🏆 Obľúbené a hojne používané',
          message: 'Táto aplikácia má veľkú dlhodobú základňu a silné týždenné využitie medzi športovcami.',
          note: 'Zohľadňuje celkové inštalácie aj aktívnych športovcov.'
        },
        consistent: {
          title: '💪 Aktívne používané',
          message: 'Tento týždeň aplikáciu používa solídna skupina športovcov.',
          note: 'Podľa aktívnych používateľov za posledných 7 dní.'
        },
        discovered: {
          title: '📈 Novoobjavené',
          message: 'Získava nové inštalácie za posledných 7 dní.',
          note: 'Podľa nedávnych inštalácií.'
        }
      },
      metrics: {
        totalDownloads: 'Celkom stiahnutí:',
        installs7d: 'Inštalácie (7 dní):',
        activeUsers: 'Aktívni používatelia (7 dní):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — skúšobná verzia zdarma' },
        new:      { badge: { emoji: '✨', word: 'Novinka', class: 'fresh'     }, headline: '✨ Práve vydané' },
        installs: { badge: { emoji: '🔥', word: 'V kurze', class: 'trending'  }, headline: '🔥 Obľúbené tento týždeň' },
        total:    { badge: { emoji: '🏆', word: 'Obľúbené', class: 'popular'   }, headline: '🏆 Obľúbenec všetkých čias' },
        users:    { badge: { emoji: '💪', word: 'Stálica', class: 'consistent'}, headline: '💪 Športovci ju stále používajú' },
        spotlight:{ badge: { emoji: '⭐', word: 'Odporúčané', class: 'trending'  }, headline: '⭐ Veľa inštalácií za týždeň' },
        topDataField: { badge: { emoji: '📊', word: 'Obľúbené', class: 'popular' }, headline: '📊 Obľúbené dátové pole' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Obľúbený', class: 'popular' }, headline: '⌚ Obľúbený ciferník' }
      }
    },

    sl: {
      headerSubtitle: 'Razvija M. Mendelson',
      navFeatured: 'Izpostavljeno',
      navDataFields: 'Podatkovna polja',
      navWatchFaces: 'Številčnice',
      navContact: 'Stik',
      navTracker: 'Sledenje v živo',
      navRun: 'Koledar tekov',
      searchPlaceholder: 'Išči aplikacije…',
      featuredDesc: 'Sveže izbire in priljubljene aplikacije — posodobljeno s statistiko v živo.',
      dataFieldsDesc: 'Orodja za tempo, napovedi in sledenje v živo.',
      watchFacesDesc: 'Ustvarjalne številčnice z izrazitimi vizualnimi zasnovami.',
      trackerWebDesc: 'Spremljajte športnike v realnem času z Garmin LiveTrack: pot v živo, meritve in vaša lokacija na zemljevidu. En dotik in Google Zemljevidi vas pripeljejo do športnika.',
      trackerWebBtn: 'Odpri sledenje →',
      runWebDesc: 'Poiščite svoje naslednje teke na enem mestu.',
      runWebBtn: 'Odpri koledar →',
      contactTitle: 'Stik',
      contactText: 'Vprašanja, povratne informacije ali ideje za funkcije? Z veseljem vam odgovorim.',
      contactBtn: 'Pošlji e-pošto',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'BREZPLAČNI PREIZKUS',
      moreVersions: 'Več različic ▾',
      liteVersion: 'Različica Lite',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Različica v miljah',
      payAlt: 'Brezplačni preizkus in drugi načini plačila spodaj',
      carouselPrev: 'Prejšnja izpostavljena aplikacija',
      carouselNext: 'Naslednja izpostavljena aplikacija',
      seeDetails: 'Podrobnosti',
      slideOf: 'Pokaži diapozitiv {n} od {total}',
      viewApp: 'Odpri {title}',
      langLabel: 'Jezik',
      appDesc: {
        'Live Predictor Premium': 'Napredne napovedi v realnem času s prilagodljivimi nastavitvami.',
        'Live Time Predictor': 'Napovedi časa v živo za poljubne razdalje.',
        'Pacer Data Field': 'Usmerjanje tempa v realnem času, da ostanete točno na cilju.',
        'Split Pacer Pro': 'Cilj in vmesni časi: potreben tempo v živo, predviden čas prihoda, prednost/zaostanek in napredek odseka.',
        'Live Pace Speed Calculator': 'Potreben tempo ali hitrost za lastne cilje.',
        'Tracker Data Field': 'Delite svojo dejavnost v živo z edinstvenim ID-jem sledenja.',
        'Route Silhouette': 'Na uri prikaže vašo zadnjo dejavnost GPS iz Strave.',
        'Premium Route Silhouette': 'Premium številčnica: vaša zadnja pot iz Strave z zapleti in več ozadji.',
        'Time Across The Galaxy': 'Kozmična številčnica, navdihnjena z daljno galaksijo.',
        'Solve for X': 'Rešite uganko in razkrijte uro.',
        'Football Matches': 'Tekme vašega kluba na številčnici: rezultat v živo, minuta tekme in naslednja tekma.',
        'Dynamic Hours': 'Analogna številčnica, ki kaže čas v 24-urnem zapisu, zato 1. ura ponoči in 13. ura nikoli nista videti enako.',
        'Volty': 'Animirana številčnica z Voltyjem, majhno baterijo, ki trenira z vami. Njegovo razpoloženje pokaže, koliko energije ima ura še na voljo.'
      },
      momentumTags: {
        trending: '🔥 Priljubljeno ta teden',
        popular: '🏆 Priljubljeno in razširjeno',
        consistent: '💪 Aktivno v uporabi',
        discovered: '📈 Na novo odkrito'
      },
      tooltips: {
        trending: {
          title: '🔥 Priljubljeno ta teden',
          message: 'Veliko športnikov je nedavno izbralo to aplikacijo, zato je ena najbolj dejavnih izbir ta teden.',
          note: 'Na podlagi svežih tedenskih namestitev.'
        },
        popular: {
          title: '🏆 Priljubljeno in razširjeno',
          message: 'Ta aplikacija ima veliko dolgoletno občinstvo in močno tedensko uporabo med športniki.',
          note: 'Upošteva skupne namestitve in dejavne športnike.'
        },
        consistent: {
          title: '💪 Aktivno v uporabi',
          message: 'Ta teden aplikacijo uporablja lepa skupina športnikov.',
          note: 'Na podlagi dejavnih uporabnikov v zadnjih 7 dneh.'
        },
        discovered: {
          title: '📈 Na novo odkrito',
          message: 'Pridobiva nove namestitve v zadnjih 7 dneh.',
          note: 'Na podlagi nedavnih namestitev.'
        }
      },
      metrics: {
        totalDownloads: 'Skupaj prenosov:',
        installs7d: 'Namestitve (7 dni):',
        activeUsers: 'Dejavni uporabniki (7 dni):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — brezplačni preizkus' },
        new:      { badge: { emoji: '✨', word: 'Novo', class: 'fresh'     }, headline: '✨ Pravkar izdano' },
        installs: { badge: { emoji: '🔥', word: 'Vroče', class: 'trending'  }, headline: '🔥 Priljubljeno ta teden' },
        total:    { badge: { emoji: '🏆', word: 'Priljubljeno', class: 'popular'   }, headline: '🏆 Večni favorit' },
        users:    { badge: { emoji: '💪', word: 'Stalno', class: 'consistent'}, headline: '💪 Športniki jo še naprej uporabljajo' },
        spotlight:{ badge: { emoji: '⭐', word: 'Izpostavljeno', class: 'trending'  }, headline: '⭐ Veliko namestitev na teden' },
        topDataField: { badge: { emoji: '📊', word: 'Priljubljeno', class: 'popular' }, headline: '📊 Priljubljeno podatkovno polje' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Priljubljena', class: 'popular' }, headline: '⌚ Priljubljena številčnica' }
      }
    },
    hr: {
      headerSubtitle: 'Razvija M. Mendelson',
      navFeatured: 'Istaknuto',
      navDataFields: 'Podatkovna polja',
      navWatchFaces: 'Brojčanici',
      navContact: 'Kontakt',
      navTracker: 'Praćenje uživo',
      navRun: 'Kalendar utrka',
      searchPlaceholder: 'Traži aplikacije…',
      featuredDesc: 'Svježi odabiri i omiljene aplikacije — ažurirano prema statistici uživo.',
      dataFieldsDesc: 'Alati za tempo, predviđanje i praćenje uživo.',
      watchFacesDesc: 'Kreativni brojčanici s izrazitim vizualnim konceptima.',
      trackerWebDesc: 'Pratite sportaše u stvarnom vremenu uz Garmin LiveTrack: ruta uživo, metrike i vaša lokacija na karti. Jednim dodirom Google karte vode vas do sportaša.',
      trackerWebBtn: 'Otvori praćenje →',
      runWebDesc: 'Pronađite svoje sljedeće utrke na jednom mjestu.',
      runWebBtn: 'Otvori kalendar →',
      contactTitle: 'Kontakt',
      contactText: 'Pitanja, povratne informacije ili ideje za značajke? Rado ću vas čuti.',
      contactBtn: 'Pošalji e-poruku',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'BESPLATNA PROBA',
      moreVersions: 'Više verzija ▾',
      liteVersion: 'Lite verzija',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Verzija u miljama',
      payAlt: 'Besplatna proba i drugi načini plaćanja u nastavku',
      carouselPrev: 'Prethodna istaknuta aplikacija',
      carouselNext: 'Sljedeća istaknuta aplikacija',
      seeDetails: 'Pogledaj detalje',
      slideOf: 'Prikaži slajd {n} od {total}',
      viewApp: 'Pogledaj {title}',
      langLabel: 'Jezik',
      appDesc: {
        'Live Predictor Premium': 'Napredna predviđanja u stvarnom vremenu s fleksibilnim postavkama.',
        'Live Time Predictor': 'Predviđanje vremena uživo za prilagođene udaljenosti.',
        'Pacer Data Field': 'Vođenje tempa u stvarnom vremenu kako biste ostali točno na cilju.',
        'Split Pacer Pro': 'Cilj i međuvremena: potreban tempo uživo, procijenjeno vrijeme dolaska, prednost/zaostatak i napredak dionice.',
        'Live Pace Speed Calculator': 'Potreban tempo ili brzina za prilagođene ciljeve.',
        'Tracker Data Field': 'Dijelite svoju aktivnost uživo s jedinstvenim ID-om praćenja.',
        'Route Silhouette': 'Prikazuje vašu posljednju GPS aktivnost sa Strave na satu.',
        'Premium Route Silhouette': 'Premium brojčanik: vaša posljednja ruta sa Strave s komplikacijama i više pozadina.',
        'Time Across The Galaxy': 'Kozmički brojčanik inspiriran dalekom galaksijom.',
        'Solve for X': 'Riješite zagonetku kako biste otkrili vrijeme.',
        'Football Matches': 'Utakmice vašeg kluba na brojčaniku: rezultat uživo, minuta utakmice i sljedeća utakmica.',
        'Dynamic Hours': 'Analogni brojčanik koji prikazuje vrijeme u 24-satnom formatu, pa 1 sat noću i 13 sati nikad ne izgledaju isto.',
        'Volty': 'Animirani brojčanik s Voltyjem, malom baterijom koja trenira s vama. Njegovo raspoloženje pokazuje koliko je energije satu preostalo.'
      },
      momentumTags: {
        trending: '🔥 Popularno ovaj tjedan',
        popular: '🏆 Popularno i široko korišteno',
        consistent: '💪 Aktivno korišteno',
        discovered: '📈 Novootkriveno'
      },
      tooltips: {
        trending: {
          title: '🔥 Popularno ovaj tjedan',
          message: 'Mnogi sportaši nedavno su odabrali ovu aplikaciju, pa je jedan od najaktivnijih izbora ovog tjedna.',
          note: 'Na temelju svježih tjednih instalacija.'
        },
        popular: {
          title: '🏆 Popularno i široko korišteno',
          message: 'Ova aplikacija ima veliku dugogodišnju publiku i snažnu tjednu upotrebu među sportašima.',
          note: 'Uzima u obzir ukupne instalacije i aktivne sportaše.'
        },
        consistent: {
          title: '💪 Aktivno korišteno',
          message: 'Solidna skupina sportaša koristi ovu aplikaciju ovaj tjedan.',
          note: 'Na temelju aktivnih korisnika u zadnjih 7 dana.'
        },
        discovered: {
          title: '📈 Novootkriveno',
          message: 'Bilježi nove instalacije u zadnjih 7 dana.',
          note: 'Na temelju nedavnih instalacija.'
        }
      },
      metrics: {
        totalDownloads: 'Ukupno preuzimanja:',
        installs7d: 'Instalacije (7 dana):',
        activeUsers: 'Aktivni korisnici (7 dana):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — besplatna proba' },
        new:      { badge: { emoji: '✨', word: 'Novo', class: 'fresh'     }, headline: '✨ Upravo objavljeno' },
        installs: { badge: { emoji: '🔥', word: 'U trendu', class: 'trending'  }, headline: '🔥 Popularno ovaj tjedan' },
        total:    { badge: { emoji: '🏆', word: 'Popularno', class: 'popular'   }, headline: '🏆 Omiljeno svih vremena' },
        users:    { badge: { emoji: '💪', word: 'Postojano', class: 'consistent'}, headline: '💪 Sportaši je i dalje koriste' },
        spotlight:{ badge: { emoji: '⭐', word: 'Istaknuto', class: 'trending'  }, headline: '⭐ Puno tjednih instalacija' },
        topDataField: { badge: { emoji: '📊', word: 'Omiljeno', class: 'popular' }, headline: '📊 Omiljeno podatkovno polje' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Omiljeni', class: 'popular' }, headline: '⌚ Omiljeni brojčanik' }
      }
    },

    hu: {
      headerSubtitle: 'Fejlesztő: M. Mendelson',
      navFeatured: 'Kiemelt',
      navDataFields: 'Adatmezők',
      navWatchFaces: 'Óralapok',
      navContact: 'Kapcsolat',
      navTracker: 'Élő követés',
      navRun: 'Versenynaptár',
      searchPlaceholder: 'Alkalmazások keresése…',
      featuredDesc: 'Friss ajánlatok és közönségkedvencek — élő statisztikák alapján frissítve.',
      dataFieldsDesc: 'Teljesítményeszközök tempóhoz, előrejelzéshez és élő követéshez.',
      watchFacesDesc: 'Kreatív óralapok egyedi vizuális koncepciókkal.',
      trackerWebDesc: 'Kövesd a sportolókat valós időben a Garmin LiveTrackkel: élő útvonal, adatok és a saját helyzeted a térképen. Egy koppintás, és a Google Térkép elvezet a sportolóhoz.',
      trackerWebBtn: 'Követés megnyitása →',
      runWebDesc: 'Találd meg a következő versenyeidet egy helyen.',
      runWebBtn: 'Naptár megnyitása →',
      contactTitle: 'Kapcsolat',
      contactText: 'Kérdésed, visszajelzésed vagy ötleted van? Örömmel hallok felőled.',
      contactBtn: 'E-mail küldése',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'INGYENES PRÓBA',
      moreVersions: 'További verziók ▾',
      liteVersion: 'Lite verzió',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Mérföldes verzió',
      payAlt: 'Ingyenes próba és további fizetési módok lent',
      carouselPrev: 'Előző kiemelt alkalmazás',
      carouselNext: 'Következő kiemelt alkalmazás',
      seeDetails: 'Részletek',
      slideOf: '{n}. dia a(z) {total} közül',
      viewApp: '{title} megtekintése',
      langLabel: 'Nyelv',
      appDesc: {
        'Live Predictor Premium': 'Fejlett valós idejű előrejelzések rugalmas beállításokkal.',
        'Live Time Predictor': 'Élő időelőrejelzés egyéni távokra.',
        'Pacer Data Field': 'Valós idejű tempóirányítás, hogy pontosan a célon maradj.',
        'Split Pacer Pro': 'Cél és részidők: élő szükséges tempó, várható érkezés, előny/hátrány és szakaszhaladás.',
        'Live Pace Speed Calculator': 'Szükséges tempó vagy sebesség egyéni célokhoz.',
        'Tracker Data Field': 'Oszd meg az edzésedet élőben egy egyedi követési azonosítóval.',
        'Route Silhouette': 'Megjeleníti az órán a legutóbbi GPS-es Strava-tevékenységedet.',
        'Premium Route Silhouette': 'Prémium óralap: a legutóbbi Strava-útvonalad komplikációkkal és több háttérrel.',
        'Time Across The Galaxy': 'Kozmikus óralap egy messzi-messzi galaxis ihletésére.',
        'Solve for X': 'Oldj meg egy rejtvényt, hogy kiderüljön az idő.',
        'Football Matches': 'A klubod meccsei az óralapon: élő eredmény, játékperc és a következő mérkőzés.',
        'Dynamic Hours': 'Analóg óralap 24 órás kijelzéssel, így hajnali 1 és délután 1 sosem néz ki ugyanúgy.',
        'Volty': 'Animált óralap Volty főszereplésével — egy kis akkumulátor, amely veled edz. A hangulata mutatja, mennyi töltés maradt az órádban.'
      },
      momentumTags: {
        trending: '🔥 A hét slágere',
        popular: '🏆 Népszerű és széles körben használt',
        consistent: '💪 Aktívan használt',
        discovered: '📈 Frissen felfedezett'
      },
      tooltips: {
        trending: {
          title: '🔥 A hét slágere',
          message: 'Sok sportoló választotta mostanában ezt az alkalmazást, így a hét egyik legaktívabb választása.',
          note: 'Friss heti telepítések alapján.'
        },
        popular: {
          title: '🏆 Népszerű és széles körben használt',
          message: 'Ennek az alkalmazásnak nagy, hosszú távú közönsége van, és a sportolók hetente sokat használják.',
          note: 'Az összes telepítést és az aktív sportolókat is figyelembe veszi.'
        },
        consistent: {
          title: '💪 Aktívan használt',
          message: 'A héten sportolók szép csoportja használja ezt az alkalmazást.',
          note: 'Az elmúlt 7 nap aktív felhasználói alapján.'
        },
        discovered: {
          title: '📈 Frissen felfedezett',
          message: 'Új telepítéseket szerez az elmúlt 7 napban.',
          note: 'A legutóbbi telepítések alapján.'
        }
      },
      metrics: {
        totalDownloads: 'Összes letöltés:',
        installs7d: 'Telepítések (7 nap):',
        activeUsers: 'Aktív felhasználók (7 nap):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — ingyenes próba' },
        new:      { badge: { emoji: '✨', word: 'Új', class: 'fresh'     }, headline: '✨ Most jelent meg' },
        installs: { badge: { emoji: '🔥', word: 'Felkapott', class: 'trending'  }, headline: '🔥 A hét kedvence' },
        total:    { badge: { emoji: '🏆', word: 'Népszerű', class: 'popular'   }, headline: '🏆 Minden idők kedvence' },
        users:    { badge: { emoji: '💪', word: 'Állandó', class: 'consistent'}, headline: '💪 A sportolók továbbra is használják' },
        spotlight:{ badge: { emoji: '⭐', word: 'Kiemelt', class: 'trending'  }, headline: '⭐ Sok heti telepítés' },
        topDataField: { badge: { emoji: '📊', word: 'Kedvenc', class: 'popular' }, headline: '📊 Kedvenc adatmező' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Kedvenc', class: 'popular' }, headline: '⌚ Kedvenc óralap' }
      }
    },

    el: {
      headerSubtitle: 'Ανάπτυξη: M. Mendelson',
      navFeatured: 'Προτεινόμενα',
      navDataFields: 'Πεδία δεδομένων',
      navWatchFaces: 'Προσόψεις ρολογιού',
      navContact: 'Επικοινωνία',
      navTracker: 'Ζωντανή παρακολούθηση',
      navRun: 'Ημερολόγιο αγώνων',
      searchPlaceholder: 'Αναζήτηση εφαρμογών…',
      featuredDesc: 'Νέες επιλογές και αγαπημένα του κοινού — ενημερωμένα με ζωντανά στατιστικά.',
      dataFieldsDesc: 'Εργαλεία απόδοσης για ρυθμό, πρόβλεψη και ζωντανή παρακολούθηση.',
      watchFacesDesc: 'Δημιουργικές προσόψεις με ξεχωριστή οπτική ταυτότητα.',
      trackerWebDesc: 'Παρακολουθήστε αθλητές σε πραγματικό χρόνο με το Garmin LiveTrack: ζωντανή διαδρομή, στατιστικά και η θέση σας στον χάρτη. Με ένα πάτημα, οι Χάρτες Google σάς οδηγούν στον αθλητή.',
      trackerWebBtn: 'Άνοιγμα παρακολούθησης →',
      runWebDesc: 'Βρείτε τους επόμενους αγώνες σας σε ένα μέρος.',
      runWebBtn: 'Άνοιγμα ημερολογίου →',
      contactTitle: 'Επικοινωνία',
      contactText: 'Ερωτήσεις, σχόλια ή ιδέες για λειτουργίες; Θα χαρώ να τα ακούσω.',
      contactBtn: 'Αποστολή email',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'ΔΩΡΕΑΝ ΔΟΚΙΜΗ',
      moreVersions: 'Περισσότερες εκδόσεις ▾',
      liteVersion: 'Έκδοση Lite',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Έκδοση σε μίλια',
      payAlt: 'Δωρεάν δοκιμή και εναλλακτικοί τρόποι πληρωμής παρακάτω',
      carouselPrev: 'Προηγούμενη προτεινόμενη εφαρμογή',
      carouselNext: 'Επόμενη προτεινόμενη εφαρμογή',
      seeDetails: 'Λεπτομέρειες',
      slideOf: 'Εμφάνιση διαφάνειας {n} από {total}',
      viewApp: 'Προβολή {title}',
      langLabel: 'Γλώσσα',
      appDesc: {
        'Live Predictor Premium': 'Προηγμένες προβλέψεις σε πραγματικό χρόνο με ευέλικτες ρυθμίσεις.',
        'Live Time Predictor': 'Ζωντανή πρόβλεψη χρόνου για προσαρμοσμένες αποστάσεις.',
        'Pacer Data Field': 'Καθοδήγηση ρυθμού σε πραγματικό χρόνο για να μένετε ακριβώς στον στόχο.',
        'Split Pacer Pro': 'Τερματισμός και ενδιάμεσοι χρόνοι: απαιτούμενος ρυθμός ζωντανά, εκτιμώμενη ώρα άφιξης, προπορεία/καθυστέρηση και πρόοδος τμήματος.',
        'Live Pace Speed Calculator': 'Απαιτούμενος ρυθμός ή ταχύτητα για προσαρμοσμένους στόχους.',
        'Tracker Data Field': 'Μοιραστείτε τη δραστηριότητά σας ζωντανά με ένα μοναδικό αναγνωριστικό.',
        'Route Silhouette': 'Δείχνει στο ρολόι την τελευταία σας δραστηριότητα GPS από το Strava.',
        'Premium Route Silhouette': 'Premium πρόσοψη: η τελευταία σας διαδρομή στο Strava με επιπλοκές και πολλά φόντα.',
        'Time Across The Galaxy': 'Κοσμική πρόσοψη εμπνευσμένη από έναν μακρινό γαλαξία.',
        'Solve for X': 'Λύστε έναν γρίφο για να αποκαλυφθεί η ώρα.',
        'Football Matches': 'Οι αγώνες της ομάδας σας στην πρόσοψη: ζωντανό σκορ, λεπτό αγώνα και ο επόμενος αγώνας.',
        'Dynamic Hours': 'Αναλογική πρόσοψη που δείχνει την ώρα σε 24ωρη μορφή, ώστε η 1 π.μ. και η 1 μ.μ. να μη μοιάζουν ποτέ.',
        'Volty': 'Κινούμενη πρόσοψη με πρωταγωνιστή τον Volty, μια μικρή μπαταρία που προπονείται μαζί σας. Η διάθεσή του δείχνει πόση μπαταρία απομένει στο ρολόι.'
      },
      momentumTags: {
        trending: '🔥 Δημοφιλές αυτή την εβδομάδα',
        popular: '🏆 Δημοφιλές και ευρέως χρησιμοποιούμενο',
        consistent: '💪 Σε ενεργή χρήση',
        discovered: '📈 Πρόσφατη ανακάλυψη'
      },
      tooltips: {
        trending: {
          title: '🔥 Δημοφιλές αυτή την εβδομάδα',
          message: 'Πολλοί αθλητές επέλεξαν πρόσφατα αυτή την εφαρμογή, καθιστώντας την μία από τις πιο ενεργές επιλογές της εβδομάδας.',
          note: 'Με βάση τις πρόσφατες εβδομαδιαίες εγκαταστάσεις.'
        },
        popular: {
          title: '🏆 Δημοφιλές και ευρέως χρησιμοποιούμενο',
          message: 'Αυτή η εφαρμογή έχει μεγάλο σταθερό κοινό και έντονη εβδομαδιαία χρήση από αθλητές.',
          note: 'Αντικατοπτρίζει τόσο τις συνολικές εγκαταστάσεις όσο και τους ενεργούς αθλητές.'
        },
        consistent: {
          title: '💪 Σε ενεργή χρήση',
          message: 'Μια σταθερή ομάδα αθλητών χρησιμοποιεί αυτή την εφαρμογή αυτή την εβδομάδα.',
          note: 'Με βάση τους ενεργούς χρήστες των τελευταίων 7 ημερών.'
        },
        discovered: {
          title: '📈 Πρόσφατη ανακάλυψη',
          message: 'Κερδίζει νέες εγκαταστάσεις τις τελευταίες 7 ημέρες.',
          note: 'Με βάση τις πρόσφατες εγκαταστάσεις.'
        }
      },
      metrics: {
        totalDownloads: 'Συνολικές λήψεις:',
        installs7d: 'Εγκαταστάσεις (7 ημέρες):',
        activeUsers: 'Ενεργοί χρήστες (7 ημέρες):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — δωρεάν δοκιμή' },
        new:      { badge: { emoji: '✨', word: 'Νέο', class: 'fresh'     }, headline: '✨ Μόλις κυκλοφόρησε' },
        installs: { badge: { emoji: '🔥', word: 'Ανεβαίνει', class: 'trending'  }, headline: '🔥 Δημοφιλές αυτή την εβδομάδα' },
        total:    { badge: { emoji: '🏆', word: 'Δημοφιλές', class: 'popular'   }, headline: '🏆 Διαχρονικό αγαπημένο' },
        users:    { badge: { emoji: '💪', word: 'Σταθερό', class: 'consistent'}, headline: '💪 Οι αθλητές συνεχίζουν να το χρησιμοποιούν' },
        spotlight:{ badge: { emoji: '⭐', word: 'Προτεινόμενο', class: 'trending'  }, headline: '⭐ Πολλές εγκαταστάσεις την εβδομάδα' },
        topDataField: { badge: { emoji: '📊', word: 'Αγαπημένο', class: 'popular' }, headline: '📊 Αγαπημένο πεδίο δεδομένων' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Αγαπημένη', class: 'popular' }, headline: '⌚ Αγαπημένη πρόσοψη' }
      }
    },

    da: {
      headerSubtitle: 'Udviklet af M. Mendelson',
      navFeatured: 'Udvalgte',
      navDataFields: 'Datafelter',
      navWatchFaces: 'Urskiver',
      navContact: 'Kontakt',
      navTracker: 'Live-sporing',
      navRun: 'Løbskalender',
      searchPlaceholder: 'Søg efter apps…',
      featuredDesc: 'Friske valg og publikumsfavoritter — opdateret med live-statistik.',
      dataFieldsDesc: 'Præstationsværktøjer til tempo, forudsigelse og live-sporing.',
      watchFacesDesc: 'Kreative urskiver med markante visuelle koncepter.',
      trackerWebDesc: 'Følg atleter i realtid med Garmin LiveTrack: live-rute, målinger og din placering på kortet. Ét tryk, og Google Maps fører dig hen til atleten.',
      trackerWebBtn: 'Åbn sporing →',
      runWebDesc: 'Find dine næste løb ét sted.',
      runWebBtn: 'Åbn kalenderen →',
      contactTitle: 'Kontakt',
      contactText: 'Spørgsmål, feedback eller idéer til funktioner? Jeg hører gerne fra dig.',
      contactBtn: 'Send e-mail',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'GRATIS PRØVEPERIODE',
      moreVersions: 'Flere versioner ▾',
      liteVersion: 'Lite-version',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Version i miles',
      payAlt: 'Gratis prøveperiode og andre betalingsmetoder nedenfor',
      carouselPrev: 'Forrige udvalgte app',
      carouselNext: 'Næste udvalgte app',
      seeDetails: 'Se detaljer',
      slideOf: 'Vis slide {n} af {total}',
      viewApp: 'Se {title}',
      langLabel: 'Sprog',
      appDesc: {
        'Live Predictor Premium': 'Avancerede forudsigelser i realtid med fleksible indstillinger.',
        'Live Time Predictor': 'Live-tidsforudsigelser for valgfrie distancer.',
        'Pacer Data Field': 'Tempovejledning i realtid, så du holder præcis dit mål.',
        'Split Pacer Pro': 'Mål og mellemtider: påkrævet tempo live, forventet ankomst, foran/bagud og fremgang på delstrækningen.',
        'Live Pace Speed Calculator': 'Påkrævet tempo eller hastighed til dine egne mål.',
        'Tracker Data Field': 'Del din aktivitet live med et unikt tracker-ID.',
        'Route Silhouette': 'Viser din seneste GPS-aktivitet fra Strava på uret.',
        'Premium Route Silhouette': 'Premium-urskive: din seneste Strava-rute med komplikationer og flere baggrunde.',
        'Time Across The Galaxy': 'Kosmisk urskive inspireret af en galakse langt, langt borte.',
        'Solve for X': 'Løs en gåde for at afsløre klokken.',
        'Football Matches': 'Din klubs kampe på urskiven: live-resultat, kampminut og næste kamp.',
        'Dynamic Hours': 'En analog urskive, der viser tiden i 24-timersformat, så kl. 1 om natten og kl. 13 aldrig ser ens ud.',
        'Volty': 'En animeret urskive med Volty, et lille batteri, der træner med dig. Humøret viser, hvor meget strøm uret har tilbage.'
      },
      momentumTags: {
        trending: '🔥 Populær i denne uge',
        popular: '🏆 Populær og udbredt',
        consistent: '💪 Aktivt brugt',
        discovered: '📈 Nyopdaget'
      },
      tooltips: {
        trending: {
          title: '🔥 Populær i denne uge',
          message: 'Mange atleter har valgt denne app for nylig, så den er et af ugens mest aktive valg.',
          note: 'Baseret på nye ugentlige installationer.'
        },
        popular: {
          title: '🏆 Populær og udbredt',
          message: 'Denne app har et stort, fast publikum og høj ugentlig brug blandt atleter.',
          note: 'Afspejler både samlede installationer og aktive atleter.'
        },
        consistent: {
          title: '💪 Aktivt brugt',
          message: 'En solid gruppe atleter bruger denne app i denne uge.',
          note: 'Baseret på aktive brugere de seneste 7 dage.'
        },
        discovered: {
          title: '📈 Nyopdaget',
          message: 'Får nye installationer de seneste 7 dage.',
          note: 'Baseret på nylige installationer.'
        }
      },
      metrics: {
        totalDownloads: 'Downloads i alt:',
        installs7d: 'Installationer (7 dage):',
        activeUsers: 'Aktive brugere (7 dage):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — gratis prøveperiode' },
        new:      { badge: { emoji: '✨', word: 'Ny', class: 'fresh'     }, headline: '✨ Lige udgivet' },
        installs: { badge: { emoji: '🔥', word: 'Populær nu', class: 'trending'  }, headline: '🔥 Populær i denne uge' },
        total:    { badge: { emoji: '🏆', word: 'Populær', class: 'popular'   }, headline: '🏆 Alle tiders favorit' },
        users:    { badge: { emoji: '💪', word: 'Stabil', class: 'consistent'}, headline: '💪 Atleterne bliver ved med at bruge den' },
        spotlight:{ badge: { emoji: '⭐', word: 'Udvalgt', class: 'trending'  }, headline: '⭐ Mange ugentlige installationer' },
        topDataField: { badge: { emoji: '📊', word: 'Favorit', class: 'popular' }, headline: '📊 Foretrukket datafelt' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Favorit', class: 'popular' }, headline: '⌚ Foretrukken urskive' }
      }
    },

    nb: {
      headerSubtitle: 'Utviklet av M. Mendelson',
      navFeatured: 'Utvalgte',
      navDataFields: 'Datafelt',
      navWatchFaces: 'Urskiver',
      navContact: 'Kontakt',
      navTracker: 'Live-sporing',
      navRun: 'Løpskalender',
      searchPlaceholder: 'Søk etter apper…',
      featuredDesc: 'Ferske valg og publikumsfavoritter — oppdatert med live-statistikk.',
      dataFieldsDesc: 'Prestasjonsverktøy for tempo, prognoser og live-sporing.',
      watchFacesDesc: 'Kreative urskiver med tydelige visuelle konsepter.',
      trackerWebDesc: 'Følg utøvere i sanntid med Garmin LiveTrack: live-rute, målinger og din posisjon på kartet. Ett trykk, så viser Google Maps vei til utøveren.',
      trackerWebBtn: 'Åpne sporing →',
      runWebDesc: 'Finn de neste løpene dine på ett sted.',
      runWebBtn: 'Åpne kalenderen →',
      contactTitle: 'Kontakt',
      contactText: 'Spørsmål, tilbakemeldinger eller ideer til funksjoner? Jeg hører gjerne fra deg.',
      contactBtn: 'Send e-post',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'GRATIS PRØVEPERIODE',
      moreVersions: 'Flere versjoner ▾',
      liteVersion: 'Lite-versjon',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Versjon i miles',
      payAlt: 'Gratis prøveperiode og andre betalingsmåter nedenfor',
      carouselPrev: 'Forrige utvalgte app',
      carouselNext: 'Neste utvalgte app',
      seeDetails: 'Se detaljer',
      slideOf: 'Vis lysbilde {n} av {total}',
      viewApp: 'Se {title}',
      langLabel: 'Språk',
      appDesc: {
        'Live Predictor Premium': 'Avanserte sanntidsprognoser med fleksible innstillinger.',
        'Live Time Predictor': 'Live tidsprognoser for valgfrie distanser.',
        'Pacer Data Field': 'Tempoveiledning i sanntid, så du holder målet nøyaktig.',
        'Split Pacer Pro': 'Mål og mellomtider: nødvendig tempo live, forventet ankomst, foran/bak og fremdrift på etappen.',
        'Live Pace Speed Calculator': 'Nødvendig tempo eller fart for egne mål.',
        'Tracker Data Field': 'Del aktiviteten din live med en unik sporings-ID.',
        'Route Silhouette': 'Viser din siste GPS-aktivitet fra Strava på klokken.',
        'Premium Route Silhouette': 'Premium-urskive: din siste Strava-rute med komplikasjoner og flere bakgrunner.',
        'Time Across The Galaxy': 'Kosmisk urskive inspirert av en galakse langt, langt borte.',
        'Solve for X': 'Løs en gåte for å avsløre klokkeslettet.',
        'Football Matches': 'Klubbens kamper på urskiven: live-resultat, kampminutt og neste kamp.',
        'Dynamic Hours': 'En analog urskive som viser tiden i 24-timersformat, så klokken 1 om natten og 13 aldri ser like ut.',
        'Volty': 'En animert urskive med Volty, et lite batteri som trener sammen med deg. Humøret viser hvor mye strøm klokken har igjen.'
      },
      momentumTags: {
        trending: '🔥 Populær denne uken',
        popular: '🏆 Populær og mye brukt',
        consistent: '💪 Aktivt i bruk',
        discovered: '📈 Nyoppdaget'
      },
      tooltips: {
        trending: {
          title: '🔥 Populær denne uken',
          message: 'Mange utøvere har valgt denne appen nylig, så den er et av ukens mest aktive valg.',
          note: 'Basert på ferske ukentlige installasjoner.'
        },
        popular: {
          title: '🏆 Populær og mye brukt',
          message: 'Denne appen har et stort, fast publikum og høy ukentlig bruk blant utøvere.',
          note: 'Gjenspeiler både totale installasjoner og aktive utøvere.'
        },
        consistent: {
          title: '💪 Aktivt i bruk',
          message: 'En solid gruppe utøvere bruker denne appen denne uken.',
          note: 'Basert på aktive brukere de siste 7 dagene.'
        },
        discovered: {
          title: '📈 Nyoppdaget',
          message: 'Får nye installasjoner de siste 7 dagene.',
          note: 'Basert på nylige installasjoner.'
        }
      },
      metrics: {
        totalDownloads: 'Nedlastinger totalt:',
        installs7d: 'Installasjoner (7 dager):',
        activeUsers: 'Aktive brukere (7 dager):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — gratis prøveperiode' },
        new:      { badge: { emoji: '✨', word: 'Ny', class: 'fresh'     }, headline: '✨ Nettopp lansert' },
        installs: { badge: { emoji: '🔥', word: 'Populær nå', class: 'trending'  }, headline: '🔥 Populær denne uken' },
        total:    { badge: { emoji: '🏆', word: 'Populær', class: 'popular'   }, headline: '🏆 Tidenes favoritt' },
        users:    { badge: { emoji: '💪', word: 'Stabil', class: 'consistent'}, headline: '💪 Utøverne fortsetter å bruke den' },
        spotlight:{ badge: { emoji: '⭐', word: 'Utvalgt', class: 'trending'  }, headline: '⭐ Mange ukentlige installasjoner' },
        topDataField: { badge: { emoji: '📊', word: 'Favoritt', class: 'popular' }, headline: '📊 Favorittdatafelt' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Favoritt', class: 'popular' }, headline: '⌚ Favoritturskive' }
      }
    },

    sv: {
      headerSubtitle: 'Utvecklad av M. Mendelson',
      navFeatured: 'Utvalda',
      navDataFields: 'Datafält',
      navWatchFaces: 'Urtavlor',
      navContact: 'Kontakt',
      navTracker: 'Livespårning',
      navRun: 'Loppkalender',
      searchPlaceholder: 'Sök appar…',
      featuredDesc: 'Färska val och publikfavoriter — uppdaterade med livestatistik.',
      dataFieldsDesc: 'Prestationsverktyg för tempo, prognoser och livespårning.',
      watchFacesDesc: 'Kreativa urtavlor med tydliga visuella koncept.',
      trackerWebDesc: 'Följ idrottare i realtid med Garmin LiveTrack: liverutt, mätvärden och din position på kartan. Ett tryck, så visar Google Maps vägen till idrottaren.',
      trackerWebBtn: 'Öppna spårning →',
      runWebDesc: 'Hitta dina nästa lopp på ett ställe.',
      runWebBtn: 'Öppna kalendern →',
      contactTitle: 'Kontakt',
      contactText: 'Frågor, feedback eller idéer på funktioner? Jag hör gärna av dig.',
      contactBtn: 'Skicka e-post',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'GRATIS PROVPERIOD',
      moreVersions: 'Fler versioner ▾',
      liteVersion: 'Lite-version',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Version i miles',
      payAlt: 'Gratis provperiod och andra betalsätt nedan',
      carouselPrev: 'Föregående utvald app',
      carouselNext: 'Nästa utvalda app',
      seeDetails: 'Visa detaljer',
      slideOf: 'Visa bild {n} av {total}',
      viewApp: 'Visa {title}',
      langLabel: 'Språk',
      appDesc: {
        'Live Predictor Premium': 'Avancerade prognoser i realtid med flexibla inställningar.',
        'Live Time Predictor': 'Live-tidsprognoser för valfria distanser.',
        'Pacer Data Field': 'Tempovägledning i realtid så att du håller målet exakt.',
        'Split Pacer Pro': 'Mål och mellantider: nödvändigt tempo live, beräknad ankomst, före/efter och framsteg per delsträcka.',
        'Live Pace Speed Calculator': 'Nödvändigt tempo eller fart för egna mål.',
        'Tracker Data Field': 'Dela din aktivitet live med ett unikt spårnings-ID.',
        'Route Silhouette': 'Visar din senaste GPS-aktivitet från Strava på klockan.',
        'Premium Route Silhouette': 'Premium-urtavla: din senaste Strava-rutt med komplikationer och flera bakgrunder.',
        'Time Across The Galaxy': 'Kosmisk urtavla inspirerad av en galax långt, långt borta.',
        'Solve for X': 'Lös en gåta för att avslöja tiden.',
        'Football Matches': 'Klubbens matcher på urtavlan: liveresultat, matchminut och nästa match.',
        'Dynamic Hours': 'En analog urtavla som visar tiden i 24-timmarsformat, så att klockan 1 på natten och 13 aldrig ser likadana ut.',
        'Volty': 'En animerad urtavla med Volty, ett litet batteri som tränar med dig. Humöret visar hur mycket laddning klockan har kvar.'
      },
      momentumTags: {
        trending: '🔥 Populär den här veckan',
        popular: '🏆 Populär och flitigt använd',
        consistent: '💪 Aktivt använd',
        discovered: '📈 Nyupptäckt'
      },
      tooltips: {
        trending: {
          title: '🔥 Populär den här veckan',
          message: 'Många idrottare har valt den här appen nyligen, så den är ett av veckans mest aktiva val.',
          note: 'Baserat på färska veckoinstallationer.'
        },
        popular: {
          title: '🏆 Populär och flitigt använd',
          message: 'Den här appen har en stor, trogen publik och hög veckoanvändning bland idrottare.',
          note: 'Speglar både totala installationer och aktiva idrottare.'
        },
        consistent: {
          title: '💪 Aktivt använd',
          message: 'En stabil grupp idrottare använder den här appen den här veckan.',
          note: 'Baserat på aktiva användare de senaste 7 dagarna.'
        },
        discovered: {
          title: '📈 Nyupptäckt',
          message: 'Får nya installationer de senaste 7 dagarna.',
          note: 'Baserat på nyliga installationer.'
        }
      },
      metrics: {
        totalDownloads: 'Nedladdningar totalt:',
        installs7d: 'Installationer (7 dagar):',
        activeUsers: 'Aktiva användare (7 dagar):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — gratis provperiod' },
        new:      { badge: { emoji: '✨', word: 'Ny', class: 'fresh'     }, headline: '✨ Nyss släppt' },
        installs: { badge: { emoji: '🔥', word: 'Het', class: 'trending'  }, headline: '🔥 Populär den här veckan' },
        total:    { badge: { emoji: '🏆', word: 'Populär', class: 'popular'   }, headline: '🏆 Genom tiderna favorit' },
        users:    { badge: { emoji: '💪', word: 'Stabil', class: 'consistent'}, headline: '💪 Idrottarna fortsätter använda den' },
        spotlight:{ badge: { emoji: '⭐', word: 'Utvald', class: 'trending'  }, headline: '⭐ Många installationer per vecka' },
        topDataField: { badge: { emoji: '📊', word: 'Favorit', class: 'popular' }, headline: '📊 Favoritdatafält' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Favorit', class: 'popular' }, headline: '⌚ Favoriturtavla' }
      }
    },

    fi: {
      headerSubtitle: 'Kehittäjä: M. Mendelson',
      navFeatured: 'Esittelyssä',
      navDataFields: 'Tietokentät',
      navWatchFaces: 'Kellotaulut',
      navContact: 'Yhteystiedot',
      navTracker: 'Live-seuranta',
      navRun: 'Juoksukalenteri',
      searchPlaceholder: 'Hae sovelluksia…',
      featuredDesc: 'Tuoreita valintoja ja yleisön suosikkeja — päivitetty reaaliaikaisilla tilastoilla.',
      dataFieldsDesc: 'Suorituskykytyökalut vauhtiin, ennusteisiin ja live-seurantaan.',
      watchFacesDesc: 'Luovia kellotauluja omaleimaisilla visuaalisilla konsepteilla.',
      trackerWebDesc: 'Seuraa urheilijoita reaaliajassa Garmin LiveTrackilla: reitti livenä, mittarit ja oma sijaintisi kartalla. Yksi napautus, ja Google Maps opastaa sinut urheilijan luo.',
      trackerWebBtn: 'Avaa seuranta →',
      runWebDesc: 'Löydä seuraavat juoksusi yhdestä paikasta.',
      runWebBtn: 'Avaa kalenteri →',
      contactTitle: 'Yhteystiedot',
      contactText: 'Kysymyksiä, palautetta tai ideoita ominaisuuksista? Kuulen mielelläni.',
      contactBtn: 'Lähetä sähköpostia',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'ILMAINEN KOKEILU',
      moreVersions: 'Lisää versioita ▾',
      liteVersion: 'Lite-versio',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Mailiversio',
      payAlt: 'Ilmainen kokeilu ja muut maksutavat alla',
      carouselPrev: 'Edellinen esittelysovellus',
      carouselNext: 'Seuraava esittelysovellus',
      seeDetails: 'Näytä tiedot',
      slideOf: 'Näytä dia {n}/{total}',
      viewApp: 'Näytä {title}',
      langLabel: 'Kieli',
      appDesc: {
        'Live Predictor Premium': 'Kehittyneet reaaliaikaiset ennusteet joustavin asetuksin.',
        'Live Time Predictor': 'Reaaliaikaiset aikaennusteet omille matkoille.',
        'Pacer Data Field': 'Reaaliaikainen vauhdinohjaus, jotta pysyt täsmälleen tavoitteessa.',
        'Split Pacer Pro': 'Maali ja väliajat: tarvittava vauhti livenä, arvioitu saapumisaika, edellä/jäljessä ja osuuden eteneminen.',
        'Live Pace Speed Calculator': 'Tarvittava vauhti tai nopeus omiin tavoitteisiin.',
        'Tracker Data Field': 'Jaa suorituksesi livenä yksilöllisellä seurantatunnuksella.',
        'Route Silhouette': 'Näyttää kellossa viimeisimmän GPS-suorituksesi Stravasta.',
        'Premium Route Silhouette': 'Premium-kellotaulu: viimeisin Strava-reittisi komplikaatioineen ja useine taustoineen.',
        'Time Across The Galaxy': 'Kosminen kellotaulu, jonka innoittajana on kaukainen galaksi.',
        'Solve for X': 'Ratkaise arvoitus, niin kellonaika paljastuu.',
        'Football Matches': 'Seurasi ottelut kellotaululla: tulos livenä, peliminuutti ja seuraava ottelu.',
        'Dynamic Hours': 'Analoginen kellotaulu, joka näyttää ajan 24 tunnin muodossa, joten kello 1 yöllä ja kello 13 eivät koskaan näytä samalta.',
        'Volty': 'Animoitu kellotaulu, jonka tähtenä on Volty — pieni akku, joka treenaa kanssasi. Sen mieliala kertoo, paljonko kellossa on virtaa jäljellä.'
      },
      momentumTags: {
        trending: '🔥 Suosittu tällä viikolla',
        popular: '🏆 Suosittu ja laajalti käytetty',
        consistent: '💪 Aktiivisessa käytössä',
        discovered: '📈 Juuri löydetty'
      },
      tooltips: {
        trending: {
          title: '🔥 Suosittu tällä viikolla',
          message: 'Moni urheilija on valinnut tämän sovelluksen viime aikoina, joten se on viikon aktiivisimpia valintoja.',
          note: 'Perustuu tuoreisiin viikoittaisiin asennuksiin.'
        },
        popular: {
          title: '🏆 Suosittu ja laajalti käytetty',
          message: 'Tällä sovelluksella on suuri vakiintunut käyttäjäkunta ja runsaasti viikoittaista käyttöä.',
          note: 'Ottaa huomioon sekä kokonaisasennukset että aktiiviset urheilijat.'
        },
        consistent: {
          title: '💪 Aktiivisessa käytössä',
          message: 'Vakaa joukko urheilijoita käyttää tätä sovellusta tällä viikolla.',
          note: 'Perustuu viimeisten 7 päivän aktiivisiin käyttäjiin.'
        },
        discovered: {
          title: '📈 Juuri löydetty',
          message: 'Saa uusia asennuksia viimeisten 7 päivän aikana.',
          note: 'Perustuu viimeaikaisiin asennuksiin.'
        }
      },
      metrics: {
        totalDownloads: 'Latauksia yhteensä:',
        installs7d: 'Asennukset (7 päivää):',
        activeUsers: 'Aktiiviset käyttäjät (7 päivää):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — ilmainen kokeilu' },
        new:      { badge: { emoji: '✨', word: 'Uusi', class: 'fresh'     }, headline: '✨ Juuri julkaistu' },
        installs: { badge: { emoji: '🔥', word: 'Nouseva', class: 'trending'  }, headline: '🔥 Suosittu tällä viikolla' },
        total:    { badge: { emoji: '🏆', word: 'Suosittu', class: 'popular'   }, headline: '🏆 Kaikkien aikojen suosikki' },
        users:    { badge: { emoji: '💪', word: 'Vakaa', class: 'consistent'}, headline: '💪 Urheilijat käyttävät sitä yhä' },
        spotlight:{ badge: { emoji: '⭐', word: 'Esittelyssä', class: 'trending'  }, headline: '⭐ Paljon asennuksia viikossa' },
        topDataField: { badge: { emoji: '📊', word: 'Suosikki', class: 'popular' }, headline: '📊 Suosikkitietokenttä' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Suosikki', class: 'popular' }, headline: '⌚ Suosikkikellotaulu' }
      }
    },
    ja: {
      headerSubtitle: '開発：M. Mendelson',
      navFeatured: 'おすすめ',
      navDataFields: 'データフィールド',
      navWatchFaces: 'ウォッチフェイス',
      navContact: 'お問い合わせ',
      navTracker: 'ライブトラッカー',
      navRun: 'ランニング大会カレンダー',
      searchPlaceholder: 'アプリを検索…',
      featuredDesc: '新着と人気のアプリ — リアルタイムの統計で更新しています。',
      dataFieldsDesc: 'ペース、予測、ライブトラッキングのためのパフォーマンスツール。',
      watchFacesDesc: '個性的なビジュアルコンセプトのクリエイティブなウォッチフェイス。',
      trackerWebDesc: 'Garmin LiveTrack で選手をリアルタイムに追跡：ライブのルート、各種データ、地図上の現在地。ワンタップで Google マップが選手のいる場所まで案内します。',
      trackerWebBtn: 'トラッカーを開く →',
      runWebDesc: '次に走る大会をまとめて見つけよう。',
      runWebBtn: 'カレンダーを開く →',
      contactTitle: 'お問い合わせ',
      contactText: 'ご質問、ご意見、機能のアイデアなど、お気軽にお寄せください。',
      contactBtn: 'メールを送る',
      footer: '© 2026 M. Mendelson',
      freeTrial: '無料トライアル',
      moreVersions: 'ほかのバージョン ▾',
      liteVersion: 'Lite 版',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'マイル版',
      payAlt: '無料トライアルとその他の支払い方法は下記へ',
      carouselPrev: '前のおすすめアプリ',
      carouselNext: '次のおすすめアプリ',
      seeDetails: '詳細を見る',
      slideOf: 'スライド {n}／{total} を表示',
      viewApp: '{title} を見る',
      langLabel: '言語',
      appDesc: {
        'Live Predictor Premium': '柔軟に設定できる高度なリアルタイム予測。',
        'Live Time Predictor': '任意の距離のタイムをリアルタイムに予測。',
        'Pacer Data Field': '目標ぴったりを保つためのリアルタイムのペースガイド。',
        'Split Pacer Pro': 'ゴールと中間スプリット：必要ペース（ライブ）、到着予想時刻、貯金／借金、区間の進捗。',
        'Live Pace Speed Calculator': '自分の目標に必要なペースまたはスピード。',
        'Tracker Data Field': '固有のトラッカー ID でアクティビティをライブ共有。',
        'Route Silhouette': 'Strava の最新の GPS アクティビティを時計に表示。',
        'Premium Route Silhouette': 'プレミアムウォッチフェイス：最新の Strava ルートに、コンプリケーションと複数の背景。',
        'Time Across The Galaxy': '遠い銀河にインスパイアされた宇宙テーマのウォッチフェイス。',
        'Solve for X': 'パズルを解いて時刻を表示。',
        'Football Matches': '応援するクラブの試合をウォッチフェイスに：ライブスコア、試合時間、次の試合。',
        'Dynamic Hours': '24時間表示のアナログウォッチフェイス。午前1時と午後1時が同じに見えることはありません。',
        'Volty': 'あなたと一緒にトレーニングする小さなバッテリー、Volty が主役のアニメーションウォッチフェイス。表情で時計のバッテリー残量がわかります。'
      },
      momentumTags: {
        trending: '🔥 今週の注目',
        popular: '🏆 人気・定番',
        consistent: '💪 よく使われています',
        discovered: '📈 注目の新顔'
      },
      tooltips: {
        trending: {
          title: '🔥 今週の注目',
          message: '最近多くのアスリートがこのアプリを選んでおり、今週もっとも勢いのあるアプリの一つです。',
          note: '直近1週間のインストール数に基づきます。'
        },
        popular: {
          title: '🏆 人気・定番',
          message: '長く使われている大勢のユーザーがいて、毎週アスリートによく使われています。',
          note: '累計インストール数とアクティブなアスリート数の両方を反映しています。'
        },
        consistent: {
          title: '💪 よく使われています',
          message: '今週もしっかりとした数のアスリートがこのアプリを使っています。',
          note: '過去7日間のアクティブユーザー数に基づきます。'
        },
        discovered: {
          title: '📈 注目の新顔',
          message: '過去7日間で新規インストールが増えています。',
          note: '最近のインストール数に基づきます。'
        }
      },
      metrics: {
        totalDownloads: '累計ダウンロード数：',
        installs7d: 'インストール数（7日間）：',
        activeUsers: 'アクティブユーザー（7日間）：'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'プレミアム', class: 'premium'   }, headline: '💎 プレミアム — 無料トライアルあり' },
        new:      { badge: { emoji: '✨', word: '新着', class: 'fresh'     }, headline: '✨ リリースしたばかり' },
        installs: { badge: { emoji: '🔥', word: '注目', class: 'trending'  }, headline: '🔥 今週の人気' },
        total:    { badge: { emoji: '🏆', word: '人気', class: 'popular'   }, headline: '🏆 不動の人気' },
        users:    { badge: { emoji: '💪', word: '定番', class: 'consistent'}, headline: '💪 使い続けられています' },
        spotlight:{ badge: { emoji: '⭐', word: 'おすすめ', class: 'trending'  }, headline: '⭐ 週間インストール多数' },
        topDataField: { badge: { emoji: '📊', word: '人気', class: 'popular' }, headline: '📊 人気のデータフィールド' },
        topWatchFace: { badge: { emoji: '⌚', word: '人気', class: 'popular' }, headline: '⌚ 人気のウォッチフェイス' }
      }
    },

    ko: {
      headerSubtitle: '개발: M. Mendelson',
      navFeatured: '추천',
      navDataFields: '데이터 필드',
      navWatchFaces: '워치 페이스',
      navContact: '문의',
      navTracker: '라이브 트래커',
      navRun: '러닝 대회 캘린더',
      searchPlaceholder: '앱 검색…',
      featuredDesc: '새로 나온 앱과 인기 앱 — 실시간 통계로 업데이트됩니다.',
      dataFieldsDesc: '페이스, 예측, 실시간 추적을 위한 퍼포먼스 도구.',
      watchFacesDesc: '개성 있는 시각 콘셉트의 크리에이티브 워치 페이스.',
      trackerWebDesc: 'Garmin LiveTrack으로 선수를 실시간으로 따라가세요: 실시간 경로, 각종 지표, 지도 위 내 위치. 한 번만 탭하면 Google 지도가 선수가 있는 곳까지 안내합니다.',
      trackerWebBtn: '트래커 열기 →',
      runWebDesc: '다음 대회를 한곳에서 찾아보세요.',
      runWebBtn: '캘린더 열기 →',
      contactTitle: '문의',
      contactText: '질문, 의견 또는 기능 아이디어가 있으신가요? 언제든 연락 주세요.',
      contactBtn: '이메일 보내기',
      footer: '© 2026 M. Mendelson',
      freeTrial: '무료 체험',
      moreVersions: '다른 버전 ▾',
      liteVersion: 'Lite 버전',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: '마일 버전',
      payAlt: '무료 체험 및 기타 결제 방법은 아래에',
      carouselPrev: '이전 추천 앱',
      carouselNext: '다음 추천 앱',
      seeDetails: '자세히 보기',
      slideOf: '슬라이드 {n}/{total} 보기',
      viewApp: '{title} 보기',
      langLabel: '언어',
      appDesc: {
        'Live Predictor Premium': '유연한 설정을 갖춘 고급 실시간 예측.',
        'Live Time Predictor': '원하는 거리의 기록을 실시간으로 예측.',
        'Pacer Data Field': '목표를 정확히 지키도록 돕는 실시간 페이스 가이드.',
        'Split Pacer Pro': '결승선과 구간 기록: 실시간 필요 페이스, 예상 도착 시간, 앞섬/뒤처짐, 구간 진행률.',
        'Live Pace Speed Calculator': '나만의 목표에 필요한 페이스 또는 속도.',
        'Tracker Data Field': '고유한 트래커 ID로 활동을 실시간 공유.',
        'Route Silhouette': '최근 GPS 기반 Strava 활동을 시계에 표시.',
        'Premium Route Silhouette': '프리미엄 워치 페이스: 컴플리케이션과 여러 배경을 갖춘 최근 Strava 경로.',
        'Time Across The Galaxy': '먼 은하에서 영감을 받은 우주 테마 워치 페이스.',
        'Solve for X': '퍼즐을 풀어 시간을 확인하세요.',
        'Football Matches': '응원하는 클럽의 경기를 워치 페이스에: 실시간 스코어, 경기 시간, 다음 경기.',
        'Dynamic Hours': '24시간 형식으로 시간을 보여 주는 아날로그 워치 페이스로, 오전 1시와 오후 1시가 절대 같아 보이지 않습니다.',
        'Volty': '함께 훈련하는 작은 배터리 Volty가 주인공인 애니메이션 워치 페이스. 기분으로 시계의 남은 배터리를 알려 줍니다.'
      },
      momentumTags: {
        trending: '🔥 이번 주 인기',
        popular: '🏆 인기 · 많이 쓰는 앱',
        consistent: '💪 꾸준히 사용 중',
        discovered: '📈 새롭게 주목'
      },
      tooltips: {
        trending: {
          title: '🔥 이번 주 인기',
          message: '최근 많은 선수가 이 앱을 선택해 이번 주 가장 활발한 앱 중 하나가 되었습니다.',
          note: '최근 주간 설치 수 기준입니다.'
        },
        popular: {
          title: '🏆 인기 · 많이 쓰는 앱',
          message: '오랫동안 많은 사용자를 확보했고 매주 선수들이 활발히 사용합니다.',
          note: '누적 설치 수와 활성 선수 수를 모두 반영합니다.'
        },
        consistent: {
          title: '💪 꾸준히 사용 중',
          message: '이번 주에도 상당수의 선수가 이 앱을 사용하고 있습니다.',
          note: '최근 7일간 활성 사용자 기준입니다.'
        },
        discovered: {
          title: '📈 새롭게 주목',
          message: '최근 7일간 새로운 설치가 늘고 있습니다.',
          note: '최근 설치 수 기준입니다.'
        }
      },
      metrics: {
        totalDownloads: '총 다운로드:',
        installs7d: '설치 수(7일):',
        activeUsers: '활성 사용자(7일):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: '프리미엄', class: 'premium'   }, headline: '💎 프리미엄 — 무료 체험' },
        new:      { badge: { emoji: '✨', word: '신규', class: 'fresh'     }, headline: '✨ 새로 출시' },
        installs: { badge: { emoji: '🔥', word: '인기 급상승', class: 'trending'  }, headline: '🔥 이번 주 인기' },
        total:    { badge: { emoji: '🏆', word: '인기', class: 'popular'   }, headline: '🏆 꾸준한 인기' },
        users:    { badge: { emoji: '💪', word: '꾸준함', class: 'consistent'}, headline: '💪 선수들이 계속 사용 중' },
        spotlight:{ badge: { emoji: '⭐', word: '추천', class: 'trending'  }, headline: '⭐ 주간 설치 다수' },
        topDataField: { badge: { emoji: '📊', word: '인기', class: 'popular' }, headline: '📊 인기 데이터 필드' },
        topWatchFace: { badge: { emoji: '⌚', word: '인기', class: 'popular' }, headline: '⌚ 인기 워치 페이스' }
      }
    },

    'zh-cn': {
      headerSubtitle: '开发者：M. Mendelson',
      navFeatured: '精选',
      navDataFields: '数据字段',
      navWatchFaces: '表盘',
      navContact: '联系',
      navTracker: '实时追踪',
      navRun: '跑步赛事日历',
      searchPlaceholder: '搜索应用…',
      featuredDesc: '新品与人气之选 — 根据实时统计更新。',
      dataFieldsDesc: '用于配速、预测和实时追踪的运动表现工具。',
      watchFacesDesc: '视觉概念独特的创意表盘。',
      trackerWebDesc: '通过 Garmin LiveTrack 实时追踪运动员：实时路线、各项数据，以及你在地图上的位置。轻点一下，Google 地图即可带你前往运动员所在位置。',
      trackerWebBtn: '打开追踪 →',
      runWebDesc: '一站找到你的下一场比赛。',
      runWebBtn: '打开日历 →',
      contactTitle: '联系',
      contactText: '有问题、反馈或功能建议？欢迎随时联系我。',
      contactBtn: '发送邮件',
      footer: '© 2026 M. Mendelson',
      freeTrial: '免费试用',
      moreVersions: '更多版本 ▾',
      liteVersion: '精简版',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: '英里版',
      payAlt: '免费试用及其他付款方式见下方',
      carouselPrev: '上一个精选应用',
      carouselNext: '下一个精选应用',
      seeDetails: '查看详情',
      slideOf: '显示第 {n} 张，共 {total} 张',
      viewApp: '查看 {title}',
      langLabel: '语言',
      appDesc: {
        'Live Predictor Premium': '配置灵活的高级实时预测。',
        'Live Time Predictor': '为自定义距离实时预测完赛时间。',
        'Pacer Data Field': '实时配速指导，帮你精准保持目标。',
        'Split Pacer Pro': '终点与分段：实时所需配速、预计到达时间、领先/落后以及分段进度。',
        'Live Pace Speed Calculator': '按自定义目标计算所需配速或速度。',
        'Tracker Data Field': '使用专属追踪 ID 实时分享你的活动。',
        'Route Silhouette': '在手表上显示你最近一次基于 GPS 的 Strava 活动。',
        'Premium Route Silhouette': '高级表盘：你最近的 Strava 路线，配有复杂功能和多种背景。',
        'Time Across The Galaxy': '灵感来自遥远星系的宇宙主题表盘。',
        'Solve for X': '解开谜题即可显示时间。',
        'Football Matches': '在表盘上关注你的球队：实时比分、比赛时间和下一场比赛。',
        'Dynamic Hours': '以 24 小时制显示时间的指针表盘，凌晨 1 点和下午 1 点永远不会看起来一样。',
        'Volty': '由 Volty 主演的动画表盘——一块陪你一起训练的小电池。它的心情会告诉你手表还剩多少电量。'
      },
      momentumTags: {
        trending: '🔥 本周热门',
        popular: '🏆 人气之选',
        consistent: '💪 活跃使用中',
        discovered: '📈 新晋发现'
      },
      tooltips: {
        trending: {
          title: '🔥 本周热门',
          message: '最近有很多运动员选择了这款应用，使其成为本周最活跃的选择之一。',
          note: '基于最近一周的安装量。'
        },
        popular: {
          title: '🏆 人气之选',
          message: '这款应用拥有大量长期用户，并且每周都被运动员频繁使用。',
          note: '综合累计安装量和活跃运动员数量。'
        },
        consistent: {
          title: '💪 活跃使用中',
          message: '本周有相当多的运动员在使用这款应用。',
          note: '基于过去 7 天的活跃用户。'
        },
        discovered: {
          title: '📈 新晋发现',
          message: '过去 7 天内新安装量持续增长。',
          note: '基于近期安装量。'
        }
      },
      metrics: {
        totalDownloads: '总下载量：',
        installs7d: '安装量（7 天）：',
        activeUsers: '活跃用户（7 天）：'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: '高级版', class: 'premium'   }, headline: '💎 高级版 — 可免费试用' },
        new:      { badge: { emoji: '✨', word: '新品', class: 'fresh'     }, headline: '✨ 全新上线' },
        installs: { badge: { emoji: '🔥', word: '热门', class: 'trending'  }, headline: '🔥 本周热门' },
        total:    { badge: { emoji: '🏆', word: '人气', class: 'popular'   }, headline: '🏆 历来最受欢迎' },
        users:    { badge: { emoji: '💪', word: '常用', class: 'consistent'}, headline: '💪 运动员持续使用' },
        spotlight:{ badge: { emoji: '⭐', word: '精选', class: 'trending'  }, headline: '⭐ 每周安装量高' },
        topDataField: { badge: { emoji: '📊', word: '最爱', class: 'popular' }, headline: '📊 最受欢迎的数据字段' },
        topWatchFace: { badge: { emoji: '⌚', word: '最爱', class: 'popular' }, headline: '⌚ 最受欢迎的表盘' }
      }
    },

    'zh-tw': {
      headerSubtitle: '開發者：M. Mendelson',
      navFeatured: '精選',
      navDataFields: '資料欄位',
      navWatchFaces: '錶面',
      navContact: '聯絡',
      navTracker: '即時追蹤',
      navRun: '路跑賽事行事曆',
      searchPlaceholder: '搜尋應用程式…',
      featuredDesc: '新品與人氣之選 — 依即時統計更新。',
      dataFieldsDesc: '用於配速、預測與即時追蹤的運動表現工具。',
      watchFacesDesc: '視覺概念獨特的創意錶面。',
      trackerWebDesc: '透過 Garmin LiveTrack 即時追蹤運動員：即時路線、各項數據，以及你在地圖上的位置。輕點一下，Google 地圖就會帶你前往運動員所在位置。',
      trackerWebBtn: '開啟追蹤 →',
      runWebDesc: '一次找到你的下一場比賽。',
      runWebBtn: '開啟行事曆 →',
      contactTitle: '聯絡',
      contactText: '有問題、意見或功能建議嗎？歡迎隨時與我聯絡。',
      contactBtn: '傳送電子郵件',
      footer: '© 2026 M. Mendelson',
      freeTrial: '免費試用',
      moreVersions: '更多版本 ▾',
      liteVersion: '精簡版',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: '英里版',
      payAlt: '免費試用與其他付款方式請見下方',
      carouselPrev: '上一個精選應用程式',
      carouselNext: '下一個精選應用程式',
      seeDetails: '查看詳細資訊',
      slideOf: '顯示第 {n} 張，共 {total} 張',
      viewApp: '查看 {title}',
      langLabel: '語言',
      appDesc: {
        'Live Predictor Premium': '設定彈性的進階即時預測。',
        'Live Time Predictor': '為自訂距離即時預測完賽時間。',
        'Pacer Data Field': '即時配速引導，幫你精準維持目標。',
        'Split Pacer Pro': '終點與分段：即時所需配速、預計抵達時間、領先/落後與分段進度。',
        'Live Pace Speed Calculator': '依自訂目標計算所需配速或速度。',
        'Tracker Data Field': '使用專屬追蹤 ID 即時分享你的活動。',
        'Route Silhouette': '在手錶上顯示你最近一次以 GPS 記錄的 Strava 活動。',
        'Premium Route Silhouette': '進階錶面：你最近的 Strava 路線，搭配複雜功能與多種背景。',
        'Time Across The Galaxy': '靈感來自遙遠星系的宇宙主題錶面。',
        'Solve for X': '解開謎題即可顯示時間。',
        'Football Matches': '在錶面上關注你的球隊：即時比分、比賽時間與下一場比賽。',
        'Dynamic Hours': '以 24 小時制顯示時間的指針錶面，凌晨 1 點與下午 1 點永遠不會看起來一樣。',
        'Volty': '由 Volty 主演的動畫錶面——一顆陪你一起訓練的小電池。它的心情會告訴你手錶還剩多少電量。'
      },
      momentumTags: {
        trending: '🔥 本週熱門',
        popular: '🏆 人氣之選',
        consistent: '💪 活躍使用中',
        discovered: '📈 新發現'
      },
      tooltips: {
        trending: {
          title: '🔥 本週熱門',
          message: '最近有許多運動員選擇了這款應用程式，使它成為本週最活躍的選擇之一。',
          note: '依據最近一週的安裝量。'
        },
        popular: {
          title: '🏆 人氣之選',
          message: '這款應用程式擁有大量長期使用者，而且每週都被運動員頻繁使用。',
          note: '綜合累計安裝量與活躍運動員人數。'
        },
        consistent: {
          title: '💪 活躍使用中',
          message: '本週有相當多的運動員正在使用這款應用程式。',
          note: '依據過去 7 天的活躍使用者。'
        },
        discovered: {
          title: '📈 新發現',
          message: '過去 7 天新安裝量持續增加。',
          note: '依據近期安裝量。'
        }
      },
      metrics: {
        totalDownloads: '總下載次數：',
        installs7d: '安裝次數（7 天）：',
        activeUsers: '活躍使用者（7 天）：'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: '進階版', class: 'premium'   }, headline: '💎 進階版 — 可免費試用' },
        new:      { badge: { emoji: '✨', word: '新品', class: 'fresh'     }, headline: '✨ 全新上架' },
        installs: { badge: { emoji: '🔥', word: '熱門', class: 'trending'  }, headline: '🔥 本週熱門' },
        total:    { badge: { emoji: '🏆', word: '人氣', class: 'popular'   }, headline: '🏆 歷來最受歡迎' },
        users:    { badge: { emoji: '💪', word: '常用', class: 'consistent'}, headline: '💪 運動員持續使用' },
        spotlight:{ badge: { emoji: '⭐', word: '精選', class: 'trending'  }, headline: '⭐ 每週安裝量高' },
        topDataField: { badge: { emoji: '📊', word: '最愛', class: 'popular' }, headline: '📊 最受歡迎的資料欄位' },
        topWatchFace: { badge: { emoji: '⌚', word: '最愛', class: 'popular' }, headline: '⌚ 最受歡迎的錶面' }
      }
    },
    th: {
      headerSubtitle: 'พัฒนาโดย M. Mendelson',
      navFeatured: 'แนะนำ',
      navDataFields: 'ฟิลด์ข้อมูล',
      navWatchFaces: 'หน้าปัดนาฬิกา',
      navContact: 'ติดต่อ',
      navTracker: 'ติดตามสด',
      navRun: 'ปฏิทินงานวิ่ง',
      searchPlaceholder: 'ค้นหาแอป…',
      featuredDesc: 'แอปมาใหม่และแอปยอดนิยม — อัปเดตจากสถิติแบบเรียลไทม์',
      dataFieldsDesc: 'เครื่องมือเพิ่มสมรรถนะสำหรับเพซ การคาดการณ์ และการติดตามสด',
      watchFacesDesc: 'หน้าปัดสร้างสรรค์ที่มีแนวคิดด้านภาพโดดเด่น',
      trackerWebDesc: 'ติดตามนักกีฬาแบบเรียลไทม์ด้วย Garmin LiveTrack: เส้นทางสด ค่าสถิติ และตำแหน่งของคุณบนแผนที่ แตะครั้งเดียว Google Maps จะนำทางคุณไปหานักกีฬา',
      trackerWebBtn: 'เปิดการติดตาม →',
      runWebDesc: 'ค้นหางานวิ่งครั้งต่อไปได้ในที่เดียว',
      runWebBtn: 'เปิดปฏิทิน →',
      contactTitle: 'ติดต่อ',
      contactText: 'มีคำถาม ความคิดเห็น หรือไอเดียฟีเจอร์ใหม่ไหม ยินดีรับฟังเสมอ',
      contactBtn: 'ส่งอีเมล',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'ทดลองใช้ฟรี',
      moreVersions: 'เวอร์ชันอื่น ▾',
      liteVersion: 'เวอร์ชัน Lite',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'เวอร์ชันไมล์',
      payAlt: 'ทดลองใช้ฟรีและช่องทางชำระเงินอื่นด้านล่าง',
      carouselPrev: 'แอปแนะนำก่อนหน้า',
      carouselNext: 'แอปแนะนำถัดไป',
      seeDetails: 'ดูรายละเอียด',
      slideOf: 'แสดงสไลด์ {n} จาก {total}',
      viewApp: 'ดู {title}',
      langLabel: 'ภาษา',
      appDesc: {
        'Live Predictor Premium': 'การคาดการณ์ขั้นสูงแบบเรียลไทม์ ปรับตั้งค่าได้ยืดหยุ่น',
        'Live Time Predictor': 'คาดการณ์เวลาแบบสดสำหรับระยะทางที่กำหนดเอง',
        'Pacer Data Field': 'แนะนำเพซแบบเรียลไทม์ เพื่อให้คุณรักษาเป้าหมายได้แม่นยำ',
        'Split Pacer Pro': 'เส้นชัยและสปลิตระหว่างทาง: เพซที่ต้องใช้แบบสด เวลาถึงโดยประมาณ นำ/ตามหลัง และความคืบหน้าของช่วง',
        'Live Pace Speed Calculator': 'เพซหรือความเร็วที่ต้องใช้สำหรับเป้าหมายของคุณ',
        'Tracker Data Field': 'แชร์กิจกรรมแบบสดด้วย Tracker ID เฉพาะของคุณ',
        'Route Silhouette': 'แสดงกิจกรรม Strava ล่าสุดที่บันทึกด้วย GPS บนนาฬิกาของคุณ',
        'Premium Route Silhouette': 'หน้าปัดพรีเมียม: เส้นทาง Strava ล่าสุดของคุณ พร้อมคอมพลิเคชันและพื้นหลังหลายแบบ',
        'Time Across The Galaxy': 'หน้าปัดธีมอวกาศ ได้แรงบันดาลใจจากกาแล็กซีอันไกลโพ้น',
        'Solve for X': 'ไขปริศนาเพื่อเผยเวลา',
        'Football Matches': 'แมตช์ของสโมสรคุณบนหน้าปัด: สกอร์สด นาทีการแข่งขัน และนัดถัดไป',
        'Dynamic Hours': 'หน้าปัดแบบเข็มที่แสดงเวลาแบบ 24 ชั่วโมง ตีหนึ่งกับบ่ายโมงจึงไม่มีวันดูเหมือนกัน',
        'Volty': 'หน้าปัดแอนิเมชันที่มี Volty แบตเตอรี่ตัวน้อยที่ฝึกซ้อมไปกับคุณ อารมณ์ของมันบอกว่านาฬิกาเหลือแบตเตอรี่เท่าไร'
      },
      momentumTags: {
        trending: '🔥 มาแรงสัปดาห์นี้',
        popular: '🏆 ยอดนิยมและใช้งานแพร่หลาย',
        consistent: '💪 ใช้งานอย่างต่อเนื่อง',
        discovered: '📈 เพิ่งถูกค้นพบ'
      },
      tooltips: {
        trending: {
          title: '🔥 มาแรงสัปดาห์นี้',
          message: 'นักกีฬาจำนวนมากเลือกแอปนี้เมื่อเร็ว ๆ นี้ จึงเป็นหนึ่งในตัวเลือกที่คึกคักที่สุดของสัปดาห์',
          note: 'อ้างอิงจากยอดติดตั้งรายสัปดาห์ล่าสุด'
        },
        popular: {
          title: '🏆 ยอดนิยมและใช้งานแพร่หลาย',
          message: 'แอปนี้มีผู้ใช้ระยะยาวจำนวนมาก และนักกีฬาใช้งานอย่างต่อเนื่องทุกสัปดาห์',
          note: 'สะท้อนทั้งยอดติดตั้งรวมและจำนวนนักกีฬาที่ใช้งานอยู่'
        },
        consistent: {
          title: '💪 ใช้งานอย่างต่อเนื่อง',
          message: 'สัปดาห์นี้มีนักกีฬากลุ่มใหญ่กำลังใช้แอปนี้',
          note: 'อ้างอิงจากผู้ใช้ที่ใช้งานในช่วง 7 วันที่ผ่านมา'
        },
        discovered: {
          title: '📈 เพิ่งถูกค้นพบ',
          message: 'มียอดติดตั้งใหม่เพิ่มขึ้นในช่วง 7 วันที่ผ่านมา',
          note: 'อ้างอิงจากยอดติดตั้งล่าสุด'
        }
      },
      metrics: {
        totalDownloads: 'ยอดดาวน์โหลดรวม:',
        installs7d: 'ยอดติดตั้ง (7 วัน):',
        activeUsers: 'ผู้ใช้ที่ใช้งาน (7 วัน):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'พรีเมียม', class: 'premium'   }, headline: '💎 พรีเมียม — ทดลองใช้ฟรี' },
        new:      { badge: { emoji: '✨', word: 'ใหม่', class: 'fresh'     }, headline: '✨ เพิ่งเปิดตัว' },
        installs: { badge: { emoji: '🔥', word: 'มาแรง', class: 'trending'  }, headline: '🔥 ยอดนิยมสัปดาห์นี้' },
        total:    { badge: { emoji: '🏆', word: 'ยอดนิยม', class: 'popular'   }, headline: '🏆 ขวัญใจตลอดกาล' },
        users:    { badge: { emoji: '💪', word: 'ต่อเนื่อง', class: 'consistent'}, headline: '💪 นักกีฬายังคงใช้งานอยู่' },
        spotlight:{ badge: { emoji: '⭐', word: 'แนะนำ', class: 'trending'  }, headline: '⭐ ยอดติดตั้งรายสัปดาห์สูง' },
        topDataField: { badge: { emoji: '📊', word: 'ยอดนิยม', class: 'popular' }, headline: '📊 ฟิลด์ข้อมูลยอดนิยม' },
        topWatchFace: { badge: { emoji: '⌚', word: 'ยอดนิยม', class: 'popular' }, headline: '⌚ หน้าปัดยอดนิยม' }
      }
    },

    he: {
      headerSubtitle: 'פותח על ידי M. Mendelson',
      navFeatured: 'מומלצים',
      navDataFields: 'שדות נתונים',
      navWatchFaces: 'פני שעון',
      navContact: 'יצירת קשר',
      navTracker: 'מעקב חי',
      navRun: 'לוח מרוצים',
      searchPlaceholder: 'חיפוש אפליקציות…',
      featuredDesc: 'בחירות חדשות ואהובי הקהל — מתעדכנים לפי נתונים בזמן אמת.',
      dataFieldsDesc: 'כלי ביצועים לקצב, לתחזית ולמעקב חי.',
      watchFacesDesc: 'פני שעון יצירתיים עם קונספט חזותי ייחודי.',
      trackerWebDesc: 'עקבו אחרי ספורטאים בזמן אמת עם Garmin LiveTrack: מסלול חי, נתונים והמיקום שלכם על המפה. בנגיעה אחת, Google Maps ינווט אתכם אל הספורטאי.',
      trackerWebBtn: 'פתיחת המעקב ←',
      runWebDesc: 'מצאו את המרוצים הבאים שלכם במקום אחד.',
      runWebBtn: 'פתיחת הלוח ←',
      contactTitle: 'יצירת קשר',
      contactText: 'שאלות, משוב או רעיונות לפיצ׳רים? אשמח לשמוע מכם.',
      contactBtn: 'שליחת דוא״ל',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'ניסיון חינם',
      moreVersions: 'גרסאות נוספות ▾',
      liteVersion: 'גרסת Lite',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'גרסה במיילים',
      payAlt: 'ניסיון חינם ואמצעי תשלום נוספים בהמשך',
      carouselPrev: 'האפליקציה המומלצת הקודמת',
      carouselNext: 'האפליקציה המומלצת הבאה',
      seeDetails: 'לפרטים',
      slideOf: 'הצגת שקופית {n} מתוך {total}',
      viewApp: 'הצגת {title}',
      langLabel: 'שפה',
      appDesc: {
        'Live Predictor Premium': 'תחזיות מתקדמות בזמן אמת עם הגדרות גמישות.',
        'Live Time Predictor': 'תחזית זמן חיה למרחקים מותאמים אישית.',
        'Pacer Data Field': 'הנחיית קצב בזמן אמת כדי להישאר בדיוק ביעד.',
        'Split Pacer Pro': 'קו הסיום וזמני ביניים: הקצב הנדרש בזמן אמת, זמן הגעה משוער, הקדמה/פיגור והתקדמות במקטע.',
        'Live Pace Speed Calculator': 'הקצב או המהירות הנדרשים ליעדים שלכם.',
        'Tracker Data Field': 'שתפו את הפעילות שלכם בזמן אמת עם מזהה מעקב ייחודי.',
        'Route Silhouette': 'מציג בשעון את פעילות ה־GPS האחרונה שלכם מ־Strava.',
        'Premium Route Silhouette': 'פני שעון פרימיום: מסלול ה־Strava האחרון שלכם עם תוספות ורקעים מרובים.',
        'Time Across The Galaxy': 'פני שעון בהשראת גלקסיה רחוקה.',
        'Solve for X': 'פתרו חידה כדי לגלות את השעה.',
        'Football Matches': 'המשחקים של הקבוצה שלכם על פני השעון: תוצאה חיה, דקת המשחק והמשחק הבא.',
        'Dynamic Hours': 'פני שעון אנלוגיים שמציגים את השעה בפורמט 24 שעות, כך ש־1 בלילה ו־1 בצהריים לעולם לא נראים אותו דבר.',
        'Volty': 'פני שעון מונפשים בכיכובו של Volty, סוללה קטנה שמתאמנת איתכם. מצב הרוח שלה מראה כמה טעינה נשארה בשעון.'
      },
      momentumTags: {
        trending: '🔥 חם השבוע',
        popular: '🏆 פופולרי ונפוץ',
        consistent: '💪 בשימוש פעיל',
        discovered: '📈 התגלה לאחרונה'
      },
      tooltips: {
        trending: {
          title: '🔥 חם השבוע',
          message: 'ספורטאים רבים בחרו באפליקציה הזו לאחרונה, ולכן היא אחת הבחירות הפעילות ביותר השבוע.',
          note: 'מבוסס על התקנות שבועיות עדכניות.'
        },
        popular: {
          title: '🏆 פופולרי ונפוץ',
          message: 'לאפליקציה הזו קהל גדול וותיק ושימוש שבועי ער בקרב ספורטאים.',
          note: 'משקף גם את סך ההתקנות וגם את מספר הספורטאים הפעילים.'
        },
        consistent: {
          title: '💪 בשימוש פעיל',
          message: 'קבוצה יציבה של ספורטאים משתמשת באפליקציה הזו השבוע.',
          note: 'מבוסס על משתמשים פעילים ב־7 הימים האחרונים.'
        },
        discovered: {
          title: '📈 התגלה לאחרונה',
          message: 'צובר התקנות חדשות ב־7 הימים האחרונים.',
          note: 'מבוסס על התקנות אחרונות.'
        }
      },
      metrics: {
        totalDownloads: 'סך ההורדות:',
        installs7d: 'התקנות (7 ימים):',
        activeUsers: 'משתמשים פעילים (7 ימים):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'פרימיום', class: 'premium'   }, headline: '💎 פרימיום — ניסיון חינם' },
        new:      { badge: { emoji: '✨', word: 'חדש', class: 'fresh'     }, headline: '✨ הושק עכשיו' },
        installs: { badge: { emoji: '🔥', word: 'חם', class: 'trending'  }, headline: '🔥 פופולרי השבוע' },
        total:    { badge: { emoji: '🏆', word: 'פופולרי', class: 'popular'   }, headline: '🏆 אהוב מכל הזמנים' },
        users:    { badge: { emoji: '💪', word: 'עקבי', class: 'consistent'}, headline: '💪 ספורטאים ממשיכים להשתמש' },
        spotlight:{ badge: { emoji: '⭐', word: 'מומלץ', class: 'trending'  }, headline: '⭐ הרבה התקנות בשבוע' },
        topDataField: { badge: { emoji: '📊', word: 'אהוב', class: 'popular' }, headline: '📊 שדה הנתונים האהוב' },
        topWatchFace: { badge: { emoji: '⌚', word: 'אהוב', class: 'popular' }, headline: '⌚ פני השעון האהובים' }
      }
    },

    id: {
      headerSubtitle: 'Dikembangkan oleh M. Mendelson',
      navFeatured: 'Unggulan',
      navDataFields: 'Bidang Data',
      navWatchFaces: 'Tampilan Jam',
      navContact: 'Kontak',
      navTracker: 'Pelacak Langsung',
      navRun: 'Kalender Lomba Lari',
      searchPlaceholder: 'Cari aplikasi…',
      featuredDesc: 'Pilihan terbaru dan favorit pengguna — diperbarui dari statistik langsung.',
      dataFieldsDesc: 'Alat performa untuk pace, prediksi, dan pelacakan langsung.',
      watchFacesDesc: 'Tampilan jam kreatif dengan konsep visual yang khas.',
      trackerWebDesc: 'Ikuti atlet secara real-time dengan Garmin LiveTrack: rute langsung, metrik, dan lokasi Anda di peta. Sekali ketuk, Google Maps memandu Anda ke lokasi atlet.',
      trackerWebBtn: 'Buka Pelacak →',
      runWebDesc: 'Temukan lomba berikutnya di satu tempat.',
      runWebBtn: 'Buka Kalender →',
      contactTitle: 'Kontak',
      contactText: 'Punya pertanyaan, masukan, atau ide fitur? Senang mendengarnya.',
      contactBtn: 'Kirim email',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'UJI COBA GRATIS',
      moreVersions: 'Versi lain ▾',
      liteVersion: 'Versi Lite',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Versi mil',
      payAlt: 'Uji coba gratis & metode pembayaran lain di bawah',
      carouselPrev: 'Aplikasi unggulan sebelumnya',
      carouselNext: 'Aplikasi unggulan berikutnya',
      seeDetails: 'Lihat detail',
      slideOf: 'Tampilkan slide {n} dari {total}',
      viewApp: 'Lihat {title}',
      langLabel: 'Bahasa',
      appDesc: {
        'Live Predictor Premium': 'Prediksi real-time tingkat lanjut dengan konfigurasi fleksibel.',
        'Live Time Predictor': 'Prediksi waktu langsung untuk jarak pilihan Anda.',
        'Pacer Data Field': 'Panduan pace real-time agar tetap tepat di target.',
        'Split Pacer Pro': 'Garis finis plus split antara: pace yang dibutuhkan secara langsung, perkiraan tiba, unggul/tertinggal, dan progres segmen.',
        'Live Pace Speed Calculator': 'Pace atau kecepatan yang dibutuhkan untuk target Anda sendiri.',
        'Tracker Data Field': 'Bagikan aktivitas Anda secara langsung dengan ID pelacak unik.',
        'Route Silhouette': 'Menampilkan aktivitas Strava berbasis GPS terbaru Anda di jam.',
        'Premium Route Silhouette': 'Tampilan jam premium: rute Strava terbaru Anda dengan komplikasi dan beragam latar.',
        'Time Across The Galaxy': 'Tampilan jam bertema kosmik yang terinspirasi galaksi nun jauh di sana.',
        'Solve for X': 'Pecahkan teka-teki untuk melihat waktu.',
        'Football Matches': 'Pertandingan klub Anda di tampilan jam: skor langsung, menit pertandingan, dan laga berikutnya.',
        'Dynamic Hours': 'Tampilan jam analog yang menunjukkan waktu dalam format 24 jam, jadi pukul 1 dini hari dan 1 siang tidak pernah terlihat sama.',
        'Volty': 'Tampilan jam animasi yang dibintangi Volty, baterai kecil yang berlatih bersama Anda. Suasana hatinya menunjukkan sisa daya jam Anda.'
      },
      momentumTags: {
        trending: '🔥 Sedang Tren Minggu Ini',
        popular: '🏆 Populer dan Banyak Dipakai',
        consistent: '💪 Aktif Digunakan',
        discovered: '📈 Baru Ditemukan'
      },
      tooltips: {
        trending: {
          title: '🔥 Sedang Tren Minggu Ini',
          message: 'Banyak atlet memilih aplikasi ini belakangan ini, menjadikannya salah satu pilihan paling aktif minggu ini.',
          note: 'Berdasarkan pemasangan mingguan terbaru.'
        },
        popular: {
          title: '🏆 Populer dan Banyak Dipakai',
          message: 'Aplikasi ini memiliki banyak pengguna jangka panjang dan penggunaan mingguan yang kuat di kalangan atlet.',
          note: 'Mencerminkan total pemasangan dan atlet aktif.'
        },
        consistent: {
          title: '💪 Aktif Digunakan',
          message: 'Sekelompok besar atlet menggunakan aplikasi ini minggu ini.',
          note: 'Berdasarkan pengguna aktif selama 7 hari terakhir.'
        },
        discovered: {
          title: '📈 Baru Ditemukan',
          message: 'Mendapat pemasangan baru dalam 7 hari terakhir.',
          note: 'Berdasarkan pemasangan terbaru.'
        }
      },
      metrics: {
        totalDownloads: 'Total unduhan:',
        installs7d: 'Pemasangan (7 hari):',
        activeUsers: 'Pengguna aktif (7 hari):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — uji coba gratis' },
        new:      { badge: { emoji: '✨', word: 'Baru', class: 'fresh'     }, headline: '✨ Baru diluncurkan' },
        installs: { badge: { emoji: '🔥', word: 'Tren', class: 'trending'  }, headline: '🔥 Populer Minggu Ini' },
        total:    { badge: { emoji: '🏆', word: 'Populer', class: 'popular'   }, headline: '🏆 Favorit Sepanjang Masa' },
        users:    { badge: { emoji: '💪', word: 'Konsisten', class: 'consistent'}, headline: '💪 Atlet terus menggunakannya' },
        spotlight:{ badge: { emoji: '⭐', word: 'Unggulan', class: 'trending'  }, headline: '⭐ Banyak pemasangan mingguan' },
        topDataField: { badge: { emoji: '📊', word: 'Favorit', class: 'popular' }, headline: '📊 Bidang Data Favorit' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Favorit', class: 'popular' }, headline: '⌚ Tampilan Jam Favorit' }
      }
    },

    ms: {
      headerSubtitle: 'Dibangunkan oleh M. Mendelson',
      navFeatured: 'Pilihan',
      navDataFields: 'Medan Data',
      navWatchFaces: 'Muka Jam',
      navContact: 'Hubungi',
      navTracker: 'Penjejak Langsung',
      navRun: 'Kalendar Larian',
      searchPlaceholder: 'Cari aplikasi…',
      featuredDesc: 'Pilihan terbaharu dan kegemaran ramai — dikemas kini daripada statistik langsung.',
      dataFieldsDesc: 'Alat prestasi untuk rentak, ramalan dan penjejakan langsung.',
      watchFacesDesc: 'Muka jam kreatif dengan konsep visual tersendiri.',
      trackerWebDesc: 'Ikuti atlet secara masa nyata dengan Garmin LiveTrack: laluan langsung, metrik dan lokasi anda pada peta. Sekali ketik, Google Maps membawa anda ke lokasi atlet.',
      trackerWebBtn: 'Buka Penjejak →',
      runWebDesc: 'Cari larian anda yang seterusnya di satu tempat.',
      runWebBtn: 'Buka Kalendar →',
      contactTitle: 'Hubungi',
      contactText: 'Ada soalan, maklum balas atau idea ciri? Saya gembira mendengarnya.',
      contactBtn: 'Hantar e-mel',
      footer: '© 2026 M. Mendelson',
      freeTrial: 'PERCUBAAN PERCUMA',
      moreVersions: 'Versi lain ▾',
      liteVersion: 'Versi Lite',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Versi batu',
      payAlt: 'Percubaan percuma & kaedah pembayaran lain di bawah',
      carouselPrev: 'Aplikasi pilihan sebelumnya',
      carouselNext: 'Aplikasi pilihan seterusnya',
      seeDetails: 'Lihat butiran',
      slideOf: 'Tunjukkan slaid {n} daripada {total}',
      viewApp: 'Lihat {title}',
      langLabel: 'Bahasa',
      appDesc: {
        'Live Predictor Premium': 'Ramalan masa nyata lanjutan dengan konfigurasi fleksibel.',
        'Live Time Predictor': 'Ramalan masa langsung untuk jarak pilihan anda.',
        'Pacer Data Field': 'Panduan rentak masa nyata supaya kekal tepat pada sasaran.',
        'Split Pacer Pro': 'Garisan penamat serta catatan perantaraan: rentak diperlukan secara langsung, anggaran ketibaan, mendahului/ketinggalan dan kemajuan segmen.',
        'Live Pace Speed Calculator': 'Rentak atau kelajuan yang diperlukan untuk sasaran anda sendiri.',
        'Tracker Data Field': 'Kongsi aktiviti anda secara langsung dengan ID penjejak unik.',
        'Route Silhouette': 'Memaparkan aktiviti Strava berasaskan GPS terkini anda pada jam.',
        'Premium Route Silhouette': 'Muka jam premium: laluan Strava terkini anda dengan komplikasi dan pelbagai latar.',
        'Time Across The Galaxy': 'Muka jam bertema kosmik yang diilhamkan oleh galaksi nun jauh di sana.',
        'Solve for X': 'Selesaikan teka-teki untuk mendedahkan masa.',
        'Football Matches': 'Perlawanan kelab anda pada muka jam: skor langsung, minit perlawanan dan perlawanan seterusnya.',
        'Dynamic Hours': 'Muka jam analog yang memaparkan masa dalam format 24 jam, jadi pukul 1 pagi dan 1 petang tidak pernah kelihatan sama.',
        'Volty': 'Muka jam animasi yang dibintangi Volty, bateri kecil yang berlatih bersama anda. Moodnya menunjukkan baki cas jam anda.'
      },
      momentumTags: {
        trending: '🔥 Trending Minggu Ini',
        popular: '🏆 Popular dan Digunakan Meluas',
        consistent: '💪 Digunakan Secara Aktif',
        discovered: '📈 Baru Ditemui'
      },
      tooltips: {
        trending: {
          title: '🔥 Trending Minggu Ini',
          message: 'Ramai atlet memilih aplikasi ini baru-baru ini, menjadikannya antara pilihan paling aktif minggu ini.',
          note: 'Berdasarkan pemasangan mingguan terkini.'
        },
        popular: {
          title: '🏆 Popular dan Digunakan Meluas',
          message: 'Aplikasi ini mempunyai ramai pengguna jangka panjang dan penggunaan mingguan yang tinggi dalam kalangan atlet.',
          note: 'Mencerminkan jumlah pemasangan dan atlet aktif.'
        },
        consistent: {
          title: '💪 Digunakan Secara Aktif',
          message: 'Sekumpulan besar atlet menggunakan aplikasi ini minggu ini.',
          note: 'Berdasarkan pengguna aktif dalam 7 hari lepas.'
        },
        discovered: {
          title: '📈 Baru Ditemui',
          message: 'Menerima pemasangan baharu dalam 7 hari lepas.',
          note: 'Berdasarkan pemasangan terkini.'
        }
      },
      metrics: {
        totalDownloads: 'Jumlah muat turun:',
        installs7d: 'Pemasangan (7 hari):',
        activeUsers: 'Pengguna aktif (7 hari):'
      },
      featuredReasons: {
        premium:  { badge: { emoji: '💎', word: 'Premium', class: 'premium'   }, headline: '💎 Premium — percubaan percuma' },
        new:      { badge: { emoji: '✨', word: 'Baharu', class: 'fresh'     }, headline: '✨ Baru dilancarkan' },
        installs: { badge: { emoji: '🔥', word: 'Trending', class: 'trending'  }, headline: '🔥 Popular Minggu Ini' },
        total:    { badge: { emoji: '🏆', word: 'Popular', class: 'popular'   }, headline: '🏆 Kegemaran Sepanjang Zaman' },
        users:    { badge: { emoji: '💪', word: 'Konsisten', class: 'consistent'}, headline: '💪 Atlet terus menggunakannya' },
        spotlight:{ badge: { emoji: '⭐', word: 'Pilihan', class: 'trending'  }, headline: '⭐ Banyak pemasangan mingguan' },
        topDataField: { badge: { emoji: '📊', word: 'Kegemaran', class: 'popular' }, headline: '📊 Medan Data Kegemaran' },
        topWatchFace: { badge: { emoji: '⌚', word: 'Kegemaran', class: 'popular' }, headline: '⌚ Muka Jam Kegemaran' }
      }
    }

  };

  /* ── Language detection ───────────────────────────────────────────────────── */
  // The 28 locales of the Connect IQ Store listings — the same set as
  // run.mmendelson.com. The code is the URL prefix (/pt-pt/, /zh-tw/ …).
  var SUPPORTED = ['de', 'en', 'es', 'fr', 'it', 'pt', 'ru', 'nl', 'pt-pt', 'pl',
                   'cs', 'sk', 'sl', 'hr', 'hu', 'el', 'da', 'nb', 'sv', 'fi',
                   'ja', 'ko', 'zh-cn', 'zh-tw', 'th', 'he', 'id', 'ms'];
  // <html lang> for the codes that are not already a valid BCP-47 tag as-is.
  var HTML_LANG = { 'pt-pt': 'pt-PT', 'zh-cn': 'zh-CN', 'zh-tw': 'zh-TW' };
  var RTL = ['he'];

  function langFromPath() {
    var seg = (location.pathname.split('/')[1] || '').toLowerCase();
    return SUPPORTED.indexOf(seg) >= 0 ? seg : null;
  }

  // One BCP-47 tag → a site language, or null. Regional variants that are
  // languages of their own here are told apart by subtag (pt-PT, zh-TW); the
  // Store's Java codes iw/in and the Norwegian umbrella no/nn fold into
  // he/id/nb. Mirrors _langFromTag in run.mmendelson.com's app.js.
  function langFromTag(tag) {
    var p = String(tag || '').toLowerCase().replace(/_/g, '-').split('-');
    var b = p[0], sub = p.slice(1);
    function has(list) { for (var i = 0; i < sub.length; i++) { if (list.indexOf(sub[i]) >= 0) return true; } return false; }
    if (b === 'pt') return has(['pt', 'ao', 'mz', 'cv', 'gw', 'st', 'tl']) ? 'pt-pt' : 'pt';
    if (b === 'zh') return has(['hans']) ? 'zh-cn' : (has(['hant', 'tw', 'hk', 'mo']) ? 'zh-tw' : 'zh-cn');
    if (b === 'no' || b === 'nn') return 'nb';
    if (b === 'iw') return 'he';
    if (b === 'in') return 'id';
    return SUPPORTED.indexOf(b) >= 0 ? b : null;
  }

  function langFromBrowser() {
    var prefs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language];
    for (var i = 0; i < prefs.length; i++) {
      var l = langFromTag(prefs[i]);
      if (l) return l;
    }
    return null;
  }

  var lang = langFromPath() || langFromBrowser() || 'en';

  /* Redirect root to detected language */
  var _p = location.pathname;
  if (_p === '/' || _p === '/index.html') {
    location.replace('/' + lang + '/');
    return;
  }

  /* ── Expose globals used by script.js ────────────────────────────────────── */
  var tr = T[lang] || T.en;
  window.currentLang = lang;
  window._T = tr;
  window.TOOLTIP_TEXT = tr.tooltips;
  window.FEATURED_REASON_COPY = tr.featuredReasons;

  /* ── Apply static DOM translations ───────────────────────────────────────── */
  function resolve(key) {
    var parts = key.split('.');
    var v = tr;
    for (var i = 0; i < parts.length; i++) { v = v && v[parts[i]]; }
    return typeof v === 'string' ? v : null;
  }

  function applyTranslations() {
    document.documentElement.lang = HTML_LANG[lang] || lang;
    if (RTL.indexOf(lang) >= 0) document.documentElement.dir = 'rtl';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = resolve(el.getAttribute('data-i18n'));
      if (val === null) return;
      if (el.tagName === 'INPUT') { el.placeholder = val; }
      else { el.textContent = val; }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var val = resolve(el.getAttribute('data-i18n-aria'));
      if (val !== null) { el.setAttribute('aria-label', val); }
    });

    /* App descriptions via card data-name */
    document.querySelectorAll('.card[data-name]').forEach(function (card) {
      var name = card.getAttribute('data-name');
      var desc = tr.appDesc && tr.appDesc[name];
      if (desc) {
        var p = card.querySelector('p');
        if (p) { p.textContent = desc; }
      }
    });
  }

  /* ── Language selector ────────────────────────────────────────────────────── */
  function buildLangSelector() {
    var sel = document.querySelector('.lang-selector');
    if (!sel) return;

    /* Mark active and reorder: active language first */
    var dropdown = sel.querySelector('.lang-dropdown');
    var options = dropdown.querySelectorAll('.lang-option');
    options.forEach(function (a) {
      var code = a.getAttribute('href').replace(/\//g, '');
      a.classList.toggle('active', code === lang);
    });
    var activeOpt = dropdown.querySelector('.lang-option.active');
    if (activeOpt) dropdown.insertBefore(activeOpt, dropdown.firstChild);

    /* Update aria-label to translated string */
    sel.querySelector('.lang-btn').setAttribute('aria-label', tr.langLabel || 'Language');

    /* Toggle behaviour */
    sel.querySelector('.lang-btn').addEventListener('click', function () {
      sel.classList.toggle('open');
    });
    sel.addEventListener('click', function (e) { e.stopPropagation(); });
    document.addEventListener('click', function () { sel.classList.remove('open'); });
  }

  /* ── Hamburger menu ──────────────────────────────────────────────────────── */
  function buildHamburger() {
    var btn = document.querySelector('.nav-hamburger');
    if (!btn) return;
    var nav = btn.closest('nav');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      applyTranslations();
      buildLangSelector();
      buildHamburger();
    });
  } else {
    applyTranslations();
    buildLangSelector();
    buildHamburger();
  }
})();
