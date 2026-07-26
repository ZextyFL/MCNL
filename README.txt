MILLIONAIRECOMMERCE HTML MENTORSHIP PORTAL

OPEN THE WEBSITE
1. Extract this ZIP.
2. Open index.html in your browser.
3. Demo login: demo@millionairecommerce.nl

ADD CLIENT EMAILS
Open index.html in a code editor.
Near the bottom, find:

window.ALLOWED_USERS = [
  { email: 'demo@millionairecommerce.nl', name: 'Demo Student' },
  { email: 'ruben@onuha.info', name: 'Ruben' }
];

Add a comma and another user, for example:
{ email: 'client@example.com', name: 'Client Name' },

IMPORTANT
- There is no registration page and no PHP/backend.
- The approved emails are visible in the HTML source.
- Bookings are stored with localStorage in the visitor's browser.
- Bookings therefore do not automatically synchronize between different devices or browsers.
- Use a backend/database later when you need genuinely secure accounts and shared live bookings.
