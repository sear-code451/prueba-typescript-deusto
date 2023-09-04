//? Data of the department of sales and purchasing
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// ? Test of interface with Sales and Purchasing
/*
? Variables sales y purchasing: son los 2 departamentos que contienen a los empleados con sus datos.
? También estos 2 variables deben de seguir el tipado que se les asigno.
*/
var sales = {
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
var purchasing = {
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
    }
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
var Empleado_ventas = /** @class */ (function () {
    function Empleado_ventas() {
        this.ventas = sales;
    }
    Empleado_ventas.prototype.obtenerEmpleadosVentas = function () {
        var lista_empleados = Object.keys(this.ventas);
        return lista_empleados;
    };
    Empleado_ventas.prototype.listaCompletaVentas = function () {
        return this.ventas;
    };
    return Empleado_ventas;
}());
// ? Clase Empleado_compras extendido con la clase Empleado_ventas:
/*
? Contiene todo lo de la clase Empleado_ventas
? cotiene 1 propiedad y 2 métodos que es lo mismo que lo de empleado ventas:
? - las diferencias es la variable y los nombres de los métodos nada más.
 */
var Empleado_compras = /** @class */ (function (_super) {
    __extends(Empleado_compras, _super);
    function Empleado_compras() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.compras = purchasing;
        return _this;
    }
    Empleado_compras.prototype.obtenerEmpleadosCompras = function () {
        var lista_empleados = Object.keys(this.compras);
        return lista_empleados;
    };
    Empleado_compras.prototype.listaCompletaCompras = function () {
        return this.compras;
    };
    return Empleado_compras;
}(Empleado_ventas));
var empleado_ventas = new Empleado_ventas();
var empleado_compras = new Empleado_compras();
console.log(empleado_compras);
// ? class Register
/*
? Clase Registro_empleado  extendido con Empleado_compras:
 ? - contiene todo lo que contenga y pueda usar la clase extendida
 ? - contiene 4 métodos:
 ? * método que dicen empleadoVentas o empleadoCompras: retornará al empleado con el parámetro recibido si existe.
 ? * método listaEmpleadoVentas o listaEmpleadoCompras: Retornar las propiedades, es decir, los nombres de los empleados según de cada departamento.
*/
var Registro_empleado = /** @class */ (function (_super) {
    __extends(Registro_empleado, _super);
    function Registro_empleado() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Registro_empleado.prototype.empleadoVentas = function (name) {
        var lista_ventas = this.listaCompletaVentas();
        return lista_ventas[name];
    };
    Registro_empleado.prototype.listaEmpleadosVentas = function () {
        var listEmpleados = this.obtenerEmpleadosVentas();
        return listEmpleados.join(' ');
    };
    Registro_empleado.prototype.empleadoCompras = function (name) {
        var lista_compras = this.listaCompletaCompras();
        return lista_compras[name];
    };
    Registro_empleado.prototype.listaEmpleadosCompras = function () {
        var listEmpleados = this.obtenerEmpleadosCompras();
        return listEmpleados.join(' ');
    };
    return Registro_empleado;
}(Empleado_compras));
// ? Invoque DOM
// ? Función que usa los datos de la clases con los elementos del DOM con 3 posibles respuesta:
// ? 1. si los departamentos no coinciden, mandará un mensaje de error.
// ? 2. si existe el departamento de ventas pero no el empleado de ventas mandará mensaje un error
// ? 3. si existe el departamento de compras pero no el empleado de compras mandará mensaje un error
// ? Si existe los empleados según el departamanto todo esto se enviará por la etiqueta "textarea"
var getDepartmentEmpleado = function () {
    var input_department = document.getElementById('tag-department').value;
    var input_employee = document.getElementById('tag-employee').value;
    var inputTextarea = document.getElementById('result');
    var registro = new Registro_empleado();
    if (input_department === ("ventas") || (input_department === "compras")) {
        if (input_department === "ventas") {
            if (registro.empleadoVentas(input_employee) !== undefined) {
                var empleado_compras_1 = registro.empleadoVentas(input_employee);
                var __name = empleado_compras_1.__name, __surname = empleado_compras_1.__surname, __birthdate = empleado_compras_1.__birthdate, __sales = empleado_compras_1.__sales;
                inputTextarea.value = "\n                nombre: ".concat(__name, "\n                apellido: ").concat(__surname, "\n                fecha de nacimiento: ").concat(__birthdate, "\n                ventas: ").concat(__sales);
            }
            else
                inputTextarea.value = "Este nombre no existe en el departamento de ventas.";
        }
        ;
        if (input_department === "compras") {
            if (registro.empleadoCompras(input_employee) !== undefined) {
                var empleado_ventas_1 = registro.empleadoCompras(input_employee);
                var __name = empleado_ventas_1.__name, __surname = empleado_ventas_1.__surname, __birthdate = empleado_ventas_1.__birthdate, __shopping = empleado_ventas_1.__shopping;
                inputTextarea.value = "\n                nombre: ".concat(__name, "\n                apellido: ").concat(__surname, "\n                fecha de nacimiento: ").concat(__birthdate, "\n                compras: ").concat(__shopping, "\n                ");
            }
            else
                inputTextarea.value = "Este nombre no existe en el departamento de compras";
        }
        ;
    }
    else
        inputTextarea.value = "Este departamento no existe";
};
// ? Invovación del click del elemento id:"action_button"
var boton = document.getElementById("action_button");
boton === null || boton === void 0 ? void 0 : boton.addEventListener('click', getDepartmentEmpleado);
// INVOQUE pruebas
var register = new Registro_empleado();
register.empleadoVentas('juan');
console.log(register.empleadoVentas('maria'));
console.log(register.listaEmpleadosVentas());
console.log(register.empleadoCompras('marcelo'));
console.log(register.listaEmpleadosCompras());
