const notUsed = "this string is not used";

// Disallows awaiting a value that is not a Thenable (await-thenable)
// See https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/await-thenable.md
await "value";

const createValue = () => "value";
await createValue();

// Disallow the declaration of empty interfaces (no-empty-interface)
// See https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-interface.md
interface Foo {}
interface Bar extends Foo {}

// Bans specific types from being used (ban-types)
// See https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md

// use lower-case primitives for consistency
const str: String = "foo";
const bool: Boolean = true;
const num: Number = 1;
const symb: Symbol = Symbol("foo");

// use a proper function type
const func: Function = () => 1;

// use safer object types
const lowerObj: object = {};

const capitalObj1: Object = 1;
const capitalObj2: Object = { a: "string" };

const curly1: {} = 1;
const curly2: {} = { a: "string" };
