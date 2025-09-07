import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});


const eslintConfig = [
  // Top-level ignore for next-env.d.ts (ESLint 9+ flat config best practice)
  {
    ignores: ["next-env.d.ts"]
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**"
    ],
    // Import plugin as ES module for ESLint 9+ flat config
    plugins: {
      "unused-imports": (await import("eslint-plugin-unused-imports")).default
    },
    rules: {
      "unused-imports/no-unused-imports": "error"
    }
  },
];

export default eslintConfig;
