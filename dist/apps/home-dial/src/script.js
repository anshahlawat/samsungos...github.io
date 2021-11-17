var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
    dialDragger,
    startTl,
powerBtn = select('#powerBtn'),
iconGroup = select('#iconGroup'),
//brackets = select('#brackets'),
  selectionLabel = select('#selectionLabel'),
  centerGroup = select('#centerGroup'),
  centerLabel = select('#centerLabel'),
  centerLabelMask = select('.centerLabelMask'),
  dialLine = select('#dialLine'),
  dialCenter = select('#dialCenter'),
  dialContainer = select('#dialContainer'),
  dialArc = select('#dialArc'),
  lightIcon = select('#lightIcon'),
  volumeIcon = select('#volumeIcon'),
  airconIcon = select('#airconIcon'),
  fanIcon = select('#fanIcon'),
  dialMarkerContainer = select('#dialMarkerContainer'),
  dialMaxRot = 224,
  dialInitRot = -(dialMaxRot / 2),
  numDialMarkers = -1,
  dialStep = (dialMaxRot / numDialMarkers),
  page = -1,
    currentColor,
  iconDataArray = [ {
    min:0,
    max: 100,
    displayIntervalValue: 10,
    markerIntervalValue:10,
    storedRotation:-60.48,
    valueLabel:'<tspan style="font-size:46px;" dy="-0" class="unit" > %</tspan>',
    name:'LIGHTING',
    color:'#F9D73C'
  }, {
    min:20,
    max: 140,
    displayIntervalValue: 20,
    markerIntervalValue:5,
    storedRotation:-65.3333,
    valueLabel:'<tspan style="font-size:46px;" dy="-0" class="unit" > dB</tspan>',
    name:'VOLUME',
    color:'#FB9E21'
    
  },
  {
    min:10,
    max: 30,
    displayIntervalValue: 2,
    markerIntervalValue:4,
    storedRotation:-11.2,
    valueLabel:'<tspan style="font-size:60px;"  dy="-50" class="unit" > °</tspan>',
    name:'AIR TEMP',
    color:'#6681C3'
  },
 {
    min:0,
    max: 200,
    displayIntervalValue: 25,
    markerIntervalValue:20,
    storedRotation:35.84,
    valueLabel:'<tspan style="font-size:36px;"  dy="0" class="unit" > RPM</tspan>',
    name:'FAN SPEED',
    color:'#D85EB4'
  }
],
  displayIntervalValue = 0

  TweenMax.set('svg', {
    visibility: 'visible'
  })

TweenMax.set([dialMarkerContainer, dialArc], {
  rotation: dialInitRot,
  transformOrigin: '50% 50%'
})
TweenMax.set(dialContainer, {
  //rotation:-dialInitRot,
  //transformOrigin:'50% 50%'
  svgOrigin: '400 356'
})
TweenMax.set(iconGroup, {
  y:5
})

TweenMax.set(dialArc, {
  drawSVG: '6.05% 68.3%'
})


Draggable.create(iconGroup, {
  type:'x',
  bounds:{minX:-65, maxX:0},
  dragClickables:true,
  throwProps:true,
  snap:[-65, 0]
})

function makeDialMarkers() {
  var dialMarker = select('#dialMarker'),
    dialMarkerClone, dialLabel = select('#dialLabel'),
    dialLabelClone, dialMarkerStrokeColor = '#66CB70',
    dialMarkerStrokeColor = '#D6DADD';
  
  
  for (var i = 0; i <= numDialMarkers; i++) {
    
    if (i % displayIntervalValue == 0) {
      dialLabelClone = dialLabel.cloneNode(true);
      dialMarkerContainer.appendChild(dialLabelClone);
      dialLabelClone.textContent = i+ iconDataArray[page].min;
      dialLabelClone.setAttribute('class', 'dialInfo dialNumber');
      TweenMax.set(dialLabelClone, {
        fill:'#D6DADD',
        y: 156 - 40,
        svgOrigin: '400 240',
        transformOrigin: '50% 100%',
        rotation: (i * dialStep)
      })

    }
    
    dialMarkerClone = dialMarker.cloneNode(true);
    dialMarkerContainer.appendChild(dialMarkerClone);
    dialMarkerClone.id = "dialMarkerClone" + i;
    dialMarkerClone.setAttribute('class', 'dialInfo dialMarker');

    TweenMax.set(dialMarkerClone, {
      y: 156 - 20,
      svgOrigin: '400 220',
      transformOrigin: '50% 100%',
      rotation: (i * dialStep),
      stroke: dialMarkerStrokeColor,
      strokeWidth: ((i % (markerIntervalValue/2) == 0) || (i == (numDialMarkers))) ? 2 : 1,
      attr: {
        y1: ((i % (markerIntervalValue/2) == 0) || (i === (numDialMarkers ))) ? -14 : 0
      },
      drawSVG:'100% 100%'
    })

  }
  
  var revealTl = new TimelineMax();
  
  revealTl.staggerTo('.dialMarker', 0.1, {
    drawSVG:'0% 100%'
  },0.005)
  .staggerFrom('.dialNumber', 0.3,{
    alpha:0
  },0.005)
}

