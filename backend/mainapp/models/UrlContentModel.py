from django.db import models
from .BaseModel import BaseModel
from .SkillsModel import SkillsModel

class UrlContentModel(BaseModel):
    """
    This table shows the content of url based on user interested skills.

    url: url that student visit
    skillId: related skill of url
    """
    
    url = models.URLField()
    skillId = models.ForeignKey(SkillsModel, on_delete=models.CASCADE, to_field="id")
