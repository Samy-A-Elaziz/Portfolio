# Samy Abdelaziz — Portfolio Website

A simple, responsive personal portfolio built with plain HTML, CSS and
JavaScript — no frameworks, no build step. Just open `index.html` in a
browser and it works.

## 📁 File Structure

```
portfolio/
├── index.html                  ← all the page content lives here
├── README.md                   ← this file
└── assets/
    ├── css/
    │   ├── style.css            ← colors, layout, and every component's look
    │   ├── animations.css       ← scroll-reveal, loader, typing cursor
    │   └── responsive.css       ← rules for tablets & phones
    ├── js/
    │   ├── theme.js              ← dark / light mode switch
    │   ├── cursor.js             ← the dot that follows your mouse
    │   ├── particles.js          ← floating dots in the hero background
    │   ├── typing.js             ← the "Expertise in ..." typewriter effect
    │   ├── animations.js         ← fade-in-on-scroll + counters + skill bars
    │   └── app.js                 ← wires everything together (start here!)
    ├── images/
    │   ├── logo.png
    │   └── professional_personal_photo.png
    └── resume/
        └── Samy_Abdelaziz_CV.pdf
```

Every stylesheet has clearly labeled sections (e.g. `/* 5. HERO SECTION */`)
so you can find what you need with Ctrl+F instead of reading the whole file.

## ✏️ Common Edits

**Change your name, bio or job title**
Open `index.html`, search for the text you want to change (e.g.
`"Samy Abdelaziz"`), and edit it directly.

**Change colors**
Open `assets/css/style.css` and edit the values at the very top under
`:root { ... }` — for example `--clr-primary: #3B82F6;`. Every button,
link and gradient on the site uses these variables, so one change updates
the whole site.

**Add / edit a Service ("Order Now" button)**
In `index.html`, find `<section id="services">`. Each service is one
`<div class="service-card glass-card">` block. Copy an existing one to add
a new service. The `Order Now` button is just a link:

```html
<a href="mailto:samyabdellaziz279@gmail.com?subject=YOUR%20SERVICE%20NAME">Order Now</a>
```

Replace `YOUR%20SERVICE%20NAME` with your service name (spaces become `%20`)
— that text becomes the email subject automatically.

**Add / edit a Certificate**
In `index.html`, find `<section id="certificates">`. Each certificate is a
`<div class="cert-card glass-card">`. Update the `href` on the
`View Credential →` link to point to your certificate's real verification
URL when you have one.

**Add / edit a Project**
Find `<section id="projects">` and copy one `.project-portfolio-card` block.

**Update your CV file**
Replace `assets/resume/Samy_Abdelaziz_CV.pdf` with your new PDF (keep the
same file name), or change the file name and update the `href` on the
"Download CV" button in the hero section.

**Contact form**
The form on the page currently only shows a "message received" confirmation
— it doesn't send a real email yet (browsers can't send email directly for
security reasons). To make it actually deliver messages, connect it to a
free service like [Formspree](https://formspree.io) or
[EmailJS](https://www.emailjs.com/), then update the `submit` logic inside
`assets/js/app.js` (`initContactForm` function) to call that service. Until
then, people can still reach you directly through the email links.

## 🐞 What Was Fixed From the Previous Version

1. **Navbar/logo bug** — the CSS was styling a class called
   `.navbar-container`, but the HTML used `.nav-container`. Because the
   names didn't match, the browser ignored the navbar layout rules, which
   pushed the logo out of place. Fixed by using one consistent class name.
2. **Back-to-top button** — it previously had no JavaScript behind it at
   all, so clicking it did nothing, and it sat awkwardly inside the footer.
   It's now a fixed, floating button in the bottom-right corner that fades
   in once you scroll down and smoothly scrolls to the top when clicked.
3. **Fake location box removed** — the old "Geo-Location Processing Node"
   box in the Contact section was just decorative placeholder text (no real
   geolocation was ever used), and has been removed per request.
4. Broken local file-path fallbacks (`onerror="this.src='file:///C:/Users/...`)
   were removed — they only worked on the original developer's computer and
   would show a broken image for anyone else.

## 📱 Responsive

The layout adapts at four breakpoints: large desktop, laptop, tablet, and
mobile phone (see `assets/css/responsive.css`). The navigation collapses
into a slide-in menu below 768px screen width.

## 🔗 Live Reference Portfolio

<https://sites.google.com/view/samy-a-elaziz-portofolio/home>
