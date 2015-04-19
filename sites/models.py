from django.db import models

from values.models import Metric


class Food(models.Model):
    name = models.CharField(max_length=100)
    number = models.IntegerField(default=0)

    @property
    def sites(self):
        return Site.objects.filter(food=self)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["number"]


class Site(models.Model):
    name = models.CharField(max_length=100)
    food = models.ForeignKey(Food)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)

    @property
    def scores(self):
        scores_dict = {}
        for score in Score.objects.filter(site=self):
            scores_dict[score.metric.name] = score.score
        for metric in Metric.objects.all():
            if not metric.name in scores_dict:
                scores_dict[metric.name] = -1
        return scores_dict

    @property
    def scores_id(self):
        scores_dict = {}
        for score in Score.objects.filter(site=self):
            scores_dict[score.metric.id] = score.score
        for metric in Metric.objects.all():
            if not metric.id in scores_dict:
                scores_dict[metric.id] = -1
        return scores_dict

    def __str__(self):
        return self.name + " - " + self.food.name

    class Meta:
        ordering = ["food", "name"]


class Score(models.Model):
    site = models.ForeignKey(Site)
    metric = models.ForeignKey(Metric)
    score = models.DecimalField(max_digits=3,
                                decimal_places=2)

    def __str__(self):
        return "%s %s" % (self.site.name, self.metric.name)

    class Meta:
        ordering = ["site", "metric"]
