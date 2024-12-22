const nodes = {
    Producciones :['id','expr','alias'],
    Opciones: ['exprs'],
    Union: ['exprs'],
    Expresion: ['expr','qty'],
    Expresiones: ['val','iscase'],      //regla a factorizar
    String:['val','iscase'],
    Identificador:['val','iscase']
};

export default nodes;