
console.log("-".repeat(55));

stats.biggest.slice(0, 15).forEach((f, i) => {
  console.log(
    `${String(i + 1).padStart(2)}. ${String(f.lines).padStart(5)} lines (${String(
      f.code
    ).padStart(5)} code)  ${f.file}`
  );