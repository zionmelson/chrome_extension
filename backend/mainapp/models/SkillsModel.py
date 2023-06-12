from django.db import models
from .OccupationModel import OccupationModel

class SkillsModel(models.Model):
    """
    This tables stores skills.

    name: name of skill. (example: python, machine learning ...)
    """
    
    occupationId = models.ForeignKey(OccupationModel, on_delete=models.CASCADE, to_field="occupationId", null=True)
    name = models.CharField(max_length=150)
    hot_technology = models.CharField(max_length=1, null=True)
    in_demand = models.CharField(max_length=1, null=True)
