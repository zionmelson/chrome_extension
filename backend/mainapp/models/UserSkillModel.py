from django.db import models
from .BaseModel import BaseModel
from .UserModel import UserModel
from .SkillsModel import SkillsModel

class UserSkillModel(BaseModel):
    """
    This table shows the skills that user interests.

    userId: id of user
    skillId: id of skill
    """
    
    userId = models.ForeignKey(UserModel, on_delete=models.CASCADE, to_field="id")
    skillId = models.ForeignKey(SkillsModel, on_delete=models.CASCADE, to_field="id")
