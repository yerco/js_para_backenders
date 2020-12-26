#CLASE
class Financiera:
# ATRIBUTOS    
    def __init__(self, nombre, identificador, saldo_institucional, clientes): 
        self.nombre = nombre
        self.identificador = identificador
        self.saldo_institucional = saldo_institucional
        self.clientes = []
        self.transacciones = []
#   METODOS:
    def agregar_cliente (self,cliente):
        if self.saldo_institucional >=  10000000:
            self.clientes.append(cliente)
            self.saldo_institucional  = self.saldo_institucional - 1000000  
            print("Felicitaciones has sido añadido a: ", self.nombre, " Cliente: ", cliente.nombre)
        else:
            print(self.nombre , " Informa: No puedo agregarte porque mi saldo institucional es insuficiente!")
        #print(str(self.saldo_institucional))
    
    def eliminar_cliente (self): 
        print("eliminar_cliente") 

#    def Cliente_entidad(self, clientes, nombre):
#        print(self.clientes)
#        print(nombre)  
        
    def transferir (self,desde,hacia,monto):
        if desde in self.clientes:
            if desde.saldo - monto < -1000000:
                print(self.nombre + " Informa: Transferencia rechazada ya que excede su limite de credito!")
            else:
                if monto >= 10000000:
                    print(self.nombre + " Informa: Transferencia rechazada ya excede el monto permitido por la entidad!")
                else:
                    desde.girar(monto)
                    hacia.abonar(monto)
                    self.transacciones.append("Debito | " + desde.nombre + " | " + str(monto))
                    if hacia in self.clientes:
                        self.transacciones.append("Abono  | " + hacia.nombre + " | " + str(monto))
                    print(self.nombre + " Informa: Transferencia exitosa de CLP " + str(monto) + " | " + desde.nombre+ " a " + hacia.nombre)
        else:
            print("Usted no es cliente de este banco.")   

    def tr_cliente_financiera (self,cliente,abono):
        if cliente in self.clientes:
            if cliente.saldo - abono < -1000000:
                print(self.nombre + " Informa: Transferencia rechazada ya que excede su limite de credito!")
            else:
                if cliente.saldo < abono:
                    print(self.nombre + " Informa: Transferencia rechazada ya que excede su saldo disponible!")
                else:
                    cliente.girar(abono)
                    self.saldo_institucional = self.saldo_institucional + abono
                    self.transacciones.append("Abono  | " + cliente.nombre + " | " + str(abono))
                    print(self.nombre + " Informa: Abono exitoso de CLP " + str(abono) + " | " + cliente.nombre)
        else:
            print("Usted no es cliente de este banco.")   

    def giros_totales (self): 
        print("giros_totales") 

    def abonos_totales (self): 
        print("abonos_totales") 

    def mostrar_saldo_institucional (self): 
        print("mostrar_saldo_institucional")

    def edc(self):
        print("_______________________________")
        print("ENTIDAD: " , self.nombre)
        print("DEB/ABO  | CLIENTE   | MONTO")
        print("_______________________________")
        print()
        for i in self.transacciones:
            x = i.split("|")
            print(x[0], " | ", x[1], " | ", x[2])
#        print()
        print("_______________________________")
        print("               Saldo: " , self.saldo_institucional)
#        print()
        print("_______________________________")


   