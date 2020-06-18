module.exports = {
  // You can extend existing configurations
  // See https://stylelint.io/user-guide/configure#extends
  extends: [
    // Config for SASS files
    "stylelint-config-sass-guidelines",
  ],
  rules: {
    // Override general rules here, see https://stylelint.io/user-guide/configure#rules
    "string-quotes": "double",
    "max-nesting-depth": 3,

    // Override rules by adding exceptions to support CSS Modules
    "selector-class-pattern": "^(?:u|is|has|global|local)-[a-z][a-zA-Z0-9]*$|^(?!u|is|has)[a-zA-Z][a-zA-Z0-9]*(?:-[a-z][a-zA-Z0-9]*)?(?:--[a-z][a-zA-Z0-9]*)?$",
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["export", "import", "global", "local", "external"] }],
    "selector-type-no-unknown": [true, { ignoreTypes: ["from"] }],
    "property-no-unknown": [true, { ignoreProperties: ["composes", "compose-with"], ignoreSelectors: [":export", /^:import/] }],
  },
};
