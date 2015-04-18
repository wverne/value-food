from django.conf.urls import include, url
from django.contrib import admin

import values.views

urlpatterns = [
    url(r'^$', values.views.index, name='index'),

    url(r'^admin/', include(admin.site.urls)),
]