dialDragger = Draggable.create(dialContainer, {
  type: 'rotation',
  bounds: {
    minRotation: dialInitRot,
    maxRotation: -dialInitRot
  },
  throwProps: true,
  onDrag: onDrag,
  onThrowUpdate: onDrag,
  dragResistance: 0.5,
  onThrowComplete:function(){
    //console.log(dialContainer._gsTransform.rotation)
  },
  onRelease: onRelease,
  throwResistance: 2000,
  ease:Power4.easeOut,
  snap:function(val){
       
       return Math.round(val/dialStep) * dialStep 
     } ,
  overshootTolerance:0
})

function onRelease() {
  TweenMax.to([dialCenter], 0.4, {
    attr: {
      r: 70
    },
    ease: Elastic.easeOut.config(0.4, 0.8)
  })
  

  TweenMax.to("#centerLabelGroup", 0.2, {
    scale: 1,
    transformOrigin: '50% 50%',
    ease: Elastic.easeOut.config(0.4, 0.8)
  })
  iconDataArray[page].storedRotation = dialContainer._gsTransform.rotation;
}

function onDrag() {
  var rot = Math.abs(-(dialInitRot - dialContainer._gsTransform.rotation));
  
  var scaleValue = Math.round((rot / dialMaxRot) * numDialMarkers);
  var displayIntervalValue = iconDataArray[page].min + Math.round((rot / dialMaxRot) * numDialMarkers);

  centerLabel.innerHTML = displayIntervalValue + iconDataArray[page].valueLabel 


}

function clearScale() {
  dialDragger[0].disable();
  [].forEach.call(selectAll('.dialInfo'), function(el) {
    dialMarkerContainer.removeChild(el);
  })

  TweenMax.staggerTo('#paginatorGroup circle', 0.21, {
    cycle: {
      fill: function(i) {
        return (i == page) ? '#D6DADD' : '#FFF'
      }
    }
  }, 0)
  
  reset();
  
  
}

function reset(){
  
  numDialMarkers = iconDataArray[page].max - iconDataArray[page].min;
  dialStep = (dialMaxRot / numDialMarkers);
  displayIntervalValue = iconDataArray[page].displayIntervalValue;
  markerIntervalValue = iconDataArray[page].markerIntervalValue;
  selectionLabel.innerHTML = iconDataArray[page].name;
  
  TweenMax.fromTo(dialContainer,0.62, {
    rotation:dialInitRot
  }, {
    rotation:iconDataArray[page].storedRotation,
    onUpdate:onDrag,
    onStart:function(){
      
      TweenMax.set([centerLabel,selectionLabel], {
        fill:'#FFF'
      })
    },
    ease:Expo.easeInOut,
    onComplete:init
  })

  
  TweenMax.to([dialCenter], 0.2, {
    attr: {
      r: 0
    },
    ease: Sine.easeInOut
  })

  TweenMax.to("#centerLabelGroup", 0.5, {
    scale: 2,
    transformOrigin: '50% 50%',
    ease: Sine.easeInOut
  })


  
  
}

function init(){
  
  TweenMax.staggerTo([centerLabel,selectionLabel],0.31, {
    fill:currentColor,
    ease:Power3.easeIn
  },0.12)
  
  makeDialMarkers();
  onDrag();
  onRelease();  
  
  dialDragger[0].enable()
}



function clickIcon(e){
  
  
  if(page == Number(e.currentTarget.getAttribute('icon-data'))){
    
    return;
  }
    
  page = Number(e.currentTarget.getAttribute('icon-data'));
  currentColor = iconDataArray[page].color;
   clearScale();
  
  TweenMax.staggerTo('.iconText', 0.1, {
    cycle:{
     fill:function(i) {
      
      return (i == page) ? currentColor : '#D6DADD'
    }
    }
  },0)
  TweenMax.staggerTo('.icon', 0.5, {
    cycle:{
     fill:function(i) {
      
      return (i == page) ? currentColor : '#D6DADD'
    }
    }
  },0)
  
  TweenMax.set('#dialLine', {
    stroke:currentColor
  })
  
  onRelease();
}

