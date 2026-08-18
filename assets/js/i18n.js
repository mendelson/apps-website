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
        'Football Matches': 'Die Spiele deines Vereins auf dem Zifferblatt: Live-Ergebnis, Spielminute und nächste Partie.'
      },
      momentumTags: {
        trending: '🔥 Trend Diese Woche',
        popular: '🏆 Beliebt und Weit Verbreitet',
        consistent: '💪 Aktiv Genutzt',
        discovered: '📈 Neu Entdeckt',
        launched: '✨ Gerade Erschienen',
        established: '⭐ Etabliert'
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
        },
        launched: {
          title: '✨ Gerade Erschienen',
          message: 'Neu im Connect IQ Store — die Zahlen fangen gerade erst an zu wachsen.',
          note: 'Basierend auf der Zeit seit der Veröffentlichung.'
        },
        established: {
          title: '⭐ Etabliert',
          message: 'Schon eine Weile im Connect IQ Store. Hier das vollständige Bild.',
          note: 'Basierend auf den Gesamt-Downloads.'
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
        'Football Matches': 'Your club’s matches on the watch face: live score, match clock and the next fixture.'
      },
      momentumTags: {
        trending: '🔥 Trending This Week',
        popular: '🏆 Popular and Widely Used',
        consistent: '💪 Actively Used',
        discovered: '📈 Newly Discovered',
        launched: '✨ Just Launched',
        established: '⭐ Established'
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
        },
        launched: {
          title: '✨ Just Launched',
          message: 'New on the Connect IQ Store — the numbers are only starting to build.',
          note: 'Based on time since launch.'
        },
        established: {
          title: '⭐ Established',
          message: 'On the Connect IQ Store for a while now. Here is the full picture.',
          note: 'Based on all-time downloads.'
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
        'Football Matches': 'Los partidos de tu equipo en la esfera: marcador en vivo, minuto y próximo partido.'
      },
      momentumTags: {
        trending: '🔥 Tendencia Esta Semana',
        popular: '🏆 Popular y Ampliamente Usada',
        consistent: '💪 Usada Activamente',
        discovered: '📈 Recién Descubierta',
        launched: '✨ Recién Lanzada',
        established: '⭐ Consolidada'
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
        },
        launched: {
          title: '✨ Recién Lanzada',
          message: 'Nueva en la Connect IQ Store — las cifras apenas empiezan a crecer.',
          note: 'Basado en el tiempo desde el lanzamiento.'
        },
        established: {
          title: '⭐ Consolidada',
          message: 'Lleva ya un tiempo en la Connect IQ Store. Este es el panorama completo.',
          note: 'Basado en las descargas totales.'
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
        'Football Matches': 'Les matchs de ton club sur le cadran : score en direct, minute et prochain match.'
      },
      momentumTags: {
        trending: '🔥 Tendance Cette Semaine',
        popular: '🏆 Populaire et Largement Utilisée',
        consistent: '💪 Activement Utilisée',
        discovered: '📈 Nouvellement Découverte',
        launched: '✨ Tout Juste Lancée',
        established: '⭐ Établie'
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
        },
        launched: {
          title: '✨ Tout Juste Lancée',
          message: 'Nouvelle sur le Connect IQ Store — les chiffres commencent tout juste à monter.',
          note: 'Basé sur le temps écoulé depuis le lancement.'
        },
        established: {
          title: '⭐ Établie',
          message: 'Présente sur le Connect IQ Store depuis un moment. Voici le tableau complet.',
          note: 'Basé sur les téléchargements totaux.'
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
        'Football Matches': 'Os jogos do seu time no mostrador: placar ao vivo, minuto e o próximo jogo.'
      },
      momentumTags: {
        trending: '🔥 Em Alta Esta Semana',
        popular: '🏆 Popular e Amplamente Usado',
        consistent: '💪 Usado Ativamente',
        discovered: '📈 Recém-Descoberto',
        launched: '✨ Recém-Lançado',
        established: '⭐ Consolidado'
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
        },
        launched: {
          title: '✨ Recém-Lançado',
          message: 'Novo na Connect IQ Store — os números estão apenas começando a crescer.',
          note: 'Com base no tempo desde o lançamento.'
        },
        established: {
          title: '⭐ Consolidado',
          message: 'Já há algum tempo na Connect IQ Store. Este é o quadro completo.',
          note: 'Com base nos downloads totais.'
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
        'Football Matches': 'Le partite della tua squadra sul quadrante: risultato in diretta, minuto e prossimo incontro.'
      },
      momentumTags: {
        trending: '🔥 Di tendenza questa settimana',
        popular: '🏆 Popolare e molto usata',
        consistent: '💪 Usata attivamente',
        discovered: '📈 Scoperta di recente',
        launched: '✨ Appena lanciata',
        established: '⭐ Consolidata'
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
        },
        launched: {
          title: '✨ Appena lanciata',
          message: 'Nuova sul Connect IQ Store — i numeri stanno appena iniziando a crescere.',
          note: 'In base al tempo trascorso dal lancio.'
        },
        established: {
          title: '⭐ Consolidata',
          message: 'Sul Connect IQ Store ormai da tempo. Ecco il quadro completo.',
          note: 'In base ai download totali.'
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
        'Football Matches': 'Матчи вашей команды на циферблате: счёт в реальном времени, минута и следующая игра.'
      },
      momentumTags: {
        trending: '🔥 В тренде на этой неделе',
        popular: '🏆 Популярно и широко используется',
        consistent: '💪 Активно используется',
        discovered: '📈 Набирает популярность',
        launched: '✨ Только что вышло',
        established: '⭐ Проверено временем'
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
        },
        launched: {
          title: '✨ Только что вышло',
          message: 'Новинка в Connect IQ Store — цифры только начинают расти.',
          note: 'По времени с момента выхода.'
        },
        established: {
          title: '⭐ Проверено временем',
          message: 'Уже некоторое время в Connect IQ Store. Вот полная картина.',
          note: 'По общему числу загрузок.'
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
    }

  };

  /* ── Language detection ───────────────────────────────────────────────────── */
  var SUPPORTED = ['de', 'en', 'es', 'fr', 'it', 'pt', 'ru'];

  function langFromPath() {
    var m = location.pathname.match(/^\/(de|en|es|fr|it|pt|ru)(\/|$)/);
    return m ? m[1] : null;
  }

  function langFromBrowser() {
    var raw = (navigator.language || '').toLowerCase().split('-')[0];
    return SUPPORTED.indexOf(raw) >= 0 ? raw : null;
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
    document.documentElement.lang = lang;

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
