// HIDE / REMOVE FLYOUT NAV
const navButton = document.querySelector('#nav_button')
navButton.addEventListener('click', () => {
  const flyoutNav = document.querySelector('#flyout-nav')
  flyoutNav.classList.toggle('hidden-right')

  const logo = document.querySelector('#logo')

  if(navButton.classList.contains('fa-bars')){
    navButton.classList.remove('fa-bars')
    navButton.classList.add('fa-times')
  }else{
    navButton.classList.remove('fa-times')
    navButton.classList.add('fa-bars')
  }
})