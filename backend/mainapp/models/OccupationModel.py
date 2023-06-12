from django.db import models

class OccupationModel(models.Model):
    """
    This tables stores Occupation information.

    title: name of Occupation
    description: descrioption what the occupation is
    """
    
    occupationId = models.CharField(max_length=10, primary_key=True)
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=1000)
