export default () => {
   const footerContainer = document.querySelector('footer')
   footerContainer.innerHTML = `
      <div class="footer-icon">
         <span class="fa-brands fa-square-facebook"></span>
         <span class="fa-brands fa-instagram"></span>
         <span class="fa-brands fa-square-twitter"></span>
         <span class="fa-brands fa-square-youtube"></span>
      </div>
   `
}