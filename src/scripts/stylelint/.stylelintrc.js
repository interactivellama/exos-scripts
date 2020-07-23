module.exports = {
  extends: [
    "stylelint-config-property-sort-order-smacss",
    "stylelint-config-standard",
  ],
  rules: {
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["export", "import", "global", "local", "external", "root"] }],
  },
};
