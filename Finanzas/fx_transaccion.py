import random

def transf_aleat(n, entidad, clientes):
    for _i in range (0, n):
        control = False
        while not control:
            desde = random.choice(entidad.clientes)
            hacia = random.choice(clientes)
            if not desde == hacia:
                control = True
        monto = random.randint(0, 500000)
        entidad.transferir(desde, hacia, monto)
    return n, entidad



# AREA DE PRUEBAS UNITARIAS
'''
if __name__ == "__main__":
    cliente1 = Clientes("Juan0" , "1" , 5055)
    cliente2 = Clientes("juan1" , "2", 0) 
    trans_entre_cliente(cliente1,cliente2, 120000)
    pass
'''
