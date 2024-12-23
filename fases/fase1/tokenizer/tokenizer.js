import Visitor from "../visitor/Visitor.js";
import { Rango } from "../visitor/CST.js";
import { generateCaracteres } from "./utils.js";

export default class Tokenizer extends Visitor{
    visitProducciones(node){
        return node.expr.accept(this);
    } ; 
	visitOpciones(node) {
        console.log("**** verificando tamanio arreglo opciones ****")
        console.log(node.exprs.length);
        return node.exprs.map(expr => expr.accept(this)).join('');  //al ser un arreglo debemos de tratarlo mas adelante
    } ; 
	visitUnion(node) {
        return node.exprs.map(expr => expr.accept(this)).join(''); //se esta intentando ingresar a la distintas opciones
    } ; 
	visitExpresion(node) {
        return node.expr.accept(this);
    } ; 
	visitExpresiones(node) {} ; 
	visitString(node) {
        const codString = `
        !string
        if("${node.val}" == input(cursor:cursor + ${node.val.length - 1})) then
            allocate( character(len =  ${node.val.length + 9 }) :: lexeme)
            lexeme = input(cursor:cursor + ${node.val.length - 1}) // " (string)"
            cursor = cursor + ${node.val.length}
            return
        end if
        `
        const codstringInsensitive = `
        !string case insensitive
        if(to_lower ("${node.val}") == to_lower(input(cursor:cursor + ${node.val.length - 1}))) then
            allocate( character(len =  ${node.val.length}) :: lexeme)
            lexeme = input(cursor:cursor + ${node.val.length - 1})
            cursor = cursor + ${node.val.length}
            return
        end if
        `
        if(node.iscase){
            return codstringInsensitive
        }else{
            return codString;
        }
    } ; 
    //falta implementar
    visitClase(node){

    }
    // falta implementar
    visitRango(node){

    }
    visitIdentificador(){
        return '';
    }
    visitPunto(){
        return '';
    }
    visitFin(){
        return '';
    }
}