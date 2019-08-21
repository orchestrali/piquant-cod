var names = [
  {
    name: "Plain",
    alt: ["P", "P.", "P/"] //how am I gonna deal with "P/bob" not having a space??!
  },
  {
    name: "Reverse Canterbury Pleasure",
    alt: ["Reverse Canterbury", "Reverse Canterbury P"]
  },
  {
    name: "St Clement's College",
    alt: ["St Clements", "St Clement's", "St. Clement's", "St. Clements", "St. Clement's College", "St Clements College"]
  }
];

const stageNames = ["Singles", "Minimus", "Doubles", "Minor", "Triples", "Major", "Caters", "Royal", "Cinques", "Maximus", "Sextuples", "Fourteen", "Septuples", "Sixteen", "Octuples", "Eighteen"];

var others = [
  {
    abbr: ["P Bob", "P. Bob", "P/Bob", "Pb", "P.B.", "P. B.", "plainbob", "Plian"],
    const: {nameClass: "Plain Bob", name: "Plain", class: "Bob"},
    var: {stage: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
  },//*/
  {
    abbr: ["Standard 8", "Standard Eight", "Standard-8", "std8", "std 8", "Standard 8m"],
    const: {class: "Surprise"},
    var: {stage: [8, 10], group: [["Cambridge Surprise Major", 
			"Yorkshire Surprise Major", 
			"Bristol Surprise Major", 
			"London Surprise Major", 
			"Superlative Surprise Major",
			"Lincolnshire Surprise Major",
			"Rutland Surprise Major",
			"Pudsey Surprise Major"],
      ["Cambridge Surprise Royal", 
			"Yorkshire Surprise Royal", 
			"Bristol Surprise Royal", 
			"London No.3 Surprise Royal", 
			"Superlative No.2 Surprise Royal",
			"Lincolnshire Surprise Royal",
			"Rutland Surprise Royal",
			"Pudsey Surprise Royal"]]}
  },
  {
    abbr: ["St Clements College Bob", "St Clements College", "St Clements Bob", "St Clements", "S Clements CB", "S Clements"],
    const: {name: "St Clement's College", class: "Bob", nameClass: "St Clement's College Bob"},
    var: {stage: [6,7,8,9,10,11,12]}
  },
  {
    abbr: ["Rev Can' Pb", "Reverse Cant'", "Reverse' Cant", "Rev Canterbury Pleasure", "Rev Canterbury", "Rev. Canterbury", "Rev Cant", "Rev.Canterbury Pleasure", "Rev.Canterbury", "Reverse Canterbury", "Rev' Canterbury", "Reverse Canterbury Pleasure Bob"],
    const: {name: "Reverse Canterbury Pleasure", class: "Place", nameClass: "Reverse Canterbury Pleasure Place"},
    var: {stage: [5,6]}
  },
  {
    abbr: ["Rev St Nicholas"],
    const: {name: "Reverse St Nicholas", class: "Bob", nameClass: "Reverse St Nicholas Bob"},
    var: {stage: [4,5]}
  },
  {
    abbr: ["DNCB", "Double Norwich C.B.", "Double Norwich CB", "Double Norwich"],
    const: {name: "Double Norwich Court", class: "Bob", nameClass: "Double Norwich Court Bob"},
    var: {stage: [8,9,10,11,12]}
  },
  {
    abbr: ["London and Carlisle above"],
    const: {group: [
      "London Surprise Minor",
      "Wells Surprise Minor",
      "Cunecastre Surprise Minor",
      "Lincoln Surprise Minor",
      "Kelso Surprise Minor",
      "Coldstream Surprise Minor",
      "Carlisle Surprise Minor",
      "Northumberland Surprise Minor",
      "Whitley Surprise Minor",
      "Sandiacre Surprise Minor",
      "Wooler Surprise Minor",
      "Alnwick Surprise Minor",
      "Canterbury Surprise Minor",
      "Chester Surprise Minor",
      "Newcastle Surprise Minor",
      "Morpeth Surprise Minor",
      "Munden Surprise Minor"
    ], class: "Surprise", stage: 6}
  },
  {
    abbr: ["lbfg"],
    const: {group: ["London Surprise Major", "Bristol Surprise Major", "Belfast Surprise Major", "Glasgow Surprise Major"], class: "Surprise", stage: 8}
  },
  {
    abbr: ["Berverley", "Beverly"],
    const: {title: "Beverley Surprise Minor", class: "Surprise", stage: 6}
  },
  {
    abbr: ["Pangborne"],
    const: {stage: 6, name: "Pangbourne"},
    var: {class: ["Surprise", "Treble Place"], title: ["Pangbourne Surprise Minor", "Pangbourne Treble Place Minor"]}
  },
  {
    abbr: ["London Scholar's Pleasure", "London Scholars Pleasure"],
    const: {stage: 6, name: "London Scholars' Pleasure"},
    var: {class: ["Treble Bob", "Treble Place"], title: ["London Scholars' Pleasure Treble Bob Minor", "London Scholars' Pleasure Treble Place Minor"]}
  },
  {
    abbr: ["St.Alban's", "St Alban's", "St. Alban's"],
    const: {name: "St Albans"},
    var: {class: ["Delight", "Treble Place", "Surprise"], stage: [6,6,8], title: ["St Albans Delight Minor", "St Albans Treble Place Minor", "St Albans Surprise Major"]}
  },
  {
    abbr: ["Zenor"],
    const: {name: "Zennor", title: "Zennor Doubles", stage: 5},
    type: "variation"
  },
  {
    abbr: ["St Cecilia", "St. Cecilia"],
    const: {name: "St Cecelia", title: "St Cecelia Doubles", stage: 5},
    type: "variation"
  },
  {
    abbr: ["Londsdale"],
    const: {name: "Lonsdale", title: "Lonsdale Doubles", stage: 5},
    type: "variation"
  },
  {
    abbr: ["Church Greasley"],
    const: {name: "Church Gresley", title: "Church Gresley Doubles", stage: 5},
    type: "variation"
  },
  {
    abbr: ["Hilmorton"],
    const: {name: "Hilmarton", title: "Hilmarton Doubles", stage: 5},
    type: "variation"
  },
  {
    abbr: ["Westmister II", "Westminster"],
    const: {name: "Westminster II", class: "Bob", stage: 5, title: "Westminster II Bob Doubles"}
  },
  {
    abbr: ["Westmister"],
    const: {name: "Westminster"},
    var: {class: ["Surprise", "Surprise", "Surprise", "Surprise", "Bob", "Delight", "Delight"], stage: [6,8,10,12,8,6,8]}
  },
  {
    abbr: ["& Little", "Little"],
    const: {name: "", class: "Bob", descriptor: "Little Bob", nameClass: "Little Bob"},
    var: {stage: [6,8,10,12,14,16,18,20,22]}
  },
  {
    abbr: ["St Osmond"],
    const: {name: "St Osmund", class: "Bob", nameClass: "St Osmund Bob"},
    var: {stage: [5,6,7]}
  },
  {
    abbr: ["St Remigious"],
    const: {name: "St Remigius"},
    var: {stage: [3,5], class: ["Place", "Bob"], nameClass: ["St Remigius Place", "St Remigius Bob"]}
  },
  {
    abbr: ["Sufleet", "Surfleert"],
    const: {name: "Surfleet"},
    var: {class: ["Surprise", "Alliance", "Treble Place", "Surprise"], stage: [6,6,9,12]}
  },
  {
    abbr: ["Steadman"],
    const: {name: "Stedman", class: "Principle"},
    var: {stage: [3,5,7,9,11,13,15]}
  },
  {
    abbr: ["St. Dunstons", "St Dunstons", "St. Dunston's", "St Dunston's"],
    const: {name: "St Dunstan's"},
    var: {stage: [5,8], class: ["Bob", "Surprise"], nameClass: ["St Dunstan's Bob", "St Dunstan's Surprise"]}
  },
  {
    abbr: ["Gransire"],
    const: {name: "Grandsire", class: "Bob", nameClass: "Grandsire"},
    var: {stage: [5,6,7,8,9,11,13,15]}
  },
  {
    abbr: ["Pimrose"],
    const: {name: "Primrose"},
    var: {class: ["Surprise", "Surprise", "Delight", "Surprise", "Bob", "Surprise", "Treble Place"], stage: [6,8,8,10,5,12,6]}
  },
  {
    abbr: ["Deadworth", "Dead worth"],
    const: {name: "Dedworth", stage: 5, title: "Dedworth Doubles"},
    type: "variation"
  },
  {
    abbr: ["Shipways"],
    const: {name: "Shipway"},
    var: {class: ["Place", "Place", "Place", "Principle", "Principle", "Principle"], stage: [5,7,9,6,8,10]}
  },
  {
    abbr: ["All Saint"],
    const: {name: "All Saints"},
    var: {class: ["Place", "Delight"], stage: [5,10]}
  },
  {
    abbr: ["Bedont s.c"],
    const: {name: "Bedfont", class: "Bob", stage: 5, title: "Bedfont Bob Doubles"}
  }
]

var sminor = [
  {
    abbr: ["Cambridge above", "Cambridge-above"],
    const: {group: [
      "Cambridge Surprise Minor",
      "Primrose Surprise Minor",
      "Ipswich Surprise Minor",
      "Norfolk Surprise Minor",
      "Bourne Surprise Minor",
      "Hull Surprise Minor",
      "York Surprise Minor",
      "Beverley Surprise Minor",
      "Berwick Surprise Minor",
      "Surfleet Surprise Minor",
      "Hexham Surprise Minor",
      "Durham Surprise Minor"
    ], class: "Surprise", stage: 6}
  },
  {
    abbr: ["London above", "London-above"],
    const: {group: [
      "London Surprise Minor",
      "Wells Surprise Minor",
      "Cunecastre Surprise Minor",
      "Lincoln Surprise Minor",
      "Kelso Surprise Minor",
      "Coldstream Surprise Minor",
    ], class: "Surprise", stage: 6}
  },
  {
    abbr: ["Carlisle above", "Carlisle-above"],
    const: {group: [
      "Carlisle Surprise Minor",
      "Northumberland Surprise Minor",
      "Whitley Surprise Minor",
      "Sandiacre Surprise Minor",
      "Wooler Surprise Minor",
      "Alnwick Surprise Minor",
      "Canterbury Surprise Minor",
      "Chester Surprise Minor",
      "Newcastle Surprise Minor",
      "Morpeth Surprise Minor",
      "Munden Surprise Minor"
    ], class: "Surprise", stage: 6}
  },
  {
    abbr: ["Westminster-above", "Norwich-above", "Westminster above", "Norwich above"],
    const: {group: [
      "Norwich Surprise Minor", 
      "Annable's London Surprise Minor", 
      "Netherseale Surprise Minor", 
      "Lightfoot Surprise Minor", 
      "Rossendale Surprise Minor", 
      "Wearmouth Surprise Minor", 
      "Stamford Surprise Minor", 
      "Westminster Surprise Minor", 
      "Bacup Surprise Minor", 
      "Bamborough Surprise Minor", 
      "Allendale Surprise Minor",
      "Warkworth Surprise Minor"
    ], class: "Surprise", stage: 6}
  },
]

var standard41 = {
  abbr: ["Standard 41", "Standard 41 surprise minor", "Regular 41 Surprise Minor"],
  const: {group: [], class: "Surprise", stage: 6}
}

sminor.forEach(o => {
  standard41.const.group = standard41.const.group.concat(o.const.group);
  others.push(o);
});

others.push(standard41);

var evenStages = ["Minor", "Major", "Royal", "Maximus"];

evenStages.forEach((s, i) => {
  let k = {
    abbr: ["Treble Bob "+s+" in The Kent Variation"],
    const: {name: "Kent", class: "Treble Bob", title: "Kent Treble Bob "+s, stage: 6+i*2}
  }
  let o = {
    abbr: ["Treble Bob "+s+" in The Oxford Variation"],
    const: {name: "Oxford", class: "Treble Bob", title: "Oxford Treble Bob "+s, stage: 6+i*2}
  };
  others.push(k, o);
  
});

var standard8 = [{letter: "C", name: ["Cambridge"]}, {letter: "Y", name: ["Yorkshire"]}, {letter: "S", name: ["Superlative", "Superlative No.2"]}, {letter: "B", name: ["Bristol"]}, {letter: "L", name: ["London", "London No.3"]}, {letter: "P", name: ["Pudsey"]}, {letter: "R", name: ["Rutland"]}, {letter: "N", name: ["Lincolnshire"]}]
var acronyms = ["R,S,Y,N,C", "CYNR", "cynrs", "rsync", "p,y,c,n", "npr", "cyn", "cys", "csy", "cy", "rync", "cyrb", "cysnpr", "cysr", "c y n r", "cnprsy", "c n p r s y", "c,y,s,n", "bcls", "c, y, n"];

acronyms.forEach(ac => {
  let alphabetical = ac.replace(/[ ,]/g, "").split("").sort().join("");
  let other = others.filter(o => o.abbr.includes(alphabetical));
  if (other.length > 0) {
    for (let i = 0; i < other.length; i++) {
      if (!other[i].abbr.includes(ac)) {
        other[i].abbr.push(ac);
      }
    }
  } else {
    let major = {
      group: [],
      class: "Surprise",
      stage: 8
    };
    let royal = {
      group: [],
      class: "Surprise",
      stage: 10
    }
    for (let i = 0; i < ac.length; i++) {
      let method = standard8.find(m => m.letter.toLowerCase() === ac[i].toLowerCase());
      if (method) {
        major.group.push(method.name[0] + " Surprise Major");
        royal.group.push(method.name[method.name.length-1] + " Surprise Royal");
      }
    }
    let arr = ac === alphabetical ? [ac] : [alphabetical, ac];
    others.push({abbr: arr, const: major}, {abbr: arr, const: royal});
  }
  
});


var dex = index(others);
dex.sort((a,b) => {return b.abbr.length-a.abbr.length});
//console.log(dex[0]);
//index(others);
module.exports = dex;

function index(arr) {
  //console.log(arr.length);
  let r = [];
  for (let i = 0; i < arr.length; i++) {
    //console.log("i", i);
    for (let j = 0; j < arr[i].abbr.length; j++) {
      if (arr[i].var) {
        let k = Object.keys(arr[i].var);
        //if (i === 3) console.log(k);
        for (let l = 0; l < arr[i].var[k[0]].length; l++) {
          let o = {
            abbr: arr[i].abbr[j],
            type: "method"
          };
          k.forEach(v => o[v] = arr[i].var[v][l]);
          if (arr[i].const) {
            for (let key in arr[i].const) {
              o[key] = arr[i].const[key];
            }
          }
          if (!o.title && o.nameClass && o.stage) {
            o.title = o.nameClass + " " + stageNames[o.stage-3];
          }
          //console.log(o);
          r.push(o);
          
        }
      } else {
        //if (i === 9) console.log("no var");
        let o = {
          abbr: arr[i].abbr[j],
          type: arr[i].type === "variation" ? "variation" : "method"
        };
        if (arr[i].const) {
          for (let key in arr[i].const) {
            o[key] = arr[i].const[key]
          }
        }
        
        r.push(o);
        //console.log("x",r.length);
      }
      
    }
    
  }
  //console.log("aaa", r.length);
  return r;
}

