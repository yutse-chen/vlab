var stop = 0;
var start_play = 1;
var timeunit = 1000;
var play_task;


function checkUpload(){
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

function playProcSleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function playProcSeg(f, l ) {
    var seg = 'a';
    var t;
    for (var i = 0; i < l.length; i++) {
        t = String.fromCharCode(seg.charCodeAt(0)+i);
        if (l[i] == 1){
            // console.log("[ON]" + t)
            // console.log('.' + t+'.' + f+ " add");
            $('.' + t + '.' + f).addClass('on');
        }
        else
        {
          // console.log('.' + t+'.' + f+ " remove");
          $('.' + t + '.' + f).removeClass('on');
        }
    }
}

function playProcLed(l) {
  console.log(l)
  for (var i = 0; i < l.length; i++) {
    // t = String.fromCharCode(seg.charCodeAt(0)+i);
    // console.log(typeof(i));

    // if ( (l[i] != 1) || (parseInt(i,10) !== parseInt(9,10)) || (parseInt(i, 10) !== parseInt(8, 10)) ){
    if ( l[i] != 1) {
      $('.' + i + '.button-div').addClass('bg-red');
    }
    else
    {
      $('.' + i + '.button-div').removeClass('bg-red');
    }
  }
}


async function playProc(fetchData) {
  var i = 0;
  var seg = fetchData.output;
  start_play = 0;
  while (true){
    for(i = 0;i < seg.length; i++)
    {
      do{
        // console.log(seg[i].seg_3);
        playProcSeg(3, seg[i].seg_3)
        playProcSeg(2, seg[i].seg_2);
        playProcSeg(1, seg[i].seg_1);
        playProcSeg(0, seg[i].seg_0);
        playProcLed(seg[i].led);
        await playProcSleep(timeunit);
      } while(stop)
    }
  }
}

function play() {

  if (start_play){
    fetch('/test?arg=123')
    .then(response => response.json())
    .then(fetchData => {
      // console.log(fetchData.seg)
      playProc(fetchData)
    })
    .catch(console.error);
  }
  else{
    timeunit = document.getElementById("timeunit").value;
    stop = 0;
  }
}

function pause() {
  stop =1;
}



function cleanAll() {
  console.log("[DEBUG] cleanAll")
}

function addTask() {
  console.log("[DEBUG] addTask")
}

function delTask() {
  console.log("[DEBUG] delTask")
}

function arrowUp() {
  console.log("[DEBUG] arrowUp")
}

function arrowDown() {
  // play_task.abort();
  console.log("[DEBUG] arrowDown")
}


// $(document).ready(function ()
//   {
//       $("#myForm").submit(function (e)
//           {
//               //Stops submit button from refreshing page.
//               e.preventDefault();

//               var form_data = new FormData(this);

//               $.ajax({
//                   url: 'http://example/DB_1/AccessWeb/file_upload.php', //location of where you want to send image
//                   dataType: 'json', // what to expect back from the PHP script, if anything
//                   cache: false,
//                   contentType: false,
//                   processData: false,
//                   data: form_data,
//                   type: 'post',
//                   success: function (response)
//                       {
//                           alert('success');
//                       },
//                   error: function ()
//                       {
//                           alert('failure');
//                       }
//               });
//           });
//   });


// $(document).on('submit','#myForm',function(e)
// {
//   e.preventDefault();
//   $.ajax({
//     type:'POST',
//     url:'/',
//     data:{
//       myfile:$("#myfile").val()
//     },
//       success:function()
//     {
//       alert('saved');
//     }
//   })
// });