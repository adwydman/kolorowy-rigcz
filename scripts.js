window.mobileAndTabletCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const colorPatterns = [
  ['#ffc6ff', '#bdb2ff', '#a0c4ff', '#9bf6ff', '#caffbf'],
  ['#cdb4db', '#ffc8dd', '#a2d2ff', '#bde0fe', '#ffafcc'],
  ['#7bdff2', '#b2f7ef', '#f2b5d4', '#f7d6e0', '#eff7f6'],
  ['#ffffbf', '#a9d1f7', '#cc99ff', '#ffdfbe', '#ffb1b0'],
  ['#b5179e', '#560bad', '#3a0ca3', '#4361ee', '#4cc9f0']

]

const element1 = document.querySelector('#myId1');
const pattern1 = document.querySelector('#imagePattern-1');
const rect1 = document.querySelector('#rect1');

const element2 = document.querySelector('#myId2');
const pattern2 = document.querySelector('#imagePattern-2');
const rect2 = document.querySelector('#rect2');

const element3 = document.querySelector('#myId3');
const pattern3 = document.querySelector('#imagePattern-3');
const rect3 = document.querySelector('#rect3');

const element4 = document.querySelector('#myId4');
const pattern4 = document.querySelector('#imagePattern-4');
const rect4 = document.querySelector('#rect4');

const element5 = document.querySelector('#myId5');
const pattern5 = document.querySelector('#imagePattern-5');
const rect5 = document.querySelector('#rect5');

const svgElements = [
  {
    element: element1,
    pattern: pattern1
  },
  {
    element: element2,
    pattern: pattern2
  },
  {
    element: element3,
    pattern: pattern3
  },
  {
    element: element4,
    pattern: pattern4
  },
  {
    element: element5,
    pattern: pattern5
  },
]

const rects = [
  rect1, rect2, rect3, rect4, rect5
]

const generateBones = (isMobile) => {
  if (isMobile) {
    return [ 5, 3, 5, 20, 2 ];
  }

  return [ 12, 3, 5, 66, 6 ];
}

const amplitudes = [
  20, 20, 50, 15, 60
];


const speeds = [
  .6, .4, .5, .77, .5
];

const generateWavifyCollection = (
  waveElements,
  bones,
  amplitudes,
  speeds
) => {
  const wavifyCollection = [];

  for(let i = 0; i < 5; i++) {
    rects[i].setAttribute('fill', colorPatterns[getRandomInt(0, 4)][i])

    wavifyCollection.push(
      {
        ...waveElements[i],
        bones: bones[i],
        amplitude: amplitudes[i],
        speed: speeds[i]
      }
    )
  }

  return wavifyCollection;
};

window.addEventListener('load', () => {
  const wavifyCollection = generateWavifyCollection(
    svgElements,
    generateBones(mobileAndTabletCheck()),
    amplitudes,
    speeds
  );

  wavify(wavifyCollection)
});

