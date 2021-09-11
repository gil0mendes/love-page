"use strict";

/**
 * Production build script.
 *
 * The goal is to prepare files to be publish in NPM.
 */

import { exec } from "child_process";

async function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, output) => {
      !!error ? reject(error) : resolve(output);
    });
  });
}

async function main() {
  // 1. build assets
  await runCommand("pnpm build");

  // 2. Remove index.html and move CSS and JS into the dist root and remove assets directory. We will use unix commands
  // instead of NODE libs because its easier to move files around with regex.
  await Promise.all([
    runCommand("rm ./dist/index.html"),
    runCommand("mv ./dist/assets/index*.js ./dist/lovepage-button.js"),
    runCommand("mv ./dist/assets/index*.css ./dist/lovepage-button.css"),
  ]);
  await runCommand("rm -rf ./dist/assets");

  console.info("Done!");
}

main();
