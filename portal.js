(() => {
  const sessionUser = readCurrentUser();
  const clientProfiles = Array.isArray(window.MC_USERS) ? window.MC_USERS : [];
  const user = sessionUser
    ? clientProfiles.find(profile => String(profile.email).trim().toLowerCase() === String(sessionUser.email).trim().toLowerCase())
    : null;

  if (!user) {
    localStorage.removeItem('mc_current_user');
    window.location.replace('index.html');
    return;
  }

  const mentors = {
    samuel: {
      id: 'samuel',
      name: 'Samuel Onuha',
      role: 'Lead mentor & medeoprichter',
      image: 'assets/samuel.webp',
      focus: 'Brand strategy, positioning & scaling',
      weekdays: [2, 4, 6],
      slots: ['10:00', '12:00', '14:00', '16:00']
    },
    ruben: {
      id: 'ruben',
      name: 'Ruben Onuha',
      role: 'Oprichter, MillionaireCommerce',
      image: 'assets/ruben-fallback.jpg',
      focus: 'Execution, advertising & systems',
      weekdays: [1, 3, 5],
      slots: ['11:00', '13:00', '15:00', '17:00']
    }
  };

  const state = {mentorId: 'samuel', month: new Date(), bookings: [], selected: null};
  state.month = new Date(state.month.getFullYear(), state.month.getMonth(), 1);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxMonth = new Date(today.getFullYear(), today.getMonth() + 5, 1);

  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const monthNames = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
  const dayNames = ['zondag','maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag'];

  function readCurrentUser() {
    try {
      const saved = JSON.parse(localStorage.getItem('mc_current_user') || 'null');
      return saved && saved.email && saved.name ? saved : null;
    } catch (_) {
      return null;
    }
  }

  function loadAllBookings() {
    try {
      const saved = JSON.parse(localStorage.getItem('mc_all_bookings') || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch (_) {
      return [];
    }
  }

  function saveAllBookings(bookings) {
    localStorage.setItem('mc_all_bookings', JSON.stringify(bookings));
  }

  function refreshBookings() {
    state.bookings = loadAllBookings().filter(booking => booking.user_email === user.email);
  }

  function isoDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function formatDate(dateString) {
    return new Intl.DateTimeFormat('nl-NL', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(`${dateString}T12:00:00`));
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character]));
  }

  function toast(message) {
    const element = $('#toast');
    element.textContent = message;
    element.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => element.classList.remove('show'), 3200);
  }

  function setProfile() {
    const firstName = user.name.trim().split(/\s+/)[0] || 'Member';
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Goedemorgen' : hour < 18 ? 'Goedemiddag' : 'Goedenavond';
    $('#welcomeTitle').textContent = `${greeting}, ${firstName}.`;
    $('#profileInitial').textContent = firstName.charAt(0).toUpperCase();
    $('#profileName').textContent = user.name;
    $('#profileEmail').textContent = user.email;
  }

  function formatProjectDate(dateString) {
    if (!dateString) return 'Nog niet gepland';
    const date = new Date(`${dateString}T12:00:00`);
    if (Number.isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('nl-NL', {day: 'numeric', month: 'long', year: 'numeric'}).format(date);
  }

  function renderStoreProfile() {
    const store = user.store || {};
    const updates = Array.isArray(user.updates) ? user.updates : [];
    const storeName = String(store.name || store.shopifyName || 'Mijn webshop');
    const progress = Math.max(0, Math.min(100, Number(store.progress) || 0));
    const status = String(store.status || 'In ontwikkeling');
    const revenueGoal = String(store.dailyRevenueGoal || '€10.000 omzet per dag');

    $('#storeBannerTitle').innerHTML = `Bouw ${escapeHtml(storeName)}<br>richting €10K per dag.`;
    $('#storeBannerText').textContent = `Volg hier de Shopify-opbouw, voortgang en updates. Het gezamenlijke trajectdoel is ${revenueGoal}.`;
    $('#storeProgressMetric').textContent = `${progress}%`;
    $('#storeStatusMetric').textContent = status;
    $('#storeGoalMetric').textContent = '€10K per dag';
    $('#storeName').textContent = storeName;
    $('#storeLogo').textContent = storeName.split(/\s+/).filter(Boolean).slice(0, 2).map(word => word[0]).join('').toUpperCase() || 'S';
    $('#storeStatus').textContent = status;
    $('#storeProgressText').textContent = `${progress}%`;
    $('#storeProgressBar').style.width = `${progress}%`;
    $('#shopifyName').textContent = store.shopifyName || storeName;
    $('#shopifyDomain').textContent = store.myshopifyDomain || 'Nog niet toegevoegd';
    $('#customDomain').textContent = store.customDomain || 'Nog niet gekoppeld';
    $('#storeNiche').textContent = store.niche || 'Nog niet ingevuld';
    $('#storeRevenueGoal').textContent = revenueGoal;
    $('#storeLaunchDate').textContent = formatProjectDate(store.launchDate);
    $('#updatesDescription').textContent = `Persoonlijke updates voor ${storeName}, gekoppeld aan ${user.email}.`;

    const storefrontLink = $('#storefrontLink');
    const storefrontUrl = String(store.storefrontUrl || '').trim();
    if (/^https?:\/\//i.test(storefrontUrl)) {
      storefrontLink.href = storefrontUrl;
      storefrontLink.hidden = false;
    } else {
      storefrontLink.hidden = true;
      storefrontLink.removeAttribute('href');
    }

    const updatesContainer = $('#storeUpdates');
    if (!updates.length) {
      updatesContainer.innerHTML = '<div class="empty-store-updates"><span>□</span><h3>Nog geen webshopupdates</h3><p>Nieuwe voortgang wordt hier voor deze klant toegevoegd.</p></div>';
      return;
    }

    const statusLabels = {
      done: 'Afgerond',
      in_progress: 'Bezig',
      planned: 'Gepland'
    };

    updatesContainer.innerHTML = updates
      .slice()
      .sort((a, b) => String(a.date).localeCompare(String(b.date)))
      .map(update => {
        const updateStatus = ['done', 'in_progress', 'planned'].includes(update.status) ? update.status : 'planned';
        return `<article class="store-update ${updateStatus}"><div class="update-marker"><i></i></div><div class="update-card"><div class="update-meta"><span>${escapeHtml(formatProjectDate(update.date))}</span><b>${statusLabels[updateStatus]}</b></div><h3>${escapeHtml(update.title || 'Webshop update')}</h3><p>${escapeHtml(update.description || '')}</p></div></article>`;
      })
      .join('');
  }

  function selectMentor(id, scroll = false) {
    state.mentorId = id;
    $$('.mentor-choice').forEach(element => element.classList.toggle('active', element.dataset.mentor === id));
    renderCalendar();
    renderDayPanel(null);
    if (scroll) document.getElementById('agenda').scrollIntoView({behavior: 'smooth'});
  }

  function hasOwnBooking(date) {
    return state.bookings.some(booking => booking.date === date && booking.mentor_id === state.mentorId);
  }

  function mentorAvailableOn(date) {
    const mentor = mentors[state.mentorId];
    const day = date.getDay();
    const isoDay = day === 0 ? 7 : day;
    return mentor.weekdays.includes(isoDay) && date >= today;
  }

  function slotIsOccupied(mentorId, date, time) {
    return loadAllBookings().some(booking => booking.mentor_id === mentorId && booking.date === date && booking.time === time);
  }

  function renderCalendar() {
    const year = state.month.getFullYear();
    const month = state.month.getMonth();
    $('#monthTitle').textContent = `${monthNames[month]} ${year}`;
    const grid = $('#calendarGrid');
    grid.innerHTML = '';
    const first = new Date(year, month, 1);
    const offset = (first.getDay() + 6) % 7;
    const days = new Date(year, month + 1, 0).getDate();
    const previousDays = new Date(year, month, 0).getDate();

    for (let index = 0; index < 42; index += 1) {
      const number = index - offset + 1;
      let date;
      let outside = false;
      if (number < 1) {
        date = new Date(year, month - 1, previousDays + number);
        outside = true;
      } else if (number > days) {
        date = new Date(year, month + 1, number - days);
        outside = true;
      } else {
        date = new Date(year, month, number);
      }

      date.setHours(0, 0, 0, 0);
      const dateString = isoDate(date);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'calendar-day';
      if (outside) button.classList.add('outside');
      if (+date === +today) button.classList.add('today');
      if (mentorAvailableOn(date) && !outside) button.classList.add('available');
      if (hasOwnBooking(dateString)) button.classList.add('own-booking');
      if (state.selected?.date === dateString && state.selected?.mentorId === state.mentorId) button.classList.add('selected');
      button.innerHTML = `<span>${date.getDate()}</span>${mentorAvailableOn(date) && !outside ? '<i></i>' : ''}`;
      button.disabled = outside || !mentorAvailableOn(date);
      if (!button.disabled) {
        button.addEventListener('click', () => {
          state.selected = {mentorId: state.mentorId, date: dateString, time: null};
          renderCalendar();
          renderDayPanel(dateString);
        });
      }
      grid.appendChild(button);
    }

    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    $('#prevMonth').disabled = state.month <= currentMonth;
    $('#nextMonth').disabled = state.month >= maxMonth;
  }

  function renderDayPanel(dateString) {
    const panel = $('#dayPanel');
    if (!dateString) {
      panel.innerHTML = '<div class="empty-day"><span>□</span><h3>Kies een dag</h3><p>Beschikbare tijden verschijnen hier.</p></div>';
      return;
    }

    const mentor = mentors[state.mentorId];
    const date = new Date(`${dateString}T12:00:00`);
    const slots = mentor.slots.map(time => {
      const occupied = slotIsOccupied(mentor.id, dateString, time);
      return `<button type="button" class="time-slot" data-time="${time}" ${occupied ? 'disabled' : ''}><span>${time}</span><small>${occupied ? 'Geboekt' : 'Beschikbaar'}</small></button>`;
    }).join('');

    panel.innerHTML = `<div class="day-panel-head"><p class="eyebrow">GESELECTEERDE DAG</p><h3>${dayNames[date.getDay()]} ${date.getDate()} ${monthNames[date.getMonth()]}</h3><div class="mini-mentor"><img src="${mentor.image}" alt="${mentor.name}"><span><b>${mentor.name}</b><small>${mentor.role}</small></span></div></div><div class="time-list"><p>Kies een tijdstip</p>${slots}</div>`;
    panel.querySelectorAll('.time-slot:not(:disabled)').forEach(button => {
      button.addEventListener('click', () => openModal(dateString, button.dataset.time));
    });
  }

  function openModal(date, time) {
    const mentor = mentors[state.mentorId];
    state.selected = {mentorId: state.mentorId, date, time};
    $('#modalSummary').innerHTML = `<div><span>Mentor</span><b>${mentor.name}</b></div><div><span>Datum</span><b>${formatDate(date)}</b></div><div><span>Tijd</span><b>${time} uur</b></div>`;
    $('#bookingTopic').value = '';
    $('#modalMessage').textContent = '';
    $('#modalMessage').classList.remove('error');
    $('#bookingModal').hidden = false;
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    $('#bookingModal').hidden = true;
    document.body.classList.remove('modal-open');
  }

  function createBooking() {
    if (!state.selected?.time) return;
    const {mentorId, date, time} = state.selected;
    const message = $('#modalMessage');
    message.textContent = '';
    message.classList.remove('error');

    if (slotIsOccupied(mentorId, date, time)) {
      message.textContent = 'Dit tijdstip is inmiddels al geboekt.';
      message.classList.add('error');
      return;
    }

    const bookings = loadAllBookings();
    bookings.push({
      id: `booking_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      user_email: user.email,
      user_name: user.name,
      mentor_id: mentorId,
      date,
      time,
      topic: $('#bookingTopic').value.trim(),
      status: 'BEVESTIGD',
      created_at: new Date().toISOString()
    });
    saveAllBookings(bookings);
    refreshBookings();
    closeModal();
    renderCalendar();
    renderDayPanel(date);
    renderBookings();
    toast('Je mentorship sessie is geboekt.');
  }

  function cancelBooking(id) {
    const bookings = loadAllBookings();
    const booking = bookings.find(item => item.id === id && item.user_email === user.email);
    if (!booking) return;
    const updated = bookings.filter(item => item.id !== id);
    saveAllBookings(updated);
    refreshBookings();
    renderCalendar();
    renderBookings();
    toast('Je mentorship sessie is geannuleerd.');
  }

  function renderBookings() {
    const list = $('#bookingsList');
    const future = state.bookings
      .filter(booking => new Date(`${booking.date}T${booking.time}:00`) >= new Date())
      .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));

    $('#upcomingCount').textContent = String(future.length);
    if (!future.length) {
      list.innerHTML = '<div class="empty-bookings"><span>□</span><h3>Nog geen sessies gepland</h3><p>Selecteer hierboven een mentor en beschikbare dag.</p><a href="#agenda" class="outline-button">Plan een sessie →</a></div>';
      return;
    }

    list.innerHTML = future.map(booking => {
      const mentor = mentors[booking.mentor_id];
      const date = new Date(`${booking.date}T12:00:00`);
      return `<article class="booking-row"><div class="booking-date"><strong>${String(date.getDate()).padStart(2, '0')}</strong><span>${monthNames[date.getMonth()].slice(0, 3).toUpperCase()}</span></div><img src="${mentor.image}" alt="${mentor.name}"><div class="booking-info"><p class="eyebrow">${booking.status}</p><h3>Mentorship met ${mentor.name}</h3><span>${formatDate(booking.date)} · ${booking.time} uur</span>${booking.topic ? `<small>Onderwerp: ${escapeHtml(booking.topic)}</small>` : ''}</div><button class="cancel-booking" type="button" data-id="${booking.id}">Annuleren</button></article>`;
    }).join('');

    list.querySelectorAll('.cancel-booking').forEach(button => {
      button.addEventListener('click', () => {
        if (window.confirm('Weet je zeker dat je deze mentorship sessie wilt annuleren?')) {
          cancelBooking(button.dataset.id);
        }
      });
    });
  }

  $$('.mentor-choice').forEach(button => button.addEventListener('click', () => selectMentor(button.dataset.mentor)));
  $$('.choose-mentor').forEach(button => button.addEventListener('click', () => selectMentor(button.dataset.mentor, true)));
  $('#prevMonth').addEventListener('click', () => {
    state.month = new Date(state.month.getFullYear(), state.month.getMonth() - 1, 1);
    renderCalendar();
    renderDayPanel(null);
  });
  $('#nextMonth').addEventListener('click', () => {
    state.month = new Date(state.month.getFullYear(), state.month.getMonth() + 1, 1);
    renderCalendar();
    renderDayPanel(null);
  });
  $('#modalClose').addEventListener('click', closeModal);
  $('#bookingModal').addEventListener('click', event => {
    if (event.target === event.currentTarget) closeModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal();
  });
  $('#confirmBooking').addEventListener('click', createBooking);
  $('#logoutButton').addEventListener('click', () => {
    localStorage.removeItem('mc_current_user');
    window.location.href = 'index.html';
  });
  $('#mobileMenu').addEventListener('click', () => document.body.classList.toggle('sidebar-open'));
  $$('.side-nav a').forEach(link => link.addEventListener('click', () => document.body.classList.remove('sidebar-open')));

  setProfile();
  renderStoreProfile();
  refreshBookings();
  renderCalendar();
  renderBookings();
})();
