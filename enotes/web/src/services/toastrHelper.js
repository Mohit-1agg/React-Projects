/**
 * toastr notify service
 */

import toastr from 'toastr';
import 'toastr/build/toastr.min.css'; // Import toastr CSS

// Configure toastr options
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: 3000 // Auto close after 3 seconds
};

function onSuccess (message) {
  toastr.success(message);
}

function onError (message) {
  toastr.error(message);
}

function onWarning (message) {
  toastr.warning(message);
}

function onInfo (message) {
  toastr.info(message);
}

export default { onSuccess, onError, onWarning, onInfo };
