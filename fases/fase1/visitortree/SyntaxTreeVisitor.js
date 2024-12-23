import Visitor from "../visitor/Visitor.js";
import * as Syntax from "./SyntaxTree.js"

export default class SyntaxTreeVisitor{

    visitProducciones(node){
        return node.expr.accept(this);
    }

    visitOpciones(node){
        return node.exprs
        .map((expr) => expr.accept(this))
        .reduce((subTree, curr) => new Syntax.Or(subTree, curr));
    }

    visitUnion(node){
        return node.exprs
        .map((expr) => expr.accept(this))
        .reduce((subTree, curr) => new Syntax.Or(subTree, curr));
    }

    visitExpresion(node){
        switch (node.qty) {
            case '*':
                return new Syntax.ZeroOrMore(node.expr.accept(this));
            case '+':
                return new Syntax.OneOrMore(node.expr.accept(this));
            case '?':
                return new Syntax.Option(node.expr.accept(this));
            default:
                return node.expr.accept(this);
        }
    }

    visitString(node){
        return new Syntax.Hoja(node.val);
    }

    visitClase(node){
        // return new Syntax.Hoja(node.chars.join('')); //esta clase no esta implementada aun
    }

    visitRango(node){
        // return `${node.bottom}-${node.top}`; // esta parte del rango no esta implementada
    }

    visitIdentificador(node){
    }

    visitPunto(node){
    }

    visitFin(node){
    }
}