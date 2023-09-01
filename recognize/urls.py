from django.urls import path
from .views import *


urlpatterns=[
    path("",index,name="index"),
    path("process-data",process_data,name="process")
]