document.addEventListener('DOMContentLoaded', () => {
  const pathLeaf = window.location.pathname.split('/').pop();
  const current = !pathLeaf || pathLeaf === 'bilans' ? 'index.html' : pathLeaf;
  document.querySelectorAll('.site-nav .nav-link').forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  document.querySelectorAll('[data-feedback-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        form.querySelector(':invalid')?.focus();
        return;
      }
      const target = document.getElementById(form.dataset.feedbackForm);
      if (target) {
        target.textContent = form.dataset.message || 'Formularz jest poprawny. To wersja demonstracyjna — dane nie zostały zapisane.';
        target.classList.add('show');
        target.setAttribute('role', 'status');
      }
      form.classList.add('was-validated');
    });
  });

  const periodForm = document.getElementById('periodForm');
  if (periodForm) {
    periodForm.addEventListener('submit', event => {
      event.preventDefault();
      const month = document.getElementById('periodMonth');
      const year = document.getElementById('periodYear');
      const label = document.getElementById('periodLabel');
      const monthName = month.options[month.selectedIndex].text;
      label.textContent = `${monthName} ${year.value}`;
      const modal = bootstrap.Modal.getInstance(document.getElementById('periodModal'));
      modal?.hide();
    });
  }
});
