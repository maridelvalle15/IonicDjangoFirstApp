from .models import *
from .serializers import *
from rest_framework import viewsets


class LibroViewSet(viewsets.ModelViewSet):

    serializer_class = LibroSerializer
    queryset = Libro.objects.all()


class AutorViewSet(viewsets.ModelViewSet):

    serializer_class = AutorSerializer
    queryset = Autor.objects.all()


class UserViewSet(viewsets.ModelViewSet):

    serializer_class = UserSerializer
    queryset = User.objects.all()
