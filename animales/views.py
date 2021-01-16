from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.contrib.auth import get_user_model

from animales.forms import AnimalForm
from animales.models import Animales


def add_animal(request):
    template_name = "animales/animales.html"
    User = get_user_model()
    user_id = request.user.id
    if request.method == 'POST':
        form = AnimalForm(request.POST)
        if form.is_valid():
            especie = request.POST['especie']
            nombre = request.POST['nombre']
            numero = int(request.POST['numero'])
            if especie == 'Perro':
                comida = 2 * numero
            elif especie == 'Cocodrilo':
                comida = 5 * numero
                # else means especie == 'Gato':
            else:
                comida = numero
            animal = Animales(
                especie=especie, nombre=nombre, numero=numero, comida=comida,
                user_id=user_id
            )
            animal.save()
            # Avoid submitting on refreshing page
            return HttpResponseRedirect('/animales')
        else:
            print(form.errors.as_data())
            form = AnimalForm()
    else:
        # GET do nothing
        pass
    animales = Animales.objects.all()
    total_comida = 0
    for animal in animales:
        total_comida += int(animal.comida)
    form = AnimalForm()
    users = User.objects.all()
    alimentadores = {}
    for user in users:
        user_animals = animales.filter(user_id=user.id)
        alimentadores[user.username] = 0
        for user_animal in user_animals:
            alimentadores[user.username] += user_animal.comida

    return render(request, template_name, {
        'form': form,
        'animales': animales,
        'total_comida': total_comida,
        'alimentadores': alimentadores
        }
    )


def delete_animal(request, id):
    if request.method == 'POST':
        row = Animales.objects.get(id=id)
        row.delete()
        return JsonResponse({'row_deleted': id})
    else:
        return JsonResponse({'message': 'method not allowed'})

