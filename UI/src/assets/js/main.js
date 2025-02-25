$(document).ready(function () {
  "use strict";


  var divHeight = $('.tile-box-right').height();
  $('.tile-box-left').css('min-height', divHeight + 'px');

  $('.scroll-check-width').slimscroll({
    height: '213px',
    width: '100%',
    axis: 'x'
  });
  $(".sub-project-list").each(function () {
    var myHeight = $(window).height() - 187;
    $(this).slimscroll({
      height: myHeight,
      width: '100%',
    });
  });
  // $(".tab-content-height").each(function () {
  //   var myHeight = 245;
  //   $(this).slimscroll({
  //     height: myHeight,
  //     width: '100%',
  //   });
  // });

  // $(".small-height-grid").each(function () {
  //   var myHeight = $(window).height() - 450;
  //   $(this).slimscroll({
  //     height: myHeight,
  //     width: '100%',
  //   });
  // });
  // $(".full-height-grid").each(function () {
  //   var myHeight = $(window).height() - 135;
  //   $(this).slimscroll({
  //     height: myHeight,
  //     width: '100%',
  //   });
  // });

  $(".small-height-grid-program").each(function () {
    var myHeight = $(window).height() - 410;
    $(this).slimscroll({
      height: myHeight,
      width: '100%',
    });
  });
  $(".full-height-grid-program").each(function () {
    var myHeight = $(window).height() - 100;
    $(this).slimscroll({
      height: myHeight,
      width: '100%',
    });
  });




  // $(".btn-program-tile").click(function () {
  //   $(".tile-view-top").toggle();
  //   $('.chart-view-top').toggle();
  // });

  $(".main-table").clone(true).appendTo('#table-scroll').addClass('clone');
  $(".main-table2").clone(true).appendTo('#table-scroll2').addClass('clone');


  $(".btn-accept-all, .btn-cancel-all").click(function () {
    $(".edit-row").removeClass('editable-row');
    $('.fixed-blue-strip').fadeOut();
  });


  $(".btn-forecast-mode").click(function () {
    $('.fixed-blue-strip').fadeIn();
  });
  $(".edit-row").click(function () {
    $(this).addClass('editable-row');
    $('.fixed-blue-strip').fadeIn();
  });


  $(".btn-footer-control").click(function () {
    $('.down-table-footer').toggle();
    $(this).toggleClass('rotate-opp');
    $(this).parent().toggleClass('bottom-40');
  });

  // $(".btn-chart-view").click(function () {
  //   $('.small-grid').toggle();
  //   $('.full-grid').toggle();
  //   $('.top-single-project').toggle();
  // });
  $(".btn-dimension").click(function () {
    $('.dropdown-box.dimension-dropdown').toggle();
    $('.dropdown-box.segment-dropdown').hide();
  });

  $(".btn-segments").click(function () {
    $('.dropdown-box.dimension-dropdown').hide();
    $('.dropdown-box.segment-dropdown').toggle();
  });

  $(".btn-blue-header").click(function () {
    $('.btn-blue-header.active').removeClass('active');
    $(this).addClass('active');
  });
  $(".btn-expand-tab").click(function () {
    $(".custom-expand-width").toggleClass('width-70-expand');
    $('.extra-col').toggleClass('hide-column');
  });
  $(".arrow-toggle").click(function () {
    $(this).parent().parent().parent().find('.extra-toggle-content').slideToggle();
    $(this).toggleClass('rotate-down');
  });

  $('.image-toggle-switch input').change(function () {
    if ($(this).is(":checked")) {
      $(this).parent().parent().find('.switch-status').addClass('done-green');
    } else {
      $(this).parent().parent().find('.switch-status').removeClass('done-green');
    }
  });

  $(".action-header-btns .view-btns").click(function () {
    $('.view-btns.active').removeClass('active');
    $(this).addClass('active');
  });

  $(".btn-grid-view").click(function () {
    $('.grid-view').show();
    $('.tile-view').hide();
  });

  $(".btn-tile-view").click(function () {
    $('.tile-view').show();
    $('.grid-view').hide();
  });

  $(".btn-acc-arrow").click(function () {
    $('.acc-container').slideToggle();
  });

  // admin user list js start
  $(".btn-change-pwd").click(function () {
    $('.hide-password').show();
    $('.editable-password').hide();
  });
  $(".btn-user-update, btn-user-cancel").click(function () {
    $('.hide-password').hide();
    $('.editable-password').show();
  });



  $(".box-import .btn-close-import").click(function () {
    $('.box-import, .common-bg').hide();
  });
  $(".btn-import").click(function () {
    $('.box-import, .common-bg').show();
  });



  $(".btn-reset-pwd").click(function () {
    $(this).parent().find('.box-reset-pwd').show();
    $('.common-bg').show();
  });
  $(".box-reset-pwd .btn-close-import").click(function () {
    $(this).parent().parent().parent().parent().parent().parent().find('.box-reset-pwd').hide();
    $('.common-bg').hide();
  });


  $(".height-table-sidebar").each(function () {
    var myHeight = $(window).height() - 400;
    $(this).slimscroll({
      height: myHeight,
      width: '100%',
    });
  });

  $(".height-table-snapshot").each(function () {
    var myHeight = $(window).height() - 450;
    $(this).slimscroll({
      height: myHeight,
      width: '100%',
    });
  });
  $(".height-main-container").each(function () {
    var myHeight = $(window).height() - 90;
    $(this).slimscroll({
      height: myHeight,
      width: '100%',
    });
  });

  $(".height-create-user").each(function () {
    var myHeight = $(window).height() - 150;
    $(this).slimscroll({
      height: myHeight,
      width: '100%',
    });
  });

  $('#chooseFile').bind('change', function () {
    var filename = $("#chooseFile").val();
    if (/^\s*$/.test(filename)) {
      $(".common-file-upload .file-upload").removeClass('active');
      $("#noFile").text("No file chosen...");
    } else {
      $(".common-file-upload .file-upload").addClass('active');
      $("#noFile").text(filename.replace("C:\\fakepath\\", ""));
    }
  });
  $('input[name=file-type]').click(function () {
    if (this.id == "other-field-1") {
      $(".other-input-1").show();
    } else {
      $(".other-input-1").hide();
    }
  });
  $('input[name=file-del]').click(function () {
    if (this.id == "other-field-2") {
      $(".other-input-2").show();
    } else {
      $(".other-input-2").hide();
    }
  });
  $('input[name=line-text]').click(function () {
    if (this.id == "line-text-1") {
      $(".line-text-input-1").removeClass('disable-div');
      $(".line-text-input-2").addClass('disable-div');
    } else if (this.id == "line-text-2") {
      $(".line-text-input-2").removeClass('disable-div');
      $(".line-text-input-1").addClass('disable-div');
    }
  });
  // admin user list js end
});

