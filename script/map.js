var script_url = "https://script.google.com/macros/s/AKfycbyX3BIJ1FHSkPAW5HreOrYBSZmCsHj1qc5unu55dwo2U1Riejjr/exec";
var url = script_url+"?action=read";

//display spinnder when fetch data
$('img').filter("#preloader").css("display","inline");

function getUserInfo(n){
  /*display data with fetch API*/
  fetch(url,function(){
    $('img').filter("#preloader").css("display","inline");
  }).then(function(response) {
    response.json().then(function(data) {
    $('img').filter("#preloader").css("display","none");
    for (var i = 0; i < data.records.length; i++) {
      if(n == data.records[i].id){

        console.log(data.records[i]);

        $(".book").text(data.records[i].book);
        $(".ibsn").text('IBSN Number: ' + data.records[i].ibsn);
        $(".class").text('Class Name: ' + data.records[i].classname);
        
        $(".info").text("Hello, I am "+data.records[i].name);
        $(".available").text('I am available on ' + data.records[i].available_time);
        $(".email").text('Email me at ' + data.records[i].email + ' for more info!');
        
      }
    }

    });
  });
}

let strArray = [];
function splitURL(URL){

  let str = URL.split("?");
  //console.log(str);
  strArray.push(str);

  for(let i = 0; i < str.length; i++){
    //console.log(str[i]);
    for(let j = 0; j < str[i].length; j++){
      if(str[i][j] == '='){
        //console.log(str[i]);
        strArray.push(str[i]);
      }
    }
  }

  return strArray;
}

let loc_lat = '';
let loc_lng = '';
let user_id = '';

function userLat(arr){

  let lat_sub = 'lat';
  let lng_sub = 'lng';
  let id_sub = 'id';

  let lat_str;
  let lng_str;
  let id_str;

  for(let i = 0; i < arr.length; i++){
    if(arr[i].includes(lat_sub)){
      lat_str = arr[i];
    }

    if(arr[i].includes(lng_sub)){
      lng_str = arr[i];
    }

    if(arr[i].includes(id_sub)){
      id_str = arr[i];
    }
  }

  for(let i = 0; i < lat_str.length; i++){
    //console.log(lat_str[i]);
    if(!isNaN(parseInt(lat_str[i])) || (lat_str[i] == '.') || (lat_str[i] == '-')){
      //loc_lat.push(lat_str[i]);
      loc_lat = loc_lat + lat_str[i];
    }
  }
  console.log(loc_lat);

  for(let i = 0; i < lng_str.length; i++){
    //console.log(lng_str[i]);
    if(!isNaN(parseInt(lng_str[i])) || (lng_str[i] == '.') || (lng_str[i] == '-')){
      //loc_lng.push(lng_str[i]);
      loc_lng = loc_lng + lng_str[i];
    }
  }
  console.log(loc_lng);

  for(let i =0; i < id_str.length; i++){

    if(!isNaN(parseInt(id_str[i]))){
      user_id = user_id + id_str[i];
    }
  }
  console.log(user_id);

  let link = `../img/profile/png/user${user_id}.png`;
  let booklink = `../img/book/book${user_id}.png`;

  console.log(link);

  $(".profile").attr("src",link);
  $(".book").attr("src",booklink);
  getUserInfo(user_id);
}

userLat(splitURL(window.location.href));
console.log(loc_lat + " " + loc_lng);

function initMap() {
  var myLatlng = new google.maps.LatLng(loc_lat,loc_lng);
  var mapOptions = {
    zoom: 15,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
  });

  marker.setMap(map);
}