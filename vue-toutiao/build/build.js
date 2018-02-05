"use strict";

process.env.NODE_ENV = 'production'

//node for loading
const ora = require("ora");
// rm-rf for node
const rm = require("rimraf");
//console for node
const chalk = require("chalk");
//path for node
const path = require("path");
//webpack
const webpack = require("webpack");
//webpack production setting
const config = require("./webpack.prod.conf");
//指定删除的文件
const rmFile = path.resolve(__dirname, "../dist/static");
//build start loading
const spinner = ora("building for production...");
spinner.start();

//构建全量压缩包！
rm(rmFile, function (err) {
    if (err) throw err;
    webpack(config, function (err, stats) {
        spinner.stop();
        if (err) throw err;
        process.stdout.write(
            stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + "\n\n"
        );

        if (stats.hasErrors()) {
            console.log(chalk.red("  Build failed with errors.\n"));
            process.exit(1);
        }

        console.log(chalk.cyan("  Build complete.\n"));
        console.log(
            chalk.yellow(
                "  Tip: built files are meant to be served over an HTTP server.\n" +
                "  Opening index.html over file:// won't work.\n"
            )
        );
    });
});
