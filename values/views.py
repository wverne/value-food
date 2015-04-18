from django.shortcuts import render

from values.models import Value


def index(request):
    return render(request, 'values/index.html', {
        'values': Value.objects.all()
    })