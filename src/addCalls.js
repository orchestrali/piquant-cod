var sample = {
  stage: Number,
  name: String,
  symbol: String,
  callLoc: Number,
  pn: [],
  methods: [String],
  description: String
}

const connect = require('./mongoose/connect2.js');
const addRecords = require('./mongoose/addRecords.js');

var oddStages = ["Doubles", "Triples", "Caters", "Cinques", "Sextuples", "Septuples", "Octuples"];

module.exports = function addCalls() {
  let calls = [
    {
      stage: 5,
      name: "bob",
      symbol: "-",
      callLoc: 8,
      pn: [[1,4,5],[3],[1]],
      methods: ["Antelope Place Doubles"],
      description: "Antelope Place Doubles bob"
    },
    {
      stage: 5,
      name: "single",
      symbol: "s",
      callLoc: 8,
      pn: [[1,4,5],[3],[1,2,3]],
      methods: ["Antelope Place Doubles"],
      description: "Antelope Place Doubles single"
    },
    {
      stage: 5,
      name: "bob",
      symbol: "-",
      callLoc: 8,
      pn: [[1,2,5]],
      methods: ["Banana Doubles"],
      description: "Banana lead-end bob"
    },
    {
      stage: 5,
      name: "bob",
      symbol: "-",
      callLoc: 4,
      pn: [[1,4,5]],
      methods: ["Banana Doubles"],
      description: "Banana half-lead bob"
    },
    {
      stage: 9,
      name: "bob",
      symbol: "-",
      callLoc: 4,
      pn: [[3]],
      methods: ["Double Norwich Court Bob Caters"],
      description: "Double Norwich bob"
    },
    {
      stage: 9,
      name: "single",
      symbol: "s",
      callLoc: 4,
      pn: [[1,2,3]],
      methods: ["Double Norwich Court Bob Caters"],
      description: "Double Norwich single"
    },
    {
      stage: 11,
      name: "bob",
      symbol: "-",
      callLoc: 4,
      pn: [[3]],
      methods: ["Double Norwich Court Bob Cinques"],
      description: "Double Norwich bob"
    },
    {
      stage: 11,
      name: "single",
      symbol: "s",
      callLoc: 4,
      pn: [[1,2,3]],
      methods: ["Double Norwich Court Bob Cinques"],
      description: "Double Norwich single"
    },
    {
      stage: 7,
      name: "red",
      symbol: "-",
      callLoc: 6,
      pn: [[3],[7],[3]],
      methods: ["Scientific Triples"],
      description: "Scientific red bob"
    },
    {
      stage: 7,
      name: "blue",
      symbol: "-",
      callLoc: 15,
      pn: [[3],[7],[3]],
      methods: ["Scientific Triples"],
      description: "Scientific blue bob"
    },
    {
      stage: 7,
      name: "green",
      symbol: "-",
      callLoc: 23,
      pn: [[3],[7],[3]],
      methods: ["Scientific Triples"],
      description: "Scientific green bob"
    }
  ];
  
  let stages = ["Minor", "Major", "Royal"];
  
  for (var i = 0; i < 3; i++) {
    let stage = 6+i*2;
    let bob = {
      stage: stage,
      name: "bob",
      symbol: "-",
      callLoc: 2,
      pn: [[3,stage-2]],
      methods: ["Shipway "+stages[i]],
      description: "Shipway odd bob"
    }
    let evenbob = bob;
    evenbob.callLoc = 10, evenbob.description = "Shipway even bob";
    
    calls.push(bob, evenbob);
    
    let single = {
      stage: stage,
      name: "single",
      symbol: "s",
      callLoc: 2,
      pn: [[3,stage-2,stage-1,stage]],
      methods: ["Shipway "+stages[i]],
      description: "Shipway odd single"
    }
    let evensingle = single;
    evensingle.callLoc = 10, evensingle.description = "Shipway even single";
    
    calls.push(single, evensingle);
  }
  
  
  
  
  
  
  let connection = connect();
  addRecords(calls, 'call', () => {
    console.log("calls added");
  });
  
}








