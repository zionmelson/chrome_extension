from django.db import models
from .BaseModel import BaseModel
from .UserModel import UserModel

class JobModel(BaseModel):
    """
    This table shows the information about the job.

    recruiterId: id of the recruiter that create the job
    title: title of the job
    description: description of job
    qualifications: qualifications of job
    jobIcon: icon path of the job
    deadline: deadline of job posting
    link: link of job post
    isOpen: current status of job (true; opened, false: closed)
    """
    
    recruiterId = models.ForeignKey(UserModel, on_delete=models.CASCADE, to_field="id")
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    qualifications = models.TextField()
    jobIcon = models.FilePathField()
    deadline = models.DateTimeField()
    link = models.URLField()
    isOpen = models.BooleanField()
