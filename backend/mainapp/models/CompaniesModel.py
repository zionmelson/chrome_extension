from django.db import models

class CompaniesModel(models.Model):
    """
    This tables shows the company information

    name: name of company
    url: company url (this will be used to get company's favicon)
    """
    
    name = models.CharField(max_length=50)
    url = models.URLField()
