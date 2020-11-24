from django.urls import path
from animales.views import add_animal

urlpatterns = [
    path('', add_animal, name='add_animal'),
]