function start(){
  
  TweenMax.set(dialContainer, {
    rotation:dialInitRot
  })
  
  fanIcon.onclick = lightIcon.onclick = volumeIcon.onclick = airconIcon.onclick = clickIcon;

 startTl = new TimelineMax({onComplete:function(){
    lightIcon.onclick({currentTarget:lightIcon});
  }});
  startTl.from(powerBtn, 3, {
    autoAlpha:0,
    ease:Expo.easeIn
  })
    .addPause()
    .to(powerBtn, 0.6,{
    scale:3.3,
    transformOrigin:'50% 50%',
    autoAlpha:0
  })
 
    .from('#dial', 3, {
    scale:0.7,
    transformOrigin:'50% 50%',
    alpha:0,
    ease:Elastic.easeOut.config(0.6,0.8)
    
  },'-=0.6')
  .from(centerGroup, 1, {
    autoAlpha:0,
    ease:Power1.easeIn
  },'-=3')
  .staggerFrom('#iconGroup path', 0.5, {
    autoAlpha:0,
    ease:Power1.easeIn
  },0.1,'-=2')
  .from(['#dialLine',dialArc], 2, {
    drawSVG:'0% 0%',
    ease:Sine.easeInOut
  },'-=3')
  
 .staggerFrom('#paginatorGroup circle', 1, {
    autoAlpha:0
  },0.05,'-=1.5')
  
  startTl.timeScale(2)  ;
  
  document.onkeydown = keyCheck;
}

function keyCheck(e){
  
  var currentRotation = dialContainer._gsTransform.rotation;
  var keyCode = e.keyCode;
  
  switch(keyCode){
      
    case 39:
    case 38:  
      
      currentRotation+= dialStep;
      
      if(currentRotation > (dialMaxRot/2)){        
        currentRotation = dialMaxRot/2;
      }
      TweenMax.set(dialContainer, {
        rotation:currentRotation,
        onUpdate:onDrag
      })
      
      iconDataArray[page].storedRotation = dialContainer._gsTransform.rotation;
      
      break;
      case 37:
      case 40: 
      
      currentRotation-= dialStep;
      
      if(currentRotation < (-dialMaxRot/2)){
        
        currentRotation = -dialMaxRot/2;
      }
      //console.log(dialStep)
      TweenMax.set(dialContainer, {
        rotation:currentRotation,
        onUpdate:onDrag
      })
      
      iconDataArray[page].storedRotation = dialContainer._gsTransform.rotation;
      break;
      
    case 97:
    case 49:
      //icon1
      TweenMax.to(iconGroup, 0.6, {
        x:0,
        ease:Elastic.easeOut.config(0.6,0.8)
      })      
      lightIcon.onclick({currentTarget:lightIcon});
      iconDataArray[page].storedRotation = dialContainer._gsTransform.rotation;
     break; 
      
    case 98:
    case 50:
      //icon2
      TweenMax.to(iconGroup, 0.6, {
        x:0,
        ease:Elastic.easeOut.config(0.6,0.8)
      })        
      volumeIcon.onclick({currentTarget:volumeIcon});
      
      iconDataArray[page].storedRotation = dialContainer._gsTransform.rotation;
     break; 
      
   case 99:
   case 51:
      //icon3
      TweenMax.to(iconGroup, 0.6, {
        x:0,
        ease:Elastic.easeOut.config(0.6,0.8)
      })      
      airconIcon.onclick({currentTarget:airconIcon});
      
      iconDataArray[page].storedRotation = dialContainer._gsTransform.rotation;
      
     break; 
      
  case 100:
  case 52:
      //icon4
      TweenMax.to(iconGroup, 0.6, {
        x:-65,
        ease:Elastic.easeOut.config(0.6,0.8)
      })
      fanIcon.onclick({currentTarget:fanIcon});
      
      iconDataArray[page].storedRotation = dialContainer._gsTransform.rotation;
      
      
     break; 
      
      
      
}
  
}

start();

powerBtn.onclick = function(e){
  startTl.play();
}

//TweenMax.globalTimeScale(0.5)