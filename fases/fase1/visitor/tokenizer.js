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
        character(len=:), allocatable :: lexeme

        if(cursor > len(input)) then
            allocate( character(len = 3) :: lexeme)
            lexeme = "EOF"
            return
        end if
        ${grammar.map((produccion)=> produccion.accept(this)).join('\n')}
        print *, "error lexico en col ", cursor, ', "'//input(cursor:cursor)//'"'
        lexeme = "ERROR"
    end function nextSym

    function to_lower(strIn) result(strOut)
     implicit none

     character(len=*), intent(in) :: strIn
     character(len=len(strIn)) :: strOut
     integer :: i,j

     do i = 1, len(strIn)
          j = iachar(strIn(i:i))
          if (j>= iachar("A") .and. j<=iachar("Z") ) then
               strOut(i:i) = achar(iachar(strIn(i:i))+32)
          else
               strOut(i:i) = strIn(i:i)
          end if
     end do

    end function to_lower

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
        if("${node.val}" == input(cursor:cursor + ${node.val.length - 1})) then
            allocate( character(len =  ${node.val.length}) :: lexeme)
            lexeme = input(cursor:cursor + ${node.val.length - 1})
            cursor = cursor + ${node.val.length}
            return
        end if
        `
        const codstringInsensitive = `
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
}