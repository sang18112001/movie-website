function toast() {
  const main = document.getElementById('toast');
  // Auto remove toast
  setTimeout(function () {
    //  main.removeChild(toast);
    main.style.display = 'none';
  }, 2000);
  main.innerHTML = `
         <div class="toast">
            <div class="toast__icon" style="font-size: 24px; padding: 0px 16px">
               <i class="fas fa-check-circle" style="color: #47d864;"></i>
            </div>
            <div class="toast__body">
               <h3 class="toast__title">Success</h3>
               <p class="toast__msg">Congratulations, your account has been sucessfully created</p>
            </div>
         </div>
   `;
  main.style.display = 'block';
}
