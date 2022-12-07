var stop = 0;
var start_play = 1;
var timeunit = 1000;
var play_task;
// var tmp_fn;

function init()
{
  // console.log(tmp_fn);
}

document.getElementById('smit').onclick = function () {
  var checkedPosition =
      document.querySelectorAll("#player_stuff [name='position']:checked");
  var playerId =
      document.querySelector("#player_stuff [name='player_id']");
  var position = checkedPosition[0].value;
  var player_id = playerId.value;

  document.getElementById('disp_player').innerHTML =
      position + " " + player_id;
}



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
    if ( l[i] == 1) {
      $('.' + i + '.button-div').addClass('bg-red');
    }
    else
    {
      $('.' + i + '.button-div').removeClass('bg-red');
    }
  }
}

function clear_row(seg_length)
{
  for(i = 0;i < seg_length; i++)
  {
    $('#row'+i).removeClass('row-now');
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
        clear_row(seg.length);
        $('#row'+i).addClass('row-now');
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
    // console.log(tmp_fn);
    // fetch('/test')
    // fetch('/get_rslt')
    // .then(response => response.json())
    // .then(fetchData => {
    //   // console.log(fetchData.seg)
    //   playProc(fetchData)
    // })
    // .catch(console.error);
    console.log(window.glob);
    playProc(JSON.parse((window.glob).split('&#39;').join('"')));
  }
  else{
    timeunit = document.getElementById("timeunit").value;
    stop = 0;
  }
}

function pause() {
  stop =1;
}

function parse_tbl(fetchData)
{
  var seg = fetchData.output;
  for(i = 0;i < seg.length; i++)
  {
    console.log(seg[i].led);
    var switch_txt = "";
    for(j  = 0; j < (seg[i].led).length; j++)
    {
      // console.log((seg[i].led)[j]);
      if ((seg[i].led)[j] == 1)
      {
        switch_txt = switch_txt + " " + j;
      }
    }
    // console.log(switch_txt);
    $('#tbody').append(`<tr id=row`+ i +`><th scope="row">`+ i +`
    <td></td>
    <td>` + switch_txt + `</td>
    </th></tr>`);
  }

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
  // $('#tbody').append(`<tr><th scope="row">
  // <td>0 2</td>
  //  <td>1 2 5 6</td>
  //  </th></tr>`);
  fetch('/get_rslt')
  .then(response => response.json())
  .then(fetchData => {
    parse_tbl(fetchData);
    // console.log(fetchData)
    // playProc(fetchData)
  })
  .catch(console.error);
    
}

function arrowDown() {
  // play_task.abort();
  console.log("[DEBUG] arrowDown")
}
