import { walk } from 'estree-walker'

// should return transformed ast
export function transformer(ast) {
    walk(ast, {
        enter(node){
            if(node.type === 'VariableDeclaration') {
                if( node.kind === 'const'  || node.kind === 'let'){
                    node.kind = 'var'
                }
            }
        }
    })
}
