from django.db import models


class ProductIdea(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('validated', 'Validated'),
        ('in_progress', 'In Progress'),
    ]

    title = models.CharField(max_length=200) # product idea name
    problem = models.TextField() # problem statement
    target_user = models.CharField(max_length=200) # who faces this problem
    status = models.CharField( # current stage
        max_length=20,
        choices=STATUS_CHOICES,
        default='draft'
    )
    created_at = models.DateTimeField(auto_now_add=True) # saved date/time

    def __str__(self):
        return self.title

class Analysis(models.Model):
    product_idea = models.ForeignKey(
        ProductIdea,
        on_delete=models.CASCADE,
        related_name="analyses",
    )
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Analysis for {self.product_idea.title}"