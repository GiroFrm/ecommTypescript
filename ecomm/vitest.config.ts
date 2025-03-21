import { defineConfig } from "vitest/config";


export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: 'tests/setup.ts',
        coverage: {
            reporter: ['text', 'lcov'], // Outputs coverage report in console and an HTML report
            exclude: ['node_modules/', 'test/'], // Exclude certain files or directories
          }, 
    }
})