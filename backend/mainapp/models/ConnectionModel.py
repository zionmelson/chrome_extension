from django.db import models
from .BaseModel import BaseModel
from .UserModel import UserModel

class ConnectionModel(BaseModel):
    """
    This table shows the connection between student and recruiter.

    studentId: id of student
    recruiterId: id of recruiter
    messages: content of conversation between student and recruiter.
    {
        messages: [
            {
                id: (studentId or recruiterId; if this is student id, then the message is from student to recuriter)
                message: content of message,
                sendDateTime: datetime to send the message
                editDateTime: last datetime to edit the message
            }
        ]
    }
    """
    
    studentId = models.ForeignKey(UserModel, on_delete=models.CASCADE, to_field="id", related_name="student_user_id")
    recruiterId = models.ForeignKey(UserModel, on_delete=models.CASCADE, to_field="id", related_name="recruiter_user_id")
    messages = models.JSONField()
