
// Auto-generated
import Node from './Node.js';


export class Producciones extends Node {
    constructor(id, expr, alias) {
        super();
        this.id = id;
		this.expr = expr;
		this.alias = alias;
    }

    accept(visitor){
        return visitor.visitProducciones(this) ;
    }
}
    
export class Opciones extends Node {
    constructor(exprs) {
        super();
        this.exprs = exprs;
    }

    accept(visitor){
        return visitor.visitOpciones(this) ;
    }
}
    
export class Union extends Node {
    constructor(exprs) {
        super();
        this.exprs = exprs;
    }

    accept(visitor){
        return visitor.visitUnion(this) ;
    }
}
    
export class Expresion extends Node {
    constructor(expr, qty) {
        super();
        this.expr = expr;
		this.qty = qty;
    }

    accept(visitor){
        return visitor.visitExpresion(this) ;
    }
}
    
export class Expresiones extends Node {
    constructor(val, iscase) {
        super();
        this.val = val;
		this.iscase = iscase;
    }

    accept(visitor){
        return visitor.visitExpresiones(this) ;
    }
}
    
export class String extends Node {
    constructor(val, iscase) {
        super();
        this.val = val;
		this.iscase = iscase;
    }

    accept(visitor){
        return visitor.visitString(this) ;
    }
}
    
export class Identificador extends Node {
    constructor(val, iscase) {
        super();
        this.val = val;
		this.iscase = iscase;
    }

    accept(visitor){
        return visitor.visitIdentificador(this) ;
    }
}
    