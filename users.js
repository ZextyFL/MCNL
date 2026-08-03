/* =====================================================================
   PERSONAL CLIENT DASHBOARDS

   Add one object for every activated email address.
   The logged-in client only sees the webshop data and updates belonging
   to their own email address.

   IMPORTANT: This is a static HTML website. The data is separated in the
   interface, but it is not a secure database. Use a backend for truly
   private accounts and server-synchronised updates.
   ===================================================================== */

window.MC_USERS = [
  {
    email: 'demo@millionairecommerce.nl',
    name: 'Demo Student',
    store: {
      name: 'Demo Commerce Store',
      shopifyName: 'Demo Commerce',
      myshopifyDomain: 'demo-commerce.myshopify.com',
      customDomain: 'Nog niet gekoppeld',
      storefrontUrl: '',
      niche: 'Fashion & lifestyle',
      status: 'In ontwikkeling',
      progress: 55,
      dailyRevenueGoal: '€10.000 omzet per dag',
      launchDate: '2026-08-07'
    },
    updates: [
      {
        date: '2026-07-29',
        title: 'Shopify omgeving aangemaakt',
        description:
          'De basisinstellingen en webshopstructuur zijn klaargezet.',
        status: 'done'
      },
      {
        date: '2026-07-30',
        title: 'Homepage en branding',
        description:
          'De homepage, typografie en merkuitstraling worden opgebouwd.',
        status: 'in_progress'
      },
      {
        date: '2026-08-03',
        title: 'Producten en betalingen',
        description:
          'Productpagina’s, betaalmethoden en verzendinstellingen worden getest.',
        status: 'planned'
      }
    ]
  },

  {
    email: 'ruben@onuha.info',
    name: 'Ruben',
    store: {
      name: 'MillionaireCommerce',
      shopifyName: 'MillionaireCommerce',
      myshopifyDomain: 'Nog niet toegevoegd',
      customDomain: 'Nog niet gekoppeld',
      storefrontUrl: '',
      niche: 'E-commerce mentorship',
      status: 'Actief project',
      progress: 80,
      dailyRevenueGoal: '€10.000 omzet per dag',
      launchDate: ''
    },
    updates: [
      {
        date: '2026-07-29',
        title: 'Persoonlijk dashboard geactiveerd',
        description:
          'De webshopgegevens en voortgang zijn gekoppeld aan dit e-mailadres.',
        status: 'done'
      },
      {
        date: '2026-07-29',
        title: 'Portalstructuur verbeterd',
        description:
          'Iedere klant krijgt vanaf nu een eigen webshopoverzicht en eigen updates.',
        status: 'done'
      },
      {
        date: '2026-07-31',
        title: 'Live gegevens koppelen',
        description:
          'Shopify-links en definitieve projectgegevens kunnen hierna worden ingevuld.',
        status: 'in_progress'
      }
    ]
  },

  {
    email: 'hamzaaich70@gmail.com',
    name: 'Hamza Aich',
    store: {
      name: 'AICH AMSTERDAM',
      shopifyName: 'AICH AMSTERDAM',
      myshopifyDomain: 'Nog niet toegevoegd',
      customDomain: 'aich-amsterdam.com',
      storefrontUrl: 'https://aich-amsterdam.com/',
      niche: 'Fashion',
      status: 'Webshop wordt gebouwd',
      progress: 25,
      dailyRevenueGoal: '€10.000 omzet per dag',
      launchDate: ''
    },
    updates: [
      {
        date: '2026-07-29',
        title: 'Project aangemaakt',
        description:
          'Het persoonlijke webshopproject voor AICH AMSTERDAM is toegevoegd aan de portal.',
        status: 'done'
      },
      {
        date: '2026-07-29',
        title: 'Webshopnaam en domein ingesteld',
        description:
          'De webshopnaam is ingesteld op AICH AMSTERDAM en aich-amsterdam.com is gekoppeld aan het dashboard.',
        status: 'done'
      },
      {
        date: '2026-07-30',
        title: 'Design en homepage',
        description:
          'De visuele stijl, header en homepage-secties worden voorbereid.',
        status: 'in_progress'
      },
      {
        date: '2026-08-02',
        title: 'Producten toevoegen',
        description:
          'Producten, collecties en productpagina’s worden na het design toegevoegd.',
        status: 'planned'
      }
    ]
  },

  {
    email: 'rdmartilia@icloud.com',
    name: 'Rdmartilia',
    store: {
      name: 'NOVIQUE AMSTERDAM',
      shopifyName: 'NOVIQUE AMSTERDAM',
      myshopifyDomain: 'Nog niet toegevoegd',
      customDomain: 'Nog niet gekoppeld',
      storefrontUrl: '',
      niche: 'Fashion',
      status: 'Project gestart',
      progress: 10,
      dailyRevenueGoal: '€10.000 omzet per dag',
      launchDate: ''
    },
    updates: [
      {
        date: '2026-07-29',
        title: 'Project aangemaakt',
        description:
          'Het persoonlijke webshopproject voor NOVIQUE AMSTERDAM is toegevoegd aan de portal.',
        status: 'done'
      },
      {
        date: '2026-07-29',
        title: 'Webshopnaam ingesteld',
        description:
          'De Shopify webshopnaam is ingesteld op NOVIQUE AMSTERDAM.',
        status: 'done'
      },
      {
        date: '2026-07-30',
        title: 'Branding en webshopstructuur',
        description:
          'De branding, navigatie en basisstructuur van de webshop worden voorbereid.',
        status: 'in_progress'
      },
      {
        date: '2026-08-02',
        title: 'Productpagina’s opbouwen',
        description:
          'De collecties en productpagina’s worden na de basisopbouw toegevoegd.',
        status: 'planned'
      }
    ]
  },

  {
    email: 'ag-connections@outlook.com',
    name: 'AG Connections',
    store: {
      name: 'ZENVORA',
      shopifyName: 'ZENVORA',
      myshopifyDomain: 'Nog niet toegevoegd',
      customDomain: 'Nog niet gekoppeld',
      storefrontUrl: '',
      niche: 'Fashion',
      status: 'Project gestart',
      progress: 10,
      dailyRevenueGoal: '€10.000 omzet per dag',
      launchDate: ''
    },
    updates: [
      {
        date: '2026-07-29',
        title: 'Project aangemaakt',
        description:
          'Het persoonlijke webshopproject voor ZENVORA is toegevoegd aan de portal.',
        status: 'done'
      },
      {
        date: '2026-07-29',
        title: 'Webshopnaam ingesteld',
        description:
          'De Shopify webshopnaam is ingesteld op ZENVORA.',
        status: 'done'
      },
      {
        date: '2026-07-30',
        title: 'Webshopdesign voorbereiden',
        description:
          'De visuele richting, homepage en navigatie worden voorbereid.',
        status: 'in_progress'
      },
      {
        date: '2026-08-02',
        title: 'Collecties en producten',
        description:
          'De productcollecties en productpagina’s worden daarna opgebouwd.',
        status: 'planned'
      }
    ]
  },

  {
    email: 'e.bartholomeus@outlook.com',
    name: 'E. Bartholomeus',
    store: {
      name: 'AMIR AMSTERDAM',
      shopifyName: 'AMIR AMSTERDAM',
      myshopifyDomain: 'Nog niet toegevoegd',
      customDomain: 'Nog niet gekoppeld',
      storefrontUrl: '',
      niche: 'Fashion',
      status: 'Project gestart',
      progress: 10,
      dailyRevenueGoal: '€10.000 omzet per dag',
      launchDate: ''
    },
    updates: [
      {
        date: '2026-08-03',
        title: 'Project aangemaakt',
        description:
          'Het persoonlijke webshopproject voor AMIR AMSTERDAM is toegevoegd aan de portal.',
        status: 'done'
      },
      {
        date: '2026-08-03',
        title: 'Webshopnaam ingesteld',
        description:
          'De Shopify webshopnaam is ingesteld op AMIR AMSTERDAM.',
        status: 'done'
      },
      {
        date: '2026-08-03',
        title: 'Branding en webshopstructuur',
        description:
          'De branding, navigatie en basisstructuur van de webshop worden voorbereid.',
        status: 'in_progress'
      },
      {
        date: '2026-08-04',
        title: 'Collecties en producten',
        description:
          'De productcollecties en productpagina’s worden na de basisopbouw toegevoegd.',
        status: 'planned'
      }
    ]
  }
];
