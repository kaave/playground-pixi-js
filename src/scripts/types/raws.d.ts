/* eslint-disable import/export */

declare module '*.md' {
  const content: string;

  export default content;
}

declare module '*.txt' {
  const content: string;

  export default content;
}

declare module '*.frag' {
  const content: string;

  export default content;
}
