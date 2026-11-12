const timelineData = {
  1961: ['Начало пути', '1 апреля 1961 года в Бобруйске родился Владимир Владимирович Потапович.', '✦'],
  1978: ['Первый труд', 'Окончив школу, Владимир устроился помощником слесаря на ПО «Бобруйскдрев». Играл на ударных в музыкальной группе Дома культуры.', '⌁'],
  1979: ['Дорога в Афганистан', '25 апреля Владимира призвали в ВДВ. В декабре, после учебки, его направили в Афганистан.', '★'],
  1980: ['День памяти', '12 мая 1980 года рядовой, заряжающий танка Владимир Потапович погиб при исполнении воинского долга. Ему было девятнадцать лет.', '✧'],
};
const modalData = {
  'story-modal': ['История героя', 'Владимир Потапович', '<p>Владимир Владимирович Потапович родился 1 апреля 1961 года в Бобруйске. Он учился в средней школе №14, занимался спортом и парашютным спортом в аэроклубе имени Слепнева.</p><p>После школы работал помощником слесаря на ПО «Бобруйскдрев», играл на ударных в музыкальной группе. 25 апреля 1979 года был призван в ВДВ, а в декабре направлен в Афганистан. Погиб 12 мая 1980 года. Ему было девятнадцать лет.</p>'],
  'youth-modal': ['До армии', 'Спорт, музыка и небо', '<p>Владимир был активным школьником: занимался спортом, любил походы и природу, рыбалку и технику.</p><p>В Бобруйском аэроклубе имени Слепнева он занимался парашютным спортом. После окончания школы в 1978 году работал помощником слесаря и стал ударником в музыкальной группе Дома культуры предприятия.</p>'],
  'service-modal': ['1979—1980', 'Служба в Афганистане', '<p>25 апреля 1979 года Владимира призвали в воздушно-десантные войска. После учебки, в декабре, его направили в Афганистан — он оказался среди первых.</p><p>Рядовой Потапович служил заряжающим танка. 12 мая 1980 года он погиб при выполнении воинского долга.</p>'],
  'memory-modal': ['Бобруйск помнит', 'Его имя живёт', '<p>Владимир Потапович стал первой потерей Бобруйска в Афганской войне. Его помнят родной город и боевые товарищи.</p><p>Захоронение героя находится под опекой учащихся средней школы №28. Пионерская дружина школы № 16 носит имя В.В. Потаповича. На его примере воспитывают молодёжь в городском Центре досуга и творчества.</p>'],
};
const layer = document.querySelector('#modal-layer');
const modalTitle = document.querySelector('#modal-title');
const modalEyebrow = document.querySelector('#modal-eyebrow');
const modalContent = document.querySelector('#modal-content');
let focusBeforeModal;
document.querySelectorAll('[data-open]').forEach((button) => button.addEventListener('click', () => {
  const data = modalData[button.dataset.open]; if (!data) return;
  focusBeforeModal = button; [modalEyebrow.textContent, modalTitle.textContent, modalContent.innerHTML] = data;
  layer.classList.add('is-open'); layer.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open'); layer.querySelector('.modal-close').focus();
}));
function closeModal() { layer.classList.remove('is-open'); layer.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); focusBeforeModal?.focus(); }
document.querySelectorAll('[data-close-modal]').forEach((button) => button.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeModal(); closeLightbox(); } });
function updateTimeline(button) {
  const data = timelineData[button.dataset.year]; if (!data) return;
  document.querySelectorAll('.timeline-item').forEach((item) => { const active = item === button; item.classList.toggle('is-active', active); item.setAttribute('aria-selected', String(active)); });
  document.querySelector('#detail-year').textContent = button.dataset.year; document.querySelector('#detail-title').textContent = data[0]; document.querySelector('#detail-text').textContent = data[1]; document.querySelector('#detail-symbol').textContent = data[2];
  const items = [...document.querySelectorAll('.timeline-item')]; document.querySelector('.timeline-progress').style.width = `${items.indexOf(button) / (items.length - 1) * 100}%`;
}
document.querySelectorAll('.timeline-item').forEach((button) => button.addEventListener('click', () => updateTimeline(button)));
updateTimeline(document.querySelector('.timeline-item.is-active'));
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => backToTop.classList.toggle('is-visible', window.scrollY > 240), { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
const lightbox = document.querySelector('#lightbox');
function closeLightbox() { lightbox.classList.remove('is-open'); lightbox.setAttribute('aria-hidden', 'true'); }
document.querySelectorAll('[data-photo]').forEach((button) => button.addEventListener('click', () => {
  lightbox.querySelector('img').src = button.dataset.photo; lightbox.querySelector('img').alt = button.dataset.caption; lightbox.querySelector('p').textContent = button.dataset.caption; lightbox.classList.add('is-open'); lightbox.setAttribute('aria-hidden', 'false');
}));
document.querySelectorAll('[data-close-lightbox]').forEach((button) => button.addEventListener('click', closeLightbox));
const posterSections = [...document.querySelectorAll('main > section')];
document.querySelectorAll('.topnav a, .text-link[href^="#"]').forEach((link) => link.addEventListener('click', (event) => {
  const target = document.querySelector(link.getAttribute('href'));
  if (!target || !posterSections.includes(target)) return;
  event.preventDefault();
  posterSections.forEach((section) => { section.hidden = section !== target; section.classList.toggle('page-active', section === target); });
  document.querySelector('.back-to-top').classList.add('is-visible');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', link.getAttribute('href'));
}));
document.querySelector('.brand').addEventListener('click', (event) => {
  event.preventDefault(); posterSections.forEach((section) => { section.hidden = section !== posterSections[0]; section.classList.toggle('page-active', section === posterSections[0]); });
  document.querySelector('.back-to-top').classList.remove('is-visible');
  history.replaceState(null, '', '#top'); window.scrollTo({ top: 0, behavior: 'smooth' });
});
posterSections.forEach((section, index) => { section.hidden = index !== 0; section.classList.toggle('page-active', index === 0); });
document.querySelector('.back-to-top').addEventListener('click', () => document.querySelector('.brand').click());
document.querySelector('.home-return').addEventListener('click', () => document.querySelector('.brand').click());
