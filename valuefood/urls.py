from django.conf.urls import include, url
from django.contrib import admin

import values.views
import sites.views

urlpatterns = [
    url(r'^$', values.views.index, name='index'),
    url(r'^scores/$', sites.views.scores, name='scores'),

    url(r'^admin/', include(admin.site.urls)),
]
