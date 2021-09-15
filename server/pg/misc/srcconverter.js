// node srcconverter.js [FILE...]

const fs = require('fs');

const flag_print_original = false;
const tab_space_chars = 4;

const srcconv = (srcfile) => {
    let count = 0;
    let src2 = "";
    const src = fs.readFileSync(srcfile, "utf-8").
          replace(/\r\n/, "\n").
          replace(/\n+$/, "");
    if (flag_print_original) {
        console.log(src);
    }
    src.split("").forEach(c => {
        if (c == "\r") return;
        if (c == "\n") {
            src2 += "\\n";
        } else if (c == "\t") {
            src2 += " ".repeat(tab_space_chars);
        } else if (c.match(/\s/)) {
            src2 += c;
        } else if (c == "\\") {
            src2 += "\\\\";
            count++;
        } else if (c == "'") {
            src2 += "''";
            count++;
        } else {
            src2 += c;
            count++;
        }
    });
    src2 = `'${src2}'`;
    console.log(src2);
    console.log(count);
}

for (let i = 2; i < process.argv.length; i++) {
    console.log(process.argv[i]);
    srcconv(process.argv[i]);
}
