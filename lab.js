function checkUpload(){
    console.log(123)
    Swal.fire({
        title: '請確認是否上傳此內容?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Upload succeed!',
            '٩(｡・ω・｡)﻿و',
            'success'
          )
        }
      })
}