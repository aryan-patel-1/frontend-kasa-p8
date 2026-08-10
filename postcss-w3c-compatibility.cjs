function w3cCompatibility() {
  return {
    postcssPlugin: "postcss-w3c-compatibility",
    OnceExit(root) {
      root.walkAtRules("supports", (rule) => {
        if (!rule.params.includes("margin-trim")) {
          return;
        }

        // Conserve les valeurs de secours générées par Tailwind
        rule.replaceWith(...rule.nodes);
      });

      // Retire les règles modernes refusées par l'ancien validateur W3C
      root.walkAtRules("property", (rule) => rule.remove());
    },
  };
}

w3cCompatibility.postcss = true;

module.exports = w3cCompatibility;
