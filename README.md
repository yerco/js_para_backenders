# Curso JS para desarrolladores de backend

## Backend básico

Autenticación/Autorización tomada fundamentalmente 
desde https://learndjango.com/tutorials/django-signup-tutorial

## DB checking
```bash
% sqlite3 db.sqlite3
```
Alternativamente
```bash
% python manage.py dbshell 
```

Inspeccionar tablas
```
.tables
```

### Tip para superuser

Sugerencia `admin/admin`

### Tip para creación de usuario(s)
```bash
% python manage.py shell
>>> from django.contrib.auth.models import User
>>> user = User.objects.create_user('rocky', 'rocky@balboa.com', 'balboa')
>>> user.save()
```

## Participantes
1.- Jericho  
2.- Jonathan  
3.- Guido el lateral derecho
4.- Feña
<<<<<<< HEAD
5.- Verónica
6.- Francisco  
=======
5.- Verónica  
6.- Francisco
>>>>>>> 9c4bdd21278abb1f2d6b3ebd5c098429abbe6387
7.- Sebastián
8.- Fernando Noguera
9.- Esteban
10.- Manuel
