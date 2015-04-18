from django.db import models


class Value(models.Model):
    name = models.CharField(max_length=100)
    blurb = models.TextField()
    number = models.IntegerField(default=0)

    @property
    def metrics(self):
        return Metric.objects.filter(value=self)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["number"]


class Metric(models.Model):
    name = models.CharField(max_length=100)
    help_text = models.TextField(blank=True)
    value = models.ForeignKey(Value)
    number = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["value", "number"]
