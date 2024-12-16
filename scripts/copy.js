#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
  paths: {
    components: "src/components/ui",
    hooks: "src/hooks",
    providers: "src/components/providers",
    icons: "src/components/icons",
  },
};

const metadataPath = path.resolve(__dirname, "../metadata.json");
const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));

const COMPONENTS_DIR = path.resolve(__dirname, "../packages/react/components");
const HOOKS_DIR = path.resolve(__dirname, "../packages/react/hooks/src");
const PROVIDERS_DIR = path.resolve(__dirname, "../packages/react/providers");
const ICONS_DIR = path.resolve(__dirname, "../packages/react/icons/src");

const copyComponent = async (componentName) => {
  const componentPath = path.join(
    COMPONENTS_DIR,
    `${componentName}/src/${componentName}.tsx`,
  );
  const targetComponentDir = path.resolve(
    process.cwd(),
    `./${CONFIG.paths.components}`,
  );

  if (!fs.existsSync(componentPath)) {
    console.error(`Component ${componentName} not found.`);
    return;
  }

  await fs.ensureDir(targetComponentDir);
  const targetPath = path.join(targetComponentDir, `${componentName}.tsx`);
  await fs.copy(componentPath, targetPath);

  console.log(`Copied component: ${targetPath}`);

  const hooks = extractHooks(fs.readFileSync(componentPath, "utf-8"));
  for (const hook of hooks) {
    await copyHook(hook);
  }
};

const copyComponentDir = async (componentDirName) => {
  const componentDirPath = path.join(COMPONENTS_DIR, `${componentDirName}/src`);
  const targetComponentDir = path.resolve(
    process.cwd(),
    `./${CONFIG.paths.components}/${componentDirName}`,
  );

  if (!fs.existsSync(componentDirPath)) {
    console.error(`Component directory ${componentDirName} not found.`);
    return;
  }

  await fs.ensureDir(targetComponentDir);

  const items = await fs.readdir(componentDirPath);

  for (const item of items) {
    const itemPath = path.join(componentDirPath, item);
    const targetPath = path.join(targetComponentDir, item);
    const stats = await fs.stat(itemPath);

    if (stats.isFile()) {
      await fs.copy(itemPath, targetPath);
    }
  }
  // await fs.copy(componentDirPath, targetComponentDir);

  console.log(`Copied component directory: ${targetComponentDir}`);
};

const copyIcon = async (iconName) => {
  const iconPath = path.join(ICONS_DIR, `${iconName}.tsx`);
  const targetIconDir = path.resolve(process.cwd(), `./${CONFIG.paths.icons}`);

  if (!fs.existsSync(iconPath)) {
    console.error(`Icon ${iconName} not found.`);
    return;
  }

  await fs.ensureDir(targetIconDir);
  const targetPath = path.join(targetIconDir, `${iconName}.tsx`);
  await fs.copy(iconPath, targetPath);

  console.log(`Copied icon: ${targetPath}`);
};

const copyHook = async (hookName) => {
  const hookPath = path.join(HOOKS_DIR, `${hookName}.ts`);
  const targetHookDir = path.resolve(process.cwd(), `./${CONFIG.paths.hooks}`);

  if (!fs.existsSync(hookPath)) {
    console.error(`Hook ${hookName} not found.`);
    return;
  }

  await fs.ensureDir(targetHookDir);
  const targetPath = path.join(targetHookDir, `${hookName}.ts`);
  await fs.copy(hookPath, targetPath);

  console.log(`Copied hook: ${targetPath}`);
};

const extractHooks = (content) => {
  const hookRegex =
    /import\s+\{\s*(\w+)\s*\}\s+from\s+['"]\.\.\/\.\.\/hooks['"]/g;
  const hooks = [];
  let match;
  while ((match = hookRegex.exec(content)) !== null) {
    hooks.push(match[1]);
  }
  return hooks;
};

const args = process.argv.slice(2);
if (args[0] === "add" && args[1]) {
  const name = args[1];

  if (metadata.components.includes(name)) {
    copyComponent(name).catch((err) =>
      console.error("Error copying component:", err),
    );
  } else if (metadata.componentDirs.includes(name)) {
    copyComponentDir(name).catch((err) =>
      console.error("Error copying component dir:", err),
    );
  } else if (metadata.hooks.includes(name)) {
    copyHook(name).catch((err) => console.error("Error copying hook:", err));
  } else if (metadata.icons.includes(name)) {
    copyIcon(name).catch((err) => console.error("Error copying icon:", err));
  } else {
    console.error(`Error: ${name} not found in metadata.`);
  }
} else {
  console.error("Usage: npx pio-essential add <name>");
}
