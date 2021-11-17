function launchIntoFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
function redirectpage(){
{
window.location="starting.html";
}
setTimeout('redirectpage()',1);
}
$('img').click(function() {
  launchIntoFullscreen(document.documentElement);
});

function play() {
  $('.welcome').fadeOut(700, function() {
    setTimeout(function() {
      $('.format').fadeIn(700);
    }, 200);
    setTimeout(function() {
      $('.load div').animate({
        'width': '40%'
      }, 900, 'linear').animate({
        'width': '100%'
      }, 200, 'linear', function() {
        
        $('.format').fadeOut(700, function() {
          setTimeout(function() {
            $('.install').fadeIn(700).css('display', 'flex');
            
            var loader = document.querySelector('#svgLoaderCircle'),
              percentagetext = document.querySelector('#svgPercentageText'),
              copyFiles = document.querySelector('.copyFiles'),
              installOS = document.querySelector('.installOS'),
              config = document.querySelector('.config'),
              progress = 500,
              percentage = 0;

            setInterval(function() {
              loader.setAttribute("stroke-dashoffset", progress);
              percentagetext.innerHTML = percentage + "%";
              if (percentage <= 17) {
                copyFiles.classList.add('active');
                copyFiles.children[0].innerHTML = percentage + "%";
                installOS.classList.remove('active');
                installOS.classList.remove('done');
                installOS.children[0].innerHTML = "";
                config.classList.remove('active');
                config.classList.remove('done');
                config.children[0].innerHTML = "";
              }
              if (percentage >= 20 && percentage <= 55) {
                copyFiles.classList.remove('active');
                copyFiles.classList.add('done');
                copyFiles.children[0].innerHTML = "";
                installOS.classList.add('active');
                installOS.children[0].innerHTML = percentage + "%";
                config.classList.remove('active');
                config.children[0].innerHTML = "";
              }
              if (percentage >= 56) {
                copyFiles.classList.remove('active');
                copyFiles.children[0].innerHTML = "";
                installOS.classList.remove('active');
                installOS.classList.add('done');
                installOS.children[0].innerHTML = "";
                config.classList.add('active');
                config.children[0].innerHTML = percentage + "%";
              }
              percentage++;
              progress = +progress - 5.19;
              if (progress < 0) {
                progress = 50;
              }
              if (percentage > 100) {
                percentage = 0;
                redirectpage();
              }

            }, 50);
            
          }, 35);
          
        });

      });
    }, 60);
  });
}
$('.get-started').click(function() {
  play();
  launchIntoFullscreen(document.documentElement);
});