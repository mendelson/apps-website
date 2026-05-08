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
      searchPlaceholder: 'Apps suchen…',
      featuredDesc: 'Frische Auswahl und Publikumslieblinge — aktuell aus Live-Statistiken.',
      dataFieldsDesc: 'Leistungstools für Tempo, Vorhersage und Live-Tracking.',
      watchFacesDesc: 'Kreative Zifferblätter mit markanten visuellen Konzepten.',
      contactTitle: 'Kontakt',
      contactText: 'Fragen, Feedback oder Funktionsideen? Ich freue mich, von Ihnen zu hören.',
      contactBtn: 'E-Mail senden',
      footer: '© 2026 M. Mendelson — Garmin Connect IQ Apps',
      freeTrial: 'KOSTENLOS TESTEN',
      moreVersions: 'Weitere Versionen ▾',
      liteVersion: 'Lite-Version',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Meilen-Version',
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
        'Time Across The Galaxy': 'Kosmisch inspiriertes Zifferblatt, inspiriert von einer weit entfernten Galaxie.',
        'Solve for X': 'Lösen Sie ein Rätsel, um die Uhrzeit zu enthüllen.'
      },
      momentumTags: {
        trending: '🔥 Trend Diese Woche',
        popular: '🏆 Beliebt und Weit Verbreitet',
        consistent: '💪 Regelmäßig Genutzt',
        discovered: '📈 Neu Entdeckt',
        trusted: '👍 Von Athleten Vertraut',
        niche: '✨ Nischen-App'
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
          title: '💪 Regelmäßig von Athleten Genutzt',
          message: 'Athleten verlassen sich regelmäßig auf diese App und halten eine stabile 7-Tage-Nutzung aufrecht.',
          note: 'Bindungsorientierter Einblick.'
        },
        discovered: {
          title: '📈 Neu von Athleten Entdeckt',
          message: 'Eine solide Anzahl neuer Athleten hat diese App in den letzten 7 Tagen entdeckt und installiert.',
          note: 'Basierend auf aktuellen Installationen.'
        },
        trusted: {
          title: '👍 Von einer Kerngruppe Vertraut',
          message: 'Eine zuverlässige Gruppe von Athleten nutzt diese App über die letzten 7 Tage weiterhin.',
          note: 'Stabile Nutzung über die Zeit.'
        },
        niche: {
          title: '✨ Neue oder Nischen-App',
          message: 'Diese App hat ein großes Gesamtpublikum und starke 7-Tage-Nutzung.',
          note: 'Fokussiertes oder frühes Nutzungsmuster.'
        }
      },
      metrics: {
        totalDownloads: 'Gesamte Downloads:',
        installs7d: 'Installationen (7 Tage):',
        activeUsers: 'Aktive Nutzer (7 Tage):'
      },
      featuredReasons: {
        new:      { badge: { emoji: '✨', word: 'Neu gestartet',    class: 'fresh'     }, headline: '✨ Neu gestartet' },
        installs: { badge: { emoji: '🔥', word: 'Im Trend',         class: 'trending'  }, headline: '🔥 Beliebt Diese Woche' },
        total:    { badge: { emoji: '🏆', word: 'Beliebt',          class: 'popular'   }, headline: '🏆 Aller-Zeiten-Favorit' },
        users:    { badge: { emoji: '💪', word: 'Regelmäßig',       class: 'consistent'}, headline: '💪 Athleten nutzen es weiterhin' },
        spotlight:{ badge: { emoji: '⭐', word: 'Im Rampenlicht',   class: 'trending'  }, headline: '⭐ Starke wöchentliche Installationen' }
      }
    },

    en: {
      headerSubtitle: 'Developed by M. Mendelson',
      navFeatured: 'Featured',
      navDataFields: 'Data Fields',
      navWatchFaces: 'Watch Faces',
      navContact: 'Contact',
      searchPlaceholder: 'Search apps…',
      featuredDesc: 'Fresh picks and crowd favorites — updated from live stats.',
      dataFieldsDesc: 'Performance tools for pacing, prediction and live tracking.',
      watchFacesDesc: 'Creative watch faces with distinctive visual concepts.',
      contactTitle: 'Contact',
      contactText: "Questions, feedback or feature ideas? I'd be glad to hear from you.",
      contactBtn: 'Send email',
      footer: '© 2026 M. Mendelson — Garmin Connect IQ Apps',
      freeTrial: 'FREE TRIAL',
      moreVersions: 'More versions ▾',
      liteVersion: 'Lite version',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Miles version',
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
        'Time Across The Galaxy': 'Cosmic-themed watch face inspired by a galaxy far away.',
        'Solve for X': 'Solve a puzzle to reveal the time.'
      },
      momentumTags: {
        trending: '🔥 Trending This Week',
        popular: '🏆 Popular and Widely Used',
        consistent: '💪 Consistently Used',
        discovered: '📈 Newly Discovered',
        trusted: '👍 Trusted by Athletes',
        niche: '✨ Niche App'
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
          title: '💪 Consistently Used by Athletes',
          message: 'Athletes rely on this app regularly, maintaining steady 7-day usage.',
          note: 'Retention-focused insight.'
        },
        discovered: {
          title: '📈 Newly Discovered by Athletes',
          message: 'A solid number of new athletes have discovered and installed this app in the last 7 days.',
          note: 'Based on recent installs.'
        },
        trusted: {
          title: '👍 Trusted by a Core Group',
          message: 'A reliable group of athletes keeps using this app over the last 7 days.',
          note: 'Stable usage over time.'
        },
        niche: {
          title: '✨ New or Niche App',
          message: 'This app has a large overall audience and strong 7-day usage.',
          note: 'Focused or early-stage usage pattern.'
        }
      },
      metrics: {
        totalDownloads: 'Total Downloads:',
        installs7d: 'Installs (7 days):',
        activeUsers: 'Active Users (7 days):'
      },
      featuredReasons: {
        new:      { badge: { emoji: '✨', word: 'Newly launched', class: 'fresh'     }, headline: '✨ Newly launched' },
        installs: { badge: { emoji: '🔥', word: 'Trending',       class: 'trending'  }, headline: '🔥 Popular This Week' },
        total:    { badge: { emoji: '🏆', word: 'Popular',        class: 'popular'   }, headline: '🏆 All-Time Favorite' },
        users:    { badge: { emoji: '💪', word: 'Consistent',     class: 'consistent'}, headline: '💪 Athletes keep using it' },
        spotlight:{ badge: { emoji: '⭐', word: 'Featured',       class: 'trending'  }, headline: '⭐ Strong weekly installs' }
      }
    },

    es: {
      headerSubtitle: 'Desarrollado por M. Mendelson',
      navFeatured: 'Destacados',
      navDataFields: 'Campos de datos',
      navWatchFaces: 'Esferas',
      navContact: 'Contacto',
      searchPlaceholder: 'Buscar apps…',
      featuredDesc: 'Selecciones frescas y favoritos de la comunidad — actualizados con estadísticas en vivo.',
      dataFieldsDesc: 'Herramientas de rendimiento para ritmo, predicción y seguimiento en vivo.',
      watchFacesDesc: 'Esferas creativas con conceptos visuales distintivos.',
      contactTitle: 'Contacto',
      contactText: '¿Preguntas, comentarios o ideas de funciones? Me encantaría escucharte.',
      contactBtn: 'Enviar correo',
      footer: '© 2026 M. Mendelson — Garmin Connect IQ Apps',
      freeTrial: 'PRUEBA GRATIS',
      moreVersions: 'Más versiones ▾',
      liteVersion: 'Versión Lite',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Versión millas',
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
        'Time Across The Galaxy': 'Esfera con temática cósmica inspirada en una galaxia lejana.',
        'Solve for X': 'Resuelve un rompecabezas para revelar la hora.'
      },
      momentumTags: {
        trending: '🔥 Tendencia Esta Semana',
        popular: '🏆 Popular y Ampliamente Usada',
        consistent: '💪 Usada Consistentemente',
        discovered: '📈 Recién Descubierta',
        trusted: '👍 Confiada por Atletas',
        niche: '✨ App de Nicho'
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
          title: '💪 Usada Consistentemente por Atletas',
          message: 'Los atletas dependen de esta app regularmente, manteniendo un uso estable de 7 días.',
          note: 'Enfoque en retención.'
        },
        discovered: {
          title: '📈 Recién Descubierta por Atletas',
          message: 'Un número sólido de nuevos atletas ha descubierto e instalado esta app en los últimos 7 días.',
          note: 'Basado en instalaciones recientes.'
        },
        trusted: {
          title: '👍 Confiada por un Grupo Central',
          message: 'Un grupo confiable de atletas sigue usando esta app durante los últimos 7 días.',
          note: 'Uso estable a lo largo del tiempo.'
        },
        niche: {
          title: '✨ App Nueva o de Nicho',
          message: 'Esta app tiene una gran audiencia general y un fuerte uso de 7 días.',
          note: 'Patrón de uso enfocado o en fase inicial.'
        }
      },
      metrics: {
        totalDownloads: 'Descargas totales:',
        installs7d: 'Instalaciones (7 días):',
        activeUsers: 'Usuarios activos (7 días):'
      },
      featuredReasons: {
        new:      { badge: { emoji: '✨', word: 'Nuevo lanzamiento', class: 'fresh'     }, headline: '✨ Nuevo lanzamiento' },
        installs: { badge: { emoji: '🔥', word: 'Tendencia',         class: 'trending'  }, headline: '🔥 Popular Esta Semana' },
        total:    { badge: { emoji: '🏆', word: 'Popular',           class: 'popular'   }, headline: '🏆 Favorito de Todos los Tiempos' },
        users:    { badge: { emoji: '💪', word: 'Constante',         class: 'consistent'}, headline: '💪 Los atletas siguen usándola' },
        spotlight:{ badge: { emoji: '⭐', word: 'Destacado',         class: 'trending'  }, headline: '⭐ Muchas instalaciones semanales' }
      }
    },

    fr: {
      headerSubtitle: 'Développé par M. Mendelson',
      navFeatured: 'À la une',
      navDataFields: 'Champs de données',
      navWatchFaces: 'Cadrans',
      navContact: 'Contact',
      searchPlaceholder: 'Rechercher des apps…',
      featuredDesc: 'Sélections fraîches et favoris — mis à jour avec des statistiques en direct.',
      dataFieldsDesc: 'Outils de performance pour le rythme, la prédiction et le suivi en direct.',
      watchFacesDesc: 'Cadrans créatifs aux concepts visuels distinctifs.',
      contactTitle: 'Contact',
      contactText: 'Questions, retours ou idées de fonctionnalités ? Je serais ravi de vous entendre.',
      contactBtn: 'Envoyer un e-mail',
      footer: '© 2026 M. Mendelson — Garmin Connect IQ Apps',
      freeTrial: 'ESSAI GRATUIT',
      moreVersions: 'Plus de versions ▾',
      liteVersion: 'Version Lite',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Version Miles',
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
        'Time Across The Galaxy': "Cadran à thème cosmique inspiré d'une galaxie lointaine.",
        'Solve for X': "Résolvez un puzzle pour révéler l'heure."
      },
      momentumTags: {
        trending: '🔥 Tendance Cette Semaine',
        popular: '🏆 Populaire et Largement Utilisée',
        consistent: '💪 Utilisée Régulièrement',
        discovered: '📈 Nouvellement Découverte',
        trusted: '👍 Approuvée par les Athlètes',
        niche: '✨ App de Niche'
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
          title: '💪 Utilisée Régulièrement par les Athlètes',
          message: "Les athlètes s'appuient régulièrement sur cette app, maintenant une utilisation stable sur 7 jours.",
          note: 'Indicateur de rétention.'
        },
        discovered: {
          title: '📈 Nouvellement Découverte par les Athlètes',
          message: 'Un nombre solide de nouveaux athlètes ont découvert et installé cette app au cours des 7 derniers jours.',
          note: 'Basé sur les installations récentes.'
        },
        trusted: {
          title: '👍 Approuvée par un Groupe Central',
          message: "Un groupe fiable d'athlètes continue d'utiliser cette app au cours des 7 derniers jours.",
          note: 'Utilisation stable dans le temps.'
        },
        niche: {
          title: '✨ App Nouvelle ou de Niche',
          message: 'Cette app a un large public global et une forte utilisation sur 7 jours.',
          note: "Schéma d'utilisation focalisé ou en phase précoce."
        }
      },
      metrics: {
        totalDownloads: 'Téléchargements totaux :',
        installs7d: 'Installations (7 jours) :',
        activeUsers: 'Utilisateurs actifs (7 jours) :'
      },
      featuredReasons: {
        new:      { badge: { emoji: '✨', word: 'Nouveau lancement',  class: 'fresh'     }, headline: '✨ Nouveau lancement' },
        installs: { badge: { emoji: '🔥', word: 'Tendance',           class: 'trending'  }, headline: '🔥 Populaire Cette Semaine' },
        total:    { badge: { emoji: '🏆', word: 'Populaire',          class: 'popular'   }, headline: '🏆 Favori de Tous les Temps' },
        users:    { badge: { emoji: '💪', word: 'Régulier',           class: 'consistent'}, headline: "💪 Les athlètes continuent de l'utiliser" },
        spotlight:{ badge: { emoji: '⭐', word: 'En vedette',         class: 'trending'  }, headline: '⭐ Installations hebdomadaires élevées' }
      }
    },

    pt: {
      headerSubtitle: 'Desenvolvido por M. Mendelson',
      navFeatured: 'Destaques',
      navDataFields: 'Campos de Dados',
      navWatchFaces: 'Mostrador',
      navContact: 'Contato',
      searchPlaceholder: 'Buscar apps…',
      featuredDesc: 'Seleções recentes e favoritos da comunidade — atualizados com dados em tempo real.',
      dataFieldsDesc: 'Ferramentas de desempenho para ritmo, previsão e rastreamento ao vivo.',
      watchFacesDesc: 'Mostradores criativos com conceitos visuais distintos.',
      contactTitle: 'Contato',
      contactText: 'Perguntas, feedback ou ideias de funcionalidades? Ficaria feliz em ouvir você.',
      contactBtn: 'Enviar email',
      footer: '© 2026 M. Mendelson — Garmin Connect IQ Apps',
      freeTrial: 'TESTE GRÁTIS',
      moreVersions: 'Mais versões ▾',
      liteVersion: 'Versão Lite',
      mirrorB: 'Mirror B',
      mirrorC: 'Mirror C',
      milesVersion: 'Versão em milhas',
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
        'Time Across The Galaxy': 'Mostrador com tema cósmico inspirado em uma galáxia distante.',
        'Solve for X': 'Resolva um puzzle para revelar a hora.'
      },
      momentumTags: {
        trending: '🔥 Em Alta Esta Semana',
        popular: '🏆 Popular e Amplamente Usado',
        consistent: '💪 Usado Consistentemente',
        discovered: '📈 Recém-Descoberto',
        trusted: '👍 Confiado por Atletas',
        niche: '✨ App de Nicho'
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
          title: '💪 Usado Consistentemente por Atletas',
          message: 'Os atletas dependem deste app regularmente, mantendo uso estável de 7 dias.',
          note: 'Foco em retenção.'
        },
        discovered: {
          title: '📈 Recém-Descoberto por Atletas',
          message: 'Um número sólido de novos atletas descobriu e instalou este app nos últimos 7 dias.',
          note: 'Com base em instalações recentes.'
        },
        trusted: {
          title: '👍 Confiado por um Grupo Central',
          message: 'Um grupo confiável de atletas continua usando este app nos últimos 7 dias.',
          note: 'Uso estável ao longo do tempo.'
        },
        niche: {
          title: '✨ App Novo ou de Nicho',
          message: 'Este app tem um grande público geral e forte uso de 7 dias.',
          note: 'Padrão de uso focado ou em estágio inicial.'
        }
      },
      metrics: {
        totalDownloads: 'Downloads totais:',
        installs7d: 'Instalações (7 dias):',
        activeUsers: 'Usuários ativos (7 dias):'
      },
      featuredReasons: {
        new:      { badge: { emoji: '✨', word: 'Novo lançamento', class: 'fresh'     }, headline: '✨ Novo lançamento' },
        installs: { badge: { emoji: '🔥', word: 'Em alta',         class: 'trending'  }, headline: '🔥 Popular Esta Semana' },
        total:    { badge: { emoji: '🏆', word: 'Popular',         class: 'popular'   }, headline: '🏆 Favorito de Todos os Tempos' },
        users:    { badge: { emoji: '💪', word: 'Consistente',     class: 'consistent'}, headline: '💪 Atletas continuam usando' },
        spotlight:{ badge: { emoji: '⭐', word: 'Destaque',        class: 'trending'  }, headline: '⭐ Muitas instalações semanais' }
      }
    }
  };

  /* ── Language detection ───────────────────────────────────────────────────── */
  var SUPPORTED = ['de', 'en', 'es', 'fr', 'pt'];

  function langFromPath() {
    var m = location.pathname.match(/^\/(de|en|es|fr|pt)(\/|$)/);
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
  var LANGUAGES = [
    { code: 'de', label: 'Deutsch' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'pt', label: 'Português' }
  ];

  function buildLangSelector() {
    var sorted = LANGUAGES.filter(function (l) { return l.code === lang; })
      .concat(LANGUAGES.filter(function (l) { return l.code !== lang; }));

    var opts = sorted.map(function (l) {
      return '<a href="/' + l.code + '/" class="lang-option' + (l.code === lang ? ' active' : '') + '">' + l.label + '</a>';
    }).join('');

    var sel = document.createElement('div');
    sel.className = 'lang-selector';
    sel.innerHTML =
      '<button class="lang-btn" aria-label="' + (tr.langLabel || 'Language') + '">🌐</button>' +
      '<div class="lang-dropdown">' + opts + '</div>';

    document.body.insertBefore(sel, document.body.firstChild);
    sel.style.cssText = 'position:fixed;top:10px;right:16px;z-index:1001;';

    var btn = sel.querySelector('.lang-btn');
    btn.addEventListener('click', function () { sel.classList.toggle('open'); });
    sel.addEventListener('click', function (e) { e.stopPropagation(); });
    document.addEventListener('click', function () { sel.classList.remove('open'); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      applyTranslations();
      buildLangSelector();
    });
  } else {
    applyTranslations();
    buildLangSelector();
  }
})();
