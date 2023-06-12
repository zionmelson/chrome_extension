from django.db import models

class UserTypeModel(models.Model):
    """
    This table stores types of users.
    
    type: type of user: student, recruiter
    """
    
    type = models.CharField(max_length=20)
