// Search filter
document.getElementById('search').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll('.card').forEach(c => {
    c.style.display = c.dataset.name.toLowerCase().includes(q) ? '' : 'none';
  });
});

// Email protection
document.getElementById('emailBtn').addEventListener('click', () => {
  const user = "mateusmendelson";
  const domain = "hotmail.com";
  window.location.href = "mailto:" + user + "@" + domain;
});
