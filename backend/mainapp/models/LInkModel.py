from django.db import models
from .BaseModel import BaseModel
from .UserModel import UserModel

class LInkModel(BaseModel):
    """
    This table shows the link information that student visited.

    userId: id of student
    url: url that student visited
    time: total time that student spent on url
    lastVisitDate: last date and time that student visit url
    frequency: frequency of student visit
    clickCount: total number of clicks in url
    level: this shows how student like this url (feedback of student: 0 ~ 5; 0: the lowest, 5: highest)
    """
    
    userId = models.ForeignKey(UserModel, on_delete=models.CASCADE, to_field="id")
    url = models.URLField(unique=True)
    time = models.IntegerField()
    lastVisitDateTime = models.DateTimeField()
    frequency = models.FloatField()
    clickCount = models.IntegerField()
    level = models.IntegerField()
