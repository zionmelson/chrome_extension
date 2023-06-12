from django.db import models

class AttributesModel(models.Model):
    """
    This table is for storing Attributes.
    
    title: title of Attribute
    description: description of Attribute
    icon: icon path of Attribute
    """
    
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    icon = models.CharField(max_length=100)
