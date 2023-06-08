from django.db import models
from django.utils import timezone


class BaseModel(models.Model):
    """
    Base model for all models that used in application.
    """

    class Meta:
        abstract = True
    
    created_at = models.DateTimeField(auto_now_add=True)        
    updated_at = models.DateTimeField(auto_now=True)            
    deleted_at = models.DateTimeField(null=True, blank=True)    
    is_deleted = models.BooleanField(default=False)             

    def soft_delete(self):
        self.deleted_at = timezone.now()
        self.is_deleted = True
        self.save()
