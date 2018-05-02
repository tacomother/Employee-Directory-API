let users;
let userList;
let text;
let modalText;

function allFunctions(data) {
  users = data.results;
  displayUsers(data);
  displayModal(data);
  modalInteraction();
}

function displayUsers(data) {
    text = '<ul class="user-lists">';
    $.each(data.results, function(i, user) {
        text += '<li class="user-lists" data-user="' + i + '"><img src="' + user.picture.large + '">';
        text += '<div><h2 class="user-name">' + user.name.first + ' ' + user.name.last + '</h2>';
        text += '<span class="email">' + user.email + '</span>';
        text += '<span class="city">' + user.location.city + '</span></div></li>';
    });
    text += '</ul>';
    $('.users').append(text);
    userList = $('.user-lists').children();


    // SEARCH THING
    $("#search").keyup(function(){
        const value = $(this).val().toUpperCase();
        $(".users li").filter(function(){
        ($(this).toggle($(this).text().toUpperCase().indexOf(value) > -1))
        });
    });
};

function displayModal(data) {
  modalText = '<ul>';

  $.each(data.results, function(i, user) {
    modalText += '<li class="user-modals">';
    modalText += '<img data src="' + user.picture.large + '">';
    modalText += '<h2>' + user.name.first + ' ' + user.name.last + '</h2>';
    modalText += '<span>' + user.email + '</span>';
    modalText += '<span class="location">' + user.location.city + '</span>';
    modalText += '<span class="line"></span>';
    modalText += '<span>' + user.cell + '</span>';
    modalText += '<span>' + user.location.street + ', ' + user.location.postcode + ', ' + user.nat + '</span>';
    modalText += '<span>' + user.dob + '</span></li>';
  });
  modalText += '</ul>';
  $('.overlay').html(modalText);
};

function modalInteraction() {
  $('.close').click(function() {
    $('.overlay').css('display', 'none');
    $('.modal').css('display','none');
  });

  $.each(userList, function(i, user){
    (function(i){
      let userModals = document.getElementsByClassName('user-modals');
      userModals[i].style.visibility="hidden";
      $(user).click(function(){
        $('.overlay').css('display','block');
        $('.modal').css('display','block');
        userModals[i].style.visibility = "visible";
      });
    })(i);
  });
}

$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us',
  dataType: 'json',
  success: allFunctions
});
