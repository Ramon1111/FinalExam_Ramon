from django.urls import path

from . import views
#from .views import viewfeed

app_name = "links"

urlpatterns = [
    path('', views.main, name = 'First'),
    path('checkTables/', views.checkTables, name = 'checkTables'),
    #path('upGenres/', views.list_genres),
]