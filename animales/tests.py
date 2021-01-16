from django.test import TestCase, Client

from .forms import AnimalForm
from .models import Animales

from django.contrib.auth.models import User


class AnimalesTestCase(TestCase):

    def setUp(self) -> None:
        animales = Animales.objects.create(
            especie="Malamute",
            nombre="Los Jacos",
            numero=3,
            comida=10,
            user_id=1
        )
        animales.save()
        self.client = Client()

    def test_validar_form(self):
        user = User.objects.create(username='testuser')
        user.set_password('12345')
        user.save()
        logged_in = self.client.login(username='testuser', password='12345')
        self.assertEqual(True, logged_in)
        data = {'especie': 'Focas', 'nombre': 'Los Manolos', 'numero': 3, 'comida': 2, 'user_id': 1}
        form = AnimalForm(data=data)
        self.assertTrue(form.is_valid())
