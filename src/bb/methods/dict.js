const refs = require('../../reference/refs.js');
const tests = {
  stageName: refs.stageNames,
  classword: ["delight", "surprise", "alliance", "hybrid", "bob", "place", "differential", "principle", "suprise", "surpirse"],
  abbr1: ["tb", "t.b.", "s", "a", "d", "b", "del", "sc", "s.c"],
  abbr2: ["lb", "p", "pb", "c.b.", "cb", "dncb", "diff"],
  category: ["dodging", "treble-dodging"],
  other: ["spliced", "and", "of", "each", "methods", "method", "principles", "principle", "variations", "variation", "on", "extent", "called", "call", "variable", "cover", "mixed", "half", "muffled", "half-muffled", "handstroke", "backstroke", "hand", "back", "stroke", "front", "+"],
  plain: ["plain"],
  nonmethod: ["rounds", "changes", "tolling", "firing", "hunt", "calls"]
};

const grammar = ["and", "the", "a", "an", "by", "for", "of", "with", "above", "below", "except", "from", "on", "over", "under", "plus", "per"];

const numwords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety", "hundred", "thousand", "half"];



const info = ["atw", "com", "eld", "variable", "treble", "cover", "hunt", "spliced", "mixed", "covered", "half-lead", "half", "lead", "tenor", "tenors", "half-muffled", "muffled", "fully", "open", "method", "variation", "principle", "extent", "peal", "quarter", "called", "handstroke", "backstroke", "hand", "back", "stroke", "front"]

//comp info: "atw", "com", "eld", "variable" treble, variable cover, variable hunt, spliced, mixed, covered, with cover, half-lead spliced, half lead spliced, with tenor, with [num] tenors, half-muffled, half muffled, fully muffled, open


const callchange = [
  "Reverse Peal No 1",
  "Queen's Peal",
  "Spliced Peal No 1",
  "60 on 3rds",
  "Sixty on Thirds",
  "St Leonard's",
  "St Indract",
  "Peal No 1",
  "Fall in Peal",
  "Spliced Yewcroft 4th Hunt",
  "Devon Peal",
  ""
]