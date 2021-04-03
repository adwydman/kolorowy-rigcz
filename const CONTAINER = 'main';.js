const CONTAINER = 'main';

const COORD_TYPES = {
  M: 'M',
  C: 'C',
  L: 'L'
};

const generateSvgCoords = (type, ...coords) => {
  return `${type} ${coords.join(' ')}`;
};

function wavify(waveElements) {
  let width = document.querySelector(CONTAINER).getBoundingClientRect().width,
    height = 200,
    lastUpdate,
    totalTime = 0,
    animationInstance = false;

  function drawPoints(factor, index = 0) {
    const points = []; 
    const settings = waveElements[index];

    for (var i = 0; i <= settings.bones; i++) {
      var x = (i / settings.bones) * width;
      var sinSeed = (factor + (i + (i % settings.bones))) * settings.speed * 100;
      var sinHeight = Math.sin(sinSeed / 100) * settings.amplitude;
      var yPos = Math.sin(sinSeed / 100) * sinHeight;
      points.push({ x: x, y: ((index+1) * height) - yPos });
    }

    return points;
  }

  function drawPath(points, allDrawnPoints, index) {
    let SVGString = "";
    let previousPoints

    if (index === 0) {
      SVGString += generateSvgCoords(COORD_TYPES.M, width, 0);
      SVGString += generateSvgCoords(COORD_TYPES.L, 0, 0);
    } else {
      previousPoints = allDrawnPoints[index - 1];
      SVGString = generateSvgCoords(COORD_TYPES.M, width, previousPoints[previousPoints.length-1].y);

      for (var i = previousPoints.length - 1; i >= 1; i--) {
        SVGString += generateSvgCoords(COORD_TYPES.C, previousPoints[i].x, previousPoints[i].y, previousPoints[i].x, previousPoints[i].y,  previousPoints[i-1].x,  previousPoints[i-1].y);
      }

      SVGString += generateSvgCoords(COORD_TYPES.L, 0, points[0].y);
    }
    
    if (index + 1 === waveElements.length) {
      SVGString += generateSvgCoords(COORD_TYPES.L, 0, (index + 1) * height);
      SVGString += generateSvgCoords(COORD_TYPES.L, width, (index + 1) * height);
    } else {
      if (index === 0){
        SVGString += generateSvgCoords(COORD_TYPES.L, 0, points[0].y);
      }
      
      for (var i = 0; i < points.length - 1; i++) {
        SVGString += generateSvgCoords(COORD_TYPES.C, points[i].x, points[i].y, points[i].x, points[i].y,  points[i+1].x,  points[i+1].y);
      }

    }

    return SVGString;
  }

  function draw() {
    var now = window.Date.now();

    if (lastUpdate) {
      var elapsed = (now - lastUpdate) / 1000;
      lastUpdate = now;

      totalTime += elapsed;

      var factor = totalTime * Math.PI;

      const allDrawnPoints = [];
      for(let i = 0; i < waveElements.length; i++) {
        const drawnPoints = drawPoints(factor, i);
        allDrawnPoints.push(drawnPoints);

        TweenMax.to(waveElements[i].element, 0, {
          attr: {
            d: drawPath(drawnPoints, allDrawnPoints, i)
          },
        });
      }
    } else {
      lastUpdate = now;
    }

    animationInstance = requestAnimationFrame(draw);
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }, wait);
      if (immediate && !timeout) func.apply(context, args);
    };
  }

  var redraw = debounce(function() {
    pause();
    points = [];
    totalTime = 0;
    width = document.querySelector(CONTAINER).getBoundingClientRect()
      .width;
    height = 200;
    lastUpdate = false;
    play();
  }, 0);

  function boot() {
    if (!animationInstance) {
      play();
      window.addEventListener("resize", redraw);
    }
  }

  function play() {
    if (!animationInstance) {
      animationInstance = requestAnimationFrame(draw);
    }
  }

  function pause() {
    if (animationInstance) {
      cancelAnimationFrame(animationInstance);
      animationInstance = false;
    }
  }

  boot();

  return {
    play: play,
    pause: pause,
  };
}
