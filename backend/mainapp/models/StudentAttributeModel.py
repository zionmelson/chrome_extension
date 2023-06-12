from django.db import models
from .BaseModel import BaseModel
from .UserModel import UserModel
from .AttributesModel import AttributesModel

class StudentAttributeModel(BaseModel):
    """
    This table is for storing attributes that student receive.

    studentId: id of student
    attributeId: id of attribute that 
    receviedBy: id of recruiter that give attribute to student
    receviedDate; date that student received the attribute
    """
    
    studentId = models.ForeignKey(UserModel, on_delete=models.CASCADE, to_field="id", related_name="student_attribute_id")
    attributeId = models.ForeignKey(AttributesModel, on_delete=models.CASCADE, to_field="id")
    receivedBy = models.ForeignKey(UserModel, on_delete=models.CASCADE, to_field="id", related_name="recruiter_attribute_id")
    receivedDate = models.DateTimeField()
