/* StratEdge Consulting — shared interactivity (vanilla JS, no dependencies beyond Lucide) */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // Render Lucide icons
    if (window.lucide) window.lucide.createIcons();

    // ---------- Mobile menu ----------
    var menuBtn = document.getElementById('menuBtn');
    var panel = document.getElementById('mobileMenu');
    var closeBtn = document.getElementById('menuClose');

    function setMenu(open) {
      if (!panel) return;
      panel.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) closeBtn.focus();
    }
    if (menuBtn && panel) {
      menuBtn.addEventListener('click', function () { setMenu(true); });
      closeBtn.addEventListener('click', function () { setMenu(false); menuBtn.focus(); });
      panel.addEventListener('click', function (e) {
        if (e.target === panel) setMenu(false);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !panel.hidden) { setMenu(false); menuBtn.focus(); }
      });
    }

    // ---------- Inline newsletter form(s) ----------
    document.querySelectorAll('[data-newsletter]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = form.querySelector('input[type="email"]');
        var msg = form.parentElement.querySelector('[data-newsletter-msg]');
        if (!email.value || !email.checkValidity()) {
          email.reportValidity();
          return;
        }
        form.hidden = true;
        if (msg) {
          msg.hidden = false;
          msg.innerHTML = '<span class="inline-flex items-center gap-2"><i data-lucide="check" class="w-4 h-4"></i>Thanks for subscribing. Watch your inbox for our next piece.</span>';
          if (window.lucide) window.lucide.createIcons();
        }
      });
    });

    // ---------- Contact / consultation form ----------
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!contactForm.checkValidity()) {
          contactForm.reportValidity();
          return;
        }
        var name = document.getElementById('name').value.trim();
        contactForm.hidden = true;
        var success = document.getElementById('formSuccess');
        var nameSlot = document.getElementById('successName');
        if (nameSlot) nameSlot.textContent = name;
        success.hidden = false;
        success.focus();
      });
    }

    // ---------- Calendar time-slot selection ----------
    var slots = document.querySelectorAll('.slot');
    var slotConfirm = document.getElementById('slotConfirm');
    var slotText = document.getElementById('slotText');
    slots.forEach(function (slot) {
      slot.addEventListener('click', function () {
        slots.forEach(function (s) { s.setAttribute('aria-pressed', 'false'); });
        slot.setAttribute('aria-pressed', 'true');
        if (slotConfirm && slotText) {
          slotText.textContent = slot.dataset.slot;
          slotConfirm.hidden = false;
          if (window.lucide) window.lucide.createIcons();
        }
      });
    });

    // ---------- Footer year ----------
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });

    // ---------- Stat count-up (content-driven motion only) ----------
    var statEls = document.querySelectorAll('[data-count]');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function runCount(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      if (reduceMotion || !('IntersectionObserver' in window) || isNaN(target)) {
        el.textContent = target + suffix;
        return;
      }
      var duration = 1200;
      var startTime = null;
      function frame(now) {
        if (startTime === null) startTime = now;
        var progress = Math.min((now - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    if (statEls.length) {
      if ('IntersectionObserver' in window && !reduceMotion) {
        var statObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              runCount(entry.target);
              statObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });
        statEls.forEach(function (el) { statObserver.observe(el); });
      } else {
        statEls.forEach(function (el) { el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || ''); });
      }
    }
  });
})();
