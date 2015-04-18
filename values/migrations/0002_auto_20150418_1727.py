# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('values', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='metric',
            name='help_text',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='value',
            name='blurb',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]
