//Referencias en el HTML
import{todoList} from '../index'
import { Todo } from "../classes";

const divTodoList = document.querySelector(".todo-list"); //  referencia ul
const txtInput    = document.querySelector(".new-todo"); //   referencia input "¿Qué necesita ser hecho?"
const btnBorrar   = document.querySelector(".clear-completed") // referencia button Borrar completados
const ulFiltros   = document.querySelector(".filters");   // filtros
const anchorFiltros = document.querySelectorAll('.filtro');


export const crearTodoHtml = (todo) => { // do list
  const htmlTodo = `
    <li class="${ (todo.completado)?'completed':'' }" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${ (todo.completado)?'checked':''}>
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>
                    `;

    const div = document.createElement("div");
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild); // ul--> li

    return div.firstElementChild;

};

//Eventos
txtInput.addEventListener('keyup', (event)=>{

if(event.keyCode ===13 && txtInput.value.length > 0){   //  Enter = keyCode 13 - Cadena no vacía length > 0
    console.log(txtInput.value)
    const nuevoTodo =new Todo(txtInput.value); // Se crea el todo o tarea
    todoList.nuevoTodo(nuevoTodo);             //Se agrega al array de todo
    
    crearTodoHtml(nuevoTodo);                  //* Se crea el elemento html li 

    txtInput.value =''; // Limpiar entrada
    
}

});




divTodoList.addEventListener('click',(event)=>{

   
    const nombreElemento = event.target.localName;  //input, label, button
    const todoElemento = event.target.parentElement.parentElement; // li
    const todoId = todoElemento.getAttribute('data-id');
   

    if(nombreElemento.includes('input')){  //click en el checkbox
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');

    }else if(nombreElemento.includes('button')){    //Borrar tarea
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);

    }

    
});


btnBorrar.addEventListener('click',()=>{

    todoList.EliminarCompletados();

    for( let i = divTodoList.children.length-1; i >= 0 ;i--){

        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }

    }

});


ulFiltros.addEventListener('click',(event)=>{

    const filtro = event.target.text;

    if(!filtro){return;}

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected')


    for ( let elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;   
            
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;
        }

        

    }



});