function check_clear(){
    Swal.fire({
        title: '請確認是否清除全部指令?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes !'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Clear succeed!',
            '٩(｡・ω・｡)﻿و',
            'success'
          )
          setTimeout(function(){
                location.reload()
            },1000);
        }
      })
}

function instruction_plus(){
    setTimeout(function () {
        // $("tbody tr:last").css( 
        //     "background-color", "green"); 
        var count_tr = $('tr').length -1;
        $("tbody").append(
            '<tr>'+
            '<th scope="row">'+ count_tr +'</th>'+
            '<td>'+
              '<input name="button-content" type="text" class="form-control" id="validationDefault02" placeholder="2 1 0" value="111" style="background-color: white;" maxlength="3">'+
            '</td>'+
            '<td>'+
              '<input name="switch-content" type="text" class="form-control" id="validationDefault02" placeholder="9 8 7.... 1 0" value="0000000000" style="background-color: white;"  maxlength="10"'+
            '</td>'+
          '</tr>'
        );

    }, 1);
}

function instruction_minus(){
    setTimeout(function () {
        // $("tbody tr:last").css( 
        //     "background-color", "green"); 
        var count_tr = $('tr').length;
        // console.log(count_tr);
        if (count_tr > 2)
            $("tbody tr:last").remove();
    }, 1);
}

function instruction_generate(){
    var tr_num = $('tr').length;
    if (tr_num > 2){
        var count_in = 0;
        var rom_msg = '&emsp;';
        // for ( count_in = 1; count_in < count_tr; count_in++){
        //     $("").value;

        var i=0;
        $("td").children("input").each(function () {
            if (i==0){
                rom_msg += '&emsp;&emsp;'+"5'd" + count_in + ": data_inst <= 16'b" + this.value;
                i ++;            
                count_in ++;
            }
            else {
                rom_msg += this.value + '000;  </br> &emsp;' ; 
                i = 0;
            }

            // console.log(this.value); // "this" is the current element in the loop
        });
        // console.log(msg);

        $(".card-rom").html(
            '<p>//rom</br>'+
            'always @(posedge clk)</br>'+
            'begin</br>&emsp;'+
            'case (cnt_inst)  </br>'+
    
            rom_msg +
            
            'endcase</br>'+
            '</p>'
            
            );

            Swal.fire({
                icon: 'success',
                title: 'Your work has been completed',
                showConfirmButton: false,
                timer: 1500
              })

    }

}


function scan_io(){
  console.log(document.getElementById('switch0').checked);
  console.log(document.getElementById('switch1').checked);
  var btn_msg = '';
  for (i=2; i>-1; i--){
    if (document.getElementById('io-btn'+i).checked)
      btn_msg += '0';
    else btn_msg += '1';
  }

  var sw_msg = '';
  for (i=9; i>-1; i--){
    if (document.getElementById('switch'+i).checked)
      sw_msg += '1';
    else sw_msg += '0';
  }

  var count_tr = $('tr').length -1;

  $("tbody").append(
    '<tr>'+
    '<th scope="row">'+ count_tr +'</th>'+
    '<td>'+
      '<input name="button-content" type="text" class="form-control" id="validationDefault02" placeholder="2 1 0" value="'+ btn_msg +'" style="background-color: white;" maxlength="3">'+
    '</td>'+
    '<td>'+
      '<input name="switch-content" type="text" class="form-control" id="validationDefault02" placeholder="9 8 7.... 1 0" value="'+ sw_msg +'" style="background-color: white;"  maxlength="10"'+
    '</td>'+
  '</tr>'
);


}