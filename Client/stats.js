import fs from "fs";
import path from "path";

const ROOT = process.cwd();

const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  ".vite",
  "__pycache__",
  ".idea",
  ".vscode",
  "coverage",
]);

const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".css",
  ".scss",
  ".html",
  ".md",
  ".py",
  ".java",
  ".cpp",
  ".c",
  ".cs",
  ".go",
  ".rs",
  ".php",
  ".yml",
  ".yaml",
]);

const stats = {
  folders: 0,
  files: 0,
  total: 0,
  code: 0,
  blank: 0,
  comments: 0,
  languages: {},
  biggest: [],
};

function getCommentPrefix(ext) {
  if ([".py", ".yml", ".yaml"].includes(ext)) return "#";
  if ([".html"].includes(ext)) return "<!--";
  return "//";
}

function analyzeFile(file) {
  const ext = path.extname(file).toLowerCase();

  if (!TEXT_EXTENSIONS.has(ext)) return;

  let text;

  try {
    text = fs.readFileSync(file, "utf8");
  } catch {
    return;
  }

  const lines = text.split(/\r?\n/);

  let blank = 0;
  let comment = 0;
  let code = 0;

  const prefix = getCommentPrefix(ext);

  for (const line of lines) {
    const t = line.trim();

    if (!t) {
      blank++;
      continue;
    }

    if (
      t.startsWith(prefix) ||
      t.startsWith("/*") ||
      t.startsWith("*") ||
      t.startsWith("*/")
    ) {
      comment++;
    } else {
      code++;
    }
  }

  const total = lines.length;

  stats.total += total;
  stats.blank += blank;
  stats.comments += comment;
  stats.code += code;

  if (!stats.languages[ext]) {
    stats.languages[ext] = {
      files: 0,
      lines: 0,
      code: 0,
    };
  }

  stats.languages[ext].files++;
  stats.languages[ext].lines += total;
  stats.languages[ext].code += code;

  stats.biggest.push({
    file: path.relative(ROOT, file),
    lines: total,
    code,
  });
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue;

    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      stats.folders++;
      walk(full);
    } else {
      stats.files++;
      analyzeFile(full);
    }
  }
}

walk(ROOT);

stats.biggest.sort((a, b) => b.lines - a.lines);

console.log("\n🚀 PROJECT SUMMARY");
console.log("=".repeat(55));

console.log(`📂 Folders        : ${stats.folders}`);
console.log(`📄 Files          : ${stats.files}`);
console.log(`📝 Total Lines    : ${stats.total.toLocaleString()}`);
console.log(`💻 Code Lines     : ${stats.code.toLocaleString()}`);
console.log(`💬 Comment Lines  : ${stats.comments.toLocaleString()}`);
console.log(`⬜ Blank Lines    : ${stats.blank.toLocaleString()}`);

console.log("\n📊 LANGUAGE BREAKDOWN");
console.log("-".repeat(55));

Object.entries(stats.languages)
  .sort((a, b) => b[1].code - a[1].code)
  .forEach(([ext, info]) => {
    console.log(
      `${ext.padEnd(8)} Files: ${String(info.files).padStart(4)} | Code: ${String(info.code).padStart(6)} | Total: ${String(info.lines).padStart(6)}`
    );
  });

console.log("\n🔥 TOP 15 BIGGEST FILES");
console.log("-".repeat(55));

stats.biggest.slice(0, 15).forEach((f, i) => {
  console.log(
    `${String(i + 1).padStart(2)}. ${String(f.lines).padStart(5)} lines (${String(
      f.code
    ).padStart(5)} code)  ${f.file}`
  );
});