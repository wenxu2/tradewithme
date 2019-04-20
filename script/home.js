var script_url = "https://script.google.com/macros/s/AKfycbyX3BIJ1FHSkPAW5HreOrYBSZmCsHj1qc5unu55dwo2U1Riejjr/exec";
var url = script_url+"?action=read";

/*display data with fetch API*/
fetch(url, function(){
  $('img').filter("#preloader").css("display","inline");
  }).then(function(response) {
      response.json().then(function(data) {
        $('img').filter("#preloader").css("display","none");
        for (var i = 0; i < data.records.length; i++) {
          console.log(data.records[i]);
          $(".name").filter(`#${data.records[i].id}`).text(data.records[i].book);
          $(".classname").filter(`#${data.records[i].id}`).text(data.records[i].classname);
        }

      });
});


/* filter*/
$("button").click(function(){
  console.log("test");
  let zip;

  let zip_1 = $("#zipcode_1").val();
  let zip_2 = $("#zipcode_2").val();
  console.log(zip_1);
  console.log(zip_2);

  if((zip_1 == '') && (zip_2 == '')){
    alert("Please do not leave the input field blank!");
  }else if(zip_1 != ''){
    zip = zip_1;
  }else if(zip_2 != ''){
    zip = zip_2;
  }


  $('img').filter("#preloader").css("display","inline");
  
  fetch(url, function(){
    $('img').filter("#preloader").css("display","inline");
  }).then(function(response) {
    $('img').filter("#preloader").css("display","none");
    response.json().then(function(data) {
      for (var i = 0; i < data.records.length; i++) {
        if(data.records[i].zip != zip)
          $('.card_style').filter(`#${data.records[i].id}`).css("display","none");
      }

    });
  });

});

let user_lat;
let user_lng;
$(".card").click(function() {
  
  let id = $(this).attr('id');
  $.getJSON(url, function (json) {
        
      for (var i = 0; i < json.records.length; i++) {

        if(json.records[i].id == id){
          user_lat = json.records[i].lat;
          user_lng = json.records[i].lng;
        }
        }
      }).then(function(){

        console.log(user_lat);
        console.log(user_lng);
        window.location.href = "../map/map.html" + `?lat=${user_lat}`+ `?lng=${user_lng}` +`?id=${id}`;
        
      });

});


