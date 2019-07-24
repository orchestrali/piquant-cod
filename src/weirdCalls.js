var methods = ["Antelope Place Doubles", "Banana Doubles", "Double Norwich Court Bob Caters", "Double Norwich Court Bob Cinques", "Scientific Triples", "Shipway Minor", "Shipway Major", "Shipway Royal", "Titanic Triples", "Titanic Cinques"];


var oddStages = ["Doubles", "Triples", "Caters", "Cinques", "Sextuples", "Septuples", "Octuples"];

for (var i = 0; i < oddStages.length; i++) {
  methods.push("Stedman "+oddStages[i], "Erin "+oddStages[i]);
  if (i <= 3) {
    methods.push("Original "+oddStages[i]); //odd stage original has callLoc 1
  }
}