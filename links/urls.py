from django.urls import path

from . import views
#from .views import viewfeed

app_name = "links"

urlpatterns = [
    path('', views.main, name = 'First'),
    path('main/', views.main, name = 'First'),
    path('pricesFilter/', views.pricesFilter, name = 'pricesFilter'),

]