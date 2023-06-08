from django.db import models
from .BaseModel import BaseModel
from .UserModel import UserModel
from .CompaniesModel import CompaniesModel

class UserCompanyModel(BaseModel):
    """
    This tables show the companies that user interests.

    userId; id of user
    companyId: id of company
    """
    
    userId = models.ForeignKey(UserModel, on_delete=models.CASCADE, to_field="id")
    companyId = models.ForeignKey(CompaniesModel, on_delete=models.CASCADE, to_field="id")
