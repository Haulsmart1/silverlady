const menu = document.querySelector('[data-menu]');
const button = document.querySelector('[data-menu-button]');
if (button && menu) {
  const close = () => { button.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); };
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') { close(); button.focus(); } });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  window.matchMedia('(min-width: 850px)').addEventListener('change', close);
}
