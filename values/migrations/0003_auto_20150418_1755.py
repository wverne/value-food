# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('values', '0002_auto_20150418_1727'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='metric',
            options={'ordering': ['value', 'number']},
        ),
        migrations.AlterModelOptions(
            name='value',
            options={'ordering': ['number']},
        ),
    ]
