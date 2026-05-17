// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader')
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 250)
  }
})

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const href = anchor.getAttribute('href')
    if (!href || href === '#') {
      return
    }

    const target = document.querySelector(href)
    if (target) {
      event.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})

if ('IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll('.card, .listing-card, .review-card, .create-form-card, .edit-form-container')

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
        revealObserver.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  })

  revealTargets.forEach(target => {
    target.style.opacity = '0'
    target.style.transform = 'translateY(20px)'
    target.style.transition = 'opacity 0.45s ease, transform 0.45s ease'
    revealObserver.observe(target)
  })
}

const backToTop = document.createElement('button')
backToTop.className = 'back-to-top'
backToTop.type = 'button'
backToTop.setAttribute('aria-label', 'Back to top')
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>'

Object.assign(backToTop.style, {
  position: 'fixed',
  bottom: '1.4rem',
  right: '1.4rem',
  width: '42px',
  height: '42px',
  borderRadius: '999px',
  border: 'none',
  background: 'linear-gradient(140deg, #ff5a3d, #ff7d49)',
  color: '#fff',
  boxShadow: '0 8px 18px rgba(217, 74, 49, 0.35)',
  cursor: 'pointer',
  opacity: '0',
  visibility: 'hidden',
  transition: 'all .25s ease',
  zIndex: '1000'
})

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

window.addEventListener('scroll', () => {
  const show = window.scrollY > 260
  backToTop.style.opacity = show ? '1' : '0'
  backToTop.style.visibility = show ? 'visible' : 'hidden'
})

document.body.appendChild(backToTop)