from django.db import models
from .BaseModel import BaseModel
from .UserModel import UserModel
from .JobModel import JobModel

class JobProcessingModel(BaseModel):
    """
    This table shows the information of job processing.

    jobId: id of job
    studentId: id of student
    status: current status of processing: 0: applied, 1: schedule interview, 2: finish interview, 3: accepted, 4: rejected
    interviewDateTime: scheduled interview date time
    acceptDateTime: datetime when the student is accepted
    rejectDateTime: datetime when the student is rejected
    """
    
    jobId = models.ForeignKey(JobModel, on_delete=models.CASCADE, to_field="id")
    studentId = models.ForeignKey(UserModel, on_delete=models.CASCADE, to_field="id")
    status = models.IntegerField()
    interviewDateTime = models.DateTimeField(null=True)
    acceptDateTime = models.DateTimeField(null=True)
    rejectDateTime = models.DateTimeField(null=True)
