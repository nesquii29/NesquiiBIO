const toast = document.getElementById('toast');
    let toastTimer;
    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
    }

    document.getElementById('back-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

    const pointerGlow = document.querySelector('.pointer-glow');
    let pointerFrame = null;
    window.addEventListener('pointermove', event => {
      if (window.matchMedia('(pointer: fine)').matches && pointerGlow) {
        if (pointerFrame) cancelAnimationFrame(pointerFrame);
        pointerFrame = requestAnimationFrame(() => {
          pointerGlow.style.left = `${event.clientX}px`;
          pointerGlow.style.top = `${event.clientY}px`;
        });
      }
    }, { passive: true });


    // Orbital rail progresses with the page scroll.
    const orbitRail = document.querySelector('.orbit-rail');
    let orbitFrame = null;
    function updateOrbitRail() {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      orbitRail?.style.setProperty('--orbit-progress', String(Math.max(.08, progress)));
    }
    window.addEventListener('scroll', () => {
      if (orbitFrame) cancelAnimationFrame(orbitFrame);
      orbitFrame = requestAnimationFrame(updateOrbitRail);
    }, { passive: true });
    window.addEventListener('resize', updateOrbitRail, { passive: true });
    updateOrbitRail();

    // The public app URL hasn't been supplied yet, so don't send visitors to a fake destination.
    document.getElementById('vybe-live-link')?.addEventListener('click', event => {
      event.preventDefault();
      showToast('Пока актуальной ссылки нет =(');
    });

    // A small, restrained parallax on the hero artwork; disabled for reduced-motion users.
    const orbScene = document.querySelector('.orb-scene');
    if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.addEventListener('pointermove', event => {
        const x = (event.clientX / window.innerWidth - .5) * 18;
        const y = (event.clientY / window.innerHeight - .5) * 14;
        orbScene.style.transform = `translate(calc(-50% + ${x}px), calc(-49% + ${y}px)) rotateX(${-y * .035}deg) rotateY(${x * .035}deg)`;
      }, { passive: true });
    }
