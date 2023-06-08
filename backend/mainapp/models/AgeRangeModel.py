from django.db import models

class AgeRangeModel(models.Model):
    """
    This table stores age range information. (ex: 0~17, 18~35, ...)
    
    startAge: start age number of age range.
    endAge: end age number of age range.
    """
    startAge = models.IntegerField()
    endAge = models.IntegerField()
