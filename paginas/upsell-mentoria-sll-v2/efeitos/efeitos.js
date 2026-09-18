/* script inline 1 do original */
function goToOffer() {
      const target = document.getElementById('checkout-cta');
      if (!target) return;
      target.focus({preventScroll:true});
      window.scrollTo({top:Math.max(0,target.getBoundingClientRect().top+window.scrollY-24),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    }
    function showNotice(message) {
      document.getElementById('notice-text').textContent = message;
      document.getElementById('notice').classList.add('active');
    }
    function hideNotice() {
      document.getElementById('notice').classList.remove('active');
    }

    (function animateDoubts() {
      const cloud = document.querySelector('.letter-intro-doubts');
      if (!cloud) return;
      const items = Array.from(cloud.children);
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      let running = false;
      let generation = 0;
      let visible = false;

      const between = (minimum, maximum) => minimum + Math.random() * (maximum - minimum);
      const pixels = value => `${Math.round(value)}px`;
      const degrees = value => `${value.toFixed(2)}deg`;

      items.forEach(item => {
        item.style.setProperty('--float-x-a', pixels(between(-8, 4)));
        item.style.setProperty('--float-y-a', pixels(between(-4, 7)));
        item.style.setProperty('--float-x-b', pixels(between(-5, 9)));
        item.style.setProperty('--float-y-b', pixels(between(-9, 3)));
        item.style.setProperty('--float-x-c', pixels(between(-9, 7)));
        item.style.setProperty('--float-y-c', pixels(between(-3, 8)));
        item.style.setProperty('--float-rotate-a', degrees(between(-2.2, 1.1)));
        item.style.setProperty('--float-rotate-b', degrees(between(-1.1, 2.4)));
        item.style.setProperty('--float-rotate-c', degrees(between(-1.8, 1.8)));
        item.style.setProperty('--float-duration', `${between(3.1, 7.2).toFixed(2)}s`);
        item.style.setProperty('--float-delay', `${between(-6.5, -.15).toFixed(2)}s`);
      });

      const shuffle = () => {
        if (!running || !visible || motion.matches) return;
        const cycle = generation;
        const first = new Map(items.map(item => [item, item.getBoundingClientRect()]));
        // A nonzero cyclic shift makes every phrase move on every pass.
        const current = items.map((item, index) => Number(item.style.order) || index + 1);
        const shift = 1 + Math.floor(Math.random() * (items.length - 1));
        items.forEach((item, index) => {
          item.style.order = (current[index] - 1 + shift) % items.length + 1;
        });
        const animations = items.map(item => {
          const before = first.get(item);
          const after = item.getBoundingClientRect();
          const deltaX = before.left - after.left;
          const deltaY = before.top - after.top;
          const maxDetour = Math.min(cloud.clientWidth * .1, 54);
          const detourX = between(-maxDetour, maxDetour);
          const detourY = between(-22, 22);
          const turn = between(-4, 4);
          item.style.zIndex = String(Math.floor(between(2, 7)));
          item.shuffleAnimation = item.animate(
            [
              { transform: `translate(${deltaX}px, ${deltaY}px) rotate(0deg)`, opacity: .95 },
              { transform: `translate(${deltaX * .5 + detourX}px, ${deltaY * .5 + detourY}px) rotate(${turn}deg)`, opacity: 1, offset: .5 },
              { transform: 'translate(0, 0) rotate(0deg)', opacity: .95 }
            ],
            { duration: 3200, easing: 'linear', fill: 'both' }
          );
          return item.shuffleAnimation;
        });
        Promise.all(animations.map(animation => animation.finished)).then(() => {
          if (!running || cycle !== generation) return;
          animations.forEach(animation => animation.cancel());
          items.forEach(item => { item.shuffleAnimation = null; });
          shuffle();
        }).catch(() => {}); // Cancellation is expected when leaving the viewport.
      };

      const stop = () => {
        running = false;
        generation += 1;
        items.forEach(item => {
          if (item.shuffleAnimation) item.shuffleAnimation.cancel();
          item.shuffleAnimation = null;
          item.style.order = '';
          item.style.zIndex = '';
        });
      };

      const start = () => {
        if (motion.matches || running || items.length < 2) return;
        running = true;
        shuffle();
      };

      const observer = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        if (visible) start();
        else stop();
      }, { threshold: .25 });
      observer.observe(cloud);
      motion.addEventListener('change', () => {
        if (motion.matches) stop();
        else if (visible) start();
      });
    })();

    (function confetti() {
      const canvas = document.getElementById('confetti');
      if (!canvas) return;
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (motion.matches) { canvas.style.display = 'none'; return; }
      const context = canvas.getContext('2d');
      if (!context) { canvas.style.display = 'none'; return; }
      let width = window.innerWidth;
      let height = window.innerHeight;
      const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
      };
      resize();
      window.addEventListener('resize', resize);
      const colors = ['#9868ff', '#b5ff80', '#ffd45c', '#744ad4', '#e6d7ff'];
      const particles = Array.from({length: width < 600 ? 500 : 1000}, (_, i) => {
        const side = i % 2 === 0 ? 1 : -1;
        return {
          x: side === 1 ? 0 : width,
          y: height,
          vx: side * width * (.3 + Math.random() * .55),
          vy: -Math.sqrt(2 * 440 * height) * (.85 + Math.random() * .4),
          launchAt: Math.random() * 220,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - .5) * 12,
          size: 5 + Math.random() * 6,
          color: colors[i % colors.length],
        };
      });
      let frame = 0;
      let start = null;
      let previous = 0;
      let stopped = false;
      const stop = () => {
        stopped = true;
        cancelAnimationFrame(frame);
        canvas.style.display = 'none';
      };
      const draw = (now) => {
        if (stopped) return;
        if (start === null) { start = now; previous = now; }
        const elapsed = (now - start) * 1.8;
        if (elapsed > 5600) { stop(); return; }
        const dt = Math.min((now - previous) / 1000, .035) * 1.8;
        previous = now;
        context.clearRect(0, 0, width, height);
        context.globalAlpha = Math.min(1, (5600 - elapsed) / 850);
        for (const p of particles) {
          if (elapsed < p.launchAt) continue;
          p.vx *= Math.pow(.99, dt * 60);
          p.vy += 440 * dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.angle += p.spin * dt;
          context.save();
          context.translate(p.x, p.y);
          context.rotate(p.angle);
          context.scale(1, .3 + Math.abs(Math.cos(elapsed / 220 + p.spin)) * .7);
          context.fillStyle = p.color;
          context.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * .65);
          context.restore();
        }
        frame = requestAnimationFrame(draw);
      };
      frame = requestAnimationFrame(draw);
      const onMotion = () => { if (motion.matches) stop(); };
      motion.addEventListener('change', onMotion);
    })();