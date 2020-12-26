#CLASE
class Clientes: 
#ATRIBUTOS
    
#METODOS:
    def __init__ (self, nombre, identificador, saldo):
        self.nombre=nombre
        self.identificador=identificador
        self.saldo=saldo
        self.transacciones = []

    def girar (self,monto):
        self.saldo = self.saldo - monto
        self.transacciones.append("Debito | " + str(monto))

    def abonar (self,monto):
        self.saldo = self.saldo + monto
        self.transacciones.append("Abono  | " + str(monto))

    def edc(self):
        print("_______________________")
        print("Cliente: " , self.nombre)
        print("_______________________")
        for i in self.transacciones:
            x = i.split("|")
            print(x[0], " | ", x[1])
        print("_______________________")
        print("Saldo:     " , self.saldo)
        print("_______________________")

    def mostrar_saldo (self):
        return self.saldo
