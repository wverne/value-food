from django.contrib import admin

from sites.models import Food, Score, Site


class FoodAdmin(admin.ModelAdmin):
    fields = ['name', 'number']
    list_display = ('name', 'number')


class SiteAdmin(admin.ModelAdmin):
    fields = ['name', 'food', 'latitude', 'longitude']
    list_display = ('name', 'food', 'latitude', 'longitude')


class ScoreAdmin(admin.ModelAdmin):
    fields = ['site', 'metric', 'score']
    list_display = ('site', 'metric', 'score')

admin.site.register(Food, FoodAdmin)
admin.site.register(Site, SiteAdmin)
admin.site.register(Score, ScoreAdmin)
