from django.shortcuts import render

from values.models import Metric
from sites.models import Food


def scores(request):
    return render(request, 'sites/scores.html', {
        'metrics': Metric.objects.all(),
        'foods': Food.objects.all()
    })