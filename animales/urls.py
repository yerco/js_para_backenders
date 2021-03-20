from django.urls import path
from animales.views import add_animal, delete_animal, new_animal

urlpatterns = [
    path('', add_animal, name='add_animal'),
    path('delete/<int:id>', delete_animal, name='delete_animal'),
    path('new', new_animal, name='new_animal')
]
