import os

def menu():
    opcion = 'X'
    opciones_posibles = ['1', '2', '3', '4','5', '6','7', 'X']
    control = True
    while control: 
        os.system("CLS")
        print("************* MENU ******************")
        print("* Crear Entidad Financiera     -> 1 *")
        print("* Crear Cliente                -> 2 *")
        print("* Asignar Cliente a Entidad    -> 3 *")
        print("* Transferencia entre Clientes -> 4 *")
        print("* Operar Entidad Financiera    -> 5 *")
        print("* Estado de cuenta de Clientes -> 6 *")
        print("* Estado de cuenta de Entidad  -> 7 *")
        print("* TERMINAR EJECUCION           -> X *")
        print("*************************************")
        opcion = input("Introduzca su opcion: ")
        if opcion in opciones_posibles:
            control = False
        else:
            print("Opcion invalida")
    return opcion

#PRUEBA UNITARIA
if __name__ == "__main__":
    opc = menu()
    if opc == '1':
        print("UNO")
    else:
        print("Otro")