var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  }

TweenMax.set('svg', {
  visibility: 'visible'
})

var tl = new TimelineMax({
  repeat: -1
}).timeScale(1.4);
tl.staggerFromTo('#cpuGroup path', 0.5, {
  drawSVG: '0% 50%'
}, {
  drawSVG: '0% 0%',
  ease: Sine.easeOut
}, 0)

.from('#outline', 1, {
    drawSVG: '0% 0%',
    ease: Sine.easeInOut
  }, '-=0.5')
  .from('#exclamationDot', 0.3, {
    attr: {
      r: 0
    }
  }, '-=0.3')
  .from('#exclamationLine', 0.0001, {
    autoAlpha: 0
  }, '-=0.31')
  .from('#exclamationLine', 0.5, {
    attr: {
      y1: 293
    }
  }, '-=0.3')
  .staggerFrom(['#exclamationLine', '#exclamationDot'], 1, {
    cycle: {
      y: [40, 20]
    },
    ease: Anticipate.easeIn //Back.easeOut.config(2,0.7)
  }, 0.21, '-=1')

.to('#exclamationLine', 0.5, {
    drawSVG: '100% 100%'
  }, '+=2')
  .to('#exclamationDot', 0.5, {
    attr: {
      r: 0
    }
  }, '-=0.3')
  .staggerTo(['#exclamationLine', '#exclamationDot'], 0.5, {
    cycle: {
      y: [40, 20]
    },
    ease: Anticipate.easeOut
  }, 0.1, '-=0.5')

.to('#outline', 1, {
    drawSVG: '100% 100%',
    ease: Sine.easeInOut
  }, '-=0.5')
  .set('#outline', {
    autoAlpha: 0
  })
  .staggerTo('#cpuGroup path', 1, {
    drawSVG: '0% 100%'
  }, 0.08, '-=0.3')
  .to('#cpuGroup path', 0.2, {
    stroke: '#ededed',
    repeat: 11,
    yoyo: true,
    ease: Linear.easeNone
  })
.staggerFromTo('#heatlineGroup path', 0.5, {
  drawSVG:'0% 0%',
  alpha:0,
  stroke:'#f63'
},{
  alpha:1,
  drawSVG:'0% 30%',
  ease:Linear.easeNone
},0,'-=2.2')
.staggerTo('#heatlineGroup path', 0.7, {
  drawSVG:'70% 100%',
  ease:Linear.easeNone,
  stroke:'#232C38'
},0,'-=1.7')
.staggerTo('#heatlineGroup path', 0.5, {
  drawSVG:'100% 100%',
  alpha:0,
  ease:Power1.easeOut
},0,'-=1')

  .staggerTo('#cpuGroup path', 0.5, {
    drawSVG: '0% 50%',
    ease: Sine.easeIn
  }, 0)


//TweenMax.globalTimeScale(0.5)