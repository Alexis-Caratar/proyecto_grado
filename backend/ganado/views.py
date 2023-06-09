from rest_framework import generics
from rest_framework.response import Response
from .models import Ganado
from .serializers import GanadoSerializer
from django.views.generic import View


class GanadoListCreateAPIView(generics.ListCreateAPIView):
    queryset = Ganado.objects.all()
    serializer_class = GanadoSerializer

class GanadoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ganado.objects.all()
    serializer_class = GanadoSerializer

class GanadoDestroyAPIView(generics.DestroyAPIView):
    queryset = Ganado.objects.all()
    serializer_class = GanadoSerializer


class GanadoSearchView(View):
    def get(self, request):
        search_query = request.GET.get('search')
        if search_query:
            ganados = Ganado.objects.filter(nombre__icontains=search_query)
        else:
            ganados = Ganado.objects.all()
        return render(request, 'ganado_search.html', {'ganados': ganados, 'search_query': search_query})
