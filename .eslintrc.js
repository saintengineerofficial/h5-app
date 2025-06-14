// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ["apps/**", "packages/**"],
  extends: ["@repo/eslint-config/library.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    "prettier/prettier": "off",
    "@typescript-eslint/no-explicit-any": "off", //允许使用any
    "@typescript-eslint/ban-ts-comment": "off", //允许使用@ts-ignore
    "@typescript-eslint/no-non-null-assertion": "off", //允许使用非空断言
    "@typescript-eslint/no-var-requires": "off", //允许使用CommonJS的写法
    "react/self-closing-comp": [
      "error",
      {
        "component": true,
        "html": true
      }
    ],
    "import/order": [
      "error",
      {
        //按照分组顺序进行排序
        "groups": ["builtin", "external", "parent", "sibling", "index", "internal", "object", "type"],
        //通过路径自定义分组
        "pathGroups": [
          {
            "pattern": "react*",
            "group": "builtin",
            "position": "before"
          },
          {
            "pattern": "@/components/**",
            "group": "parent",
            "position": "before"
          },
          {
            "pattern": "@/utils/**",
            "group": "parent",
            "position": "after"
          },
          {
            "pattern": "@/apis/**",
            "group": "parent",
            "position": "after"
          }
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "newlines-between": "always", //每个分组之间换行
        //根据字母顺序对每个组内的顺序进行排序
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ]
  },
};