// common js start


$('.btn-sidebar').click(function () {
  $(this).hide();
  $('.btn-close-sidebar-panel, .menu-name, .submenu-arrow-icon, .sidebar-title, .sidebar-header-links .home-link').show();
  $('.main-container').addClass('main-left-275');
});
$('.btn-close-sidebar-panel').click(function () {
  $(this).hide();
  $('.btn-sidebar').show();
  $('.menu-name, .submenu-arrow-icon, .sidebar-title, .sidebar-header-links .home-link').hide();
  $('.main-container').removeClass('main-left-275');
});

function openNav() {
  "use strict";
  // document.getElementById("sidebar-left").style.width = "275px";
  const element = document.getElementById('sidebar-left');
  element.classList.add('w-275');
  element.classList.remove('w-60');
}

function closeNav() {
  "use strict";
  // document.getElementById("sidebar-left").style.width = "60px";
  const element = document.getElementById('sidebar-left');
  element.classList.add('w-60');
  element.classList.remove('w-275');
}

function openCreateUser() {
  "use strict";
  document.getElementById("create-user-right").style.right = "0px";
}

function closeCreateUser() {
  "use strict";
  document.getElementById("create-user-right").style.right = "-437px";
}

function openEditUser() {
  "use strict";
  document.getElementById("edit-user-right").style.right = "0px";
}

function closeEditUser() {
  "use strict";
  document.getElementById("edit-user-right").style.right = "-437px";
}

function openCreateSnapshot() {
  "use strict";
  document.getElementById("create-user-right").style.right = "0px";
}

function closeCreateSnapshot() {
  "use strict";
  document.getElementById("create-user-right").style.right = "-586px";
}

function openManagePermission() {
  "use strict";
  document.getElementById("manage-permission").style.right = "0px";
}

function closeManagePermission() {
  "use strict";
  document.getElementById("manage-permission").style.right = "-586px";
}

// function openCommentPanel() {
//   "use strict";
//   document.getElementById("comment-panel").style.right = "0px";
// }

// function closeCommentPanel() {
//   "use strict";
//   document.getElementById("comment-panel").style.right = "-360px";
// }

// common js end


// flip btn js start
$(".btn-flip").click(function () {
  $('.card-btn').toggleClass('flipped');
});
// flip btn js end
