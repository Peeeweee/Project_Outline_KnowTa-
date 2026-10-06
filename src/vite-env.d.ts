/// <reference types="vite/client" />

// Allow importing CSS files as side-effects
declare module '*.css' {
  const css: string;
  export default css;
}
