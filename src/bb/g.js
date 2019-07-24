

module.exports = function handleOpen(pairs) {
  for (let i = 0; i < pairs.length; i++) {
    let open = pairs[i].opening.split(" ");
    pairs[i].element = open.shift();
    delete pairs[i].opening;
    if (open.length > 0) {
      let attribs = {};
      open = open.join(" ");
      let j = 0;
      let opts = {
        key: "",
        values: "",
        current: "key"
      };
      while (j < open.length) {
        if (open[j] === '"') {
          if (opts.current === "key") {
            opts.current = "values";
          } else if (opts.current === "values") {
            opts.current = "key";
            attribs[opts.key] = opts.values;
            opts.key = "", opts.values = "";
          }
        } else if (open[j] != "=" || opts.current === "values") {
          opts[opts.current] += open[j];
        }
        j++;
      }
      pairs[i].attributes = attribs;
    }
  }
  
}