function added() {
  let calls = [];
  
  for (var i = 5; i < 23; i++) {
    calls.push({
      stage: i,
      name: "bob",
      symbol: "-",
      callLoc: 0, //0 meaning the *last* row of the lead; need to accommodate diff lead lengths
      pn: i%2 === 1 ? [[1,4,i]] : [[1,4]],
      description: "4th place lead-end bob"
    });
    
    calls.push({
      stage: i,
      name: "single",
      symbol: "s",
      callLoc: 0,
      pn: i === 5 ? [[1,2,3]] : i%2 === 1 ? [[1,2,3,4,i]] : [[1,2,3,4]],
      description: i === 5 ? "123 lead-end single" : "1234 lead-end single"
    });
    
    calls.push({
      stage: i,
      name: "bob",
      symbol: "-",
      callLoc: -1,
      pn: i%2 === 1 ? [[3]] : [[3,i]],
      description: "Grandsire bob"
    });
    
    calls.push({
      stage: i,
      name: "single",
      symbol: "s",
      callLoc: -1,
      pn: i%2 === 1 ? [[3],[1,2,3]] : [[3,i],[1,2,3,i]],
      description: "Grandsire single"
    })
    
  }
  
  for (var i = 6; i < 23; i+=2) {
    if (i > 6) {
      calls.push({
        stage: i,
        name: "bob",
        symbol: "-",
        callLoc: 0, //0 meaning the *last* row of the lead; need to accommodate diff lead lengths
        pn: [[1,i-2]],
        description: "n-2 lead-end bob"
      });
    }
    
    calls.push({
      stage: i,
      name: "single",
      symbol: "s",
      callLoc: 0,
      pn: [[1,i-2,i-1,i]],
      description: "n-2,n-1 lead-end single"
    });
    
    
  }
  
  for (var i = 7; i < 18; i+=2) {
    
    calls.push({
      stage: i,
      name: "bob",
      symbol: "-",
      callLoc: 3, 
      pn: [[5]],
      description: "Stedman odd bob",
      methods: ["Stedman "+oddStages[(i-1)/2-2], "Titanic "+oddStages[(i-1)/2-2]]
    });
    
    calls.push({
      stage: i,
      name: "bob",
      symbol: "-",
      callLoc: 9, 
      pn: [[5]],
      description: "Stedman even bob",
      methods: ["Stedman "+oddStages[(i-1)/2-2]]
    });
    
    calls.push({
      stage: i,
      name: "single",
      symbol: "s",
      callLoc: 3, 
      pn: [[5,6,7]],
      description: "Stedman odd single",
      methods: ["Stedman "+oddStages[(i-1)/2-2], "Titanic "+oddStages[(i-1)/2-2]]
    });
    
    calls.push({
      stage: i,
      name: "single",
      symbol: "s",
      callLoc: 9, 
      pn: [[5,6,7]],
      description: "Stedman even single",
      methods: ["Stedman "+oddStages[(i-1)/2-2]]
    });
    
    calls.push({
      stage: i,
      name: "single",
      symbol: "s",
      callLoc: 1, 
      pn: [[5,6,7]],
      description: "Erin single",
      methods: ["Erin "+oddStages[(i-1)/2-2], "Original "+oddStages[(i-1)/2-2], "Titanic "+oddStages[(i-1)/2-2]]
    });
    
    calls.push({
      stage: i,
      name: "bob",
      symbol: "-",
      callLoc: 1, 
      pn: [[5]],
      description: "Erin bob",
      methods: ["Erin "+oddStages[(i-1)/2-2], "Original "+oddStages[(i-1)/2-2], "Titanic "+oddStages[(i-1)/2-2]]
    });
    
    
  }
  
  calls.push({
    stage: 5,
    name: "single",
    symbol: "s",
    callLoc: 6,
    pn: [[3,4,5]],
    description: "Stedman Doubles slow six single",
    methods: ["Stedman Doubles"]
  });
  
  calls.push({
    stage: 5,
    name: "single",
    symbol: "s",
    callLoc: 12,
    pn: [[1,4,5]],
    description: "Stedman Doubles quick six single",
    methods: ["Stedman Doubles"]
  });
  
  calls.push({
    stage: 5,
    name: "single",
    symbol: "s",
    callLoc: 4,
    pn: [[3,4,5]],
    description: "Erin Doubles single",
    methods: ["Erin Doubles"]
  });
  
}