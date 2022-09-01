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
            // console.log('.' + t+'.' + f+ " Change");
            $('.' + t + '.' + f).toggleClass('on');
        }
    }
}

async function playProc(fetchData) {
  var i = 0;
  var seg = fetchData.seg;

  for(;i < seg.length; i++)
  {
    // console.log(seg[i].seg_3);
    // playProcSeg(3, seg[i].seg_3)
    // playProcSeg(2, seg[i].seg_2);
    // playProcSeg(1, seg[i].seg_1);
    // playProcSeg(0, seg[i].seg_0);
    // await playProcSleep(1000);    
  }
    console.log( Object.values(seg[i-1]));
    // console.log( Object.values(s_list[i-1].seg_3).map(Math.abs));
    // playProcInit(i);

}

function play() {
  fetch('/test?arg=123')
  .then(response => response.json())
  .then(fetchData => {
    console.log(fetchData.seg)
    playProc(fetchData)
  })
  .catch(console.error);
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
  console.log("[DEBUG] arrowDown")
}