'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __classPrivateFieldSet$1 = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$1 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _GenericExpressionPutAdapter_agent, _GenericExpressionPutAdapter_genericExpressionDNA, _GenericExpressionAdapter_genericExpressionDNA;
class GenericExpressionPutAdapter {
    constructor(context) {
        _GenericExpressionPutAdapter_agent.set(this, void 0);
        _GenericExpressionPutAdapter_genericExpressionDNA.set(this, void 0);
        __classPrivateFieldSet$1(this, _GenericExpressionPutAdapter_agent, context.agent, "f");
        __classPrivateFieldSet$1(this, _GenericExpressionPutAdapter_genericExpressionDNA, context.Holochain, "f");
    }
    async createPublic(data) {
        const orderedData = Object.keys(data)
            .sort()
            .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});
        const expression = __classPrivateFieldGet$1(this, _GenericExpressionPutAdapter_agent, "f").createSignedExpression(orderedData);
        const expressionPostData = {
            author: expression.author,
            timestamp: expression.timestamp,
            data: JSON.stringify(expression.data),
            proof: expression.proof,
        };
        const res = await __classPrivateFieldGet$1(this, _GenericExpressionPutAdapter_genericExpressionDNA, "f").call(name, "generic_expression", "create_expression", expressionPostData);
        return res.toString("hex");
    }
}
_GenericExpressionPutAdapter_agent = new WeakMap(), _GenericExpressionPutAdapter_genericExpressionDNA = new WeakMap();
class GenericExpressionAdapter {
    constructor(context) {
        _GenericExpressionAdapter_genericExpressionDNA.set(this, void 0);
        __classPrivateFieldSet$1(this, _GenericExpressionAdapter_genericExpressionDNA, context.Holochain, "f");
        this.putAdapter = new GenericExpressionPutAdapter(context);
    }
    async get(address) {
        const hash = Buffer.from(address, "hex");
        const expression = await __classPrivateFieldGet$1(this, _GenericExpressionAdapter_genericExpressionDNA, "f").call(name, "generic_expression", "get_expression_by_address", hash);
        return expression;
    }
}
_GenericExpressionAdapter_genericExpressionDNA = new WeakMap();

var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _GenericExpressionAuthorAdapter_dna;
class GenericExpressionAuthorAdapter {
    constructor(context) {
        _GenericExpressionAuthorAdapter_dna.set(this, void 0);
        __classPrivateFieldSet(this, _GenericExpressionAuthorAdapter_dna, context.Holochain, "f");
    }
    /// Get expressions authored by a given Agent/Identity
    async getByAuthor(author, count, page) {
        //TODO: resolve did
        const res = await __classPrivateFieldGet(this, _GenericExpressionAuthorAdapter_dna, "f").call(name, "generic_expression", "get_expression_by_author", { author: author, page_size: count, page_number: page });
        const out = [];
        res.forEach((expression) => {
            const ad4mExpression = Object.assign(expression.expression_data);
            out.push(ad4mExpression);
        });
        return out;
    }
}
_GenericExpressionAuthorAdapter_dna = new WeakMap();


const DNA = Buffer.from(dna, 'base64');

const CONFIG = {
    "languageName": "sdp-expression",
    "dnaName": "sdp-expression"
};

function interactions(expression) {
    return [];
}
function isImmutableExpression(expression) {
    return true;
}
const LANGUAGE_NAME = CONFIG.languageName;
const name = CONFIG.dnaName;
async function create(context) {
    const Holochain = context.Holochain;
    await Holochain.registerDNAs([{ file: DNA, nick: name }]);
    const expressionAdapter = new GenericExpressionAdapter(context);
    const authorAdaptor = new GenericExpressionAuthorAdapter(context);
    return {
        name: LANGUAGE_NAME,
        expressionAdapter,
        authorAdaptor,
        interactions,
        isImmutableExpression
    };
}

exports.LANGUAGE_NAME = LANGUAGE_NAME;
exports["default"] = create;
exports.name = name;
//# sourceMappingURL=bundle.js.map