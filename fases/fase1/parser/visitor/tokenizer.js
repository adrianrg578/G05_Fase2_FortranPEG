import Visitor from "./visitor.js";

export default class Tokenizer extends Visitor{
    generateTokenizer(grammar){
        const template = `
module tokenizer
    implicit none

    contains
    function nextSym(input, cursor) result(lexeme)
        character(len=*), intent(in) :: input
        integer, intent(inout) :: cursor
        character(len=:), allocatable :: Lexeme

        if(cursor > len(input)) then
            allocate( character(len = 3) :: lexeme)
            lexeme = "EOF"
            return
        end if

        ${grammar.map((produccion)=> produccion.accept(this)).join('\n')}

        print *, "error lexico en col ", cursor, ', "'//input(cursor:cursor)//'"'
    end function nextSym
end module tokenizer
        `
    return template;
    }

    visitProducciones(node){
        return node.expr.accept(this);
    } ; 
	visitOpciones(node) {
        return node.exprs[0].accept(this);  //al ser un arreglo debemos de tratarlo mas adelante
    } ; 
	visitUnion(node) {
        return node.exprs[0].accept(this); //arreglo
    } ; 
	visitExpresion(node) {
        return node.expr.accept(this);
    } ; 
	visitExpresiones(node) {} ; 
	visitString(node) {
        const codString = `
        if(${node.val} == input(cursor:cursor + ${node.val.length - 1})) then !Foo
            allocate( character(len =  ${node.val.length}) :: lexeme)
            lexeme = input(cursor:cursor + ${node.val.length - 1})
            cursor = cursor + ${node.val.lenghth}
            return
        end if
        `
        return codString;
    } ; 
}