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
- Yerco
- Francisco
