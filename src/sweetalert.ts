import Swal from 'sweetalert2';

function sweetAlertError(txt:string){
  Swal.fire({
    title: 'Error!',
    text: txt,
    icon: 'error',
    confirmButtonText: 'Ok'
  })
}

function sweetAlertSuccess(txt:string){
  Swal.fire({
    title: 'Success',
    text: txt,
    icon: 'success',
    confirmButtonText: 'Ok'
  })
}

export {sweetAlertError,sweetAlertSuccess}
