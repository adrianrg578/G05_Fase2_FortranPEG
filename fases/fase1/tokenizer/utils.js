import Tokenizer from "./tokenizer.js";

export async function generateTokenizer(grammar) {
    const tokenizer = new Tokenizer();
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
            ${grammar.map((produccion)=> produccion.accept(tokenizer)).join('\n')}
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