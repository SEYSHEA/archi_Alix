(function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen.toString());
    });
  }

  const projects = [
    {
      id: 'p1',
      title: 'Boutique hotel',
      tag: 'Ecole',
      meta: 'Hospitality - Paris',
      visual: 'images/project1/concept.png',
      concept: { img: 'images/project1/concept.png', text: "Grande vue accueil : patrimoine + ligne contemporaine, circulation lisible." },
      plan: { img: 'images/project1/plan.jpg', text: 'Plan 2D N&B, calepinage et noyau technique clarifies, structurant la double page.' },
      ambiance: { img: 'images/project1/ambiance.jpg', text: 'Moodboard court : pierre sable, laiton brosse, noyer, contrastes sombre/doux.' },
      swatches: ['#c4b39a', '#7b6a58', '#141413', '#d8c6ad'],
      planFiles: [
        { label: 'Plan principal (PDF)', href: 'images/paris creation boutique/02- DESSIN & TECHNIQUE/Plan couleur RDC.pdf' },
        { label: 'Coupe AA" (PDF)', href: "images/paris creation boutique/02- DESSIN & TECHNIQUE/Coupe AA''.pdf" },
        { label: 'Coupe BB" (PDF)', href: "images/paris creation boutique/02- DESSIN & TECHNIQUE/Coupe BB'.pdf" }
      ],
      ambianceNotes: [
        'Palette courte : pierre sable, laiton brosse, noyer, noir cadrant',
        'Mobilier sur mesure accueil + bar',
        'Luminaire lineaire et halos doux'
      ]
    },
    {
      id: 'p2',
      title: 'Lobby & Bar',
      tag: 'Alternance',
      meta: 'Hospitality - Lyon',
      visual: 'images/project2/concept.png',
      concept: { img: 'images/project2/concept.png', text: 'Sequence accueil-bar chaleureuse, volumes doux, mobilier sur-mesure.' },
      plan: { img: 'images/project2/plan.jpg', text: 'Parcours client lisible, mobilier fixe positionne pour guider les flux.' },
      ambiance: { img: 'images/project2/ambiance.jpg', text: 'Chene miel, textile sable, laiton, marbre fonce pour le bar.' },
      swatches: ['#e6d9c6', '#1c1a19', '#a47c52', '#d2cbbf']
    },
    {
      id: 'p3',
      title: 'Appartement rive gauche',
      tag: 'Ecole',
      meta: 'Residentiel - Paris',
      visual: 'images/project3/concept.png',
      concept: { img: 'images/project3/concept.png', text: 'Calme et courbes, rideaux filtrants, palette sable.' },
      plan: { img: 'images/project3/plan.jpg', text: 'Rangements flush, axes visuels degages, point de fuite vers la facade.' },
      ambiance: { img: 'images/project3/ambiance.jpg', text: 'Chene brosse, travertin, lin, ponctuels noirs pour cadrer.' },
      swatches: ['#e5dece', '#cbb79c', '#1a1917', '#9d7d5c']
    },
    {
      id: 'p4',
      title: 'Coworking - espaces communs',
      tag: 'Alternance',
      meta: 'Bureaux - Marseille',
      visual: 'images/project4/concept.png',
      concept: { img: 'images/project4/concept.png', text: 'Plateau flexible, strates accueil/cafe/focus, phone booths.' },
      plan: { img: 'images/project4/plan.jpg', text: 'Trame de mobilier, circuits acoustiques, eclairage cadence.' },
      ambiance: { img: 'images/project4/ambiance.jpg', text: 'Bois clair, textiles lin-laine, metal sable, lumiere lineaire.' },
      swatches: ['#f0e5d9', '#0f0f0f', '#9e7a52', '#c6c1b7']
    },
    {
      id: 'p5',
      title: 'Maison en pente',
      tag: 'Ecole',
      meta: 'Residentiel - Bretagne',
      visual: 'images/project5/concept.png',
      concept: { img: 'images/project5/concept.png', text: 'Volumes en cascade, ouvertures cadrant la vue, terrasses en gradin.' },
      plan: { img: 'images/project5/plan.jpg', text: 'Structure bois, circulations verticales lisibles, plan clair.' },
      ambiance: { img: 'images/project5/ambiance.jpg', text: 'Bois naturel, enduit sable, ardoise sombre, textiles laineux.' },
      swatches: ['#d8d0c1', '#1b1a19', '#a07a55', '#c2b8ab']
    }
  ];

  const listEl = document.querySelector('.project-list');
  const frame = {
    tag: document.getElementById('project-tag'),
    title: document.getElementById('project-title'),
    meta: document.getElementById('project-meta'),
    visual: document.getElementById('project-visual'),
    conceptImg: document.getElementById('axis-concept'),
    conceptText: document.getElementById('axis-concept-text'),
    planImg: document.getElementById('axis-plan'),
    planText: document.getElementById('axis-plan-text'),
    planFiles: document.getElementById('axis-plan-files'),
    ambImg: document.getElementById('axis-ambiance'),
    ambText: document.getElementById('axis-ambiance-text'),
    ambNotes: document.getElementById('axis-ambiance-notes'),
    swatches: document.getElementById('axis-swatches')
  };

  const filterButtons = document.querySelectorAll('.pill');
  const navButtons = document.querySelectorAll('.nav-btn');
  let currentIndex = 0;
  let currentFilter = 'all';

  function filteredProjects() {
    return currentFilter === 'all' ? projects : projects.filter(p => p.tag === currentFilter);
  }

  function renderList() {
    if (!listEl) return;
    listEl.innerHTML = '';
    filteredProjects().forEach((p, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.index = idx.toString();
      btn.innerHTML = `<strong>${p.title}</strong><span class="mini">${p.tag} · ${p.meta}</span>`;
      if (idx === currentIndex) btn.classList.add('is-active');
      btn.addEventListener('click', () => {
        currentIndex = idx;
        renderList();
        renderProject();
      });
      listEl.appendChild(btn);
    });
  }

  // Lightbox pour les visuels
  const lightbox = document.querySelector('.lightbox');
  const lbImg = document.querySelector('.lightbox-img');
  const lbCaption = document.querySelector('.lightbox-caption');
  const lbClose = document.querySelector('.lightbox-close');
  const lbBackdrop = document.querySelector('.lightbox-backdrop');

  function openLightbox(src, alt) {
    if (!lightbox || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || '';
    if (lbCaption) lbCaption.textContent = alt || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  [lbClose, lbBackdrop, lightbox].forEach(el => {
    el?.addEventListener('click', evt => {
      if (el === lightbox && evt.target !== lightbox) return;
      closeLightbox();
    });
  });

  document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') closeLightbox();
  });

  function bindZoomables() {
    [frame.conceptImg, frame.planImg, frame.ambImg].forEach(el => {
      if (!el) return;
      el.onclick = () => openLightbox(el.src, el.alt);
    });
  }

  function renderProject() {
    const list = filteredProjects();
    if (!list.length) return;
    const p = list[currentIndex];
    frame.tag.textContent = p.tag;
    frame.title.textContent = p.title;
    frame.meta.textContent = p.meta;
    frame.visual.style.backgroundImage = `url('${p.visual}')`;
    frame.conceptImg.src = p.concept.img;
    frame.conceptText.textContent = p.concept.text;
    frame.planImg.src = p.plan.img;
    frame.planText.textContent = p.plan.text;
    frame.ambImg.src = p.ambiance.img;
    frame.ambText.textContent = p.ambiance.text;
    frame.swatches.innerHTML = '';
    p.swatches.forEach(color => {
      const sw = document.createElement('span');
      sw.style.background = color;
      frame.swatches.appendChild(sw);
    });
    if (frame.planFiles) {
      frame.planFiles.innerHTML = '';
      (p.planFiles || []).forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = encodeURI(item.href);
        a.textContent = item.label;
        a.target = '_blank';
        li.appendChild(a);
        frame.planFiles.appendChild(li);
      });
    }
    if (frame.ambNotes) {
      frame.ambNotes.innerHTML = '';
      (p.ambianceNotes || p.ambNotes || p.ambianceNotes || []).forEach(note => {
        const li = document.createElement('li');
        li.textContent = note;
        frame.ambNotes.appendChild(li);
      });
    }
    bindZoomables();
    document.querySelectorAll('.project-list button').forEach((b, i) => b.classList.toggle('is-active', i === currentIndex));
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentFilter = btn.dataset.filter || 'all';
      currentIndex = 0;
      renderList();
      renderProject();
    });
  });

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const dir = btn.dataset.dir === 'next' ? 1 : -1;
      const list = filteredProjects();
      currentIndex = (currentIndex + dir + list.length) % list.length;
      renderList();
      renderProject();
    });
  });

  if (listEl) {
    renderList();
    renderProject();
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', evt => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        evt.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        navList?.classList.remove('is-open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealEls.forEach(el => observer.observe(el));
  }
})();
