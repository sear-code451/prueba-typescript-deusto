
//? Data of the department of sales and purchasing

// ? interface of the data base

// ? Interfaces DatasSale y DatasPurchasing: estos son los datos de los empleados según en el departamento que se encuentre.
interface DatasSales {
    __name:string,
    __surname:string,
    __birthdate:string,
    __sales:number
}

interface DatasPurchasing {
    __name:string,
    __surname:string,
    __birthdate:string,
    __shopping:number
}

interface Sales {
    pablo: DatasSales,
    maria: DatasSales,
    juan: DatasSales
}

interface Purchasing {
    pedro: DatasPurchasing,
    marcelo: DatasPurchasing,
    marcos: DatasPurchasing
}

// ? Test of interface with Sales and Purchasing
/* 
? Variables sales y purchasing: son los 2 departamentos que contienen a los empleados con sus datos.
? También estos 2 variables deben de seguir el tipado que se les asigno.
*/
let sales:Sales = {
    pablo: {
    __name: 'Pablo',
    __surname: 'Garcia',
    __birthdate: "08 Agust 2003",
    __sales: 6000
    },

    maria: {
    __name: 'María',
    __surname: 'Sanchez',
    __birthdate: "06 July 2002",
    __sales: 8000
    },

    juan: {
    __name: 'Juan',
    __surname: 'Mendoza',
    __birthdate: "01 February 2004",
    __sales: 4500
    }
};

let purchasing:Purchasing = {
    pedro: {
    __name: 'pedro',
    __surname: 'Mendez',
    __birthdate: "18 November 1998",
    __shopping: 10
    },

    marcelo: {
    __name: 'Marcelo',
    __surname: 'Perez',
    __birthdate: "08 September 1999",
    __shopping: 8
    },

    marcos: {
    __name: 'Marcos',
    __surname: 'Trancaras',
    __birthdate: "08 December 1994",
    __shopping: 3
    },
};
// ? Class of the employee of purchasing
/* 
? Creación de una clase Empleado_ventas:
 ? - ventas: esto contiene los datos del departamento de ventas.
 ? - method ObtenerEmpleadosVentas(): esto retornará un arreglo de las propiedades de la variable ventas.
 ? - method listaCompletaVentas: retornará la variable ventas
 ? IMPORTANTE:
    ? ventas: propiedad en privado.
    ? Los 2 métodos: está con "protected" protegidos.
*/
class Empleado_ventas {
    private ventas = sales;

    protected obtenerEmpleadosVentas() {
        const lista_empleados = Object.keys( this.ventas );
        return lista_empleados;
    }

    protected listaCompletaVentas() {
        return this.ventas;
    }

}

// ? Clase Empleado_compras extendido con la clase Empleado_ventas:
/* 
? Contiene todo lo de la clase Empleado_ventas
? cotiene 1 propiedad y 2 métodos que es lo mismo que lo de empleado ventas:
? - las diferencias es la variable y los nombres de los métodos nada más.
 */
class Empleado_compras extends Empleado_ventas {
    private compras = purchasing;

    protected obtenerEmpleadosCompras() {
        const lista_empleados = Object.keys( this.compras );
        return lista_empleados;
    }

    protected listaCompletaCompras() {
        return this.compras;
    }
}

let empleado_ventas = new Empleado_ventas() ;
let empleado_compras = new Empleado_compras();

console.log( empleado_compras );


// ? class Register
/* 
? Clase Registro_empleado  extendido con Empleado_compras:
 ? - contiene todo lo que contenga y pueda usar la clase extendida
 ? - contiene 4 métodos:
 ? * método que dicen empleadoVentas o empleadoCompras: retornará al empleado con el parámetro recibido si existe.
 ? * método listaEmpleadoVentas o listaEmpleadoCompras: Retornar las propiedades, es decir, los nombres de los empleados según de cada departamento.
*/
class Registro_empleado extends Empleado_compras {

    empleadoVentas(name:string) {
        let lista_ventas = this.listaCompletaVentas();
        return lista_ventas[name];
    }

    listaEmpleadosVentas() {
        let listEmpleados = this.obtenerEmpleadosVentas();
        return listEmpleados.join(' ');
    }

    empleadoCompras(name:string) {
        let lista_compras = this.listaCompletaCompras();
        return lista_compras[name];
    }

    listaEmpleadosCompras() {
        let listEmpleados = this.obtenerEmpleadosCompras();
        return listEmpleados.join(' ');
    }
}
// ? Invoque DOM
// ? Función que usa los datos de la clases con los elementos del DOM con 3 posibles respuesta:
// ? 1. si los departamentos no coinciden, mandará un mensaje de error.
// ? 2. si existe el departamento de ventas pero no el empleado de ventas mandará mensaje un error
// ? 3. si existe el departamento de compras pero no el empleado de compras mandará mensaje un error

// ? Si existe los empleados según el departamanto todo esto se enviará por la etiqueta "textarea"

const getDepartmentEmpleado = () => {
    let input_department = (<HTMLInputElement>document.getElementById('tag-department')).value;
    let input_employee = (<HTMLInputElement>document.getElementById('tag-employee')).value;
    let inputTextarea = (<HTMLTextAreaElement>document.getElementById('result'));

    let registro = new Registro_empleado();

    if( input_department === "ventas" || "compras" ) {

        if( input_department === "ventas" ){
            if( registro.empleadoVentas( input_employee ) !== undefined ){
                let empleado_compras = registro.empleadoVentas( input_employee );
                let { __name, __surname, __birthdate, __sales } = empleado_compras;
                inputTextarea.value = `
                nombre: ${ __name }
                apellido: ${ __surname }
                fecha de nacimiento: ${ __birthdate }
                ventas: ${__sales}`;
            }else inputTextarea.value = "Este nombre no existe en el departamento de ventas.";
        }

        if( input_department === "compras" ) {
            if( registro.empleadoCompras( input_employee ) !== undefined ) {
                let empleado_ventas = registro.empleadoCompras(input_employee);
                let { __name, __surname, __birthdate, __shopping } = empleado_ventas;
                inputTextarea.value = `
                nombre: ${ __name }
                apellido: ${ __surname }
                fecha de nacimiento: ${ __birthdate }
                compras: ${ __shopping }
                `;
            }else inputTextarea.value = "Este nombre no existe en el departamento de compras";
        }
    }else inputTextarea.value = "Este departamento no existe";

}

// ? Invovación del click del elemento id:"action_button"
const boton = document.getElementById("action_button");
boton?.addEventListener( 'click', getDepartmentEmpleado );







// INVOQUE pruebas
let register = new Registro_empleado();
console.log(register.empleadoVentas('maria'));
console.log(register.listaEmpleadosVentas());

console.log( register.empleadoCompras('marcelo') );
console.log(register.listaEmpleadosCompras());
