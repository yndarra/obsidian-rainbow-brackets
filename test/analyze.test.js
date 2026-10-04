// Unit tests for the bracket analysis. Run: node --test
// Obsidian / CodeMirror modules are stubbed — only analyze() is tested here.
const test = require('node:test');
const assert = require('node:assert');
const Module = require('module');

const originalLoad = Module._load;
Module._load = function (request, ...rest) {
	if (request === 'obsidian') return { Plugin: class {} };
	if (request === '@codemirror/view') return { ViewPlugin: { fromClass: () => ({}) }, Decoration: { mark: (x) => x } };
	if (request === '@codemirror/state') return { RangeSetBuilder: class {} };
	if (request === '@codemirror/language') return { syntaxTree: () => ({ iterate() {} }) };
	return originalLoad.call(this, request, ...rest);
};
const { analyze } = require('../main.js');

// Compact form: each bracket as "<char><depth>" or "<char>!" when unmatched
function show(text) {
	return analyze({ doc: { toString: () => text } })
		.map((x) => text[x.pos] + (x.partner < 0 ? '!' : x.depth))
		.join(' ');
}

test('nested brackets get depths', () => {
	assert.strictEqual(show('a (b [c {d}] e) f'), '(0 [1 {2 }2 ]1 )0');
});

test('crossed brackets: the inner opener is unmatched', () => {
	assert.strictEqual(show('[ ( ]'), '[0 (! ]0');
});

test('stray brackets are unmatched', () => {
	assert.strictEqual(show('x ) y'), ')!');
	assert.strictEqual(show('(( z'), '(! (!');
});

test('list markers are not brackets', () => {
	assert.strictEqual(show('1) item\nа) item (ok)'), '(0 )0');
	assert.strictEqual(show('1)x'), ')!');
});

test('escaped brackets are ignored', () => {
	assert.strictEqual(show('\\( x (y)'), '(0 )0');
});
