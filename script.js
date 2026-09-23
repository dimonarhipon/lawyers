/* ===== Анимация появления при скролле ===== */
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.animate').forEach((el) => observer.observe(el));
})();

/* ===== Скролл хедера ===== */
(function () {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScrollY = 0;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;
    
    if (scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
    
    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
})();

/* ===== Табы для мобильных ===== */
(function () {
  const tabButtons = document.querySelectorAll('.lawyers-tabs__button');
  const cards = document.querySelectorAll('.lawyers__card');

  if (!tabButtons.length) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const activeTab = btn.dataset.tab;

      /* Обновляем активный таб */
      tabButtons.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      /* Фильтруем карточки по data-tabs */
      cards.forEach((card) => {
        const cardTabs = card.dataset.tabs.split(',').map((t) => t.trim());
        if (cardTabs.includes(activeTab)) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
})();

/* ===== Плавный скролл для якорных ссылок ===== */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
})();

/* ===== Плавный скролл для якорных ссылок ===== */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
})();


/* ===== Слайдеры ===== */
(function () {
  const isMobile = () => window.innerWidth <= 1024;

  class Slider {
    constructor(element) {
      this.slider = element;
      this.track = element.querySelector('.slider__track');
      this.slides = element.querySelectorAll('.slider__slide');
      this.prevBtn = element.querySelector('.slider__btn--prev');
      this.nextBtn = element.querySelector('.slider__btn--next');
      this.dotsContainer = element.querySelector('.slider__dots');
      this.currentIndex = 0;
      this.totalSlides = this.slides.length;

      this.init();
    }

    init() {
      // Создаём точки
      this.dotsContainer.innerHTML = '';
      for (let i = 0; i < this.totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'slider__dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', `Слайд ${i + 1}`);
        dot.addEventListener('click', () => this.goToSlide(i));
        this.dotsContainer.appendChild(dot);
      }

      // Обработчики кнопок
      this.prevBtn.addEventListener('click', () => this.prevSlide());
      this.nextBtn.addEventListener('click', () => this.nextSlide());

      // Свайп для мобильных
      let startX = 0;
      let endX = 0;

      this.track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      }, { passive: true });

      this.track.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
      }, { passive: true });

      this.track.addEventListener('touchend', () => {
        if (startX - endX > 50) {
          this.nextSlide();
        } else if (endX - startX > 50) {
          this.prevSlide();
        }
      });

      // Обновляем при изменении размера окна
      window.addEventListener('resize', () => {
        if (!isMobile()) {
          this.resetSlider();
        } else {
          this.goToSlide(this.currentIndex);
        }
      });

      // Инициализация
      if (isMobile()) {
        this.goToSlide(0);
      }
    }

    goToSlide(index) {
      if (!isMobile()) return;

      this.currentIndex = index;
      const offset = -index * 100;
      this.track.style.transform = `translateX(${offset}%)`;

      // Обновляем точки
      const dots = this.dotsContainer.querySelectorAll('.slider__dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
      });
    }

    nextSlide() {
      const nextIndex = (this.currentIndex + 1) % this.totalSlides;
      this.goToSlide(nextIndex);
    }

    prevSlide() {
      const prevIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
      this.goToSlide(prevIndex);
    }

    resetSlider() {
      this.track.style.transform = 'translateX(0)';
      this.currentIndex = 0;
      const dots = this.dotsContainer.querySelectorAll('.slider__dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === 0);
      });
    }
  }

  // Инициализируем слайдеры
  const sliders = document.querySelectorAll('.slider');
  sliders.forEach(slider => new Slider(slider));
})();
