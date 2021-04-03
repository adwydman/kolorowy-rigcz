const CONTAINER = 'main';

const COORD_TYPES = {
  M: 'M',
  C: 'C',
  L: 'L'
};

const generateSvgCoords = (type, ...coords) => {
  return `${type} ${coords.join(' ')}`;
};

function addEventListeners(waveElements) {
  waveElements.forEach((waveElement) => {
    const rect = waveElement.pattern.querySelector('rect');
    waveElement.element.addEventListener('mouseover', () => {
      rect.setAttribute('fill-opacity', '0');
    })
    waveElement.element.addEventListener('mouseout', () => {
      rect.setAttribute('fill-opacity', '1');
    })
  })
}

function wavify(waveElements) {
  let width = document.querySelector(CONTAINER).getBoundingClientRect().width,
    // height = document.querySelector(CONTAINER).getBoundingClientRect().height / 6
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
      points.push({ 
        x: x, 
        y: ((index+1) * height) - yPos 
      });
    }

    return points;
  }

  function drawPath(points, allDrawnPoints, index) {
    let SVGString = "";
    let previousPoints

    if (index === 0) {
      SVGString += generateSvgCoords(COORD_TYPES.M, width, 0);
      SVGString += generateSvgCoords(COORD_TYPES.L, 0, 0);
      SVGString += generateSvgCoords(COORD_TYPES.L, points[0].x, points[0].y);
    } else {
      previousPoints = allDrawnPoints[index - 1];
      SVGString = generateSvgCoords(COORD_TYPES.M, previousPoints[0].x, previousPoints[0].y);

      SVGString += generateWaves(previousPoints, 'upper', index);

      if (index + 1 !== waveElements.length) {
        SVGString += generateSvgCoords(COORD_TYPES.L, points[points.length-1].x, points[points.length-1].y);
        SVGString += generateSvgCoords(COORD_TYPES.M, previousPoints[0].x, previousPoints[0].y);
        SVGString += generateSvgCoords(COORD_TYPES.L, points[0].x, points[0].y);
      }
    }
    
    if (index + 1 === waveElements.length) {
      SVGString += generateSvgCoords(COORD_TYPES.L, width, (index + 1) * height);
      SVGString += generateSvgCoords(COORD_TYPES.L, 0, (index + 1) * height);
      SVGString += generateSvgCoords(COORD_TYPES.L, previousPoints[0].x, previousPoints[0].y);
    } else {
      SVGString += generateWaves(points, 'lower', index);

      SVGString += generateSvgCoords(COORD_TYPES.M, 0, points[0].y);
    }

    SVGString += 'z';

    return SVGString;
  }

  function generateWaves(points, type, index) {
    let SVGString = '';
    if (index === 1 && type === 'lower' || index === 2 && type === 'upper') {
      var cp0 = {
        x: (points[1].x - points[0].x) / 2,
        y: points[1].y - points[0].y + points[0].y + (points[1].y - points[0].y)
      };

      SVGString += generateSvgCoords(COORD_TYPES.C, cp0.x, cp0.y, cp0.x, cp0.y,  points[1].x,  points[1].y);
  
      var prevCp = cp0;
  
      for (var i = 1; i < points.length - 1; i++) {
        var cp1 = {
          x: points[i].x - prevCp.x + points[i].x,
          y: points[i].y - prevCp.y + points[i].y
        };
  
        SVGString += generateSvgCoords(COORD_TYPES.C, cp1.x, cp1.y, cp1.x, cp1.y,  points[i+1].x,  points[i+1].y);
        prevCp = cp1;
      }
    } else {
      for (let i = 0; i < points.length - 1; i++) {
  
        if (index + 1 === waveElements.length && type === 'upper' ||
          index + 1 === waveElements.length - 1 && type === 'lower'
        ) {
          SVGString += generateSvgCoords(COORD_TYPES.C, points[i].x, points[i].y, points[i].x, points[i].y+20,  points[i+1].x,  points[i+1].y);
        } else if (index === 0 && type === 'lower' || index === 1 && type === 'upper') {
          SVGString += generateSvgCoords(COORD_TYPES.C, points[i].x, points[i].y, points[i].x, points[i].y-55,  points[i+1].x,  points[i+1].y);
        } else {
          SVGString += generateSvgCoords(COORD_TYPES.C, points[i].x, points[i].y, points[i].x, points[i].y,  points[i+1].x,  points[i+1].y);
        }
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
        
        const multiplier = i % 2 === 0 ? 1 : -1;

        if (!waveElements[i].pattern._stopScroll) {
          waveElements[i].pattern.setAttribute('patternTransform', `translate(0, ${multiplier * factor * 5})`)
        }

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
  addEventListeners(waveElements)

  return {
    play: play,
    pause: pause,
  };
}
