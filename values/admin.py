from django.contrib import admin

from values.models import Metric, Value


class ValueAdmin(admin.ModelAdmin):
    fields = ['name', 'blurb', 'number']
    list_display = ('name', 'number')


class MetricAdmin(admin.ModelAdmin):
    fields = ['name', 'help_text', 'value', 'number']
    list_display = ('name', 'value', 'number')

admin.site.register(Value, ValueAdmin)
admin.site.register(Metric, MetricAdmin)
