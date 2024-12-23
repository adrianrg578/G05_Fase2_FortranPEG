import { Producciones } from "../visitor/CST.js";
import {Or, Concat, Hoja } from './SyntaxTree.js'
import SyntaxTreeVisitor from "./SyntaxTreeVisitor.js";

/**
 *
 * @param {Producciones[]} CST
 */
export default function generateSyntaxTree(CST) {
    const visitor = new SyntaxTreeVisitor();
    const syntaxTree = CST.map((subTree) => subTree.accept(visitor)).reduce(
        (tree, subTree) => new Or(tree, subTree)
    );
    return new Concat(syntaxTree, new Hoja('#'));

}

export function generateCaracteres(chars) {
    if (chars.length === 0) return '';
    return `
    if (findloc([${chars
        .map((char) => `"${char}"`)
        .join(', ')}], input(i:i), 1) > 0) then
        lexeme = input(cursor:i)
        cursor = i + 1
        return
    end if
    `;
}