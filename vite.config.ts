// This file is Free Software under the MIT License
// without warranty, see README.md and LICENSES/MIT.txt for details.
//
// SPDX-License-Identifier: MIT
//
// SPDX-FileCopyrightText: 2023 German Federal Office for Information Security (BSI) <https://www.bsi.bund.de>
// Software-Engineering: 2023 Intevation GmbH <https://intevation.de>

import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { readFileSync } from "fs";

const VERSION = readFileSync("VERSION", "utf8").trimEnd();

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"],
		coverage: {
			provider: "istanbul",
			reporter: ["text", "json-summary", "json", "html"],
			lines: 60,
			branches: 60,
			functions: 60,
			statements: 60
		}
	},
	define: {
		__APP_VERSION__: `${JSON.stringify(VERSION)}`
	}
});
