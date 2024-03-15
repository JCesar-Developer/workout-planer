/**
 * Show a notification message that will disappear after 3 seconds
 */
export function showNotification (message, type = 'success') {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type} alert-dismissible py-2 fade show mb-0`;
  alert.role = 'alert';
  alert.style.animation = 'fadeIn 0.5s, fadeOut 0.5s forwards';
  alert.style.animationDelay = '0s, 2.5s';
  alert.innerHTML = `
    <p class="mb-0">${message}</p>
    <button type="button" class="btn-close pb-1" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  document.getElementById('alert-container').appendChild(alert);
  removeAlert(alert);
}

function removeAlert (alert) {
  setTimeout(function () {
    alert.remove();
  }, 3000);
}